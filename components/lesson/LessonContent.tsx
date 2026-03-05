'use client';

import type { LessonContent as LessonContentType, ContentSection } from '@/lib/types';
import { Volume2 } from 'lucide-react';

interface Props {
  content: LessonContentType;
}

export default function LessonContent({ content }: Props) {
  function speakText(text: string) {
    if ('speechSynthesis' in window) {
      const utt = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utt);
    }
  }

  return (
    <div className="space-y-8">
      {content.sections.map((section, i) => (
        <SectionBlock key={i} section={section} onSpeak={speakText} />
      ))}
    </div>
  );
}

function SectionBlock({ section, onSpeak }: { section: ContentSection; onSpeak: (t: string) => void }) {
  return (
    <div>
      <h3 className="mb-4">{section.title}</h3>

      {/* Intro / Culture / Reading / Grammar */}
      {section.body && (
        <div className="mb-4">
          <p style={{ color: 'var(--text)', lineHeight: 1.8, whiteSpace: 'pre-wrap' }}>{section.body}</p>
        </div>
      )}

      {/* Grammar rule + examples */}
      {section.rule && (
        <div className="p-4 rounded-lg mb-4" style={{ background: 'rgba(200,165,80,0.06)', border: '1px solid var(--border)' }}>
          <p className="text-sm font-semibold mb-2" style={{ color: 'var(--gold)' }}>Grammar Rule:</p>
          <p className="text-sm" style={{ color: 'var(--text)' }}>{section.rule}</p>
        </div>
      )}

      {section.examples && section.examples.length > 0 && (
        <div className="space-y-2 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--textd)' }}>Examples:</p>
          {section.examples.map((ex, i) => (
            <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
              <span style={{ color: 'var(--gold)' }}>→</span>
              <p className="text-sm" style={{ color: 'var(--cream)' }}>{ex}</p>
            </div>
          ))}
        </div>
      )}

      {/* Alphabet Characters */}
      {section.characters && section.characters.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-4">
          {section.characters.map((char, i) => (
            <div
              key={i}
              className="card text-center cursor-pointer hover:border-[var(--border)] transition-all"
              style={{ padding: '1rem' }}
              onClick={() => onSpeak(char.sound)}
            >
              <p className="nko-lg mb-2" style={{ color: 'var(--gold)', fontSize: '2rem' }}>{char.char}</p>
              <p className="text-xs font-bold mb-1" style={{ color: 'var(--white)' }}>{char.name}</p>
              <p className="text-xs" style={{ color: 'var(--textd)' }}>{char.sound}</p>
              {char.example && (
                <p className="text-xs mt-1" style={{ color: 'var(--terra)' }}>{char.example}</p>
              )}
              <Volume2 size={12} className="mx-auto mt-1" style={{ color: 'var(--textd)' }} />
            </div>
          ))}
        </div>
      )}

      {/* Vocabulary Words */}
      {section.words && section.words.length > 0 && (
        <div className="space-y-2 mb-4">
          {section.words.map((word, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg border transition-all hover:border-[var(--border)] cursor-pointer"
              style={{ borderColor: 'var(--bord2)', background: 'rgba(255,255,255,0.02)' }}
              onClick={() => onSpeak(word.en)}
            >
              <div>
                <p className="nko-text" style={{ color: 'var(--gold)', fontSize: '1.2rem' }}>{word.nko}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium" style={{ color: 'var(--white)' }}>{word.en}</p>
                {word.fr && <p className="text-xs" style={{ color: 'var(--textd)' }}>{word.fr}</p>}
              </div>
              <Volume2 size={14} style={{ color: 'var(--textd)' }} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
