import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LogIn } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const redirectPath = location.state?.redirectTo || '/dashboard';
      navigate(redirectPath);
    } catch (error) {
      alert('❌ ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div className="glass-panel w-full max-w-md p-8 shadow-[0_0_40px_rgba(0,243,255,0.1)] relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-neonBlue/20 rounded-full blur-[40px] -z-10" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neonBlue/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-neonBlue/40">
            <LogIn className="w-8 h-8 text-neonBlue" />
          </div>
          <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
          <p className="text-gray-400 mt-2">Login to your Nxsnitin.world account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonBlue transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonBlue transition-colors"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-neonBlue to-neonPurple hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50"
          >
            {loading ? '🔄 Logging in...' : '🔐 Login to Dashboard'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-4 text-gray-500 text-sm">New here?</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <Link to="/register" className="block w-full text-center py-3 border border-neonPurple/40 rounded-lg text-neonPurple hover:bg-neonPurple/10 transition-all font-medium">
          🚀 Create Free Account
        </Link>
      </div>
    </div>
  );
}
