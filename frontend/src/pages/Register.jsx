import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { alert('❌ Passwords do not match!'); return; }
    if (password.length < 6) { alert('❌ Password must be at least 6 characters!'); return; }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } }
      });
      if (error) throw error;

      if (data.user && !data.session) {
        alert('📧 Pre-registration successful! Please check your email and confirm your account before logging in.');
        navigate('/login');
      } else if (data.session) {
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.message.includes('Signups are disabled')) {
        alert('❌ Supabase Error: Signups are disabled in your dashboard. \n\nGo to Supabase -> Auth -> Providers -> Email -> Check "Allow new users to sign up"');
      } else {
        alert('❌ ' + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-darkBg px-4">
      <div className="glass-panel w-full max-w-md p-8 shadow-[0_0_40px_rgba(183,33,255,0.15)] relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-neonPurple/20 rounded-full blur-[50px] -z-10" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-neonBlue/20 rounded-full blur-[40px] -z-10" />

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-neonPurple/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-neonPurple/40">
            <UserPlus className="w-8 h-8 text-neonPurple" />
          </div>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-gray-400 mt-2">Join Nxs.world – India's #1 AI Platform 🚀</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Your Full Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nitin singh"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonPurple transition-colors" required />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonPurple transition-colors" required />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min 6 characters"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonPurple transition-colors" required />
          </div>
          <div>
            <label className="block text-gray-400 mb-2 text-sm">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Re-enter password"
              className="w-full bg-darkBg border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-neonPurple transition-colors" required />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 font-bold text-white rounded-lg bg-gradient-to-r from-neonPurple to-neonBlue hover:opacity-90 transition-all transform hover:scale-105 disabled:opacity-50">
            {loading ? '🔄 Creating Account...' : '🚀 Create Free Account'}
          </button>
        </form>

        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-white/10"></div>
          <span className="px-4 text-gray-500 text-sm">Already have account?</span>
          <div className="flex-1 border-t border-white/10"></div>
        </div>

        <Link to="/login" className="block w-full text-center py-3 border border-white/20 rounded-lg text-gray-300 hover:bg-white/5 transition-all font-medium">
          Login Instead
        </Link>
      </div>
    </div>
  );
}
