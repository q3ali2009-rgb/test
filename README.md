import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageSquare, BookOpen, Settings, Send, History, User } from 'lucide-react';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'أهلاً بك! أنا مساعدك الذكي للمحاضرات. ابدأ التسجيل وسأقوم بتحويل كلام الأستاذ إلى نص فوراً.' }
  ]);

  const recognitionRef = useRef(null);
  const chatEndRef = useRef(null);

  // التمرير التلقائي لأسفل الشات
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ar-SA';

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(prev => prev + " " + currentTranscript);
      };
    }
  }, []);

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsRecording(!isRecording);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setMessages([...messages, { role: 'user', text: chatInput }]);
    setChatInput("");

    // محاكاة رد الذكاء الاصطناعي
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'بناءً على المحاضرة الحالية، الأستاذ يركز على النقاط الرئيسية في هذا الموضوع...' }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 font-sans" dir="rtl">
      
      {/* القائمة الجانبية */}
      <aside className="w-72 bg-[#1e293b] flex flex-col border-l border-slate-700 shadow-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BookOpen className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold bg-gradient-to-l from-white to-slate-400 bg-clip-text text-transparent">AI Scholar</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2">
          <NavItem icon={<MessageSquare size={20}/>} label="المحاضرة المباشرة" active />
          <NavItem icon={<History size={20}/>} label="الأرشيف" />
          <NavItem icon={<User size={20}/>} label="الملف الشخصي" />
          <NavItem icon={<Settings size={20}/>} label="الإعدادات" />
        </nav>

        <div className="p-4 border-t border-slate-700 m-4 bg-slate-800/50 rounded-2xl text-center">
          <p className="text-xs text-slate-400 mb-2 font-medium">مساحة التخزين</p>
          <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-3/4"></div>
          </div>
        </div>
      </aside>

      {/* المحتوى الرئيسي */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-8 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800 z-10">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold text-white">جلسة استماع نشطة</h2>
            <p className="text-xs text-slate-400">تحليل فوري باستخدام WebSpeech API</p>
          </div>
          
          <button 
            onClick={toggleRecording}
            className={`group relative flex items-center gap-3 px-6 py-2.5 rounded-full font-bold transition-all duration-300 ${
              isRecording 
              ? 'bg-red-500/10 text-red-500 border border-red-500/50 hover:bg-red-500 hover:text-white' 
              : 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-700'
            }`}
          >
            {isRecording ? <MicOff size={20} className="animate-pulse" /> : <Mic size={20} />}
            <span>{isRecording ? 'إيقاف التسجيل' : 'بدء تسجيل الأستاذ'}</span>
          </button>
        </header>

        {/* العمليات */}
        <div className="flex-1 flex p-6 gap-6 overflow-hidden">
          {/* قسم الترانسكريبت */}
          <section className="flex-[3] bg-[#1e293b]/50 rounded-3xl border border-slate-800 p-8 flex flex-col shadow-inner">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-black uppercase tracking-tighter text-indigo-400">Live Transcription</span>
              {isRecording && <span className="text-xs text-red-400 animate-pulse">● LIVE</span>}
            </div>
            <div className="flex-1 overflow-y-auto text-xl leading-relaxed font-medium text-slate-300 custom-scrollbar">
              {transcript || <span className="opacity-20 italic">انتظار التقاط الصوت...</span>}
            </div>
          </section>

          {/* قسم الشات */}
          <section className="flex-[2] bg-[#1e293b] rounded-3xl border border-slate-700 flex flex-col shadow-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-700 bg-slate-800/30 flex items-center gap-3">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-400">الاستفسارات الذكية</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[85%] p-4 rounded-[2rem] text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-700 text-slate-100 rounded-bl-none border border-slate-600'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="p-5">
              <div className="relative group">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="اسأل عن أي نقطة ذكرها الأستاذ..."
                  className="w-full bg-[#0f172a] border border-slate-700 rounded-2xl py-4 pr-5 pl-14 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-600"
                />
                <button type="submit" className="absolute left-2.5 top-1/2 -translate-y-1/2 p-2.5 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-transform active:scale-95 shadow-md">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active = false }) {
  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-200 font-medium ${
      active ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
    }`}>
      {icon}
      <span>{label}</span>
    </div>
  );
}
