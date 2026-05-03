'use client';

import { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
}

export default function GlobalChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am SIVA AI, your geospatial intelligence expert. I can assist you with information regarding human trafficking in Cambodia, analyze map patterns, or detail evacuation protocols. How can I help you today?"
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulated AI response engine based on keywords
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let aiText = "I'm currently operating in offline mode. For full spatial analysis, please upgrade to the cloud backend API. However, feel free to explore the active modules on the map!";
      
      if (lowerInput.includes('definition') || lowerInput.includes('what is') || lowerInput.includes('define') || (lowerInput.includes('human trafficking') && !lowerInput.includes('news'))) {
        aiText = "Hey there! Human trafficking in this context is basically modern-day slavery. Syndicates trick people into cyber-scam jobs using fake promises. Once victims arrive, they get trapped in closed complexes, have their passports taken, and are forced to run global cyber-fraud campaigns under threats of violence. It's really scary stuff.";
      } else if (lowerInput.includes('trafficking') || lowerInput.includes('news') || lowerInput.includes('cambodia')) {
        aiText = "Recent reports from UNODC show that Sihanoukville is still a major hotspot for organized crime. Many closed complexes suspected of cyber-scam operations are heavily fortified, often disguised as casinos. Our Vulnerability module maps these high-risk areas. Please stay vigilant if you're traveling near them!";
      } else if (lowerInput.includes('vallen') || lowerInput.includes('creator') || lowerInput.includes('who made')) {
        aiText = "I am SIVA AI! This entire Geospatial Intelligence Dashboard was built with love by Baptista Yohana Vallen in 2026. Vallen created me to be a powerful spatial tool to combat organized crime and help visualize human trafficking risks in Southeast Asia. 🚀";
      } else if (lowerInput.includes('loker') || lowerInput.includes('penipuan') || lowerInput.includes('skema') || lowerInput.includes('scheme') || lowerInput.includes('job') || lowerInput.includes('scam')) {
        aiText = "Scam syndicates usually try to lure people with amazing job offers abroad (often in Cambodia, Myanmar, or Laos) that require almost no qualifications. They often disguise the jobs as Customer Service, IT Support, Crypto Marketing, or Admin roles. If someone offers you a free flight but tells you to travel on a tourist visa or without an official interview, that is a huge red flag! 🛑 Please be careful, as this is the main way people get trapped.";
      } else if (lowerInput.includes('negara') || lowerInput.includes('penyelundupan') || lowerInput.includes('country') || lowerInput.includes('smuggling')) {
        aiText = "Based on our maps, the biggest hotspots for these scam complexes right now are Cambodia (like Sihanoukville and Poipet), Myanmar (especially Myawaddy), Laos (the Golden Triangle), and some areas in the Philippines. Often, syndicates will use Thailand or Malaysia as transit countries to smuggle people across the borders secretly.";
      } else if (lowerInput.includes('perlawanan') || lowerInput.includes('melawan') || lowerInput.includes('resistance') || lowerInput.includes('fight') || lowerInput.includes('tactic')) {
        aiText = "If you or someone you know is stuck inside, please know that direct physical resistance is incredibly dangerous because these places are heavily guarded. Instead, try 'stealth mode': quietly gather info like GPS coordinates, memorize the building's layout, and hide a backup phone if you can. Wait for a moment when the guards aren't looking to send an SOS. Your physical safety is the absolute priority, so stay as safe as possible! 🙏";
      } else if (lowerInput.includes('alur') || lowerInput.includes('penyelamatan') || lowerInput.includes('tersekap') || lowerInput.includes('evacuation') || lowerInput.includes('safe') || lowerInput.includes('escape') || lowerInput.includes('survival')) {
        aiText = "If you need to escape but don't have money or can't reach an embassy, here's what you can do: First, stay calm. If you manage to slip out, don't walk on major highways as syndicates patrol those. Seek shelter in local places like temples, small clinics, or crowded public markets where they can't easily grab you. If you have a phone but no money, reach out to local NGOs like Chab Dai or IJM via social media. They coordinate rescues for people who are stranded and will help you get home safely! 🛡️";
      } else if (lowerInput.includes('hotspot') || lowerInput.includes('map') || lowerInput.includes('pattern')) {
        aiText = "Our Hotspot map reveals a severe concentration of suspected facilities near the industrial and coastal zones of Sihanoukville. Those red markers are the closed complexes. We strongly advise monitoring the Transit corridors connected to them!";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        aiText = "Hello there! 👋 I am SIVA AI. How can I help you today? You can ask me about Scam Hotspots, Evacuation Routes, or even how to spot a fake job offer!";
      }

      setMessages(prev => [...prev, { id: Date.now().toString() + 'ai', sender: 'ai', text: aiText }]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-[10000] w-16 h-16 rounded-full shadow-2xl border-2 border-slate-700 bg-slate-900 hover:scale-105 transition-transform overflow-hidden flex items-center justify-center group"
          title="Ask SIVA AI"
        >
          <img 
            src="/assets/siva_mascot.png" 
            alt="SIVA AI Mascot" 
            className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.style.display = 'none';
            }}
          />
        </button>
      )}

      {/* Chat Drawer */}
      <div 
        className={`fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-[10000] w-full sm:w-96 h-[80vh] sm:h-[500px] bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col transition-transform duration-300 transform ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 sm:rounded-t-2xl flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-600 overflow-hidden relative flex items-center justify-center">
              <img src="/assets/siva_mascot.png" alt="SIVA AI" className="w-full h-full object-cover z-10" />
              <Bot className="absolute text-cyan-400 z-0" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">SIVA AI</h3>
              <p className="text-xs text-cyan-400">Intelligence Expert</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 overflow-y-auto p-4 bg-slate-50 flex flex-col gap-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}>
              <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.sender === 'user' ? 'bg-indigo-600 text-white' : 'bg-slate-800'}`}>
                {msg.sender === 'user' ? <User size={16} /> : <Bot size={16} className="text-cyan-400" />}
              </div>
              <div className={`p-3 rounded-2xl text-sm shadow-sm ${msg.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'}`}>
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Commands */}
        <div className="px-4 pb-2 bg-white flex gap-2 overflow-x-auto no-scrollbar border-t border-gray-100 pt-3">
          {["What is Trafficking?", "Job Scam Schemes", "Smuggling Countries", "Resistance Tactics", "Evacuation Flow"].map((cmd) => (
            <button 
              key={cmd}
              onClick={() => { setInput(cmd); }}
              className="whitespace-nowrap text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors font-medium"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Input Area */}
        <div className="p-3 bg-white border-t border-gray-200 sm:rounded-b-2xl">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask for intelligence insights..."
              className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl text-sm transition-all outline-none"
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
