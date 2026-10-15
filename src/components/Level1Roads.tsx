import React, { useState } from 'react';
import { ROAD_MISSIONS } from '../data/curriculumData';
import { areParallel, arePerpendicular } from '../utils/geometry';
import { sounds } from '../utils/audio';
import { 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  Lightbulb, 
  Info,
  Car
} from 'lucide-react';

interface Level1RoadsProps {
  onSuccess: (points: number) => void;
}

export const Level1Roads: React.FC<Level1RoadsProps> = ({ onSuccess }) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [selectedPointIds, setSelectedPointIds] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [showHint, setShowHint] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const currentMission = ROAD_MISSIONS[missionIndex];

  const handlePointClick = (idx: number) => {
    sounds.playClick();
    if (feedback.type === 'success') return;

    if (selectedPointIds.includes(idx)) {
      setSelectedPointIds(selectedPointIds.filter((i) => i !== idx));
      return;
    }

    if (selectedPointIds.length < 2) {
      const nextSelected = [...selectedPointIds, idx];
      setSelectedPointIds(nextSelected);

      if (nextSelected.length === 2) {
        validateRoad(nextSelected[0], nextSelected[1]);
      }
    }
  };

  const validateRoad = (idx1: number, idx2: number) => {
    const p1 = currentMission.targetPoints[idx1];
    const p2 = currentMission.targetPoints[idx2];
    const baseP1 = { x: currentMission.baseRoad.x1, y: currentMission.baseRoad.y1 };
    const baseP2 = { x: currentMission.baseRoad.x2, y: currentMission.baseRoad.y2 };

    let isCorrect = false;
    let reason = '';

    if (currentMission.concept === 'paralel') {
      const parallel = areParallel(baseP1, baseP2, p1, p2);
      if (parallel) {
        isCorrect = true;
        reason = `Mükemmel! ${p1.label} ve ${p2.label} noktalarından geçen yol, ${currentMission.baseRoad.name}'na TAM PARALELDİR! Aralarındaki uzaklık her yerde aynıdır ve asla kesişmezler (${currentMission.symbolNote}).`;
      } else {
        reason = `Bu iki nokta arasındaki yol, ana caddeyle paralel değil! İleride caddeyle kesişir. Paralel yolların ana caddeye olan dik uzaklıkları her noktada eşit olmalıdır.`;
      }
    } else if (currentMission.concept === 'dik') {
      const perp = arePerpendicular(baseP1, baseP2, p1, p2);
      if (perp) {
        isCorrect = true;
        reason = `Harika Mühendislik! ${p1.label} ve ${p2.label} noktalarını birleştiren acil servis yolu, caddeyi TAM 90° DİK açıyla kesmektedir (${currentMission.symbolNote}).`;
      } else {
        reason = `Çizdiğin yol caddeyi 90° dik açıyla kesmiyor! Acil servis araçlarının en kısa yoldan ulaşması için tam dikey (dik) bir yol seçmelisin.`;
      }
    } else if (currentMission.concept === 'kesisen') {
      const parallel = areParallel(baseP1, baseP2, p1, p2);
      const perp = arePerpendicular(baseP1, baseP2, p1, p2);
      // We want intersecting, non-perpendicular, non-parallel
      if (!parallel && !perp) {
        isCorrect = true;
        reason = `Tebrikler! ${p1.label} ve ${p2.label} noktaları ana bulvar ile tek bir ortak noktada kesişen şık bir yürüyüş yolu oluşturdu (${currentMission.symbolNote}).`;
      } else if (parallel) {
        reason = `Bu yol ana bulvara paralel olduğu için onunla hiç kesişmez! Biz kesişen bir yol arıyoruz.`;
      } else {
        reason = `Bu yol dik kesişiyor; çapraz bir kesişim yolu için eğik uzanan noktaları seçmelisin.`;
      }
    }

    if (isCorrect) {
      sounds.playCorrect();
      setFeedback({ type: 'success', message: reason });
      if (!completedMissions.includes(missionIndex)) {
        setCompletedMissions([...completedMissions, missionIndex]);
        onSuccess(100);
      }
    } else {
      sounds.playWrong();
      setFeedback({ type: 'error', message: reason });
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setSelectedPointIds([]);
    setFeedback({ type: 'idle', message: '' });
    setShowHint(false);
  };

  const handleNextMission = () => {
    sounds.playClick();
    if (missionIndex < ROAD_MISSIONS.length - 1) {
      setMissionIndex(missionIndex + 1);
      setSelectedPointIds([]);
      setFeedback({ type: 'idle', message: '' });
      setShowHint(false);
    }
  };

  const selectedPoints = selectedPointIds.map((idx) => currentMission.targetPoints[idx]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Level Title & Stepper */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Bölüm 1 / 3
              </span>
              <span className="text-xs text-slate-400">Şehir Ulaşım Planlaması</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {currentMission.title}
            </h2>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            {ROAD_MISSIONS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  sounds.playClick();
                  setMissionIndex(idx);
                  setSelectedPointIds([]);
                  setFeedback({ type: 'idle', message: '' });
                  setShowHint(false);
                }}
                className={`w-9 h-9 rounded-xl font-bold text-xs flex items-center justify-center transition-all ${
                  missionIndex === idx
                    ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30 ring-2 ring-amber-400'
                    : completedMissions.includes(idx)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {completedMissions.includes(idx) ? '✓' : idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Mission Description & TYMM Pedagogical Note */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 text-slate-300 text-sm leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-700/40">
            <p className="font-medium text-slate-100 mb-1">
              🎯 <strong className="text-amber-300">Görev Yönergesi:</strong>
            </p>
            {currentMission.description}
          </div>
          <div className="text-xs bg-emerald-950/30 p-4 rounded-xl border border-emerald-800/40 text-emerald-200">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-emerald-400">
              <Info className="w-4 h-4" />
              <span>TYMM Matematik Bilgisi</span>
            </div>
            <p>{currentMission.pedagogicalNote}</p>
          </div>
        </div>
      </div>

      {/* Interactive Blueprint / Canvas */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative overflow-hidden">
        {/* City Blueprint Grid Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-4 z-10 relative">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50">
              {selectedPointIds.length === 0
                ? 'Bağlamak istediğin 1. noktaya tıkla'
                : selectedPointIds.length === 1
                ? 'Yolu tamamlamak için 2. noktaya tıkla'
                : 'Yol inşası tamamlandı!'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(!showHint);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>İpucu</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-center gap-2 animate-in fade-in">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentMission.hint}</span>
          </div>
        )}

        {/* SVG Drawing Canvas */}
        <div className="w-full aspect-[16/9] max-h-[460px] bg-slate-900/90 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner">
          <svg
            viewBox="0 0 600 420"
            className="w-full h-full select-none"
          >
            <defs>
              {/* Pattern for road dashes */}
              <pattern id="roadStripes" width="20" height="4" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="10" height="4" fill="#fbbf24" opacity="0.8" />
              </pattern>
              {/* Arrow marker for lines */}
              <marker id="arrowLine" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="arrowBase" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#f43f5e" />
              </marker>
            </defs>

            {/* Subtle Grid Lines */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line
                key={`grid-x-${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="420"
                stroke="#334155"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`grid-y-${i}`}
                x1="0"
                y1={i * 40}
                x2="600"
                y2={i * 40}
                stroke="#334155"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            ))}

            {/* Base Road (Existing City Avenue) */}
            <g className="cursor-default">
              {/* Road Asphalt */}
              <line
                x1={currentMission.baseRoad.x1}
                y1={currentMission.baseRoad.y1}
                x2={currentMission.baseRoad.x2}
                y2={currentMission.baseRoad.y2}
                stroke="#1e293b"
                strokeWidth="32"
                strokeLinecap="round"
              />
              {/* Road Border Curbs */}
              <line
                x1={currentMission.baseRoad.x1}
                y1={currentMission.baseRoad.y1 - 15}
                x2={currentMission.baseRoad.x2}
                y2={currentMission.baseRoad.y2 - 15}
                stroke="#475569"
                strokeWidth="2"
              />
              <line
                x1={currentMission.baseRoad.x1}
                y1={currentMission.baseRoad.y1 + 15}
                x2={currentMission.baseRoad.x2}
                y2={currentMission.baseRoad.y2 + 15}
                stroke="#475569"
                strokeWidth="2"
              />
              {/* Middle Dashed Line */}
              <line
                x1={currentMission.baseRoad.x1 + 10}
                y1={currentMission.baseRoad.y1}
                x2={currentMission.baseRoad.x2 - 10}
                y2={currentMission.baseRoad.y2}
                stroke="#fbbf24"
                strokeWidth="3"
                strokeDasharray="14,10"
              />
              {/* Infinite arrows representing geometric line */}
              <line
                x1={currentMission.baseRoad.x1 - 35}
                y1={currentMission.baseRoad.y1}
                x2={currentMission.baseRoad.x2 + 35}
                y2={currentMission.baseRoad.y2}
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeDasharray="4,3"
                markerStart="url(#arrowBase)"
                markerEnd="url(#arrowBase)"
              />
              {/* Road Name Label Tag */}
              <rect
                x={210}
                y={currentMission.baseRoad.y1 - 34}
                width="180"
                height="22"
                rx="6"
                fill="#0f172a"
                stroke="#f43f5e"
                strokeWidth="1.5"
              />
              <text
                x="300"
                y={currentMission.baseRoad.y1 - 19}
                textAnchor="middle"
                fill="#fca5a5"
                fontSize="11"
                fontWeight="bold"
              >
                🛣️ {currentMission.baseRoad.name}
              </text>
            </g>

            {/* Constructed Road Line when 2 points are selected */}
            {selectedPoints.length === 2 && (
              <g className="animate-in fade-in">
                {/* Visual road body */}
                <line
                  x1={selectedPoints[0].x}
                  y1={selectedPoints[0].y}
                  x2={selectedPoints[1].x}
                  y2={selectedPoints[1].y}
                  stroke={feedback.type === 'success' ? '#10b981' : '#f59e0b'}
                  strokeWidth="20"
                  strokeLinecap="round"
                  opacity="0.8"
                />
                {/* Center stripe */}
                <line
                  x1={selectedPoints[0].x}
                  y1={selectedPoints[0].y}
                  x2={selectedPoints[1].x}
                  y2={selectedPoints[1].y}
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeDasharray="6,6"
                />
                {/* Geometric infinite line representation */}
                <line
                  x1={selectedPoints[0].x - (selectedPoints[1].x - selectedPoints[0].x) * 0.3}
                  y1={selectedPoints[0].y - (selectedPoints[1].y - selectedPoints[0].y) * 0.3}
                  x2={selectedPoints[1].x + (selectedPoints[1].x - selectedPoints[0].x) * 0.3}
                  y2={selectedPoints[1].y + (selectedPoints[1].y - selectedPoints[0].y) * 0.3}
                  stroke={feedback.type === 'success' ? '#34d399' : '#38bdf8'}
                  strokeWidth="2.5"
                  markerStart="url(#arrowLine)"
                  markerEnd="url(#arrowLine)"
                />

                {/* Right Angle Box marker if perpendicular and verified */}
                {currentMission.concept === 'dik' && feedback.type === 'success' && (
                  <g>
                    <rect
                      x="300"
                      y="196"
                      width="24"
                      height="24"
                      fill="#10b981"
                      fillOpacity="0.25"
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                    <circle cx="312" cy="208" r="3" fill="#10b981" />
                    <text x="330" y="214" fill="#34d399" fontSize="12" fontWeight="bold">90° Dik</text>
                  </g>
                )}
              </g>
            )}

            {/* Candidate Target Points (A, B, C, D / K, L, M, N) */}
            {currentMission.targetPoints.map((pt, idx) => {
              const isSelected = selectedPointIds.includes(idx);
              return (
                <g
                  key={pt.id}
                  onClick={() => handlePointClick(idx)}
                  className="cursor-pointer group"
                >
                  {/* Pulsing ring on hover/select */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 18 : 12}
                    fill={isSelected ? '#38bdf8' : '#0284c7'}
                    fillOpacity={isSelected ? 0.3 : 0.15}
                    stroke={isSelected ? '#38bdf8' : '#38bdf8'}
                    strokeWidth={isSelected ? 2.5 : 1.5}
                    className="transition-all duration-200 group-hover:scale-125"
                  />
                  {/* Point core */}
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={isSelected ? 7 : 5}
                    fill={isSelected ? '#f59e0b' : '#38bdf8'}
                  />
                  {/* Point Label badge */}
                  <rect
                    x={pt.x - 12}
                    y={pt.y - 34}
                    width="24"
                    height="20"
                    rx="5"
                    fill="#0f172a"
                    stroke={isSelected ? '#f59e0b' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text
                    x={pt.x}
                    y={pt.y - 20}
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="12"
                    fontWeight="bold"
                  >
                    {pt.label}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Feedback Area */}
        {feedback.type !== 'idle' && (
          <div
            className={`mt-4 p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-4 animate-in slide-in-from-bottom-2 ${
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

            {feedback.type === 'success' && (
              <div className="flex items-center gap-2 shrink-0">
                {missionIndex < ROAD_MISSIONS.length - 1 ? (
                  <button
                    onClick={handleNextMission}
                    className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-all hover:translate-x-0.5"
                  >
                    <span>Sıradaki Göreve Geç</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/50">
                    Bölüm 1 Tamamlandı! 🎉
                  </span>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Real-world engineering comparison card */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs">Paralel Şeritler</h4>
            <p className="text-slate-400 text-xs mt-1">
              Otoyollar ve raylar asla kesişmez; böylece araçlar güvenle yan yana ilerler.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
            <div className="font-bold text-sm">⊥</div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs">Dik Kesişim (90°)</h4>
            <p className="text-slate-400 text-xs mt-1">
              Şehir kavşakları ve binaların temelleri en yüksek dayanıklılık için 90° dik inşa edilir.
            </p>
          </div>
        </div>

        <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/50 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
            <div className="font-bold text-sm">✕</div>
          </div>
          <div>
            <h4 className="font-semibold text-white text-xs">Kesişen Yollar</h4>
            <p className="text-slate-400 text-xs mt-1">
              Tek bir dönel kavşakta buluşarak farklı yönlere akıcı ulaşım imkanı sağlar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
