import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { Bot, LogOut, User, Wrench, BookOpen } from 'lucide-react';

export default function Navbar({ session }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="w-full bg-darkBg border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Bot className="w-8 h-8 text-neonBlue" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neonBlue to-neonPurple">
              Nxsnitin.world
            </span>
          </Link>

          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors text-sm">Home</Link>
            <Link to="/learn" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
              <BookOpen className="w-4 h-4" /> Learn AI
            </Link>
            <Link to="/ai-tools" className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-1">
              <Wrench className="w-4 h-4" /> AI Tools
            </Link>
            <Link to="/workshop" className="text-gray-300 hover:text-white transition-colors text-sm">Workshop</Link>

            {session ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white flex items-center gap-1 text-sm">
                  <User className="w-4 h-4" /> Dashboard
                </Link>
                <button onClick={handleLogout}
                  className="bg-red-500/10 text-red-400 hover:bg-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors text-sm">
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/register" className="btn-secondary py-2 px-4 text-sm">Sign Up Free</Link>
                <Link to="/login" className="btn-primary py-2 px-5 text-sm">Login</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
