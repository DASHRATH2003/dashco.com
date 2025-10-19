import { useEffect, useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase.js';
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  limit,
  query,
  getCountFromServer,
  addDoc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';

function formatNumber(n) {
  return (Number(n) || 0).toLocaleString('en-IN');
}
function formatINR(n) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(Number(n) || 0);
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const logout = async () => { await signOut(auth); navigate('/admin/login', { replace: true }); };

  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard | statistics | earnings | messages

  const [visits, setVisits] = useState(0);
  const [orders, setOrders] = useState([]);
  // old flat messages removed; now using clients and thread
  const [clients, setClients] = useState([]); // {id, name, email, lastMessage, lastActivity, userAgent}
  const [activeClientId, setActiveClientId] = useState(null);
  const [thread, setThread] = useState([]); // messages of selected client
  const [messagesCount, setMessagesCount] = useState(0);
  const [notifications, setNotifications] = useState([]); // cookie consent notifications from Firestore

  // Admin compose state (reply to selected thread)
  const [adminName, setAdminName] = useState('Admin');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminText, setAdminText] = useState('');
  const [sendingMsg, setSendingMsg] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  // Live subscriptions
  useEffect(() => {
    const unsubVisit = onSnapshot(doc(db, 'metrics', 'summary'), (snap) => {
      setVisits(snap.exists() ? (snap.data().totalVisits || 0) : 0);
    });

    const qOrders = query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(100));
    const unsubOrders = onSnapshot(qOrders, (snap) => {
      const list = snap.docs.map((d) => {
        const data = d.data() || {};
        const ts = data.createdAt?.toDate ? data.createdAt.toDate() : (data.createdAt?._seconds ? new Date(data.createdAt._seconds * 1000) : new Date());
        return {
          id: d.id,
          project: data.project || 'Unknown',
          amountRupees: Number(data.amountRupees) || 0,
          source: data.source || '-',
          createdAt: ts,
        };
      });
      setOrders(list);
    });

    // Subscribe to clients list (unique conversations by user agent)
    const qClients = query(collection(db, 'clients'), orderBy('lastActivity', 'desc'));
    const unsubClients = onSnapshot(qClients, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
      setClients(list);
    });

    // Subscribe to consent notifications (accepted/rejected)
    const qNotes = query(collection(db, 'notifications'), orderBy('createdAtMs', 'desc'), limit(100));
    const unsubNotes = onSnapshot(qNotes, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
      setNotifications(list);
    });

    // get total number of clients
    getCountFromServer(collection(db, 'clients')).then((res) => setMessagesCount(res.data().count || 0)).catch(() => {});

    return () => { unsubVisit(); unsubOrders(); unsubClients(); unsubNotes(); };
  }, []);

  // When active client changes, subscribe to its thread
  useEffect(() => {
    if (!activeClientId) { setThread([]); return; }
    const q = query(collection(db, 'clients', activeClientId, 'messages'), orderBy('createdAt', 'asc'), limit(200));
    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({ id: d.id, ...(d.data() || {}) }));
      setThread(list);
    });
    return () => unsub();
  }, [activeClientId]);

  // Derived stats
  const uniqueProjects = useMemo(() => new Set(orders.map((o) => o.project)).size, [orders]);
  const revenueTotal = useMemo(() => orders.reduce((s, o) => s + (o.amountRupees || 0), 0), [orders]);

  // Chart: last 12 months revenue
  const chartHeights = useMemo(() => {
    const map = new Map();
    const now = new Date();
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      map.set(key, 0);
    }
    for (const o of orders) {
      const d = o.createdAt || new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (map.has(key)) map.set(key, map.get(key) + (o.amountRupees || 0));
    }
    const vals = Array.from(map.values());
    const max = Math.max(1, ...vals);
    return vals.map((v) => Math.round((v / max) * 100));
  }, [orders]);

  // This month revenue and delta vs prev month
  const monthDelta = useMemo(() => {
    const now = new Date();
    const thisKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const prev = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
    let cur = 0, prv = 0;
    for (const o of orders) {
      const d = o.createdAt || new Date();
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      if (key === thisKey) cur += o.amountRupees || 0;
      if (key === prevKey) prv += o.amountRupees || 0;
    }
    const pct = prv === 0 ? (cur > 0 ? 100 : 0) : ((cur - prv) / prv) * 100;
    return { current: cur, deltaPct: pct };
  }, [orders]);

  const stats = useMemo(() => [
    { label: 'Profile Visit', value: formatNumber(visits), delta: 'live' },
    { label: 'Projects', value: formatNumber(uniqueProjects), delta: '—' },
    { label: 'Clients', value: formatNumber(messagesCount), delta: '—' },
  ], [visits, uniqueProjects, messagesCount]);

  const NavIcon = ({ d }) => (
    <svg className="h-4 w-4 text-white/80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
  );

  const NavItemButton = ({ label, d, active, onClick }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${active ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'}`}>
      <NavIcon d={d} /><span>{label}</span>
    </button>
  );

  const renderStatsCards = () => (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((s, i) => (
        <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
          <div className="text-3xl font-bold">{s.value}</div>
          <div className="mt-1 text-sm text-white/70">{s.label}</div>
          <div className="mt-3 inline-flex items-center gap-1 rounded-full bg-yellow-500/15 px-2 py-0.5 text-[11px] font-medium text-yellow-300 ring-1 ring-yellow-500/30">{s.delta}</div>
        </div>
      ))}
    </div>
  );

  const renderEarningsPanel = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm text-white/70">Earnings</div>
          <div className="mt-1 text-3xl font-semibold">{formatINR(monthDelta.current)} <span className="text-green-400 text-base align-middle">{`${monthDelta.deltaPct >= 0 ? '+' : ''}${monthDelta.deltaPct.toFixed(1)}%`} ↑</span></div>
        </div>
        <div className="text-sm text-white/60">Month</div>
      </div>
      <div className="mt-4 flex h-40 items-end gap-2">
        {chartHeights.map((h, idx) => (
          <div key={idx} className="flex-1 rounded bg-yellow-400/80" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-3 text-white/60 text-xs">Total revenue: {formatINR(revenueTotal)}</div>
    </div>
  );

  // Send message from admin -> selected client's thread in Firestore
  async function sendAdminMessage() {
    const text = (adminText || '').trim();
    if (!text || !activeClientId) return;
    setSendingMsg(true);
    try {
      await addDoc(collection(db, 'clients', activeClientId, 'messages'), {
        from: 'admin',
        name: adminName || 'Admin',
        email: adminEmail || '',
        message: text,
        source: 'admin',
        createdAt: serverTimestamp(),
        page: '/admin',
      });
      await setDoc(doc(db, 'clients', activeClientId), {
        lastActivity: serverTimestamp(),
        lastMessage: text,
      }, { merge: true });
      setAdminText('');
      setSendSuccess(true);
      setTimeout(() => setSendSuccess(false), 1200);
    } catch (e) {
      console.error('Failed to send admin message', e);
      alert('Message send nahi hua. Dubara koshish karein.');
    } finally {
      setSendingMsg(false);
    }
  }

  // New Messages UI: clients list + conversation panel
  const renderMessagesList = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
      <div className="text-sm font-semibold">Conversations</div>
      <div className="mt-3 grid gap-4 md:grid-cols-3">
        {/* Clients list */}
        <div className="md:col-span-1 space-y-2 max-h-[480px] overflow-y-auto">
          {clients.map((c) => (
            <button key={c.id} onClick={() => setActiveClientId(c.id)} className={`w-full text-left rounded-xl p-3 ring-1 ring-white/10 bg-white/5 hover:bg-white/10 ${activeClientId===c.id ? 'outline outline-1 outline-indigo-400/60' : ''}`}>
              <div className="text-sm font-medium truncate">{c.name || 'Guest'}</div>
              <div className="text-xs text-white/60 truncate">{c.email || c.userAgent?.slice(0,40) || '—'}</div>
              <div className="mt-1 text-xs text-white/70 line-clamp-1">{c.lastMessage || ''}</div>
              <div className="mt-1 text-[10px] text-white/50">{c.lastActivity?.toDate ? c.lastActivity.toDate().toLocaleString() : ''}</div>
            </button>
          ))}
          {clients.length === 0 && <div className="text-sm text-white/60">No conversations yet.</div>}
        </div>

        {/* Conversation panel */}
        <div className="md:col-span-2 flex flex-col min-h-[320px]">
          {!activeClientId && (
            <div className="text-white/60 text-sm">Select a conversation from the left to chat.</div>
          )}
          {activeClientId && (
            <>
              <div className="flex-1 space-y-3 max-h-[360px] overflow-y-auto pr-1">
                {thread.map((m) => (
                  <div key={m.id} className={`flex ${m.from === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl p-3 text-sm ${m.from==='admin' ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white'}`}>
                      <div>{m.message}</div>
                      <div className="mt-1 text-[10px] opacity-70">{m.createdAt?.toDate ? m.createdAt.toDate().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : ''}</div>
                    </div>
                  </div>
                ))}
                {thread.length === 0 && <div className="text-white/60 text-sm">No messages in this thread.</div>}
              </div>
              <div className="mt-3 flex gap-2">
                <input
                  className="flex-1 rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Type your reply…"
                  value={adminText}
                  onChange={(e) => setAdminText(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); sendAdminMessage(); } }}
                />
                <button onClick={sendAdminMessage} disabled={sendingMsg || !adminText.trim()} className="rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">{sendingMsg ? 'Sending…' : 'Send'}</button>
              </div>
              {sendSuccess && <div className="text-[12px] text-green-400 mt-1">Reply sent!</div>}
            </>
          )}
        </div>
      </div>
    </div>
  );

  const renderOrdersTable = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between"><div className="font-semibold">Recent Orders</div><div className="text-sm text-white/60">Last {orders.length} records</div></div>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-white/70">
            <tr>
              <th className="py-2 pr-4">No</th>
              <th className="py-2 pr-4">Project</th>
              <th className="py-2 pr-4">Source</th>
              <th className="py-2 pr-4">Amount</th>
              <th className="py-2 pr-4">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {orders.map((o, idx) => (
              <tr key={o.id} className="align-middle">
                <td className="py-3 pr-4">{idx + 1}.</td>
                <td className="py-3 pr-4">{o.project}</td>
                <td className="py-3 pr-4">{o.source}</td>
                <td className="py-3 pr-4">{formatINR(o.amountRupees)}</td>
                <td className="py-3 pr-4">{o.createdAt?.toLocaleDateString?.() || ''}</td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={5} className="py-4 text-center text-white/50">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'statistics') {
      return (
        <div className="space-y-4">
          {renderStatsCards()}
          {renderEarningsPanel()}
        </div>
      );
    }
    if (activeTab === 'earnings') {
      return (
        <div className="space-y-4">
          {renderEarningsPanel()}
          {renderOrdersTable()}
        </div>
      );
    }
    if (activeTab === 'messages') {
      return renderMessagesList();
    }
    // dashboard
    return (
      <>
        {renderStatsCards()}
        <div className="grid gap-4 lg:grid-cols-3 mt-4">
          <div className="lg:col-span-2">{renderEarningsPanel()}</div>
          {renderMessagesList()}
        </div>
        <div className="mt-4">{renderNotificationsPanel()}</div>
        <div className="mt-4">{renderOrdersTable()}</div>
      </>
    );
  };

  // Consent notifications panel
  const renderNotificationsPanel = () => (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <div className="font-semibold">Notifications</div>
        <div className="text-xs text-white/60">Last {notifications.length}</div>
      </div>
      <div className="mt-3 space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {notifications.map((n) => {
          const when = n.createdAtMs ? new Date(n.createdAtMs) : (n.createdAt ? new Date(n.createdAt) : null);
          const timeStr = when ? when.toLocaleString() : '';
          const host = (n.page || '').replace(/^https?:\/\//, '').replace(/\/$/, '');
          return (
            <div key={n.id} className="rounded-xl p-3 bg-white/5 ring-1 ring-white/10">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-medium ${n.decision==='accepted' ? 'bg-green-500/15 text-green-300 ring-1 ring-green-500/30' : 'bg-red-500/15 text-red-300 ring-1 ring-red-500/30'}`}>{n.decision || '-'}</span>
                  <span className="ml-2 text-white/80">{host || '—'}</span>
                </div>
                <div className="text-[11px] text-white/50">{timeStr}</div>
              </div>
              <div className="mt-1 text-[11px] text-white/60">Driver: {n.driver || '—'} • Sent: {String(!!n.sent)}{n.sendError ? ` • Error: ${n.sendError}` : ''}</div>
            </div>
          );
        })}
        {notifications.length === 0 && (
          <div className="text-sm text-white/60">No notifications yet.</div>
        )}
      </div>
    </div>
  );
  return (
    <main className="px-3 md:px-6 py-6">
      <div className="grid gap-4 md:grid-cols-[220px_1fr]">
        {/* Sidebar */}
        <aside className="rounded-2xl border border-white/10 bg-[#1f2026] p-4">
          <div className="mb-4 flex items-center gap-2 text-lg font-semibold"><span className="text-yellow-400">Worklance</span></div>
          <nav className="space-y-1">
            <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive && activeTab==='dashboard' ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'}`} onClick={() => setActiveTab('dashboard')}>
              <NavIcon d="M3 12l2-2 4 4 8-8 2 2-10 10-6-6" /><span>Dashboard</span>
            </NavLink>
            <NavItemButton label="Statistic" d="M4 19V9m6 10V5m6 14v-7" active={activeTab==='statistics'} onClick={() => setActiveTab('statistics')} />
            <NavItemButton label="Earnings" d="M12 8c-4 0-6 3-6 6s2 6 6 6 6-3 6-6-2-6-6-6z" active={activeTab==='earnings'} onClick={() => setActiveTab('earnings')} />
            <NavLink to="/projects" className={({ isActive }) => `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${isActive ? 'bg-white/10 text-white' : 'text-white/80 hover:bg-white/10'}`}>
              <NavIcon d="M3 7h18M3 12h18M3 17h18" /><span>Projects</span>
            </NavLink>
            <NavItemButton label="Messages" d="M21 15a4 4 0 01-4 4H7l-4 4V5a4 4 0 014-4h10a4 4 0 014 4v10z" active={activeTab==='messages'} onClick={() => setActiveTab('messages')} />
          </nav>
          <div className="mt-6 text-xs uppercase text-white/50">Preference</div>
          <nav className="mt-2 space-y-1">
            <NavLink to="/contact" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10">
              <NavIcon d="M18 10c0 3.866-3.582 7-8 7-1.657 0-3.182-.514-4.414-1.377L2 17l1.377-3.586C2.514 12.182 2 10.657 2 9c0-4.418 3.134-8 7-8s9 3.134 9 9z" /><span>Support</span>
            </NavLink>
            <button className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/10">
              <NavIcon d="M12 8a4 4 0 100 8 4 4 0 000-8z M3 12h2m14 0h2M12 3v2m0 14v2" /><span>Setting</span>
            </button>
          </nav>
        </aside>

        {/* Main area */}
        <section className="space-y-4">
          {/* Top bar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <div className="flex items-center gap-3">
              <div className="relative">
                <input className="w-64 rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-yellow-400/70" placeholder="Search" />
              </div>
              <button onClick={logout} className="rounded-full bg-yellow-500 px-3 py-2 text-sm font-medium text-black hover:bg-yellow-400">Logout</button>
            </div>
          </div>

          {renderContent()}
        </section>
      </div>
    </main>
  );
}