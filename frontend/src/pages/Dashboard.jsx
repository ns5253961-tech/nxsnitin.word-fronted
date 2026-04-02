import { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { Navigate, Link } from 'react-router-dom';
import { BookOpen, Bot, Download, PlayCircle } from 'lucide-react';

export default function Dashboard({ session }) {
  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) { setLoading(false); return; }

    supabase
      .from('users')
      .select('isPaid')
      .eq('id', session.user.id)
      .single()
      .then(({ data, error }) => {
        if (error) console.error("Profile Fetch Error:", error.message);
        if (data?.isPaid) setIsPaid(true);
        setLoading(false);
      });
  }, [session]);

  if (!session) return <Navigate to="/login" replace />;
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-darkBg text-neonBlue text-xl animate-pulse">Loading...</div>;

  const displayName = session.user.user_metadata?.full_name || session.user.email;

  return (
    <div className="min-h-screen bg-darkBg pt-8 px-4">
      <div className="max-w-7xl mx-auto">

        <header className="mb-10 flex flex-col md:flex-row justify-between items-center gap-6 glass-panel p-8 rounded-[2.5rem] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-neonBlue/5 blur-3xl rounded-full" />

          <div className="flex flex-col md:flex-row items-center gap-6 z-10">
            {/* DP / Profile Section */}
            <div className="relative group">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-neonBlue/50 transition-all shadow-2xl">
                {session.user.user_metadata?.avatar_url ? (
                  <img
                    src={session.user.user_metadata.avatar_url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-darkSurface to-black flex items-center justify-center text-3xl font-black text-white/20">
                    {displayName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Edit DP Button */}
              <label
                htmlFor="avatar-upload"
                className="absolute -bottom-2 -right-2 bg-neonBlue p-2 rounded-xl cursor-pointer shadow-xl hover:scale-110 active:scale-95 transition-all group-hover:rotate-12"
              >
                <Bot className="w-4 h-4 text-darkBg" />
                <input
                  type="file"
                  id="avatar-upload"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const file = e.target.files[0];
                    if (!file) return;

                    try {
                      setLoading(true);
                      const fileExt = file.name.split('.').pop();
                      const fileName = `${session.user.id}-${Math.random()}.${fileExt}`;
                      const filePath = `avatars/${fileName}`;

                      // 1. Upload to Supabase Storage
                      const { error: uploadError } = await supabase.storage
                        .from('avatars')
                        .upload(filePath, file);

                      if (uploadError) throw uploadError;

                      // 2. Get Public URL
                      const { data: { publicUrl } } = supabase.storage
                        .from('avatars')
                        .getPublicUrl(filePath);

                      // 3. Update User Metadata
                      const { error: updateError } = await supabase.auth.updateUser({
                        data: { avatar_url: publicUrl }
                      });

                      if (updateError) throw updateError;

                      alert("Profile picture updated! 🚀");
                      window.location.reload();
                    } catch (err) {
                      console.error(err);
                      alert("Upload failed: " + err.message);
                    } finally {
                      setLoading(false);
                    }
                  }}
                />
              </label>
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black mb-1 font-outfit uppercase tracking-tighter">Student <span className="gradient-text">Dashboard</span></h1>
              <p className="text-gray-400">Welcome back, <span className="text-neonBlue font-semibold">{displayName}</span> 👋</p>
            </div>
          </div>

          <div className="z-10">
            {isPaid && (
              <div className="bg-neonBlue/10 text-neonBlue border border-neonBlue/40 px-6 py-3 rounded-2xl font-black flex items-center gap-3 text-sm animate-pulse">
                <BookOpen className="w-5 h-5" /> PRO MEMBER
              </div>
            )}
          </div>
        </header>

        {isPaid ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              { day: 'Day 1', title: 'AI Basics + Tools', desc: 'Learn Gemini API and basic prompts.', color: 'neonBlue' },
              { day: 'Day 2', title: 'Build AI App', desc: 'Build a Chatbot and integrate APIs.', color: 'neonPurple' },
              { day: 'Day 3', title: 'Automation + Deploy', desc: 'Deploy automation bot online.', color: 'green-500' },
            ].map((item, i) => (
              <div key={i} className={`glass-panel p-6 border-${item.color}/30 hover:shadow-[0_0_20px_rgba(0,243,255,0.1)] transition-shadow`}>
                <p className={`text-xs font-bold text-${item.color} mb-2`}>{item.day}</p>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <PlayCircle className={`text-${item.color} w-5 h-5`} /> {item.title}
                </h2>
                <p className="text-gray-400 mb-6 text-sm">{item.desc}</p>
                <button className="btn-secondary w-full hover:bg-white/10 transition-colors text-sm">Watch Video</button>
              </div>
            ))}

            <div className="glass-panel p-6 col-span-1 md:col-span-2 xl:col-span-3 border-yellow-500/30">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Bot className="text-yellow-400 w-6 h-6" /> AI Tools Sandbox
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['AI Chatbot Builder', 'Image Generator'].map((tool, i) => (
                  <Link key={i} to="/ai-tools" className="bg-darkSurface/50 p-5 rounded-lg border border-white/10 hover:border-yellow-400/50 transition-colors block">
                    <h3 className="font-bold mb-2">{tool}</h3>
                    <p className="text-gray-400 text-sm">Click to open →</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="glass-panel p-6 col-span-1 md:col-span-2 xl:col-span-3">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Download /> Resources</h2>
              <div className="bg-darkSurface p-4 rounded-lg flex justify-between items-center hover:bg-white/5">
                <span className="text-sm">Source Code (Day 1-3)</span>
                <button className="text-neonBlue hover:underline text-sm font-bold">Download.zip</button>
              </div>
            </div>
          </div>
        ) : (
          <div className="glass-panel max-w-3xl mx-auto p-12 text-center">
            <div className="text-6xl mb-6">🔒</div>
            <h2 className="text-3xl font-bold mb-4">Unlock Your Dashboard</h2>
            <p className="text-gray-400 mb-8">Join the <span className="text-neonBlue font-bold">3 Day AI Workshop</span> for just ₹99 to unlock all courses, AI tools & resources!</p>
            <Link to="/workshop" className="btn-primary inline-flex gap-2 font-bold px-8 py-4">🚀 Join Workshop (₹99)</Link>
          </div>
        )}
      </div>
    </div>
  );
}
