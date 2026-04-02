import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Zap, Bot, Code2, Cpu, ArrowRight } from 'lucide-react';

const CURRICULUM = [
  {
    day: 'Day 1', color: 'neonBlue',
    title: 'AI Basics + Gemini API',
    topics: ['AI kya hota hai?', 'Gemini API setup', 'Prompt Engineering', 'First AI App banana'],
  },
  {
    day: 'Day 2', color: 'neonPurple',
    title: 'Build AI Chatbot + Image AI',
    topics: ['React me AI integrate karna', 'Chatbot banana', 'Image Generation API', 'UI Design for AI Apps'],
  },
  {
    day: 'Day 3', color: 'green-400',
    title: 'Automation + Deployment',
    topics: ['n8n / Zapier automation', 'Backend API banana', 'Vercel pe deploy karna', 'SaaS business model'],
  },
];

const RESOURCES = [
  { icon: <Bot className="w-8 h-8 text-neonBlue" />, title: 'Gemini AI', desc: 'Google ka powerful AI model', link: 'https://ai.google.dev' },
  { icon: <Code2 className="w-8 h-8 text-neonPurple" />, title: 'Supabase', desc: 'Free database + auth', link: 'https://supabase.com' },
  { icon: <Zap className="w-8 h-8 text-yellow-400" />, title: 'Razorpay', desc: 'Indian payment gateway', link: 'https://razorpay.com' },
  { icon: <Cpu className="w-8 h-8 text-green-400" />, title: 'Vercel', desc: 'Free hosting platform', link: 'https://vercel.com' },
];

export default function LearnAI() {
  return (
    <div className="min-h-screen bg-darkBg px-4 py-12">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-neonBlue/5 rounded-3xl blur-3xl -z-10" />
          <div className="inline-flex items-center gap-2 bg-neonBlue/10 border border-neonBlue/30 text-neonBlue px-4 py-2 rounded-full text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" /> Learn AI by Building
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
            Learn <span className="gradient-text">AI</span> the Right Way
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Theory nahi — real projects banao. 3 din me AI developer ban jao.
          </p>
          <Link to="/workshop" className="btn-primary inline-flex gap-2 px-8 py-4 text-lg">
            🚀 Join Workshop ₹99 <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        {/* 3 Day Curriculum */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">3 Din ka <span className="gradient-text">Curriculum</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CURRICULUM.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-panel p-6"
              >
                <div className={`text-xs font-bold text-${item.color} mb-2 uppercase tracking-wider`}>{item.day}</div>
                <h3 className="text-lg font-bold mb-4">{item.title}</h3>
                <ul className="space-y-2">
                  {item.topics.map((t, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                      <span className={`text-${item.color} font-bold mt-0.5`}>✓</span> {t}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tools You'll Learn */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10">Tools Jo <span className="gradient-text">Sikhoge</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {RESOURCES.map((res, i) => (
              <motion.a
                key={i}
                href={res.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-panel p-6 text-center hover:border-white/30 transition-all hover:scale-105 block"
              >
                <div className="flex justify-center mb-3">{res.icon}</div>
                <h3 className="font-bold mb-1">{res.title}</h3>
                <p className="text-gray-500 text-xs">{res.desc}</p>
              </motion.a>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="glass-panel p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-neonBlue/10 to-neonPurple/10 -z-10" />
          <h2 className="text-4xl font-extrabold mb-4">Ready to Build? 🔥</h2>
          <p className="text-gray-400 mb-8 text-lg">Sirf ₹99 mein 3 din ka AI crash course. Real projects. Real skills.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/workshop" className="btn-primary px-8 py-4 text-lg">🚀 Join Workshop ₹99</Link>
            <Link to="/ai-tools" className="btn-secondary px-8 py-4 text-lg">Try AI Tools Free</Link>
          </div>
        </div>

      </div>
    </div>
  );
}
