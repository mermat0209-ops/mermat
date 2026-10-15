import React from 'react';
import { 
  Building2, 
  Compass, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Award, 
  Download,
  DraftingCompass
} from 'lucide-react';

interface HeaderProps {
  currentTab: 'roads' | 'angles' | 'construction' | 'sandbox';
  setCurrentTab: (tab: 'roads' | 'angles' | 'construction' | 'sandbox') => void;
  score: number;
  stars: number;
  soundEnabled: boolean;
  toggleSound: () => void;
  onOpenGuide: () => void;
  onOpenCertificate: () => void;
  onOpenExport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  score,
  stars,
  soundEnabled,
  toggleSound,
  onOpenGuide,
  onOpenCertificate,
  onOpenExport
}) => {
  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-amber-500/20 text-slate-950">
            <Building2 className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-2">
                Geometri Şehri Mimarı
              </h1>
              <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                TYMM 5. Sınıf
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Temel Geometrik Çizimler, İnşalar ve Açılar Atölyesi
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto max-w-full">
          <button
            onClick={() => setCurrentTab('roads')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'roads'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Compass className="w-4 h-4" />
            1. Sokaklar & Doğrular
          </button>

          <button
            onClick={() => setCurrentTab('angles')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'angles'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <DraftingCompass className="w-4 h-4" />
            2. Açı Dedektifi
          </button>

          <button
            onClick={() => setCurrentTab('construction')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'construction'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Building2 className="w-4 h-4" />
            3. Geometrik İnşa
          </button>

          <button
            onClick={() => setCurrentTab('sandbox')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 whitespace-nowrap ${
              currentTab === 'sandbox'
                ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/30'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            4. Mimar Stüdyosu
          </button>
        </nav>

        {/* Stats and Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Score & Stars */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-xl border border-slate-700/60 text-xs">
            <span className="text-amber-400 font-bold flex items-center gap-1">
              ★ {stars}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-emerald-400 font-semibold font-mono">
              {score} Puan
            </span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Sesi Kapat' : 'Sesi Aç'}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>

          {/* Guide Modal Button */}
          <button
            onClick={onOpenGuide}
            title="TYMM Geometri Rehberi"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 text-sky-300 border border-sky-700/50 text-xs font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden sm:inline">Kılavuz</span>
          </button>

          {/* Certificate Button */}
          <button
            onClick={onOpenCertificate}
            title="Baş Mimar Lisansı"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-700/50 text-xs font-medium transition-colors"
          >
            <Award className="w-4 h-4" />
            <span className="hidden sm:inline">Lisans</span>
          </button>

          {/* Export Standalone HTML Button */}
          <button
            onClick={onOpenExport}
            title="Tek Dosya HTML Olarak İndir / Kodu Al"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">HTML İndir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
