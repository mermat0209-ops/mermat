import React, { useState } from 'react';
import { X, Award, Printer, CheckCircle, Sparkles, Building2 } from 'lucide-react';
import { sounds } from '../utils/audio';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  score: number;
  stars: number;
  completedCount: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  score,
  stars,
  completedCount
}) => {
  const [studentName, setStudentName] = useState('Genç Mimar');

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playClick();
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm animate-in fade-in print:p-0 print:bg-white">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden print:border-none print:shadow-none print:max-w-none print:w-full print:rounded-none print:bg-white print:text-black">
        {/* Header (hidden when printing) */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">
              Geometri Baş Mimarı Lisansı
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Yazdır / PDF Kaydet</span>
            </button>
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
        </div>

        {/* Certificate Card Printable Body */}
        <div className="p-6 md:p-8 overflow-y-auto flex-1 flex flex-col items-center justify-center print:p-8">
          <div className="w-full max-w-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-4 border-amber-500/60 rounded-3xl p-8 relative shadow-2xl print:bg-white print:text-black print:border-8 print:border-amber-600">
            {/* Ornate corner markers */}
            <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-amber-400" />
            <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-amber-400" />
            <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-amber-400" />
            <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-amber-400" />

            {/* Emblem / Badge */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-500/30 print:shadow-none">
                <Building2 className="w-9 h-9 stroke-[2.5]" />
              </div>

              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 print:text-amber-700 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                Türkiye Yüzyılı Maarif Modeli • 5. Sınıf Matematik
              </span>

              <h1 className="text-2xl md:text-3xl font-extrabold text-white print:text-slate-900 mt-3 tracking-tight">
                GEOMETRİ BAŞ MİMARI LİSANSI
              </h1>
              <p className="text-xs text-slate-400 print:text-slate-600 mt-1">
                Temel Geometrik Çizimler, İnşalar ve Açılar Üstün Başarı Belgesi
              </p>
            </div>

            {/* Student Name */}
            <div className="text-center my-6">
              <p className="text-xs text-slate-400 print:text-slate-600 uppercase tracking-wider mb-2">
                Bu Belge Gururla Takdim Edilir:
              </p>
              <div className="inline-block relative">
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="text-center text-2xl md:text-3xl font-extrabold text-amber-400 print:text-amber-800 bg-transparent border-b-2 border-amber-500/50 focus:border-amber-400 outline-none px-4 py-1 tracking-wide"
                  title="Öğrenci Adı (Düzenleyebilirsiniz)"
                />
              </div>
            </div>

            {/* Praise Text */}
            <p className="text-center text-xs md:text-sm text-slate-300 print:text-slate-700 leading-relaxed max-w-xl mx-auto mb-6">
              Nokta, doğru, ışın, doğru parçası çizimlerinde gösterdiği üstün cetvel hassasiyeti; paralel ve dik kesişen yolları başarıyla projelendirmesi ve mimari yapılardaki açıları hatasız sınıflandırması dolayısıyla <strong>Geometri Şehri Baş Mimarı</strong> unvanını almaya hak kazanmıştır.
            </p>

            {/* Achievement Stats Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto py-3 px-4 rounded-2xl bg-slate-900/80 border border-slate-800 print:bg-slate-100 print:border-slate-300 text-center mb-6">
              <div>
                <span className="block text-xl font-bold text-emerald-400 print:text-emerald-700">{score}</span>
                <span className="text-[10px] text-slate-400 print:text-slate-600">Toplam Puan</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-amber-400 print:text-amber-700">★ {stars}</span>
                <span className="text-[10px] text-slate-400 print:text-slate-600">Kazanılan Yıldız</span>
              </div>
              <div>
                <span className="block text-xl font-bold text-sky-400 print:text-sky-700">3 / 3</span>
                <span className="text-[10px] text-slate-400 print:text-slate-600">Görev Teması</span>
              </div>
            </div>

            {/* Footer / Seal & Date */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 print:border-slate-300 text-xs text-slate-400 print:text-slate-600">
              <div className="text-left">
                <p className="font-semibold text-slate-300 print:text-slate-900">Şehir Konseyi ve Jüri Heyeti</p>
                <p className="text-[10px]">T.C. Millî Eğitim Bakanlığı TYMM Standartları</p>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-300 print:text-slate-900">Düzenlenme Tarihi</p>
                <p className="text-[10px]">{currentDate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
