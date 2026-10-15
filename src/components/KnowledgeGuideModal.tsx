import React, { useState } from 'react';
import { CONCEPT_GUIDES } from '../data/curriculumData';
import { X, BookOpen, CheckCircle } from 'lucide-react';
import { sounds } from '../utils/audio';

interface KnowledgeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KnowledgeGuideModal: React.FC<KnowledgeGuideModalProps> = ({ isOpen, onClose }) => {
  const [selectedGuideId, setSelectedGuideId] = useState(CONCEPT_GUIDES[0].id);

  if (!isOpen) return null;

  const currentGuide = CONCEPT_GUIDES.find((g) => g.id === selectedGuideId) || CONCEPT_GUIDES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                TYMM 5. Sınıf Geometri Rehberi
              </h3>
              <p className="text-xs text-slate-400">
                Temel Geometrik Çizimler, İnşalar ve Açılar Kavram Sözlüğü
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
          {/* Sidebar Menu */}
          <div className="w-full md:w-64 border-r border-slate-800 p-3 space-y-1 overflow-y-auto bg-slate-950/50">
            {CONCEPT_GUIDES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  sounds.playClick();
                  setSelectedGuideId(g.id);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${
                  selectedGuideId === g.id
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <span>{g.title}</span>
                <span className="text-[10px] opacity-75">{g.symbol.slice(0, 7)}</span>
              </button>
            ))}
          </div>

          {/* Guide Content Display */}
          <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-slate-900/60">
            {/* Title & Subtitle */}
            <div>
              <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold mb-2">
                Sembolik Gösterim: {currentGuide.symbol}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                {currentGuide.title}
              </h2>
              <p className="text-sm text-slate-400 mt-0.5">
                {currentGuide.subtitle}
              </p>
            </div>

            {/* Visual Mini Canvas */}
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-4 flex items-center justify-center">
              <svg viewBox="0 0 400 120" className="w-full max-w-md h-28">
                {currentGuide.id === 'point' && (
                  <g>
                    <circle cx="200" cy="60" r="7" fill="#f59e0b" />
                    <text x="200" y="40" fill="#fde68a" fontSize="16" fontWeight="bold" textAnchor="middle">
                      A Noktası
                    </text>
                  </g>
                )}
                {currentGuide.id === 'line' && (
                  <g>
                    <line x1="50" y1="60" x2="350" y2="60" stroke="#38bdf8" strokeWidth="4" />
                    <circle cx="130" cy="60" r="5" fill="#ffffff" />
                    <circle cx="270" cy="60" r="5" fill="#ffffff" />
                    <polygon points="40,60 55,52 55,68" fill="#38bdf8" />
                    <polygon points="360,60 345,52 345,68" fill="#38bdf8" />
                    <text x="130" y="42" fill="#7dd3fc" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
                    <text x="270" y="42" fill="#7dd3fc" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
                    <text x="200" y="95" fill="#94a3b8" fontSize="12" textAnchor="middle">⟷AB Doğrusu (İki Ucu Sınırsız)</text>
                  </g>
                )}
                {currentGuide.id === 'ray' && (
                  <g>
                    <circle cx="100" cy="60" r="7" fill="#f59e0b" />
                    <line x1="100" y1="60" x2="330" y2="60" stroke="#f59e0b" strokeWidth="4" />
                    <circle cx="240" cy="60" r="5" fill="#ffffff" />
                    <polygon points="340,60 325,52 325,68" fill="#f59e0b" />
                    <text x="100" y="42" fill="#fde68a" fontSize="14" fontWeight="bold" textAnchor="middle">A (Başlangıç)</text>
                    <text x="240" y="42" fill="#fde68a" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
                    <text x="200" y="95" fill="#94a3b8" fontSize="12" textAnchor="middle">[AB Işını (Bir Ucu Kapalı, Bir Ucu Sonsuz)</text>
                  </g>
                )}
                {currentGuide.id === 'segment' && (
                  <g>
                    <line x1="90" y1="60" x2="310" y2="60" stroke="#34d399" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="90" cy="60" r="6" fill="#10b981" />
                    <circle cx="310" cy="60" r="6" fill="#10b981" />
                    <text x="90" y="42" fill="#6ee7b7" fontSize="14" fontWeight="bold" textAnchor="middle">A</text>
                    <text x="310" y="42" fill="#6ee7b7" fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
                    <text x="200" y="95" fill="#94a3b8" fontSize="12" textAnchor="middle">[AB] Doğru Parçası (|AB| = Ölçülebilir Uzunluk)</text>
                  </g>
                )}
                {currentGuide.id === 'parallel' && (
                  <g>
                    <line x1="60" y1="40" x2="340" y2="40" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="60" y1="80" x2="340" y2="80" stroke="#38bdf8" strokeWidth="3" />
                    <text x="350" y="44" fill="#38bdf8" fontSize="12">d₁</text>
                    <text x="350" y="84" fill="#38bdf8" fontSize="12">d₂</text>
                    <text x="200" y="65" fill="#fbbf24" fontSize="12" fontWeight="bold" textAnchor="middle">d₁ // d₂ (Asla Kesişmezler)</text>
                  </g>
                )}
                {currentGuide.id === 'perpendicular' && (
                  <g>
                    <line x1="60" y1="70" x2="340" y2="70" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="200" y1="20" x2="200" y2="105" stroke="#f43f5e" strokeWidth="3" />
                    <rect x="200" y="48" width="22" height="22" fill="#10b981" fillOpacity="0.3" stroke="#10b981" strokeWidth="2" />
                    <circle cx="211" cy="59" r="3" fill="#10b981" />
                    <text x="250" y="55" fill="#34d399" fontSize="12" fontWeight="bold">90° Diklik</text>
                    <text x="200" y="115" fill="#fda4af" fontSize="11" textAnchor="middle">d₁ ⊥ d₂</text>
                  </g>
                )}
                {currentGuide.id === 'intersecting' && (
                  <g>
                    <line x1="70" y1="30" x2="330" y2="90" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="70" y1="90" x2="330" y2="30" stroke="#a855f7" strokeWidth="3" />
                    <circle cx="200" cy="60" r="5" fill="#f59e0b" />
                    <text x="200" y="45" fill="#fde68a" fontSize="12" fontWeight="bold" textAnchor="middle">Ortak Kesişim Noktası</text>
                  </g>
                )}
                {currentGuide.id === 'angles' && (
                  <g>
                    <line x1="160" y1="70" x2="280" y2="70" stroke="#38bdf8" strokeWidth="3" />
                    <line x1="160" y1="70" x2="245" y2="25" stroke="#38bdf8" strokeWidth="3" />
                    <circle cx="160" cy="70" r="5" fill="#e11d48" />
                    <path d="M 190 70 A 30 30 0 0 0 185 53" fill="none" stroke="#ec4899" strokeWidth="2" />
                    <text x="160" y="90" fill="#fda4af" fontSize="11" textAnchor="middle">Köşe</text>
                    <text x="205" y="60" fill="#f472b6" fontSize="11">Açı</text>
                    <text x="310" y="45" fill="#94a3b8" fontSize="10">Dar: 0°-90°</text>
                    <text x="310" y="62" fill="#94a3b8" fontSize="10">Dik: 90°</text>
                    <text x="310" y="79" fill="#94a3b8" fontSize="10">Geniş: 90°-180°</text>
                    <text x="310" y="96" fill="#94a3b8" fontSize="10">Doğru: 180°</text>
                  </g>
                )}
              </svg>
            </div>

            {/* Description */}
            <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700/40 text-slate-200 text-sm leading-relaxed">
              {currentGuide.description}
            </div>

            {/* Real World Example */}
            <div className="bg-emerald-950/20 p-4 rounded-xl border border-emerald-800/30 text-emerald-300 text-xs">
              <span className="font-bold text-emerald-400">🌍 Günlük Hayattaki Örnekleri: </span>
              {currentGuide.realWorldExample}
            </div>

            {/* Key Properties Checklist */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Temel Özellikler:
              </h4>
              <div className="space-y-1.5">
                {currentGuide.properties.map((prop, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{prop}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
