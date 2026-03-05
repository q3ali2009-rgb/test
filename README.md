import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, MessageSquare, BookOpen, Settings, Send, History } from 'lucide-react';

const AIStudentAssistant = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'أهلاً بك! أنا مساعدك الذكي. سأقوم بتسجيل كلام الأستاذ وتحليله لك.' }
  ]);

  // إعدادات التعرف على الكلام (Browser Speech API)
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'ar-SA'; // دعم اللغة العربية

      recognitionRef.current.onresult = (event) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
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

    const newMessages = [...messages, { role: 'user', text: chatInput }];
    setMessages(newMessages);
    setChatInput("");

    // هنا يتم الربط مع AI API (مثل OpenAI)
    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: 'بناءً على ما قاله الأستاذ، الإجابة هي: يتم تعريف هذا المصطلح كجزء من العمليات الحيوية...' }]);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white font-sans dir-rtl" dir="rtl">
      
      {/* القائمة الجانبية - Sidebar */}
      <div className="w-64 bg-gray-800 p-4 flex flex-col border-l border-gray-700">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <BookOpen size={20} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">AI Scholar</h1>
        </div>
        
        <nav className="flex-1 space-y-2">
          <button className="flex items-center gap-3 w-full p-3 bg-blue-600/20 text-blue-400 rounded-xl">
            <MessageSquare size={18} /> المحاضرة الحالية
          </button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-700 rounded-xl transition">
            <History size={18} /> سجل المحاضرات
          </button>
          <button className="flex items-center gap-3 w-full p-3 hover:bg-gray-700 rounded-xl transition">
            <Settings size={18} /> الإعدادات
          </button>
        </nav>
      </div>

      {/* المحتوى الرئيسي */}
      <div className="flex-1 flex flex-col">
        {/* شريط علوي */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-8 bg-gray-900/50 backdrop-blur">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2 text-sm text-gray-400">
              <span className={`w-2 h-2 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`}></span>
              {isRecording ? 'جاري تسجيل كلام الأستاذ...' : 'الميكروفون متوقف'}
            </span>
          </div>
          <button 
            onClick={toggleRecording}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
            {isRecording ? 'إيقاف التسجيل' : 'بدء التسجيل'}
          </button>
        </header>

        <main className="flex-1 overflow-hidden flex p-6 gap-6">
          {/* قسم تفريغ الكلام (Transcript) */}
          <div className="flex-[2] bg-gray-800/50 rounded-2xl border border-gray-700 p-6 flex flex-col">
            <h2 className="text-sm font-semibold text-gray-400 uppercase mb-4 tracking-widest">نص المحاضرة المباشر</h2>
            <div className="flex-1 overflow-y-auto text-lg leading-relaxed text-gray-200">
              {transcript || "ابدأ التسجيل ليظهر كلام الأستاذ هنا تحريرياً..."}
            </div>
          </div>

          {/* قسم الشات (AI Chat) */}
          <div className="flex-1 bg-gray-800 rounded-2xl border border-gray-700 flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-700 font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              اسأل الذكاء الاصطناعي
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="p-4 bg-gray-800 rounded-b-2xl">
              <div className="relative">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="استفسر عن أي شيء قاله الأستاذ..."
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl py-3 pr-4 pl-12 focus:outline-none focus:border-blue-500 transition"
                />
                <button type="submit" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition">
                  <Send size={16} />
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIStudentAssistant;
