"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import { MessageCircle, X, Send, Bot, User, ChevronDown, Loader2 } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const FAQ_KNOWLEDGE = [
  {
    keywords: ["choose", "select", "which", "recommend", "best", "pick"],
    question: "What product should I choose?",
    answer: "Our CT-4000 series is ideal for general battery testing, while the CT-9000 series offers the highest precision (0.02% accuracy, 1000Hz sampling) for R&D applications. The CE-6000 series features energy recovery, saving 70%+ power costs for production facilities. Contact our engineers for a free assessment.",
  },
  {
    keywords: ["price", "cost", "quote", " quotation", "pricing", "budget", "expense"],
    question: "How much does it cost?",
    answer: "NEWARE equipment ranges from entry-level CT-3000n (~USD 3,000) to high-end CT-9000 systems (USD 50,000+). Pricing depends on channels, voltage/current specs, and accessories. Request a free quote: https://batteryxlab.shop/en/contact",
  },
  {
    keywords: ["accuracy", "precision", "sampling", "rate", "resolution", "measurement"],
    question: "What accuracy can NEWARE achieve?",
    answer: "NEWARE CT-9000 series offers 0.02% FS accuracy with 1000Hz sampling rate - industry-leading precision for battery R&D. CT-4000 series provides 0.05% FS accuracy, suitable for most production and research applications.",
  },
  {
    keywords: ["support", "help", "technical", "service", "warranty", "maintenance"],
    question: "What support do you offer?",
    answer: "We provide 7x24h technical support with average response time under 4 hours. All NEWARE software updates are free for life. We also offer on-site training and remote diagnostics. ISO9001 certified service center in Shenzhen.",
  },
  {
    keywords: ["migration", "switch", "arbin", "maccor", "biologic", "competitor", "replace"],
    question: "Can I migrate from another brand?",
    answer: "Yes! NEWARE provides free migration assessment and data conversion tools. We have documented compatibility with Arbin, Maccor, and BioLogic test profiles. Our engineers will help you transition seamlessly with zero data loss.",
  },
  {
    keywords: ["software", "update", "upgrade", "version", "license", "bts"],
    question: "Is software included and free?",
    answer: "Yes, BTS software is included with all NEWARE equipment. Lifetime free updates are provided. The latest BTS 8.0 features enhanced data analysis, cloud connectivity, and multi-language support (EN/ZH/VI/RU).",
  },
  {
    keywords: ["voltage", "current", "power", "range", "max", "spec", "specification"],
    question: "What voltage/current range do you support?",
    answer: "NEWARE covers: 5V-1000V (up to 3000A for EV battery testing). CT-4000: 5V/10A-100V/20A. CT-9000: 5V-1000V, up to 3000A. CE-6000 (IGBT): ideal for high-power applications with energy feedback.",
  },
  {
    keywords: ["delivery", "shipping", "lead", "time", "order", "purchase", "buy"],
    question: "What is the delivery time?",
    answer: "Standard delivery: 4-8 weeks for standard configurations. Custom systems: 8-12 weeks. Express production available with additional cost. We ship globally with full documentation (CE/FCC/UL certifications available).",
  },
  {
    keywords: ["payment", "method", "credit", "wire", "letter of credit", "pay"],
    question: "What payment methods do you accept?",
    answer: "We accept T/T bank transfer, L/C (Letter of Credit), and PayPal (for small orders). Payment terms: 30% deposit, 70% before shipment. Contact sales@neware.com.cn for proforma invoice.",
  },
  {
    keywords: ["demo", "trial", "test", "sample", "evaluate", "evaluation"],
    question: "Can I get a demo or trial?",
    answer: "Yes, we offer: 1) Online video demo with our engineers, 2) Demo unit rental (refundable deposit), 3) Visiting our Shenzhen HQ for hands-on testing. Schedule: https://batteryxlab.shop/en/contact",
  },
  {
    keywords: ["channel", "channels", "parallel", "multi", "many"],
    question: "How many channels can NEWARE support?",
    answer: "NEWARE systems scale from 8 channels (entry-level) to 1000+ channels for production lines. CT-8000 supports up to 512 channels per cabinet. Multiple cabinets can be networked for large-scale parallel testing.",
  },
  {
    keywords: ["ev", "electric vehicle", "battery pack", "automotive", "car"],
    question: "Do you have EV battery testing solutions?",
    answer: "Yes! NEWARE CE-6000 IGBT series supports 1000V/3000A for EV battery pack testing with 70%+ energy recovery. CT-8000 supports driving simulation profiles (UDDS, ECE, etc.) for realistic EV battery testing.",
  },
];

function findRelevantAnswer(query: string): string {
  const lowerQuery = query.toLowerCase();
  
  for (const item of FAQ_KNOWLEDGE) {
    for (const keyword of item.keywords) {
      if (lowerQuery.includes(keyword)) {
        return item.answer;
      }
    }
  }
  
  return "Thank you for your question! For detailed answers, please contact our application engineers who are available 24/7:\n\n• WhatsApp: +1 447 851 559 319\n• Email: sales@neware.com.cn\n• Or visit: https://batteryxlab.shop/en/contact\n\nYou can also browse our Knowledge Base for technical documentation.";
}

const INITIAL_MESSAGE: Message = {
  id: "welcome",
  role: "assistant",
  content: "Hello! I'm your NEWARE assistant. I can help you with:\n\n• Product selection guidance\n• Technical specifications\n• Pricing and quotes\n• Migration from competitors\n• Support and warranty\n\nWhat would you like to know?",
  timestamp: new Date(),
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const params = useParams();
  const locale = (params.locale as string) || "en";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking delay
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 700));

    const answer = findRelevantAnswer(userMessage.content);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: answer,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-20 right-4 z-50">
      {/* Chat Panel */}
      <div
        className={`absolute bottom-16 right-0 w-[380px] h-[520px] bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 origin-bottom-right ${
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
        }`}
        style={{ maxHeight: "calc(100vh - 160px)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">NEWARE Assistant</h3>
              <p className="text-white/70 text-xs">AI-powered support</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close chat"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-br-md"
                    : "bg-slate-100 text-slate-700 rounded-bl-md"
                }`}
              >
                <div className="flex items-start gap-2">
                  {msg.role === "assistant" && (
                    <Bot className="w-4 h-4 mt-1 shrink-0 text-blue-600" />
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex items-center gap-2 text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {["Product pricing?", "Accuracy specs?", "Migration support?"].map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="whitespace-nowrap px-3 py-1.5 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t border-slate-100">
          <div className="flex items-center gap-2 bg-slate-50 rounded-full px-4 py-2 border border-slate-200 focus-within:border-blue-500 transition-colors">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about NEWARE products..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 rounded-full transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-slate-700 rotate-0" : "bg-blue-600 hover:bg-blue-700"
        }`}
        aria-label={isOpen ? "Close AI chat" : "Open AI chat"}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          </div>
        )}
      </button>
    </div>
  );
}
