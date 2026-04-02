import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, FileText, ImageIcon, Mic, Zap, Send, Loader2, Copy, Check, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const TOOLS = [
  { id: 'chat', icon: <Bot className="w-6 h-6" />, name: 'AI Chatbot', desc: 'Koi bhi sawaal pucho', systemPrompt: 'You are a helpful AI assistant. Answer in simple Hinglish.', placeholder: 'Kuch bhi pucho... e.g. "Python kya h?"' },
  { id: 'image-gen', icon: <ImageIcon className="w-6 h-6" />, name: 'Image Generator', desc: 'DALL-E 3 Image Generation', stylePrefix: 'Hyper-realistic, 4k, cinematic:', placeholder: 'Image describe karo... e.g. "A futuristic robot in a desert"' },
  { id: 'resume', icon: <FileText className="w-6 h-6" />, name: 'Resume Generator', desc: 'Professional resume banao', systemPrompt: 'You are a professional resume writer.', placeholder: 'Apne baare mein batao...' },
  { id: 'voice', icon: <Mic className="w-6 h-6" />, name: 'Voice Script', desc: 'Video/Reel ke liye script', systemPrompt: 'You are a script writer.', placeholder: 'Topic batao...' },
  { id: 'auto', icon: <Zap className="w-6 h-6" />, name: 'Automation Ideas', desc: 'Business automation ideas', systemPrompt: 'You are an automation expert.', placeholder: 'Business/task batao...' },
];

export default function AITools({ session }) {
  const [activeTool, setActiveTool] = useState(TOOLS[0]);
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    setGeneratedImageUrl('');

    try {
      const endpoint = activeTool.id === 'image-gen' ? '/generate-image-pixverse' : '/ai-chat';
      const payload = activeTool.id === 'image-gen'
        ? { prompt: `${activeTool.stylePrefix} ${prompt}` }
        : { prompt, systemPrompt: activeTool.systemPrompt };

      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Server Error (${res.status}): ${errorText.substring(0, 50)}...`);
      }

      const data = await res.json();

      if (activeTool.id === 'image-gen') {
        if (data.imageUrl) setGeneratedImageUrl(data.imageUrl);
        else throw new Error(data.error || "Image generation failed");
      } else {
        setResponse(data.response || "No response received");
      }
    } catch (error) {
      setResponse("❌ Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-darkBg px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            AI <span className="gradient-text">Tools by Nitin </span>
          </h1>
          <p className="text-gray-400 text-lg">Premium AI tools powered by NVIDIA & OpenAI 🤖</p>
        </div>

        {!session ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-panel max-w-2xl mx-auto p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Unlock AI Power 🔓</h2>
            <p className="text-gray-400 mb-8 text-lg">AI Tools use karne ke liye pehle Join karein.</p>
            <div className="flex justify-center gap-4">
              <Link to="/register" className="btn-primary px-10 py-4 font-bold">🚀 Join Nxs.world</Link>
              <Link to="/login" className="btn-secondary px-10 py-4 font-bold">Login</Link>
            </div>
          </motion.div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 justify-center mb-10">
              {TOOLS.map((tool) => (
                <button
                  key={tool.id}
                  onClick={() => { setActiveTool(tool); setResponse(''); setPrompt(''); setGeneratedImageUrl(''); }}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all border ${activeTool.id === tool.id ? 'bg-neonBlue/20 border-neonBlue text-white shadow-[0_0_15px_rgba(0,243,255,0.3)]' : 'bg-darkSurface border-white/10 text-gray-400 hover:text-white'}`}
                >
                  {tool.icon} {tool.name}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass-panel p-6">
                <h2 className="text-xl font-bold mb-2 flex items-center gap-2">{activeTool.icon} {activeTool.name}</h2>
                <p className="text-gray-400 text-sm mb-6">{activeTool.desc}</p>
                <form onSubmit={handleSubmit}>
                  <div className="relative">
                    <textarea
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      rows={8}
                      placeholder={activeTool.placeholder}
                      className="w-full bg-darkBg border border-white/20 rounded-2xl px-4 py-4 text-white focus:border-neonBlue transition-all outline-none resize-none pr-14"
                      required
                    />

                    {/* Voice Button */}
                    <button
                      type="button"
                      onClick={() => {
                        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
                        if (!SpeechRecognition) {
                          alert("Your browser does not support Speech Recognition. Try Chrome!");
                          return;
                        }

                        const recognition = new SpeechRecognition();
                        recognition.lang = 'hi-IN'; // Supporting Hindi/Hinglish
                        recognition.continuous = false;
                        recognition.interimResults = false;

                        recognition.onstart = () => {
                          setResponse("🎤 Listening... Speak now!");
                        };

                        recognition.onresult = (event) => {
                          const transcript = event.results[0][0].transcript;
                          setPrompt((prev) => prev + (prev ? " " : "") + transcript);
                          setResponse("");
                        };

                        recognition.onerror = (event) => {
                          console.error(event.error);
                          setResponse("❌ Voice Error: " + event.error);
                        };

                        recognition.start();
                      }}
                      className="absolute bottom-4 right-4 p-3 rounded-xl bg-neonBlue/10 border border-neonBlue/30 text-neonBlue hover:bg-neonBlue hover:text-darkBg transition-all shadow-lg active:scale-95 group"
                      title="Voice to Text"
                    >
                      <Mic className="w-5 h-5 group-active:animate-bounce" />
                    </button>
                  </div>

                  <button type="submit" disabled={loading} className="mt-4 w-full btn-primary py-4 font-bold rounded-2xl flex items-center justify-center gap-2">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Working...</> : <><Send className="w-5 h-5" /> Generate Output</>}
                  </button>
                </form>
              </div>

              <div className="glass-panel p-6 flex flex-col min-h-[450px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">AI Output ✨</h2>
                  {(response || generatedImageUrl) && (
                    <div className="flex gap-2">
                      {generatedImageUrl ? (
                        <a href={generatedImageUrl} target="_blank" rel="noreferrer" className="bg-neonBlue/20 text-neonBlue px-3 py-1.5 rounded-lg text-sm border border-neonBlue/30 flex items-center gap-2"><Download className="w-4 h-4" /> Download</a>
                      ) : (
                        <button onClick={handleCopy} className="bg-white/10 px-3 py-1.5 rounded-lg text-sm flex items-center gap-2">{copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />} Copy</button>
                      )}
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-darkBg rounded-lg p-4 border border-white/10 flex items-center justify-center overflow-auto min-h-[300px]">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <div className="flex flex-col items-center gap-2"><Loader2 className="w-8 h-8 text-neonBlue animate-spin" /><p className="text-xs text-gray-500">Processing...</p></div>
                    ) : generatedImageUrl ? (
                      <img src={generatedImageUrl} className="max-w-full max-h-full rounded-lg" alt="AI" />
                    ) : (
                      <p className="text-gray-200 text-sm whitespace-pre-wrap">{response || "Type something to generate output..."}</p>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}