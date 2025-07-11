import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Key } from 'lucide-react';

const PREDEFINED_FAQS = [
  { q: 'How do I get started with GitHub?', a: 'Go to the GitHub Setup guide and follow the step-by-step instructions to create your account and first repository.' },
  { q: 'How can I improve my LinkedIn profile?', a: 'Check out our LinkedIn Profile guide for tips on optimizing your headline, summary, and experience.' },
  { q: 'What should I include in my portfolio?', a: 'Showcase your best projects, describe your role, and include links to live demos or code. See our Portfolio Site guide for more.' },
  { q: 'How do I write a great resume?', a: 'Focus on achievements, use action verbs, and tailor your resume to each job. Our Resume Tips guide has detailed advice.' },
];

const FAQBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I am your FirstPush Assistant. Ask me anything or select a question below.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
  const [showKeyInput, setShowKeyInput] = useState(!localStorage.getItem('openai_api_key'));
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, open]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    setMessages((msgs) => [...msgs, { from: 'user', text }]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant for the FirstPush website. Answer concisely and helpfully.' },
            ...messages.filter(m => m.from !== 'faq').map(m => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text })),
            { role: 'user', content: text },
          ],
          max_tokens: 200,
        }),
      });
      const data = await res.json();
      const answer = data.choices?.[0]?.message?.content?.trim() || 'Sorry, I could not get an answer.';
      setMessages((msgs) => [...msgs, { from: 'bot', text: answer }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { from: 'bot', text: 'There was an error contacting OpenAI. Please check your API key and network.' }]);
    }
    setLoading(false);
  };

  const handleFAQ = (faq: typeof PREDEFINED_FAQS[0]) => {
    setMessages((msgs) => [...msgs, { from: 'faq', text: faq.q }, { from: 'bot', text: faq.a }]);
  };

  const handleKeySave = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowKeyInput(false);
  };

  return (
    <>
      <button
        className="fixed z-50 bottom-6 left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center"
        onClick={() => setOpen(true)}
        aria-label="Open FAQ Bot"
        style={{ boxShadow: '0 4px 24px 0 rgba(80,80,180,0.15)' }}
      >
        <MessageCircle className="w-6 h-6" />
      </button>
      {open && (
        <div className="fixed z-50 bottom-24 left-6 w-80 max-w-full bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 animate-fadeIn flex flex-col" style={{ minHeight: 420 }}>
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 font-bold text-lg text-blue-700 dark:text-blue-300"><Bot className="w-5 h-5" /> FirstPush Assistant</div>
            <button onClick={() => setOpen(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><X className="w-5 h-5" /></button>
          </div>
          {showKeyInput ? (
            <div className="flex flex-col items-center justify-center flex-1 p-6">
              <Key className="w-8 h-8 mb-2 text-gray-400" />
              <input
                type="password"
                className="border rounded px-3 py-2 w-full mb-3 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                placeholder="Enter your OpenAI API key"
                value={apiKey}
                onChange={e => setApiKey(e.target.value)}
              />
              <button
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded shadow hover:scale-105 transition-transform font-semibold"
                onClick={handleKeySave}
                disabled={!apiKey.trim()}
              >
                Save API Key
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">Your API key is stored only in your browser.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4" ref={chatRef} style={{ maxHeight: 260 }}>
                {messages.map((msg, i) => (
                  <div key={i} className={`mb-3 flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`px-3 py-2 rounded-lg max-w-[80%] text-sm ${msg.from === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'} ${msg.from === 'bot' ? 'shadow' : ''}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 pb-3">
                <div className="flex flex-wrap gap-2 mb-2">
                  {PREDEFINED_FAQS.map((faq, i) => (
                    <button
                      key={i}
                      className="bg-blue-50 dark:bg-gray-800 text-blue-700 dark:text-blue-200 px-3 py-1 rounded-full text-xs hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors border border-blue-100 dark:border-gray-700"
                      onClick={() => handleFAQ(faq)}
                    >
                      {faq.q}
                    </button>
                  ))}
                </div>
                <form
                  className="flex gap-2"
                  onSubmit={e => { e.preventDefault(); handleSend(input); }}
                >
                  <input
                    className="flex-1 border rounded px-3 py-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    placeholder="Type your question..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-2 rounded shadow hover:scale-105 transition-transform"
                    disabled={loading || !input.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </>
          )}
          <style>{`
            .animate-fadeIn { animation: fadeIn 0.3s; }
            @keyframes fadeIn {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default FAQBot; 