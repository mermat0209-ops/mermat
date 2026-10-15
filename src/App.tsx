/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Level1Roads } from './components/Level1Roads';
import { Level2Angles } from './components/Level2Angles';
import { Level3Construction } from './components/Level3Construction';
import { SandboxStudio } from './components/SandboxStudio';
import { KnowledgeGuideModal } from './components/KnowledgeGuideModal';
import { CertificateModal } from './components/CertificateModal';
import { ExportHtmlModal } from './components/ExportHtmlModal';
import { sounds } from './utils/audio';
import { 
  Building2, 
  Sparkles, 
  Award, 
  BookOpen, 
  CheckCircle2, 
  MapPin, 
  Compass, 
  DraftingCompass
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'roads' | 'angles' | 'construction' | 'sandbox'>('roads');
  const [score, setScore] = useState<number>(() => {
    const saved = localStorage.getItem('geo_architect_score');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('geo_architect_stars');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Modals state
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('geo_architect_score', score.toString());
  }, [score]);

  useEffect(() => {
    localStorage.setItem('geo_architect_stars', stars.toString());
  }, [stars]);

  const toggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playClick();
    }
  };

  const handleLevelSuccess = (pointsToAdd: number) => {
    setScore((prev) => prev + pointsToAdd);
    setStars((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Top App Header */}
      <Header
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          sounds.playClick();
          setCurrentTab(tab);
        }}
        score={score}
        stars={stars}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        onOpenGuide={() => setIsGuideOpen(true)}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
      />

      {/* Hero Welcome / Context Ribbon */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800/80 px-4 py-3">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="font-semibold text-white">Görev Masası:</span>
            <span>
              {currentTab === 'roads' && 'Sokaklar ve Doğruların Durumu (Paralel // ve Dik ⊥ Cadde Planlaması)'}
              {currentTab === 'angles' && 'Açı Dedektifi: Mimari Yapılardaki Dar, Dik, Geniş ve Doğru Açılar'}
              {currentTab === 'construction' && 'Geometrik İnşa: ⟷ Doğru, [•→ Işın ve [••] Doğru Parçası ile Park İnşası'}
              {currentTab === 'sandbox' && 'Mimar Stüdyosu: Serbest Çizim Tahtası & Otomatik Geometri Analizcisi'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-slate-400">
            <span className="hidden md:inline">Türkiye Yüzyılı Maarif Modeli</span>
            <span className="bg-slate-800/80 text-amber-300 font-semibold px-2 py-0.5 rounded-md border border-slate-700">
              5. Sınıf Geometri
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-16">
        {currentTab === 'roads' && <Level1Roads onSuccess={handleLevelSuccess} />}
        {currentTab === 'angles' && <Level2Angles onSuccess={handleLevelSuccess} />}
        {currentTab === 'construction' && <Level3Construction onSuccess={handleLevelSuccess} />}
        {currentTab === 'sandbox' && <SandboxStudio />}
      </main>

      {/* Bottom Sticky Progress & Quick Links Footer */}
      <footer className="bg-slate-900/90 border-t border-slate-800 py-3 px-4 text-xs text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <p>
              M.5.2.1. Temel Geometrik Çizimler ve İnşalar • Nokta, Doğru, Işın, Doğru Parçası, Açılar ve Doğruların Birbirine Göre Durumları
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsGuideOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Kavram Kılavuzu</span>
            </button>
            <button
              onClick={() => setIsExportOpen(true)}
              className="hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold text-sky-400"
            >
              <span>Tek Dosya index.html İndir</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <KnowledgeGuideModal
        isOpen={isGuideOpen}
        onClose={() => setIsGuideOpen(false)}
      />

      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        score={score}
        stars={stars}
        completedCount={3}
      />

      <ExportHtmlModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
