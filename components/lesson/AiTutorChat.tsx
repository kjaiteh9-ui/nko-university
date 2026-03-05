'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { useTranslation } from '@/lib/hooks/useTranslation';
import type { ChatMessage } from '@/lib/types';

interface Props {
  lessonId: string;
  lessonTitle: string;
  level: number;
  userId?: string;
}

export default function AiTutorChat({ lessonId, lessonTitle, level, userId }: Props) {
  const { t, lang } = useTranslation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: `Hello! I'm Musa, your N'Ko expert tutor. I'm here to help you with "${lessonTitle}". Ask me anything about this lesson!`,
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;
    setInput('');

    const userMsg: ChatMessage = { role: 'user', content: text, timestamp: new Date().toISOString() };
    setMessages(m => [...m, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.content })),
          lessonTitle,
          level,
          userLanguage: lang,
          lessonId,
          userId,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages(m => [...m, { role: 'assistant', content: data.reply, timestamp: new Date().toISOString() }]);
      }
    } catch {
      setMessages(m => [...m, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString(),
      }]);
    }
    setLoading(false);
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-[var(--bord2)] flex items-center gap-3">
        <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(200,165,80,0.15)', border: '1px solid var(--border)' }}>
          <Bot size={16} style={{ color: 'var(--gold)' }} />
        </div>
        <div>
          <p className="text-sm font-semibold" style={{ color: 'var(--white)' }}>{t('lesson.ai_tutor')}</p>
          <p className="text-xs" style={{ color: 'var(--textd)' }}>Musa — Your Expert Tutor</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
          <span className="text-xs" style={{ color: 'var(--textd)' }}>Online</span>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
              style={{
                background: msg.role === 'assistant' ? 'rgba(200,165,80,0.1)' : 'rgba(255,255,255,0.08)',
                border: '1px solid var(--bord2)',
              }}
            >
              {msg.role === 'assistant'
                ? <Bot size={14} style={{ color: 'var(--gold)' }} />
                : <User size={14} style={{ color: 'var(--text)' }} />
              }
            </div>
            <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
              {msg.content.split('\n').map((line, j) => (
                <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br />}</span>
              ))}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(200,165,80,0.1)' }}>
              <Bot size={14} style={{ color: 'var(--gold)' }} />
            </div>
            <div className="chat-bubble-ai flex items-center gap-2">
              <Loader size={14} className="animate-spin" style={{ color: 'var(--gold)' }} />
              <span style={{ color: 'var(--textd)' }}>Thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-[var(--bord2)]">
        {!userId && (
          <p className="text-xs mb-2 text-center" style={{ color: 'var(--textd)' }}>
            <a href="/signup" style={{ color: 'var(--gold)' }}>Sign up</a> to save chat history
          </p>
        )}
        <div className="flex gap-2">
          <input
            className="nko-input flex-1 text-sm"
            placeholder="Ask about this lesson..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-all"
            style={{
              background: input.trim() ? 'var(--gold)' : 'var(--bord2)',
              color: input.trim() ? '#111a14' : 'var(--textd)',
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
