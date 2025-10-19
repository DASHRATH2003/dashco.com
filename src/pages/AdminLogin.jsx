import { useState } from 'react';
import { useNavigate, NavLink } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
import { fetchSignInMethodsForEmail, sendPasswordResetEmail } from 'firebase/auth';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const fillAdmin = () => setForm({ email: ADMIN_EMAIL, password: ADMIN_PASS });
  const ADMIN_EMAIL = 'dashrathkumardbg2003@gmail.com';
  const ADMIN_PASS = 'admindashrath@123';

  const friendly = (c, fallback) => {
    switch (c) {
      case 'auth/configuration-not-found':
        return 'Firebase Auth me Email/Password provider enable karein (Authentication → Sign-in method).';
      case 'auth/unauthorized-domain':
        return 'Firebase Auth → Settings me Authorized domains me localhost add karein.';
      case 'auth/invalid-api-key':
        return 'Firebase config keys sahi karein (.env ya firebase.js).';
      case 'auth/invalid-credential':
        return 'Credential invalid ya expired. Sahi password use karein ya correct provider se login karein.';
      case 'auth/wrong-password':
        return 'Galat password. Please check.';
      case 'auth/user-disabled':
        return 'Account disabled hai. Console me enable karein ya admin se baat karein.';
      case 'auth/too-many-requests':
        return 'Bahut zyada attempts. Thoda wait karke try karein.';
      default:
        return fallback || 'Login failed.';
    }
  };

  const resetPassword = async () => {
    if (!form.email) {
      setError('Reset ke liye pehle email enter karein.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await sendPasswordResetEmail(auth, form.email);
      setError('Password reset email bhej diya. Inbox check karein.');
    } catch (err) {
      setError(friendly(err?.code, err?.message));
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password);
      navigate('/admin', { replace: true });
    } catch (err) {
      const code = err?.code;
      let message = friendly(code, err?.message);

      if ((code === 'auth/invalid-credential' || code === 'auth/wrong-password') && form.email) {
        try {
          const methods = await fetchSignInMethodsForEmail(auth, form.email);
          if (!methods.includes('password')) {
            message = 'Is email par password sign-in enabled nahi hai. Sahi provider (e.g. Google) se login karein ya email ko password provider se link karein.';
          } else {
            message = 'Password galat hai. “Forgot password” se reset link bhej sakte hain.';
          }
        } catch {}
      }

      if (code === 'auth/user-not-found' && form.email === ADMIN_EMAIL) {
        try {
          await createUserWithEmailAndPassword(auth, form.email, form.password);
          navigate('/admin', { replace: true });
          return;
        } catch (signupErr) {
          setError(friendly(signupErr?.code, signupErr?.message));
        }
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-md px-4 sm:px-6 lg:px-8 py-16">
      <Reveal direction="up">
        <div className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-6">
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Admin</div>
          <h1 className="mt-2 text-2xl md:text-3xl font-bold text-white">Login</h1>
          <p className="mt-2 text-white/70">Secure area ke liye login karein. Firebase Auth email/password use hota hai.</p>

          <form className="mt-6 space-y-4" onSubmit={submit}>
            <div>
              <label className="block text-sm text-white/80">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={update}
                className="mt-1 w-full rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-white/80">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={update}
                className="mt-1 w-full rounded-lg bg-black/20 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <div className="text-sm text-pink-300">{error}</div>}
            <button type="submit" disabled={loading} className="w-full rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">{loading ? 'Logging in…' : 'Login'}</button>
           </form>
           <button type="button" onClick={resetPassword} className="mt-2 w-full rounded-full bg-white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15 hover:bg-white/15">
             Forgot password? Send reset email
           </button>
           {import.meta.env.DEV && (
             <button type="button" onClick={fillAdmin} className="mt-2 w-full rounded-full bg:white/10 px-4 py-2 text-sm text-white ring-1 ring-white/15 hover:bg-white/15">
               Fill admin credentials
             </button>
           )}

          <div className="mt-4 text-sm text-white/60">
            <NavLink to="/" className="text-white/80 hover:text-white">← Back to site</NavLink>
          </div>
        </div>
      </Reveal>
    </main>
  );
}