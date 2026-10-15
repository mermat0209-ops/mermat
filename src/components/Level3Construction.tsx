import React, { useState } from 'react';
import { CONSTRUCTION_MISSIONS } from '../data/curriculumData';
import { ToolType, Point2D } from '../types/game';
import { sounds } from '../utils/audio';
import { 
  CheckCircle2, 
  HelpCircle, 
  RotateCcw, 
  ArrowRight, 
  Lightbulb,
  Ruler,
  Trees
} from 'lucide-react';

interface Level3ConstructionProps {
  onSuccess: (points: number) => void;
}

export const Level3Construction: React.FC<Level3ConstructionProps> = ({ onSuccess }) => {
  const [missionIndex, setMissionIndex] = useState(0);
  const [activeTool, setActiveTool] = useState<ToolType>('line');
  const [startPoint, setStartPoint] = useState<Point2D | null>(null);
  const [endPoint, setEndPoint] = useState<Point2D | null>(null);
  const [hoverGridPoint, setHoverGridPoint] = useState<Point2D | null>(null);
  const [feedback, setFeedback] = useState<{
    type: 'idle' | 'success' | 'error';
    message: string;
  }>({ type: 'idle', message: '' });
  const [showHint, setShowHint] = useState(false);
  const [completedMissions, setCompletedMissions] = useState<number[]>([]);

  const currentMission = CONSTRUCTION_MISSIONS[missionIndex];

  // Specific anchor points on the canvas for each mission
  const missionAnchors: Record<number, { p1: Point2D; p2: Point2D }> = {
    0: { p1: { x: 160, y: 220, label: 'A' }, p2: { x: 440, y: 220, label: 'B' } },
    1: { p1: { x: 120, y: 300, label: 'K (Fener)' }, p2: { x: 480, y: 140, label: 'L (Göl)' } },
    2: { p1: { x: 160, y: 240, label: 'C (Kıyı)' }, p2: { x: 400, y: 240, label: 'D (İskele)' } } // 240px span = 6 grid units of 40px
  };

  const anchors = missionAnchors[missionIndex];

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    sounds.playClick();
    if (feedback.type === 'success') return;

    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 600;
    const rawY = ((e.clientY - rect.top) / rect.height) * 400;

    // Snap to closest 40px grid node
    const snappedX = Math.round(rawX / 40) * 40;
    const snappedY = Math.round(rawY / 40) * 40;
    const clickedPoint: Point2D = { x: snappedX, y: snappedY };

    if (!startPoint) {
      setStartPoint(clickedPoint);
      sounds.playSnap();
    } else {
      setEndPoint(clickedPoint);
      validateConstruction(startPoint, clickedPoint);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 600;
    const rawY = ((e.clientY - rect.top) / rect.height) * 400;
    const snappedX = Math.round(rawX / 40) * 40;
    const snappedY = Math.round(rawY / 40) * 40;
    setHoverGridPoint({ x: snappedX, y: snappedY });
  };

  const validateConstruction = (p1: Point2D, p2: Point2D) => {
    // Check if right tool was used
    if (activeTool !== currentMission.type) {
      sounds.playWrong();
      setFeedback({
        type: 'error',
        message: `Yanlış Araç Seçildi! Görev için "${currentMission.symbol}" aracını kullanmalısın. Lütfen yukarıdan doğru inşa aracını seç.`
      });
      return;
    }

    if (missionIndex === 0) {
      // Line mission: Needs to pass through A and B
      const isA1 = Math.hypot(p1.x - anchors.p1.x, p1.y - anchors.p1.y) < 25;
      const isB2 = Math.hypot(p2.x - anchors.p2.x, p2.y - anchors.p2.y) < 25;
      const isA2 = Math.hypot(p2.x - anchors.p1.x, p2.y - anchors.p1.y) < 25;
      const isB1 = Math.hypot(p1.x - anchors.p2.x, p1.y - anchors.p2.y) < 25;

      if ((isA1 && isB2) || (isA2 && isB1)) {
        sounds.playCorrect();
        setFeedback({
          type: 'success',
          message: 'Tebrikler! İki farklı noktadan yalnız tek bir doğru geçer kuralını başarıyla uyguladın. ⟷AB doğrusu her iki yöne sınırsız uzanır.'
        });
        recordSuccess();
      } else {
        sounds.playWrong();
        setFeedback({
          type: 'error',
          message: 'Doğru tam olarak A ve B noktalarından geçmelidir! Noktaların üzerine dikkatlice tıkla.'
        });
      }
    } else if (missionIndex === 1) {
      // Ray mission: Must start at K and extend toward L
      const startsAtK = Math.hypot(p1.x - anchors.p1.x, p1.y - anchors.p1.y) < 25;
      const goesThroughL = Math.hypot(p2.x - anchors.p2.x, p2.y - anchors.p2.y) < 25;

      if (startsAtK && goesThroughL) {
        sounds.playCorrect();
        setFeedback({
          type: 'success',
          message: 'Harika bir Işın! K noktası sabit başlangıç noktası oldu ve fenerin ışığı L noktasından geçerek göle doğru sonsuza uzandı ([KL ışını).'
        });
        recordSuccess();
      } else if (!startsAtK) {
        sounds.playWrong();
        setFeedback({
          type: 'error',
          message: 'Işının başlangıç noktası sabit bir noktadır. Fenerin bulunduğu K noktasından başlamalısın!'
        });
      } else {
        sounds.playWrong();
        setFeedback({
          type: 'error',
          message: 'Işının yönü L noktasından geçmelidir. İkinci tıklamanı L noktasına yap.'
        });
      }
    } else if (missionIndex === 2) {
      // Segment mission: Must be exactly 6 grid units (240px)
      const distance = Math.hypot(p2.x - p1.x, p2.y - p1.y);
      const units = Math.round(distance / 40);

      const startsAtC = Math.hypot(p1.x - anchors.p1.x, p1.y - anchors.p1.y) < 25;

      if (startsAtC && units === 6) {
        sounds.playCorrect();
        setFeedback({
          type: 'success',
          message: `Mükemmel Ölçüm! Tam 6 birim kare uzunluğunda [CD] doğru parçası inşa ettin (|CD| = 6 br). İki ucu da sınırlıdır.`
        });
        recordSuccess();
      } else if (!startsAtC) {
        sounds.playWrong();
        setFeedback({
          type: 'error',
          message: 'İskele inşasına kıyıdaki C noktasından başlamalısın!'
        });
      } else {
        sounds.playWrong();
        setFeedback({
          type: 'error',
          message: `Çizdiğin parçanın uzunluğu ${units} birim oldu. Görevde tam 6 birim kare uzunluk isteniyor (40px x 6 = 240px). Tekrar dene!`
        });
      }
    }
  };

  const recordSuccess = () => {
    if (!completedMissions.includes(missionIndex)) {
      setCompletedMissions([...completedMissions, missionIndex]);
      onSuccess(120);
    }
  };

  const handleReset = () => {
    sounds.playClick();
    setStartPoint(null);
    setEndPoint(null);
    setFeedback({ type: 'idle', message: '' });
    setShowHint(false);
  };

  const handleNextMission = () => {
    sounds.playClick();
    if (missionIndex < CONSTRUCTION_MISSIONS.length - 1) {
      const nextIdx = missionIndex + 1;
      setMissionIndex(nextIdx);
      setActiveTool(CONSTRUCTION_MISSIONS[nextIdx].type);
      setStartPoint(null);
      setEndPoint(null);
      setFeedback({ type: 'idle', message: '' });
      setShowHint(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Title & Level Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded-full border border-amber-400/20">
                Bölüm 3 / 3
              </span>
              <span className="text-xs text-slate-400">Park & Peyzaj Geometrisi</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white">
              {currentMission.title}
            </h2>
          </div>

          {/* Stepper Buttons */}
          <div className="flex items-center gap-2">
            {CONSTRUCTION_MISSIONS.map((m, idx) => (
              <button
                key={m.id}
                onClick={() => {
                  sounds.playClick();
                  setMissionIndex(idx);
                  setActiveTool(m.type);
                  setStartPoint(null);
                  setEndPoint(null);
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

        {/* Mission Briefing */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2 text-slate-300 text-sm bg-slate-900/40 p-4 rounded-xl border border-slate-700/40">
            <p className="font-semibold text-white mb-1">
              🌳 İnşa Hedefi: {currentMission.symbol}
            </p>
            <p className="text-slate-300">{currentMission.description}</p>
          </div>

          <div className="bg-sky-950/30 p-4 rounded-xl border border-sky-800/40 text-sky-200 text-xs">
            <div className="flex items-center gap-1.5 font-bold mb-1 text-sky-400">
              <Trees className="w-4 h-4" />
              <span>Gerçek Hayat Bağlamı</span>
            </div>
            <p>{currentMission.realWorldContext}</p>
          </div>
        </div>
      </div>

      {/* Interactive Tool Palette & Construction Blueprint */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative">
        {/* Top Controls: Tool Selector & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-2xl border border-slate-800">
            <span className="text-xs font-semibold text-slate-400 px-2">Araç Seçimi:</span>

            {/* Line Tool */}
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTool('line');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'line'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>⟷</span>
              <span>Doğru</span>
            </button>

            {/* Ray Tool */}
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTool('ray');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'ray'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>[•→</span>
              <span>Işın</span>
            </button>

            {/* Segment Tool */}
            <button
              onClick={() => {
                sounds.playClick();
                setActiveTool('segment');
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'segment'
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>[••]</span>
              <span>Doğru Parçası</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playClick();
                setShowHint(!showHint);
              }}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 border border-amber-500/30 flex items-center gap-1 transition-colors"
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>İpucu</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Sıfırla</span>
            </button>
          </div>
        </div>

        {/* Hint banner */}
        {showHint && (
          <div className="mb-4 p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-amber-200 text-xs flex items-center gap-2 animate-in fade-in">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{currentMission.hint}</span>
          </div>
        )}

        {/* Instruction Step Bar */}
        <div className="mb-3 text-xs text-slate-400 flex items-center justify-between">
          <span>
            {!startPoint
              ? 'Başlangıç için 1. noktaya tıkla'
              : !endPoint
              ? 'Çizimi bitirmek için 2. noktaya tıkla'
              : 'İnşa tamamlandı, kontroller yapıldı.'}
          </span>
          {startPoint && hoverGridPoint && !endPoint && (
            <span className="text-amber-400 font-mono font-semibold flex items-center gap-1">
              <Ruler className="w-3 h-3" />
              Mesafe: {Math.round(Math.hypot(hoverGridPoint.x - startPoint.x, hoverGridPoint.y - startPoint.y) / 40)} birim kare
            </span>
          )}
        </div>

        {/* SVG Drawing Canvas */}
        <div className="w-full aspect-[16/9] max-h-[460px] bg-slate-900/95 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner cursor-crosshair">
          <svg
            viewBox="0 0 600 400"
            className="w-full h-full select-none"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
          >
            <defs>
              <marker id="constArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
            </defs>

            {/* Grid Pattern with coordinates */}
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={`cgx-${i}`}
                x1={i * 40}
                y1="0"
                x2={i * 40}
                y2="400"
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 11 }).map((_, i) => (
              <line
                key={`cgy-${i}`}
                x1="0"
                y1={i * 40}
                x2="600"
                y2={i * 40}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}

            {/* Grid Intersection Points (Snap Nodes) */}
            {Array.from({ length: 15 }).map((_, xIdx) =>
              Array.from({ length: 9 }).map((_, yIdx) => {
                const px = (xIdx + 1) * 40;
                const py = (yIdx + 1) * 40;
                return (
                  <circle
                    key={`dot-${px}-${py}`}
                    cx={px}
                    cy={py}
                    r="1.5"
                    fill="#334155"
                  />
                );
              })
            )}

            {/* Decorative Theme Elements for each mission */}
            {missionIndex === 1 && (
              <g opacity="0.35">
                {/* Lighthouse shape */}
                <polygon points="105,320 135,320 128,260 112,260" fill="#cbd5e1" />
                <rect x="110" y="248" width="20" height="12" fill="#f59e0b" />
                <circle cx="120" cy="240" r="10" fill="#38bdf8" />
                <text x="120" y="340" fill="#94a3b8" fontSize="10" textAnchor="middle">Deniz Feneri</text>
              </g>
            )}

            {missionIndex === 2 && (
              <g opacity="0.3">
                {/* Park Lake */}
                <ellipse cx="400" cy="250" rx="140" ry="80" fill="#0369a1" />
                <text x="440" y="260" fill="#7dd3fc" fontSize="11" textAnchor="middle">Doğal Gölet</text>
              </g>
            )}

            {/* Mission Anchor Points */}
            <g>
              {/* Point 1 */}
              <circle
                cx={anchors.p1.x}
                cy={anchors.p1.y}
                r="10"
                fill="#f43f5e"
                fillOpacity="0.2"
                stroke="#f43f5e"
                strokeWidth="2"
                className="animate-pulse"
              />
              <circle cx={anchors.p1.x} cy={anchors.p1.y} r="5" fill="#f43f5e" />
              <text
                x={anchors.p1.x}
                y={anchors.p1.y - 14}
                textAnchor="middle"
                fill="#fda4af"
                fontSize="12"
                fontWeight="bold"
              >
                {anchors.p1.label}
              </text>

              {/* Point 2 */}
              <circle
                cx={anchors.p2.x}
                cy={anchors.p2.y}
                r="10"
                fill="#0ea5e9"
                fillOpacity="0.2"
                stroke="#0ea5e9"
                strokeWidth="2"
                className="animate-pulse"
              />
              <circle cx={anchors.p2.x} cy={anchors.p2.y} r="5" fill="#0ea5e9" />
              <text
                x={anchors.p2.x}
                y={anchors.p2.y - 14}
                textAnchor="middle"
                fill="#7dd3fc"
                fontSize="12"
                fontWeight="bold"
              >
                {anchors.p2.label}
              </text>
            </g>

            {/* Hover Indicator Node */}
            {hoverGridPoint && !endPoint && (
              <circle
                cx={hoverGridPoint.x}
                cy={hoverGridPoint.y}
                r="6"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                strokeDasharray="2,2"
              />
            )}

            {/* Dynamic preview line while drawing */}
            {startPoint && !endPoint && hoverGridPoint && (
              <line
                x1={startPoint.x}
                y1={startPoint.y}
                x2={hoverGridPoint.x}
                y2={hoverGridPoint.y}
                stroke="#f59e0b"
                strokeWidth="2.5"
                strokeDasharray="4,4"
              />
            )}

            {/* Final Constructed Object Rendering */}
            {startPoint && endPoint && (
              <g className="animate-in fade-in">
                {/* 1. Line: Extends both ways infinitely */}
                {activeTool === 'line' && (
                  <g>
                    {/* Extended line */}
                    <line
                      x1={startPoint.x - (endPoint.x - startPoint.x) * 1.5}
                      y1={startPoint.y - (endPoint.y - startPoint.y) * 1.5}
                      x2={endPoint.x + (endPoint.x - startPoint.x) * 1.5}
                      y2={endPoint.y + (endPoint.y - startPoint.y) * 1.5}
                      stroke={feedback.type === 'success' ? '#10b981' : '#38bdf8'}
                      strokeWidth="3.5"
                      markerStart="url(#constArrow)"
                      markerEnd="url(#constArrow)"
                    />
                    <text
                      x={(startPoint.x + endPoint.x) / 2}
                      y={(startPoint.y + endPoint.y) / 2 - 14}
                      fill="#34d399"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      ⟷ Doğru (İki Yöne Sonsuz)
                    </text>
                  </g>
                )}

                {/* 2. Ray: Fixed start, infinite other end */}
                {activeTool === 'ray' && (
                  <g>
                    {/* Solid start point dot */}
                    <circle cx={startPoint.x} cy={startPoint.y} r="7" fill="#f59e0b" />
                    {/* Extended ray */}
                    <line
                      x1={startPoint.x}
                      y1={startPoint.y}
                      x2={endPoint.x + (endPoint.x - startPoint.x) * 1.2}
                      y2={endPoint.y + (endPoint.y - startPoint.y) * 1.2}
                      stroke={feedback.type === 'success' ? '#10b981' : '#f59e0b'}
                      strokeWidth="3.5"
                      markerEnd="url(#constArrow)"
                    />
                    <text
                      x={(startPoint.x + endPoint.x) / 2}
                      y={(startPoint.y + endPoint.y) / 2 - 14}
                      fill="#fcd34d"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      [•→ Işın (Başlangıç Kapalı, Yön Sonsuz)
                    </text>
                  </g>
                )}

                {/* 3. Segment: Fixed both ends with bracket circles */}
                {activeTool === 'segment' && (
                  <g>
                    <line
                      x1={startPoint.x}
                      y1={startPoint.y}
                      x2={endPoint.x}
                      y2={endPoint.y}
                      stroke={feedback.type === 'success' ? '#10b981' : '#a855f7'}
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                    {/* End caps */}
                    <circle cx={startPoint.x} cy={startPoint.y} r="6" fill="#a855f7" />
                    <circle cx={endPoint.x} cy={endPoint.y} r="6" fill="#a855f7" />
                    <text
                      x={(startPoint.x + endPoint.x) / 2}
                      y={(startPoint.y + endPoint.y) / 2 - 14}
                      fill="#c084fc"
                      fontSize="12"
                      fontWeight="bold"
                      textAnchor="middle"
                    >
                      [••] Doğru Parçası (|CD| = {Math.round(Math.hypot(endPoint.x - startPoint.x, endPoint.y - startPoint.y) / 40)} br)
                    </text>
                  </g>
                )}
              </g>
            )}
          </svg>
        </div>

        {/* Feedback Section */}
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

            <div className="flex items-center gap-2 shrink-0">
              {feedback.type === 'error' && (
                <button
                  onClick={handleReset}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Tekrar Çiz</span>
                </button>
              )}

              {feedback.type === 'success' && (
                <div>
                  {missionIndex < CONSTRUCTION_MISSIONS.length - 1 ? (
                    <button
                      onClick={handleNextMission}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-emerald-500/30 transition-all hover:translate-x-0.5"
                    >
                      <span>Sıradaki İnşaya Geç</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <span className="text-xs font-bold bg-emerald-500/30 text-emerald-300 px-3 py-1.5 rounded-lg border border-emerald-500/50">
                      Bölüm 3 Tamamlandı! 🏗️
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
