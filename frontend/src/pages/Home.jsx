import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Cpu, Zap, Code, X, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-neonBlue/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute top-1/2 left-1/2 translate-x-10 -translate-y-10 w-[600px] h-[600px] bg-neonPurple/10 rounded-full blur-[100px] -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-2 rounded-full glass-panel text-sm font-medium text-neonBlue mb-6 border-neonBlue/30 shadow-[0_0_10px_rgba(0,243,255,0.2)]">
            🔥 India's Fastest AI Learning Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
            Build AI Tools in <br />
            <span className="gradient-text">Minutes, Not Months</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Learn to create real AI apps using Gemini, APIs & automation tools in just 3 days.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/workshop" className="btn-primary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto overflow-hidden relative group">
              <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-10"></span>
              <span className="relative flex items-center gap-2 text-white">
                🚀 Join Workshop (₹99)
              </span>
            </Link>
            <button
              onClick={() => setIsVideoOpen(true)}
              className="btn-secondary flex items-center gap-2 text-lg px-8 py-4 w-full sm:w-auto hover:bg-white/5 transition-all"
            >
              <Play className="w-5 h-5 text-neonPurple" /> Watch Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* AI Automation Video Modal Overlay */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: 50 }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden glass-panel border-white/20 shadow-[0_0_80px_rgba(183,33,255,0.4)]"
            >
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-6 right-6 z-20 p-3 bg-neonPurple/20 hover:bg-neonPurple/40 rounded-full text-white backdrop-blur-lg border border-white/10 transition-all hover:rotate-90 group"
              >
                <X className="w-6 h-6 group-hover:text-neonBlue" />
              </button>

              <div className="absolute inset-0 bg-gradient-to-tr from-neonPurple/5 to-transparent pointer-events-none z-10" />

              <iframe
                src="https://www.youtube.com/embed/attBmKBO9JM?si=eA8W04cWx-ZyLViR1"
                title="AI Automation Demo Video"
                className="w-full h-full border-none relative z-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>

              {/* Progress bar simulation for aesthetic */}
              <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-neonBlue to-neonPurple z-20 w-full shadow-[0_0_10px_#b721ff]" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Section */}
      <section className="w-full py-24 px-4 bg-darkSurface/20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black mb-6 font-outfit uppercase tracking-tighter">
              Build the <span className="gradient-text">Future of AI</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Nxsnitin.world par aap sirf seekhte nahi, balki live projects banate hain AI aur Automation ki power se. 🚀
            </p>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Bot className="w-8 h-8 text-neonBlue" />,
                title: "AI Tool Builder",
                desc: "Build professional chatbots, custom AI assistants and advanced pixel-perfect image generators for any business use. 🤖"
              },
              {
                icon: <Code className="w-8 h-8 text-neonPurple" />,
                title: "API Integration",
                desc: "Learn to connect high-performance Gemini 2.0 and OpenAI APIs easily within your own custom apps and websites. ⚡"
              },
              {
                icon: <Zap className="w-8 h-8 text-yellow-400" />,
                title: "AI Automation",
                desc: "Create powerful automated workflows that save 100+ hours every month, handling repetitive tasks effortlessly. ⏳"
              },
              {
                icon: <Cpu className="w-8 h-8 text-green-400" />,
                title: "Real Projects",
                desc: "Hands-on implementation of AI projects specifically designed to make your portfolio stand out for nxs.world 🚀"
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={item}
                className="glass-panel p-10 hover:border-white/30 transition-all duration-500 group rounded-[2.5rem] relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-[40px] group-hover:bg-white/10 transition-all" />
                <div className="bg-darkBg w-16 h-16 rounded-2xl flex items-center justify-center mb-8 shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 font-outfit group-hover:text-white transition-colors">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
                <div className="mt-6 w-10 h-1 bg-gradient-to-r from-neonBlue to-neonPurple rounded-full group-hover:w-full transition-all duration-500" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section className="w-full py-24 px-4 bg-darkBg relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 font-outfit uppercase tracking-tight">
              Tools <span className="text-neonBlue">Jo Sikhoge</span> 🛠️
            </h2>
            <p className="text-gray-400">Workshop mein hum ye saari industry-standard technologies use karenge.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Gemini AI",
                desc: "Google ka powerful AI model",
                color: "from-blue-600 to-cyan-400"
              },
              {
                name: "Supabase",
                desc: "Free database + auth",
                color: "from-emerald-500 to-green-400"
              },
              {
                name: "Razorpay",
                desc: "Indian payment gateway",
                color: "from-blue-500 to-blue-700"
              },
              {
                name: "Vercel",
                desc: "Free hosting platform",
                color: "from-gray-700 to-black"
              }
            ].map((tool, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="glass-panel p-8 rounded-[2rem] border-white/5 hover:border-white/20 transition-all group relative"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${tool.color} rounded-t-full`} />
                <h3 className="text-2xl font-black mb-2">{tool.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{tool.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer className="w-full py-12 px-4 border-t border-white/5 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 gradient-text">Need Help? Let's Connect!</h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-8">
            <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-full border-neonBlue/30 transition-all">
              <Zap className="w-5 h-5 text-neonBlue" />
              <span className="text-gray-200">Support: 24 hour <span className="font-bold">+91 9174608543</span></span>
            </div>
            <div className="flex items-center gap-3 glass-panel px-6 py-3 rounded-full border-neonPurple/30 transition-all">
              <Bot className="w-5 h-5 text-neonPurple" />
              <span className="text-gray-200">Founder: <span className="font-bold">Nitin sir</span></span>
            </div>
          </div>
          <p className="text-gray-600 text-sm">© 2026 Nxs.world by Nitin. All Rights Reserved.</p>
        </div>
      </footer>

      {/* Floating Support Badge (No link) */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-8 right-8 z-[200] bg-[#25D366] p-4 rounded-full shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center group"
      >
        <div className="absolute -top-2 -left-2 w-4 h-4 bg-red-500 rounded-full animate-ping" />
        <svg viewBox="0 0 24 24" className="w-8 h-8 text-white fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        <span className="absolute right-full mr-4 bg-white text-darkBg px-3 py-1.5 rounded-lg text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-xl">
          Nitin sir se baat karein: +91 9174608543
        </span>
      </motion.div>
    </div>
  );
}
