import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { motion } from 'framer-motion';
import { Clock, Shield, CheckCircle } from 'lucide-react';

export default function Workshop() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      // 1. Check if user is logged in
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        alert("Please login first to join the workshop!");
        navigate('/login', { state: { redirectTo: '/workshop' } });
        return;
      }

      // 2. Fetch order from backend
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
      
      const res = await fetch(`${apiUrl}/create-order`, {
        method: 'POST',
      });
      const order = await res.json();

      // 3. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_YourTestKeyHere",
        amount: order.amount,
        currency: "INR",
        name: "Nxsworld by Nitin",
        description: "3 Day AI Workshop",
        image: "https://your-logo-url.png",
        order_id: order.id,
        handler: async function (response) {
          // 4. Verify payment on backend
          const verifyRes = await fetch(`${apiUrl}/verify-payment`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              user_id: session.user.id
            }),
          });

          const verifyData = await verifyRes.json();
          if (verifyData.success) {
            navigate('/dashboard');
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: session.user.email?.split('@')[0],
          email: session.user.email,
        },
        theme: {
          color: "#00f3ff"
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on('payment.failed', function (response) {
        alert("Payment Failed - " + response.error.description);
      });
      rzp1.open();

    } catch (error) {
      console.error(error);
      alert("Something went wrong initializing payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 bg-darkBg">
      <div className="max-w-4xl mx-auto text-center mb-16">
        <h1 className="text-5xl font-bold mb-6">3 Day AI Workshop</h1>
        <p className="text-xl text-gray-400">Master AI & Automation to build your own SaaS tools and Chatbots.</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8"
        >
          <h2 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">What You'll Learn 📅</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-neonBlue font-bold text-lg mb-2">Day 1: AI Basics + Tools</h3>
              <p className="text-gray-400">Master Gemini, APIs, and prompt engineering.</p>
            </div>
            <div>
              <h3 className="text-neonPurple font-bold text-lg mb-2">Day 2: Build AI App</h3>
              <p className="text-gray-400">Create a fully functional Chatbot and Image AI generator.</p>
            </div>
            <div>
              <h3 className="text-green-400 font-bold text-lg mb-2">Day 3: Automation + Deployment</h3>
              <p className="text-gray-400">Automate your workflows and deploy your SaaS tool live.</p>
            </div>
          </div>

          <div className="mt-8 bg-darkSurface/50 p-6 rounded-lg border border-neonPurple/30">
            <h3 className="font-bold flex items-center gap-2 mb-4 text-white"><CheckCircle className="text-green-400" /> Bonuses Included</h3>
            <ul className="text-gray-400 space-y-2">
              <li>• Ready-made Code</li>
              <li>• Exclusive Templates</li>
              <li>• Lifetime Access to Community</li>
            </ul>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel p-8 relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-neonBlue/20 rounded-bl-full blur-[40px] -z-10" />

          <div>
            <div className="inline-block bg-red-500/20 text-red-400 px-4 py-1 rounded-full text-sm font-bold mb-6 border border-red-500/30 flex items-center w-fit gap-2">
              <Clock className="w-4 h-4" /> Offer Ends Soon
            </div>
            <h2 className="text-4xl font-black mb-2 flex items-baseline gap-2">
              ₹99 <span className="text-lg text-gray-500 line-through font-normal">₹999</span>
            </h2>
            <p className="text-gray-400 mb-8">One time payment. Lifetime access to workshop recordings and resources.</p>
          </div>

          <div>
            <button
              onClick={handlePayment}
              disabled={loading}
              className="btn-primary w-full text-xl py-4 flex justify-center items-center gap-2 hover:shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              {loading ? "Processing..." : "Join Now ₹99"}
            </button>
            <div className="mt-4 text-center flex items-center justify-center gap-2 text-gray-500 text-sm">
              <Shield className="w-4 h-4" /> Secure Payment via Razorpay
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
