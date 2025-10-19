import { useEffect, useMemo, useRef, useState } from 'react';
import { addDoc, collection, serverTimestamp, doc, setDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase.js';

function getOrCreateClientId() {
  try {
    let id = localStorage.getItem('client_id');
    if (!id) {
      id = 'cid_' + Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6);
      localStorage.setItem('client_id', id);
    }
    return id;
  } catch {
    return 'cid_' + Date.now().toString(36);
  }
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [showNudge, setShowNudge] = useState(false);
  const [name, setName] = useState(localStorage.getItem('chat_name') || '');
  const [email, setEmail] = useState(localStorage.getItem('chat_email') || '');
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [thread, setThread] = useState([]);
  const listRef = useRef(null);

  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : 'server';
  const clientId = useMemo(() => getOrCreateClientId(), []);

  const nowTime = useMemo(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), []);

  // Realtime subscription to this client's messages
  useEffect(() => {
    if (!clientId) return;
    const ref = collection(db, 'clients', clientId, 'messages');
    const q = query(ref, orderBy('createdAt', 'asc'));
    const unsub = onSnapshot(q, (snap) => {
      const items = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setThread(items);
    });
    return () => unsub();
  }, [clientId]);

  // Auto-suggest: show nudge bubble, then optional auto-open once per session
  useEffect(() => {
    let t1, t2;
    const nudgeShown = sessionStorage.getItem('chat_nudge_shown') === '1';
    if (!open && !nudgeShown) {
      t1 = setTimeout(() => {
        if (!open) {
          setShowNudge(true);
          sessionStorage.setItem('chat_nudge_shown', '1');
        }
      }, 3000); // show nudge after 3s
    }

    const autoOpened = sessionStorage.getItem('chat_auto_opened') === '1';
    if (!open && !autoOpened) {
      t2 = setTimeout(() => {
        if (!open) {
          setOpen(true);
          setShowNudge(false);
          sessionStorage.setItem('chat_auto_opened', '1');
        }
      }, 12000); // auto-open after 12s if no interaction
    }

    return () => {
      if (t1) clearTimeout(t1);
      if (t2) clearTimeout(t2);
    };
  }, [open]);

  // Keep scrolled to latest message
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [thread, open]);

  async function ensureClientDoc() {
    try {
      await setDoc(
        doc(db, 'clients', clientId),
        {
          userAgent: ua,
          name: name || 'Guest',
          email: email || '',
          createdAt: serverTimestamp(),
          lastActivity: serverTimestamp(),
          lastMessage: thread[thread.length - 1]?.message || 'Hello! How can I help you today? 👋',
          status: 'online',
        },
        { merge: true }
      );
    } catch (e) {
      console.error('ensure client failed', e);
    }
  }

  async function sendMessage(overrideText) {
    const text = (overrideText ?? msg).trim();
    if (!text) return;
    setSending(true);
    try {
      if (name) localStorage.setItem('chat_name', name);
      if (email) localStorage.setItem('chat_email', email);

      await ensureClientDoc();

      const payload = {
        from: 'user',
        name: name || 'Guest',
        email: email || '',
        message: text,
        source: 'chat',
        createdAt: serverTimestamp(),
        page: typeof window !== 'undefined' ? window.location.pathname : '/',
        userAgent: ua,
      };
      await addDoc(collection(db, 'clients', clientId, 'messages'), payload);

      // update conversation summary
      await setDoc(
        doc(db, 'clients', clientId),
        {
          lastActivity: serverTimestamp(),
          lastMessage: text,
          name: name || 'Guest',
          email: email || '',
        },
        { merge: true }
      );

      setMsg('');
      setSent(true);
      setTimeout(() => setSent(false), 1500);
    } catch (e) {
      console.error('chat send failed', e);
      alert('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  }

  function onKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  const suggestions = [
    'Hi! I need help.',
    'Can I get a quote?',
    'I want to talk to an expert.',
  ];

  function handleOpen() {
    setOpen(true);
    setShowNudge(false);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Nudge bubble (when closed) */}
      {!open && showNudge && (
        <div className="absolute -top-2 right-20 select-none">
          <button
            onClick={handleOpen}
            className="rounded-2xl bg-white/95 text-gray-900 shadow-lg px-3 py-2 text-sm hover:bg-white"
          >
            Need help? Chat with us
          </button>
        </div>
      )}

      {/* Floating Button */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open chat"
          className="rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white/30 h-14 w-14 flex items-center justify-center"
        >
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H8l-4 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/></svg>
        </button>
      )}

      {/* Chat Panel */}
      {open && (
        <div className="w-[340px] max-w-[90vw] rounded-2xl border border-white/15 bg-[#0f1020]/95 backdrop-blur ring-1 ring-white/10 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-indigo-700/90 to-fuchsia-700/90 px-4 py-3">
            <div className="flex items-center gap-2 text-white">
              <span className="relative inline-flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <div className="font-semibold">Online</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/90 hover:text-white" aria-label="Close chat">
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>

          {/* Messages List */}
          <div ref={listRef} className="max-h-72 overflow-y-auto px-4 py-3 space-y-3">
            <div className="flex items-start gap-2">
              <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-500/80" />
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/10 text-sm text-white/90">
                Hello! How can I help you today? 👋
                <div className="mt-1 text-[10px] text-white/60">{nowTime}</div>
              </div>
            </div>
            {thread.map((m) => {
              const isMe = m.from === 'user';
              const t = m.createdAt?.toDate ? m.createdAt.toDate() : new Date();
              return (
                <div key={m.id} className={`flex items-start gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  {!isMe && <div className="h-8 w-8 shrink-0 rounded-full bg-fuchsia-500/80" />}
                  <div className={`${isMe ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white/90'} rounded-2xl p-3 text-sm shadow ring-1 ring-white/10 max-w-[80%]`}>
                    {m.message}
                    <div className="mt-1 text-[10px] text-white/70">{t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                  </div>
                  {isMe && <div className="h-8 w-8 shrink-0 rounded-full bg-indigo-500/80" />}
                </div>
              );
            })}
          </div>

          {/* Quick suggestions */}
          {thread.length === 0 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/90 hover:bg-white/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Inputs */}
          <div className="px-4 pb-4 space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Your name (optional)"
                className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/60"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email (optional)"
                className="flex-1 rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/60"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <textarea
                rows={1}
                placeholder="Type your message..."
                className="min-h-[44px] max-h-24 flex-1 resize-y rounded-xl bg-white/10 px-3 py-2 text-sm text-white placeholder-white/60 outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-indigo-500/60"
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                onKeyDown={onKeyDown}
              />
              <button
                onClick={() => sendMessage()}
                disabled={sending || !msg.trim()}
                aria-label="Send message"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {sending ? (
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" opacity="0.25"/><path d="M4 12a8 8 0 0 1 8-8" stroke="currentColor" strokeWidth="4"/></svg>
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M21.5 12 3 20l2.5-6.5L16 12 5.5 10.5 3 4l18.5 8Z"/></svg>
                )}
              </button>
            </div>
            {sent && <div className="text-[12px] text-green-400">Message sent!</div>}
          </div>
        </div>
      )}
    </div>
  );
}