import React, { useState } from 'react';
import { Point2D, GeometricElement, ToolType } from '../types/game';
import { areParallel, arePerpendicular, calculateAngleDeg, classifyAngle, getAngleTypeName } from '../utils/geometry';
import { sounds } from '../utils/audio';
import { 
  Pencil, 
  Trash2, 
  RotateCcw, 
  Maximize2, 
  TreePine, 
  Lamp, 
  Ruler,
  Layers,
  Sparkles
} from 'lucide-react';

export const SandboxStudio: React.FC = () => {
  const [activeTool, setActiveTool] = useState<ToolType | 'tree' | 'lamp' | 'bench'>('segment');
  const [elements, setElements] = useState<GeometricElement[]>([]);
  const [decorations, setDecorations] = useState<{ id: string; type: 'tree' | 'lamp' | 'bench'; x: number; y: number }[]>([]);
  const [tempStart, setTempStart] = useState<Point2D | null>(null);
  const [hoverPos, setHoverPos] = useState<Point2D | null>(null);
  const [showProtractor, setShowProtractor] = useState(false);
  const [protractorPos, setProtractorPos] = useState<{ x: number; y: number }>({ x: 300, y: 200 });

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const handleCanvasClick = (e: React.MouseEvent<SVGSVGElement>) => {
    sounds.playClick();
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 700;
    const rawY = ((e.clientY - rect.top) / rect.height) * 450;

    // Snap to 35px grid
    const sx = Math.round(rawX / 35) * 35;
    const sy = Math.round(rawY / 35) * 35;
    const point: Point2D = { x: sx, y: sy };

    // Decorations
    if (activeTool === 'tree' || activeTool === 'lamp' || activeTool === 'bench') {
      sounds.playSnap();
      setDecorations((prev) => [
        ...prev,
        { id: `dec-${Date.now()}`, type: activeTool, x: sx, y: sy }
      ]);
      return;
    }

    if (activeTool === 'eraser') {
      // Find closest element or decoration and remove
      const remainingElements = elements.filter(
        (el) => Math.hypot(el.p1.x - sx, el.p1.y - sy) > 25 && (!el.p2 || Math.hypot(el.p2.x - sx, el.p2.y - sy) > 25)
      );
      const remainingDecs = decorations.filter((d) => Math.hypot(d.x - sx, d.y - sy) > 25);
      setElements(remainingElements);
      setDecorations(remainingDecs);
      return;
    }

    if (activeTool === 'protractor') {
      sounds.playSnap();
      setProtractorPos({ x: sx, y: sy });
      setShowProtractor(true);
      return;
    }

    if (activeTool === 'point') {
      const label = alphabet[elements.length % alphabet.length];
      const newEl: GeometricElement = {
        id: `el-${Date.now()}`,
        type: 'point',
        p1: { ...point, label },
        color: '#f59e0b'
      };
      setElements((prev) => [...prev, newEl]);
      sounds.playSnap();
      return;
    }

    // Two-point geometric element (line, ray, segment)
    if (!tempStart) {
      const label = alphabet[(elements.length * 2) % alphabet.length];
      setTempStart({ ...point, label });
      sounds.playSnap();
    } else {
      if (tempStart.x === point.x && tempStart.y === point.y) return; // avoid zero length
      const p2Label = alphabet[(elements.length * 2 + 1) % alphabet.length];
      const p2: Point2D = { ...point, label: p2Label };
      const dist = Math.round(Math.hypot(p2.x - tempStart.x, p2.y - tempStart.y) / 35);

      const newEl: GeometricElement = {
        id: `el-${Date.now()}`,
        type: activeTool as 'line' | 'ray' | 'segment',
        p1: tempStart,
        p2,
        length: dist,
        color: activeTool === 'line' ? '#38bdf8' : activeTool === 'ray' ? '#fbbf24' : '#34d399'
      };

      setElements((prev) => [...prev, newEl]);
      setTempStart(null);
      sounds.playCorrect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rawX = ((e.clientX - rect.left) / rect.width) * 700;
    const rawY = ((e.clientY - rect.top) / rect.height) * 450;
    const sx = Math.round(rawX / 35) * 35;
    const sy = Math.round(rawY / 35) * 35;
    setHoverPos({ x: sx, y: sy });
  };

  const handleClear = () => {
    sounds.playClick();
    setElements([]);
    setDecorations([]);
    setTempStart(null);
  };

  // Automated Mathematical Analysis of Drawn Elements
  const getAnalysisInsights = () => {
    const insights: string[] = [];
    const linesAndSegments = elements.filter((e) => e.p2 !== undefined);

    if (elements.length === 0) {
      return ['Henüz çizim yapmadın. Yukarıdaki araçları seçerek tuvale tıkla!'];
    }

    // Check pairs for parallel or perpendicular relationships
    for (let i = 0; i < linesAndSegments.length; i++) {
      for (let j = i + 1; j < linesAndSegments.length; j++) {
        const e1 = linesAndSegments[i];
        const e2 = linesAndSegments[j];
        if (!e1.p2 || !e2.p2) continue;

        if (areParallel(e1.p1, e1.p2, e2.p1, e2.p2)) {
          insights.push(
            `✨ [${e1.p1.label || ''}${e1.p2.label || ''}] ile [${e2.p1.label || ''}${e2.p2.label || ''}] doğruları birbirine PARALELDİR (${e1.p1.label || ''}${e1.p2.label || ''} // ${e2.p1.label || ''}${e2.p2.label || ''}). Asla kesişmezler!`
          );
        } else if (arePerpendicular(e1.p1, e1.p2, e2.p1, e2.p2)) {
          insights.push(
            `📐 [${e1.p1.label || ''}${e1.p2.label || ''}] ile [${e2.p1.label || ''}${e2.p2.label || ''}] doğruları birbirine DİKTİR (${e1.p1.label || ''}${e1.p2.label || ''} ⊥ ${e2.p1.label || ''}${e2.p2.label || ''}). Kesişme açısı 90° dir.`
          );
        } else {
          // Calculate angle between them if sharing a point
          let shared: Point2D | null = null;
          let arm1: Point2D | null = null;
          let arm2: Point2D | null = null;

          if (e1.p1.x === e2.p1.x && e1.p1.y === e2.p1.y) {
            shared = e1.p1; arm1 = e1.p2; arm2 = e2.p2;
          } else if (e1.p2.x === e2.p1.x && e1.p2.y === e2.p1.y) {
            shared = e1.p2; arm1 = e1.p1; arm2 = e2.p2;
          } else if (e1.p1.x === e2.p2.x && e1.p1.y === e2.p2.y) {
            shared = e1.p1; arm1 = e1.p2; arm2 = e2.p1;
          } else if (e1.p2.x === e2.p2.x && e1.p2.y === e2.p2.y) {
            shared = e1.p2; arm1 = e1.p1; arm2 = e2.p1;
          }

          if (shared && arm1 && arm2) {
            const deg = calculateAngleDeg(shared, arm1, arm2);
            const type = classifyAngle(deg);
            insights.push(
              `🔍 Ortak köşe ${shared.label} noktasında açı oluştu: s(${arm1.label}̂${shared.label}${arm2.label}) = ${deg}° ➔ ${getAngleTypeName(type)}`
            );
          }
        }
      }
    }

    if (insights.length === 0) {
      insights.push(
        `Çizimde ${elements.length} adet geometrik öge bulunuyor. Birden fazla doğru veya parça çizerek aralarındaki paralellik, diklik ve açı ilişkilerini görebilirsin.`
      );
    }

    return insights;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Studio Header */}
      <div className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-700/60">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                Serbest Tasarım Modu
              </span>
              <span className="text-xs text-slate-400">Geometri Tahtası & Park İnşası</span>
            </div>
            <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
              <span>Mimar Stüdyosu: Serbest İnşa & Analiz Laboratuvarı</span>
              <Sparkles className="w-5 h-5 text-amber-400" />
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleClear}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-300 hover:text-rose-200 border border-slate-700 hover:border-rose-700/50 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Tahtayı Temizle</span>
            </button>
          </div>
        </div>

        <p className="text-slate-300 text-xs mt-3">
          Öğrendiğin tüm bilgileri kullanarak kendi parkını, yollarını ve binalarını serbestçe tasarla. Sistem, çizdiğin doğrular arasındaki paralellik, diklik ve açı durumlarını alttaki analiz panelinde otomatik olarak hesaplar!
        </p>
      </div>

      {/* Main Studio Workspace */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-4 md:p-6 shadow-2xl relative">
        {/* Tool Palette Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 bg-slate-900 p-2 rounded-2xl border border-slate-800">
          {/* Geometric Tools */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 px-2">Geometrik Araçlar:</span>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('point'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'point'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
              <span>Nokta</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('line'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'line'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>⟷</span>
              <span>Doğru</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('ray'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'ray'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>[•→</span>
              <span>Işın</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('segment'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'segment'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <span>[••]</span>
              <span>Doğru Parçası</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('protractor'); }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTool === 'protractor'
                  ? 'bg-sky-500 text-slate-950 shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Açıölçer Koy</span>
            </button>
          </div>

          {/* City / Park Decor Tools */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-slate-400 px-2">Şehir Objeleri:</span>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('tree'); }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                activeTool === 'tree' ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <TreePine className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ağaç</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('lamp'); }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                activeTool === 'lamp' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Lamp className="w-3.5 h-3.5 text-amber-300" />
              <span>Lamba</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('bench'); }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                activeTool === 'bench' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-indigo-300" />
              <span>Bank</span>
            </button>

            <button
              onClick={() => { sounds.playClick(); setActiveTool('eraser'); }}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1 ${
                activeTool === 'eraser' ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
              }`}
            >
              <Trash2 className="w-3.5 h-3.5 text-rose-300" />
              <span>Silgi</span>
            </button>
          </div>
        </div>

        {/* Dynamic Canvas Area */}
        <div className="w-full aspect-[16/9] max-h-[480px] bg-slate-900/95 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center shadow-inner cursor-crosshair">
          <svg
            viewBox="0 0 700 450"
            className="w-full h-full select-none"
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
          >
            <defs>
              <marker id="sbArrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
              </marker>
              <marker id="sbArrowRay" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#fbbf24" />
              </marker>
            </defs>

            {/* Grid Pattern: 35px spacing */}
            {Array.from({ length: 21 }).map((_, i) => (
              <line
                key={`sgx-${i}`}
                x1={i * 35}
                y1="0"
                x2={i * 35}
                y2="450"
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}
            {Array.from({ length: 14 }).map((_, i) => (
              <line
                key={`sgy-${i}`}
                x1="0"
                y1={i * 35}
                x2="700"
                y2={i * 35}
                stroke="#1e293b"
                strokeWidth="1"
              />
            ))}

            {/* Grid Dots */}
            {Array.from({ length: 20 }).map((_, xi) =>
              Array.from({ length: 13 }).map((_, yi) => (
                <circle
                  key={`sd-${xi}-${yi}`}
                  cx={(xi + 1) * 35}
                  cy={(yi + 1) * 35}
                  r="1.5"
                  fill="#334155"
                />
              ))
            )}

            {/* Drawn Decorations */}
            {decorations.map((d) => (
              <g key={d.id} className="animate-in fade-in">
                {d.type === 'tree' && (
                  <g>
                    <circle cx={d.x} cy={d.y - 12} r="14" fill="#10b981" opacity="0.8" />
                    <circle cx={d.x - 6} cy={d.y - 10} r="10" fill="#059669" />
                    <circle cx={d.x + 6} cy={d.y - 10} r="10" fill="#34d399" />
                    <rect x={d.x - 2.5} y={d.y} width="5" height="12" fill="#78350f" />
                  </g>
                )}
                {d.type === 'lamp' && (
                  <g>
                    <circle cx={d.x} cy={d.y - 14} r="6" fill="#fef08a" className="animate-pulse" />
                    <line x1={d.x} y1={d.y - 14} x2={d.x} y2={d.y} stroke="#64748b" strokeWidth="2.5" />
                    <line x1={d.x - 5} y1={d.y} x2={d.x + 5} y2={d.y} stroke="#64748b" strokeWidth="3" />
                  </g>
                )}
                {d.type === 'bench' && (
                  <g>
                    <rect x={d.x - 14} y={d.y - 6} width="28" height="6" rx="2" fill="#d97706" />
                    <line x1={d.x - 10} y1={d.y} x2={d.x - 10} y2={d.y + 6} stroke="#475569" strokeWidth="2" />
                    <line x1={d.x + 10} y1={d.y} x2={d.x + 10} y2={d.y + 6} stroke="#475569" strokeWidth="2" />
                  </g>
                )}
              </g>
            ))}

            {/* Rendered Geometric Elements */}
            {elements.map((el) => {
              if (el.type === 'point') {
                return (
                  <g key={el.id}>
                    <circle cx={el.p1.x} cy={el.p1.y} r="5" fill="#f59e0b" />
                    <text x={el.p1.x} y={el.p1.y - 10} fill="#fcd34d" fontSize="12" fontWeight="bold" textAnchor="middle">
                      {el.p1.label}
                    </text>
                  </g>
                );
              }

              if (el.p2 && el.type === 'line') {
                return (
                  <g key={el.id}>
                    <line
                      x1={el.p1.x - (el.p2.x - el.p1.x) * 1.5}
                      y1={el.p1.y - (el.p2.y - el.p1.y) * 1.5}
                      x2={el.p2.x + (el.p2.x - el.p1.x) * 1.5}
                      y2={el.p2.y + (el.p2.y - el.p1.y) * 1.5}
                      stroke={el.color || '#38bdf8'}
                      strokeWidth="3"
                      markerStart="url(#sbArrow)"
                      markerEnd="url(#sbArrow)"
                    />
                    <circle cx={el.p1.x} cy={el.p1.y} r="4" fill="#38bdf8" />
                    <circle cx={el.p2.x} cy={el.p2.y} r="4" fill="#38bdf8" />
                    <text x={el.p1.x} y={el.p1.y - 10} fill="#7dd3fc" fontSize="11" fontWeight="bold">
                      {el.p1.label}
                    </text>
                    <text x={el.p2.x} y={el.p2.y - 10} fill="#7dd3fc" fontSize="11" fontWeight="bold">
                      {el.p2.label}
                    </text>
                  </g>
                );
              }

              if (el.p2 && el.type === 'ray') {
                return (
                  <g key={el.id}>
                    <line
                      x1={el.p1.x}
                      y1={el.p1.y}
                      x2={el.p2.x + (el.p2.x - el.p1.x) * 1.2}
                      y2={el.p2.y + (el.p2.y - el.p1.y) * 1.2}
                      stroke={el.color || '#fbbf24'}
                      strokeWidth="3"
                      markerEnd="url(#sbArrowRay)"
                    />
                    <circle cx={el.p1.x} cy={el.p1.y} r="6" fill="#fbbf24" />
                    <circle cx={el.p2.x} cy={el.p2.y} r="4" fill="#fbbf24" />
                    <text x={el.p1.x} y={el.p1.y - 10} fill="#fde047" fontSize="11" fontWeight="bold">
                      {el.p1.label} (Başlangıç)
                    </text>
                    <text x={el.p2.x} y={el.p2.y - 10} fill="#fde047" fontSize="11" fontWeight="bold">
                      {el.p2.label}
                    </text>
                  </g>
                );
              }

              if (el.p2 && el.type === 'segment') {
                return (
                  <g key={el.id}>
                    <line
                      x1={el.p1.x}
                      y1={el.p1.y}
                      x2={el.p2.x}
                      y2={el.p2.y}
                      stroke={el.color || '#34d399'}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <circle cx={el.p1.x} cy={el.p1.y} r="5" fill="#10b981" />
                    <circle cx={el.p2.x} cy={el.p2.y} r="5" fill="#10b981" />
                    <text x={el.p1.x} y={el.p1.y - 10} fill="#6ee7b7" fontSize="11" fontWeight="bold">
                      {el.p1.label}
                    </text>
                    <text x={el.p2.x} y={el.p2.y - 10} fill="#6ee7b7" fontSize="11" fontWeight="bold">
                      {el.p2.label}
                    </text>
                    <text
                      x={(el.p1.x + el.p2.x) / 2}
                      y={(el.p1.y + el.p2.y) / 2 - 8}
                      fill="#a7f3d0"
                      fontSize="10"
                      textAnchor="middle"
                    >
                      |{el.p1.label}{el.p2.label}| = {el.length} br
                    </text>
                  </g>
                );
              }

              return null;
            })}

            {/* In-progress drawing preview line */}
            {tempStart && hoverPos && (
              <line
                x1={tempStart.x}
                y1={tempStart.y}
                x2={hoverPos.x}
                y2={hoverPos.y}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="4,4"
              />
            )}

            {/* Hover Node indicator */}
            {hoverPos && (
              <circle
                cx={hoverPos.x}
                cy={hoverPos.y}
                r="5"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="2,2"
              />
            )}

            {/* Movable Protractor Tool */}
            {showProtractor && (
              <g
                transform={`translate(${protractorPos.x}, ${protractorPos.y})`}
                className="cursor-move"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProtractor(false);
                }}
              >
                <path
                  d="M -100 0 A 100 100 0 0 1 100 0 Z"
                  fill="#0284c7"
                  fillOpacity="0.25"
                  stroke="#38bdf8"
                  strokeWidth="2"
                />
                <line x1="-100" y1="0" x2="100" y2="0" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="0" cy="0" r="3" fill="#38bdf8" />
                {[0, 30, 45, 60, 90, 120, 135, 150, 180].map((deg) => {
                  const rad = (deg * Math.PI) / 180;
                  return (
                    <text
                      key={deg}
                      x={-80 * Math.cos(rad)}
                      y={-80 * Math.sin(rad) + 4}
                      textAnchor="middle"
                      fill="#bae6fd"
                      fontSize="8"
                      fontWeight="bold"
                    >
                      {deg}°
                    </text>
                  );
                })}
              </g>
            )}
          </svg>
        </div>

        {/* Real-Time Mathematical Insight & Relationship Panel */}
        <div className="mt-4 bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-inner">
          <div className="flex items-center gap-2 mb-2">
            <Ruler className="w-4 h-4 text-amber-400" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Canlı Geometri Analiz Raporu (TYMM Motoru):
            </h4>
          </div>

          <div className="space-y-1.5">
            {getAnalysisInsights().map((insight, idx) => (
              <div
                key={idx}
                className="text-xs text-slate-300 bg-slate-800/60 px-3 py-2 rounded-xl border border-slate-700/50 flex items-center gap-2"
              >
                <span>{insight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
