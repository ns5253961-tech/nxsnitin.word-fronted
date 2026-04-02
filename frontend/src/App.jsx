import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from './supabaseClient';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Workshop from './pages/Workshop';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import AITools from './pages/AITools';
import LearnAI from './pages/LearnAI';

function App() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const minLoadingTime = new Promise(resolve => setTimeout(resolve, 2500)); // Minimum 2.5s loading for premium feel

    const getSession = supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    Promise.all([getSession, minLoadingTime]).then(() => {
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) return (
    <div className="min-h-screen bg-darkBg flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative group"
      >
        {/* Glow behind the logo */}
        <div className="absolute -inset-4 bg-gradient-to-r from-neonBlue to-neonPurple rounded-3xl blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-1000 animate-pulse" />

        {/* The Logo Image */}
        <img
          src=""
          alt=""
          className="w-48 md:w-64 rounded-2xl relative z-10 shadow-2xl border border-white/5"
        />
      </motion.div>

      <div className="mt-12 flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-white text-xl font-bold tracking-[0.3em] uppercase mb-4 font-outfit"
        >
          Loading <span className="text-neonBlue">Nxsnitin.world</span>
        </motion.h2>

        {/* Progress Bar Simulation (Slowed) */}
        <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-neonBlue to-transparent"
          />
        </div>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar session={session} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/workshop" element={<Workshop />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard session={session} />} />
            <Route path="/ai-tools" element={<AITools session={session} />} />
            <Route path="/learn" element={<LearnAI />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
