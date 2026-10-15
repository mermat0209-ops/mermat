import React, { useState } from 'react';
import { X, Download, Copy, Check, Code, FileText, Sparkles } from 'lucide-react';
import { getStandaloneHtmlCode } from '../utils/generateStandaloneHtml';
import { sounds } from '../utils/audio';

interface ExportHtmlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const htmlCode = getStandaloneHtmlCode();

  const handleDownload = () => {
    sounds.playClick();
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'index.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    sounds.playLevelComplete();
  };

  const handleCopy = () => {
    sounds.playClick();
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400">
              <Code className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                Tek Dosyalık HTML Dışa Aktarma
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Bağımsız / Offline
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Hiçbir kuruluma ihtiyaç duymadan doğrudan tarayıcıda çalışan eksiksiz index.html
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

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="bg-gradient-to-r from-indigo-950/60 to-purple-950/60 border border-indigo-500/40 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-white text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Tek Tıkla İndir veya Kopyala
              </h4>
              <p className="text-xs text-indigo-200/80 mt-0.5">
                İndirilen <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">index.html</code> dosyasına çift tıklayarak Chrome, Edge veya Safari'de anında çalıştırabilirsiniz.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleDownload}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>index.html İndir</span>
              </button>

              <button
                onClick={handleCopy}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Kopyalandı!' : 'Kodu Kopyala'}</span>
              </button>
            </div>
          </div>

          {/* Quick instructions */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-sky-400 block mb-1">1. İndir</span>
              <p className="text-slate-400">Yukarıdaki butona tıklayıp index.html olarak kaydedin.</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-amber-400 block mb-1">2. Aç</span>
              <p className="text-slate-400">Dosyaya çift tıklayın; tarayıcınızda anında açılır.</p>
            </div>
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="font-bold text-emerald-400 block mb-1">3. Paylaş</span>
              <p className="text-slate-400">Öğrencilerinize veya akıllı tahtaya flash bellek ile aktarabilirsiniz.</p>
            </div>
          </div>

          {/* Code Preview snippet */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                HTML Kaynak Kodu Önizlemesi (Tam Dosya)
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {htmlCode.split('\n').length} satır
              </span>
            </div>

            <pre className="bg-slate-950 border border-slate-800 rounded-2xl p-4 text-[11px] font-mono text-slate-300 max-h-60 overflow-y-auto overflow-x-auto select-all">
              {htmlCode}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
