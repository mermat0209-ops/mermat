import React, { useState } from 'react';
import { ANGLE_QUESTIONS } from '../data/curriculumData';
import { AngleType } from '../types/game';
import { sounds } from '../utils/audio';
import { 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  Lightbulb, 
  RotateCcw,
  Maximize2
} from 'lucide-react';

interface Level2AnglesProps {
  onSuccess: (points: number) => void;
}

export const Level2Angles: React.FC<Level2AnglesProps> = ({ onSuccess }) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AngleType | null>(null);
  const [showProtractor, setShowProtractor] = useState(true);
  const [protractorRotation, setProtractorRotation] = useState(0);
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [showHint, setShowHint] = useState(false);
  const [completedQuestions, setCompletedQuestions] = useState<number[]>([]);

  const currentQ = ANGLE_QUESTIONS[questionIndex];

  const handleSelectAnswer = (type: AngleType) => {
    sounds.playClick();
    setSelectedAnswer(type);

    if (type === currentQ.correctType) {
      sounds.playCorrect();
      setFeedback({
        type: 'success',
        message: `Mükemmel Tespit Dedektif! ${currentQ.explanation}`
      });
      if (!completedQuestions.includes(questionIndex)) {
        setCompletedQuestions([...completedQuestions, questionIndex]);
        onSuccess(100);
      }
    } else {
      sounds.playWrong();
      let hintTxt = '';
      if (currentQ.correctType === 'dar') {
        hintTxt = 'Bu açı tam bir dik açıdan (90° L köşesinden) daha dar ve küçüktür.';
      } else if (currentQ.correctType === 'dik') {
        hintTxt = 'Bu açının kolları birbirine tam diktir ve 90° ölçüsündedir.';
      } else if (currentQ.correctType === 'genis') {
        hintTxt = 'Bu açı 90° dik açıdan daha geniş açılmış ancak 180° doğru açı kadar düzleşmemiştir.';
      } else {
        hintTxt = 'Bu açının kolları zıt yönlere uzanarak dümdüz bir doğru oluşturmuştur (180°).';
      }

      setFeedback({
        type: 'error',
        message: `Tekrar Düşün! ${hintTxt} Açıölçer ile ölçüm yapıp tekrar dene!`
      });
    }
  };

  const handleNextQuestion = () => {
    sounds.playClick();
    if (questionIndex < ANGLE_QUESTIONS.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelectedAnswer(null);
      setFeedback({ type: 'idle', message: '' });
      setShowHint(false);
      setProtractorRotation(0);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setSelectedAnswer(null);
    setFeedback({ type: 'idle', message: '' });
    setShowHint(false);
    setProtractorRotation(0);
  };

  // Render thematic scene based on current question
  const renderThematicIllustration = () => {
    const { vertex, arm1, arm2 } = currentQ.points;

    return (
      <g>
        {/* Specific Architectural Elements in Background */}
        {currentQ.svgScene === 'museum' && (
          <g opacity="0.3">
            {/* Museum building silhouette */}
            <rect x="180" y="240" width="240" height="120" fill="#334155" rx="4" />
            <polygon points="170,240 300,160 430,240" fill="#1e293b" />
            {/* Museum columns */}
            <rect x="210" y="260" width="16" height="100" fill="#64748b" />
            <rect x="250" y="260" width="16" height="100" fill="#64748b" />
            <rect x="334" y="260" width="16" height="100" fill="#64748b" />
            <rect x="374" y="260" width="16" height="100" fill="#64748b" />
            <circle cx="300" cy="210" r="14" fill="#f59e0b" opacity="0.6" />
          </g>
        )}

        {currentQ.svgScene === 'clock' && (
          <g opacity="0.25">
            {/* Clock Tower Body */}
            <rect x="220" y="80" width="160" height="300" fill="#1e293b" rx="8" />
            <circle cx="300" cy="250" r="90" fill="#0f172a" stroke="#cbd5e1" strokeWidth="6" />
            {/* Clock hour marks */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1={300 + 76 * Math.cos((deg * Math.PI) / 180)}
                y1={250 + 76 * Math.sin((deg * Math.PI) / 180)}
                x2={300 + 85 * Math.cos((deg * Math.PI) / 180)}
                y2={250 + 85 * Math.sin((deg * Math.PI) / 180)}
                stroke="#94a3b8"
                strokeWidth={deg % 90 === 0 ? "3" : "1.5"}
              />
            ))}
          </g>
        )}

        {currentQ.svgScene === 'bridge' && (
          <g opacity="0.25">
            {/* Suspension Bridge Tower */}
            <rect x="285" y="60" width="30" height="320" fill="#475569" />
            <line x1="60" y1="280" x2="540" y2="280" stroke="#64748b" strokeWidth="12" />
            {/* Water Waves */}
            <path d="M 60,340 Q 150,330 240,340 T 420,340 T 540,340" fill="none" stroke="#0ea5e9" strokeWidth="3" />
            <path d="M 60,370 Q 150,360 240,370 T 420,370 T 540,370" fill="none" stroke="#0284c7" strokeWidth="3" />
          </g>
        )}

        {currentQ.svgScene === 'dam' && (
          <g opacity="0.25">
            {/* Mountains and Dam lake */}
            <polygon points="40,240 180,120 320,240" fill="#334155" />
            <polygon points="280,240 420,100 560,240" fill="#1e293b" />
            <rect x="60" y="240" width="480" height="140" fill="#0369a1" />
          </g>
        )}

        {/* The Measured Angle Itself */}
        {/* Angle Ray 1 */}
        <line
          x1={vertex.x}
          y1={vertex.y}
          x2={arm1.x}
          y2={arm1.y}
          stroke="#38bdf8"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Ray 1 Arrow */}
        <circle cx={arm1.x} cy={arm1.y} r="5" fill="#38bdf8" />

        {/* Angle Ray 2 */}
        <line
          x1={vertex.x}
          y1={vertex.y}
          x2={arm2.x}
          y2={arm2.y}
          stroke="#f59e0b"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Ray 2 Arrow */}
        <circle cx={arm2.x} cy={arm2.y} r="5" fill="#f59e0b" />

        {/* Vertex Point */}
        <circle cx={vertex.x} cy={vertex.y} r="8" fill="#e11d48" stroke="#ffffff" strokeWidth="2" />
        <text
          x={vertex.x}
          y={vertex.y + 24}
          textAnchor="middle"
          fill="#fda4af"
          fontSize="12"
          fontWeight="bold"
        >
          Köşe (B)
        </text>

        {/* Arm 1 Label */}
        <text
          x={arm1.x + 12}
          y={arm1.y + 4}
          fill="#7dd3fc"
          fontSize="11"
          fontWeight="bold"
        >
          [BA Işını
        </text>

        {/* Arm 2 Label */}
        <text
          x={arm2.x - 10}
          y={arm2.y - 10}
          fill="#fcd34d"
          fontSize="11"
          fontWeight="bold"
        >
          [BC Işını
        </text>

        {/* Visual Angle Arc */}
        {currentQ.correctType === 'dik' ? (
          <g>
            <rect
              x={vertex.x}
              y={vertex.y - 28}
              width="28"
              height="28"
              fill="#10b981"
              fillOpacity="0.25"
              stroke="#10b981"
              strokeWidth="2.5"
            />
            <circle cx={vertex.x + 14} cy={vertex.y - 14} r="3.5" fill="#10b981" />
            <text x={vertex.x + 36} y={vertex.y - 14} fill="#34d399" fontSize="13" fontWeight="bold">
              90° Dik
            </text>
          </g>
        ) : (
          <g>
            {/* Circular arc highlighting angle opening */}
            <path
              d={`M ${vertex.x + 45} ${vertex.y} A 45 45 0 0 0 ${
                vertex.x + 45 * Math.cos((currentQ.angleValue * Math.PI) / 180)
              } ${
                vertex.y - 45 * Math.sin((currentQ.angleValue * Math.PI) / 180)
              }`}
              fill="none"
              stroke="#ec4899"
              strokeWidth="3"
            />
            <text
              x={vertex.x + 55}
              y={vertex.y - 25}
              fill="#f472b6"
              fontSize="14"
              fontWeight="bold"
            >
              {currentQ.angleValue}°
            </text>
          </g>
        )}

        {/* Interactive Protractor Overlay */}
        {showProtractor && (
          <g
            transform={`translate(${vertex.x}, ${vertex.y}) rotate(${protractorRotation})`}
            className="cursor-pointer transition-all duration-300"
            onClick={() => {
              sounds.playSnap();
              setProtractorRotation((prev) => (prev + 45) % 360);
            }}
          >
            {/* Protractor semi-circle plate */}
            <path
              d="M -120 0 A 120 120 0 0 1 120 0 Z"
              fill="#0284c7"
              fillOpacity="0.22"
              stroke="#38bdf8"
              strokeWidth="2.5"
              strokeDasharray="3,3"
            />
            {/* Base Line */}
            <line x1="-120" y1="0" x2="120" y2="0" stroke="#38bdf8" strokeWidth="2.5" />
            {/* Protractor Origin mark */}
            <circle cx="0" cy="0" r="4" fill="#38bdf8" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#38bdf8" strokeWidth="1.5" />
            {/* Degree Tick marks */}
            {[0, 30, 45, 60, 90, 120, 135, 150, 180].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const r1 = 110;
              const r2 = 120;
              return (
                <g key={deg}>
                  <line
                    x1={-r1 * Math.cos(rad)}
                    y1={-r1 * Math.sin(rad)}
                    x2={-r2 * Math.cos(rad)}
                    y2={-r2 * Math.sin(rad)}
                    stroke="#e0f2fe"
                    strokeWidth={deg % 45 === 0 ? "2" : "1"}
                  />
                  <text
                    x={-95 * Math.cos(rad)}
                    y={-95 * Math.sin(rad) + 4}
                    textAnchor="middle"
                    fill="#bae6fd"
                    fontSize="9"
                    fontWeight="bold"
                  >
                    {deg}°
                  </text>
                </g>
              );
            })}
          </g>
        )}
      </g>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title & Level Tracker */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Bölüm 2 / 3
              </span>
              <span className="text-xs text-slate-400">Mimari Açı Dedektifi</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {currentQ.title}
            </h2>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            {ANGLE_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => {
                  sounds.playClick();
                  setQuestionIndex(idx);
                  setSelectedAnswer(null);
                  setFeedback({ type: 'idle', message: '' });
                  setShowHint(false);
                }}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  questionIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                    : completedQuestions.includes(idx)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {completedQuestions.includes(idx) ? '✓' : idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Description */}
        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-700/40">
          <div className="text-sm text-slate-300">
            <p className="font-semibold text-white mb-1">
              🏢 {currentQ.structureName}
            </p>
            <p>{currentQ.scenario}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                sounds.playClick();
                setShowProtractor(!showProtractor);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border flex items-center gap-1.5 transition-colors ${
                showProtractor
                  ? 'bg-sky-600/30 text-sky-300 border-sky-500/50'
                  : 'bg-slate-800 text-slate-400 border-slate-700'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>{showProtractor ? 'İletkiyi Gizle' : 'İletkiyi (Açıölçer) Göster'}</span>
            </button>
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(!showHint);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>İpucu</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint with Angle & Scene */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative">
        {/* Hint alert */}
        {showHint && (
          <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-center gap-2 animate-in fade-in">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentQ.hint}</span>
          </div>
        )}

        {/* Protractor click tip */}
        {showProtractor && (
          <div className="mb-2 text-center text-xs text-sky-400/80">
            💡 İpucu: Mavi açıölçere tıklayarak yönünü döndürebilir ve açıyı hassasça ölçebilirsin!
          </div>
        )}

        {/* SVG Angle Canvas */}
        <div className="w-full aspect-[16/9] max-h-[440px] bg-slate-900/90 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
          <svg viewBox="0 0 600 400" className="w-full h-full select-none">
            {/* Background Grid */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`gx-${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="400"
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`gy-${i}`}
                x1="0"
                y1={i * 40}
                x2="600"
                y2={i * 40}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}

            {renderThematicIllustration()}
          </svg>
        </div>

        {/* Angle Classification Choices (4 Cards) */}
        <div className="mt-6">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
            Ölçülen Açının Türünü Seç:
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {/* Dar Açı */}
            <button
              onClick={() => handleSelectAnswer('dar')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedAnswer === 'dar'
                  ? currentQ.correctType === 'dar'
                    ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-400'
                  : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Dar Açı</span>
                <span className="text-xs px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">
                  &lt; 90°
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Ölçüsü 0° ile 90° arasında olan sivri açılar.
              </p>
            </button>

            {/* Dik Açı */}
            <button
              onClick={() => handleSelectAnswer('dik')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedAnswer === 'dik'
                  ? currentQ.correctType === 'dik'
                    ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-400'
                  : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Dik Açı</span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">
                  = 90°
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Ölçüsü tam 90° olan köşe açısı (L harfi gibi).
              </p>
            </button>

            {/* Geniş Açı */}
            <button
              onClick={() => handleSelectAnswer('genis')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedAnswer === 'genis'
                  ? currentQ.correctType === 'genis'
                    ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-400'
                  : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Geniş Açı</span>
                <span className="text-xs px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono">
                  90° - 180°
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                90° ile 180° arasında kolları ayrık olan açılar.
              </p>
            </button>

            {/* Doğru Açı */}
            <button
              onClick={() => handleSelectAnswer('dogru')}
              className={`p-4 rounded-2xl border text-left transition-all ${
                selectedAnswer === 'dogru'
                  ? currentQ.correctType === 'dogru'
                    ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-400'
                    : 'bg-rose-950/70 border-rose-500 ring-2 ring-rose-400'
                  : 'bg-slate-800/80 border-slate-700/70 hover:bg-slate-750 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-bold text-sm text-white">Doğru Açı</span>
                <span className="text-xs px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono">
                  = 180°
                </span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                Kolları zıt yönlü dümdüz bir doğru oluşturan açı.
              </p>
            </button>
          </div>
        </div>

        {/* Feedback Section */}
        {feedback.type !== 'idle' && (
          <div
            className={`mt-5 p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2 ${
              feedback.type === 'success'
                ? 'bg-emerald-950/60 border-emerald-500/60 text-emerald-200'
                : 'bg-rose-950/60 border-rose-500/60 text-rose-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <CheckCircle2
                className={`w-7 h-7 shrink-0 ${
                  feedback.type === 'success' ? 'text-emerald-400' : 'text-rose-400'
                }`}
              />
              <p className="text-sm font-medium">{feedback.message}</p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {feedback.type === 'error' && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tekrar Dene</span>
                </button>
              )}

              {feedback.type === 'success' && (
                <div>
                  {questionIndex < ANGLE_QUESTIONS.length - 1 ? (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-all hover:translate-x-0.5"
                    >
                      <span>Sıradaki Yapıya Geç</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/50">
                      Bölüm 2 Tamamlandı! 🔍
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
