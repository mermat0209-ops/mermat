export function getStandaloneHtmlCode(): string {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Geometri Şehri Mimarı - TYMM 5. Sınıf Matematik</title>
  <!-- Tailwind CSS CDN -->
  <script src="https://cdn.tailwindcss.com"></script>
  <!-- Google Fonts: Plus Jakarta Sans -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif; }
    @keyframes pulseGlow { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.6; } }
    .pulse-ring { animation: pulseGlow 2s infinite ease-in-out; }
  </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen antialiased flex flex-col selection:bg-amber-500 selection:text-slate-950">

  <!-- Üst Başlık & Gezinme Çubuğu -->
  <header class="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-30 px-4 py-3 backdrop-blur-md">
    <div class="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-amber-500/20">
          📐
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="font-bold text-lg text-white">Geometri Şehri Mimarı</h1>
            <span class="px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">TYMM 5. Sınıf</span>
          </div>
          <p class="text-xs text-slate-400">Temel Geometrik Çizimler, İnşalar ve Açılar</p>
        </div>
      </div>

      <!-- Bölüm Butonları -->
      <nav class="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 overflow-x-auto text-xs">
        <button onclick="switchTab(1)" id="tab-btn-1" class="px-3 py-1.5 rounded-lg font-bold bg-amber-500 text-slate-950 shadow">
          1. Sokaklar & Doğrular
        </button>
        <button onclick="switchTab(2)" id="tab-btn-2" class="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white">
          2. Açı Dedektifi
        </button>
        <button onclick="switchTab(3)" id="tab-btn-3" class="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white">
          3. Geometrik İnşa
        </button>
      </nav>

      <!-- İstatistikler ve Ses -->
      <div class="flex items-center gap-2 text-xs">
        <div class="bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-2">
          <span class="text-amber-400 font-bold" id="ui-stars">★ 0</span>
          <span class="text-slate-500">|</span>
          <span class="text-emerald-400 font-mono font-bold" id="ui-score">0 P</span>
        </div>
        <button onclick="toggleAudio()" id="btn-audio" class="p-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-xl border border-slate-700" title="Ses Aç/Kapat">
          🔊
        </button>
        <button onclick="openDiploma()" class="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl shadow-sm">
          🏆 Lisans
        </button>
      </div>
    </div>
  </header>

  <!-- Ana Oyun Alanı -->
  <main class="flex-1 max-w-6xl w-full mx-auto p-4 md:p-6 space-y-6">

    <!-- BÖLÜM 1: SOKAKLAR VE DOĞRULAR -->
    <section id="section-1" class="space-y-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs font-bold uppercase text-amber-400">Bölüm 1 / 3 • Şehir Ulaşım Planı</span>
            <h2 class="text-xl font-bold text-white" id="sec1-title">Görev 1: Paralel Bisiklet Yolu</h2>
          </div>
          <div class="flex items-center gap-1.5" id="sec1-stepper">
            <button onclick="loadRoadMission(0)" class="w-8 h-8 rounded-lg font-bold text-xs bg-amber-500 text-slate-950">1</button>
            <button onclick="loadRoadMission(1)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">2</button>
            <button onclick="loadRoadMission(2)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">3</button>
          </div>
        </div>
        <p class="text-sm text-slate-300 mt-3" id="sec1-desc">
          Kırmızı ile çizili bulvara tam PARALEL yeni bisiklet yolu inşa et! İki doğru noktayı seç.
        </p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-6 relative">
        <div class="w-full aspect-[16/9] max-h-[440px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
          <svg id="sec1-canvas" viewBox="0 0 600 400" class="w-full h-full select-none cursor-pointer"></svg>
        </div>
        <div id="sec1-feedback" class="hidden mt-4 p-4 rounded-2xl text-sm font-medium border flex items-center justify-between"></div>
      </div>
    </section>

    <!-- BÖLÜM 2: AÇI DEDEKTİFİ -->
    <section id="section-2" class="hidden space-y-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs font-bold uppercase text-amber-400">Bölüm 2 / 3 • Mimari Açı Dedektifi</span>
            <h2 class="text-xl font-bold text-white" id="sec2-title">Müze Çatısının Eğim Açısı</h2>
          </div>
          <div class="flex items-center gap-1.5" id="sec2-stepper">
            <button onclick="loadAngleMission(0)" class="w-8 h-8 rounded-lg font-bold text-xs bg-amber-500 text-slate-950">1</button>
            <button onclick="loadAngleMission(1)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">2</button>
            <button onclick="loadAngleMission(2)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">3</button>
            <button onclick="loadAngleMission(3)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">4</button>
          </div>
        </div>
        <p class="text-sm text-slate-300 mt-3" id="sec2-desc">Açıölçer ile ölç ve doğru açı çeşidini seç!</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-6 relative">
        <div class="w-full aspect-[16/9] max-h-[400px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
          <svg id="sec2-canvas" viewBox="0 0 600 380" class="w-full h-full select-none"></svg>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <button onclick="checkAngle('dar')" class="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left">
            <div class="font-bold text-white text-sm">Dar Açı</div>
            <div class="text-[11px] text-sky-400">0° ile 90° arası</div>
          </button>
          <button onclick="checkAngle('dik')" class="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left">
            <div class="font-bold text-white text-sm">Dik Açı</div>
            <div class="text-[11px] text-emerald-400">Tam 90°</div>
          </button>
          <button onclick="checkAngle('genis')" class="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left">
            <div class="font-bold text-white text-sm">Geniş Açı</div>
            <div class="text-[11px] text-amber-400">90° ile 180° arası</div>
          </button>
          <button onclick="checkAngle('dogru')" class="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-left">
            <div class="font-bold text-white text-sm">Doğru Açı</div>
            <div class="text-[11px] text-purple-400">Tam 180°</div>
          </button>
        </div>

        <div id="sec2-feedback" class="hidden mt-4 p-4 rounded-2xl text-sm font-medium border flex items-center justify-between"></div>
      </div>
    </section>

    <!-- BÖLÜM 3: GEOMETRİK İNŞA -->
    <section id="section-3" class="hidden space-y-4">
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span class="text-xs font-bold uppercase text-amber-400">Bölüm 3 / 3 • Geometrik İnşa</span>
            <h2 class="text-xl font-bold text-white" id="sec3-title">Park Ana Bulvarı (Doğru Çizimi)</h2>
          </div>
          <div class="flex items-center gap-1.5" id="sec3-stepper">
            <button onclick="loadConstMission(0)" class="w-8 h-8 rounded-lg font-bold text-xs bg-amber-500 text-slate-950">1</button>
            <button onclick="loadConstMission(1)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">2</button>
            <button onclick="loadConstMission(2)" class="w-8 h-8 rounded-lg font-bold text-xs bg-slate-800 text-slate-300">3</button>
          </div>
        </div>
        <p class="text-sm text-slate-300 mt-3" id="sec3-desc">A ve B noktalarına tıklayarak iki ucu sonsuz doğruyu oluştur.</p>
      </div>

      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-4 md:p-6 relative">
        <div class="flex items-center gap-2 mb-3 text-xs">
          <span class="text-slate-400">Çizim Aracı:</span>
          <button onclick="setConstTool('line')" id="tool-line" class="px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold">⟷ Doğru</button>
          <button onclick="setConstTool('ray')" id="tool-ray" class="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">[•→ Işın</button>
          <button onclick="setConstTool('segment')" id="tool-segment" class="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700">[••] Parça</button>
          <button onclick="resetConst()" class="ml-auto px-3 py-1 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700">Sıfırla</button>
        </div>

        <div class="w-full aspect-[16/9] max-h-[440px] bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center cursor-crosshair">
          <svg id="sec3-canvas" viewBox="0 0 600 400" class="w-full h-full select-none" onclick="handleCanvas3Click(event)" onmousemove="handleCanvas3Move(event)"></svg>
        </div>

        <div id="sec3-feedback" class="hidden mt-4 p-4 rounded-2xl text-sm font-medium border flex items-center justify-between"></div>
      </div>
    </section>
  </main>

  <!-- MİMAR DİPLOMA MODALI -->
  <div id="modal-diploma" class="hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
    <div class="bg-slate-900 border-2 border-amber-500 rounded-3xl p-6 md:p-8 max-w-lg w-full text-center relative shadow-2xl">
      <button onclick="closeDiploma()" class="absolute top-4 right-4 text-slate-400 hover:text-white text-lg">✕</button>
      <div class="w-16 h-16 mx-auto mb-3 bg-gradient-to-tr from-amber-500 to-emerald-400 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
        🏛️
      </div>
      <span class="text-xs font-bold text-amber-400 uppercase tracking-widest">Türkiye Yüzyılı Maarif Modeli</span>
      <h2 class="text-2xl font-black text-white mt-1">GEOMETRİ BAŞ MİMARI LİSANSI</h2>
      <p class="text-xs text-slate-300 mt-2">
        Tebrikler! 5. sınıf "Temel Geometrik Çizimler ve İnşalar" konusundaki üstün başarılarınız tescil edilmiştir.
      </p>
      <div class="my-5 p-4 bg-slate-950 rounded-xl border border-slate-800 grid grid-cols-2 gap-4">
        <div>
          <div class="text-2xl font-bold text-emerald-400" id="diploma-score">0</div>
          <div class="text-xs text-slate-400">Toplam Puan</div>
        </div>
        <div>
          <div class="text-2xl font-bold text-amber-400" id="diploma-stars">0</div>
          <div class="text-xs text-slate-400">Kazanılan Yıldız</div>
        </div>
      </div>
      <button onclick="window.print()" class="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition">
        🖨️ Lisansı Yazdır / PDF Kaydet
      </button>
    </div>
  </div>

  <!-- JAVASCRIPT OYUN MOTORU -->
  <script>
    // Web Audio Synthesizer
    let audioCtx = null;
    let audioEnabled = true;

    function initAudio() {
      if (!audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
    }

    function toggleAudio() {
      audioEnabled = !audioEnabled;
      document.getElementById('btn-audio').textContent = audioEnabled ? '🔊' : '🔇';
    }

    function playTone(freq, dur = 0.15, type = 'sine') {
      if (!audioEnabled) return;
      initAudio();
      if (!audioCtx) return;
      try {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + dur);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + dur);
      } catch(e) {}
    }

    function playSuccess() {
      playTone(523.25, 0.1);
      setTimeout(() => playTone(659.25, 0.1), 100);
      setTimeout(() => playTone(783.99, 0.2), 200);
    }

    function playWrong() {
      playTone(200, 0.25, 'sawtooth');
    }

    // Oyun Durumu
    let score = 0;
    let stars = 0;

    function addScore(pts) {
      score += pts;
      stars += 1;
      document.getElementById('ui-score').textContent = score + ' P';
      document.getElementById('ui-stars').textContent = '★ ' + stars;
      document.getElementById('diploma-score').textContent = score;
      document.getElementById('diploma-stars').textContent = stars;
    }

    function switchTab(tabNum) {
      playTone(400, 0.05);
      [1, 2, 3].forEach(i => {
        document.getElementById('section-' + i).classList.toggle('hidden', i !== tabNum);
        const btn = document.getElementById('tab-btn-' + i);
        if (i === tabNum) {
          btn.className = 'px-3 py-1.5 rounded-lg font-bold bg-amber-500 text-slate-950 shadow';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-slate-300 hover:text-white';
        }
      });
    }

    function openDiploma() {
      playTone(600, 0.1);
      document.getElementById('modal-diploma').classList.remove('hidden');
    }
    function closeDiploma() {
      document.getElementById('modal-diploma').classList.add('hidden');
    }

    // BÖLÜM 1 MOTORU: SOKAKLAR VE DOĞRULAR
    const roadMissions = [
      {
        title: 'Görev 1: Yeşil Vadi Bisiklet Yolu (Paralel Doğru)',
        desc: 'Mimar Sinan Bulvarı\\'na tam PARALEL (d₁ // d₂) yeni bisiklet yolu inşa et! K ve L noktalarını bağla.',
        base: { x1: 60, y1: 140, x2: 540, y2: 140, name: 'Mimar Sinan Bulvarı' },
        points: [{x:60, y:260, l:'K'}, {x:540, y:260, l:'L'}, {x:200, y:340, l:'M'}, {x:400, y:200, l:'N'}],
        correct: [0, 1],
        concept: 'paralel'
      },
      {
        title: 'Görev 2: Hastane Acil Yolu (Dik Kesişen Doğru)',
        desc: 'Cumhuriyet Caddesi\\'ni tam 90° DİK kesen (d₁ ⊥ d₂) acil servis yolunu inşa et! A ve B noktalarını bağla.',
        base: { x1: 80, y1: 220, x2: 520, y2: 220, name: 'Cumhuriyet Caddesi' },
        points: [{x:300, y:60, l:'A'}, {x:300, y:360, l:'B'}, {x:140, y:100, l:'C'}, {x:440, y:340, l:'D'}],
        correct: [0, 1],
        concept: 'dik'
      },
      {
        title: 'Görev 3: Meydan Çapraz Geçidi (Kesişen Doğru)',
        desc: 'Park Bulvarı ile tek bir ortak noktada eğik kesişen yolu oluştur! E ve F noktalarını bağla.',
        base: { x1: 70, y1: 200, x2: 530, y2: 200, name: 'Park Bulvarı' },
        points: [{x:120, y:80, l:'E'}, {x:480, y:320, l:'F'}, {x:80, y:320, l:'G'}, {x:520, y:320, l:'H'}],
        correct: [0, 1],
        concept: 'kesisen'
      }
    ];

    let currentRoadMissionIdx = 0;
    let selectedRoadPoints = [];

    function loadRoadMission(idx) {
      currentRoadMissionIdx = idx;
      selectedRoadPoints = [];
      const m = roadMissions[idx];
      document.getElementById('sec1-title').textContent = m.title;
      document.getElementById('sec1-desc').textContent = m.desc;
      document.getElementById('sec1-feedback').className = 'hidden';

      const svg = document.getElementById('sec1-canvas');
      svg.innerHTML = \`
        <!-- Grid çizgileri -->
        \${Array.from({length: 15}).map((_, i) => \`<line x1="\${i*40}" y1="0" x2="\${i*40}" y2="400" stroke="#1e293b" stroke-width="1"/>\`).join('')}
        \${Array.from({length: 10}).map((_, i) => \`<line x1="0" y1="\${i*40}" x2="600" y2="\${i*40}" stroke="#1e293b" stroke-width="1"/>\`).join('')}

        <!-- Ana Cadde -->
        <line x1="\${m.base.x1}" y1="\${m.base.y1}" x2="\${m.base.x2}" y2="\${m.base.y2}" stroke="#334155" stroke-width="28" stroke-linecap="round"/>
        <line x1="\${m.base.x1}" y1="\${m.base.y1}" x2="\${m.base.x2}" y2="\${m.base.y2}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="10,8"/>
        <rect x="220" y="\${m.base.y1 - 32}" width="160" height="20" rx="5" fill="#0f172a" stroke="#f43f5e" stroke-width="1"/>
        <text x="300" y="\${m.base.y1 - 18}" text-anchor="middle" fill="#fca5a5" font-size="10" font-weight="bold">\${m.base.name}</text>

        <!-- Çizilecek Yol Grubu -->
        <g id="sec1-drawn-road"></g>

        <!-- Hedef Noktalar -->
        \${m.points.map((p, pIdx) => \`
          <g onclick="selectRoadPoint(\${pIdx})">
            <circle cx="\${p.x}" cy="\${p.y}" r="12" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.5"/>
            <circle cx="\${p.x}" cy="\${p.y}" r="6" fill="#38bdf8" id="p-dot-\${pIdx}"/>
            <rect x="\${p.x-10}" y="\${p.y-28}" width="20" height="18" rx="4" fill="#0f172a" stroke="#475569"/>
            <text x="\${p.x}" y="\${p.y-15}" text-anchor="middle" fill="#ffffff" font-size="11" font-weight="bold">\${p.l}</text>
          </g>
        \`).join('')}
      \`;
    }

    function selectRoadPoint(pIdx) {
      playTone(500, 0.05);
      if (selectedRoadPoints.includes(pIdx)) return;
      selectedRoadPoints.push(pIdx);

      const dot = document.getElementById('p-dot-' + pIdx);
      if (dot) dot.setAttribute('fill', '#f59e0b');

      if (selectedRoadPoints.length === 2) {
        checkRoadSolution();
      }
    }

    function checkRoadSolution() {
      const m = roadMissions[currentRoadMissionIdx];
      const p1 = m.points[selectedRoadPoints[0]];
      const p2 = m.points[selectedRoadPoints[1]];

      const drawnGroup = document.getElementById('sec1-drawn-road');
      drawnGroup.innerHTML = \`
        <line x1="\${p1.x}" y1="\${p1.y}" x2="\${p2.x}" y2="\${p2.y}" stroke="#10b981" stroke-width="16" stroke-linecap="round" opacity="0.8"/>
        <line x1="\${p1.x}" y1="\${p1.y}" x2="\${p2.x}" y2="\${p2.y}" stroke="#ffffff" stroke-width="2" stroke-dasharray="6,6"/>
      \`;

      const isCorrect = (selectedRoadPoints[0] === m.correct[0] && selectedRoadPoints[1] === m.correct[1]) ||
                        (selectedRoadPoints[0] === m.correct[1] && selectedRoadPoints[1] === m.correct[0]);

      const fb = document.getElementById('sec1-feedback');
      fb.classList.remove('hidden');

      if (isCorrect) {
        playSuccess();
        addScore(100);
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-emerald-950/60 border-emerald-500 text-emerald-200 flex items-center justify-between';
        fb.innerHTML = \`
          <span>🎉 Harika Mühendislik! \${p1.l} ve \${p2.l} noktalarını bağlayarak kurala uygun yolu başarıyla inşa ettin!</span>
          \${currentRoadMissionIdx < 2 ? \`<button onclick="loadRoadMission(\${currentRoadMissionIdx+1})" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Sıradaki Görev ➔</button>\` : '<span class="font-bold text-amber-400">Bölüm 1 Tamamlandı!</span>'}
        \`;
      } else {
        playWrong();
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-rose-950/60 border-rose-500 text-rose-200 flex items-center justify-between';
        fb.innerHTML = \`
          <span>⚠️ Yanlış Yol! İstenen geometrik kuralı sağlamadı. Tekrar denemek için butona tıkla.</span>
          <button onclick="loadRoadMission(\${currentRoadMissionIdx})" class="px-3 py-1.5 bg-slate-800 text-white font-bold rounded-xl text-xs">Tekrar Dene</button>
        \`;
      }
    }

    // BÖLÜM 2 MOTORU: AÇI DEDEKTİFİ
    const angleMissions = [
      { title: '1. Bilim Müzesi Güneş Çatısı', val: 42, type: 'dar', desc: 'Güneş panellerinin eğim açısı 42° dir.' },
      { title: '2. Tarihi Saat Kulesi (03:00)', val: 90, type: 'dik', desc: 'Saat tam 3:00\\'te akrep ve yelkovan dik kesişir.' },
      { title: '3. Asma Köprü Taşıyıcı Halatı', val: 135, type: 'genis', desc: 'Çelik taşıyıcı kule halatının açısı 135° dir.' },
      { title: '4. Baraj Su Düzlemi', val: 180, type: 'dogru', desc: 'Kıyı ve ufuk çizgisi dümdüz 180° açı oluşturur.' }
    ];

    let currentAngleMissionIdx = 0;

    function loadAngleMission(idx) {
      currentAngleMissionIdx = idx;
      const m = angleMissions[idx];
      document.getElementById('sec2-title').textContent = m.title;
      document.getElementById('sec2-desc').textContent = m.desc + ' Bu açı türü nedir?';
      document.getElementById('sec2-feedback').className = 'hidden';

      const svg = document.getElementById('sec2-canvas');
      const rad = (m.val * Math.PI) / 180;
      const x2 = 300 + 160 * Math.cos(rad);
      const y2 = 250 - 160 * Math.sin(rad);

      svg.innerHTML = \`
        <!-- İletki / Açıölçer çizimi -->
        <path d="M 180 250 A 120 120 0 0 1 420 250 Z" fill="#0284c7" fill-opacity="0.2" stroke="#38bdf8" stroke-width="2"/>
        <line x1="180" y1="250" x2="420" y2="250" stroke="#38bdf8" stroke-width="2"/>
        <text x="300" y="270" text-anchor="middle" fill="#7dd3fc" font-size="11">İletki Merkezi (Köşe)</text>

        <!-- Açı Kolları -->
        <line x1="300" y1="250" x2="480" y2="250" stroke="#38bdf8" stroke-width="4" stroke-linecap="round"/>
        <line x1="300" y1="250" x2="\${x2}" y2="\${y2}" stroke="#f59e0b" stroke-width="4" stroke-linecap="round"/>
        <circle cx="300" cy="250" r="7" fill="#f43f5e"/>

        <!-- Açı Ölçü Yay ve Derece -->
        \${m.type === 'dik' ? \`
          <rect x="300" y="222" width="28" height="28" fill="#10b981" fill-opacity="0.3" stroke="#10b981" stroke-width="2"/>
          <circle cx="314" cy="236" r="3.5" fill="#10b981"/>
          <text x="340" y="235" fill="#34d399" font-size="14" font-weight="bold">90°</text>
        \` : \`
          <path d="M 345 250 A 45 45 0 0 0 \${300 + 45*Math.cos(rad)} \${250 - 45*Math.sin(rad)}" fill="none" stroke="#ec4899" stroke-width="3"/>
          <text x="355" y="230" fill="#f472b6" font-size="16" font-weight="bold">\${m.val}°</text>
        \`}
      \`;
    }

    function checkAngle(chosenType) {
      const m = angleMissions[currentAngleMissionIdx];
      const fb = document.getElementById('sec2-feedback');
      fb.classList.remove('hidden');

      if (chosenType === m.type) {
        playSuccess();
        addScore(100);
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-emerald-950/60 border-emerald-500 text-emerald-200 flex items-center justify-between';
        fb.innerHTML = \`
          <span>🎯 Harika Dedektif! \${m.val}° ölçüsü tam bir "\${chosenType.toUpperCase()} AÇI"dır.</span>
          \${currentAngleMissionIdx < 3 ? \`<button onclick="loadAngleMission(\${currentAngleMissionIdx+1})" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Sıradaki Yapı ➔</button>\` : '<span class="font-bold text-amber-400">Bölüm 2 Tamamlandı!</span>'}
        \`;
      } else {
        playWrong();
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-rose-950/60 border-rose-500 text-rose-200 flex items-center justify-between';
        fb.innerHTML = '<span>⚠️ Tekrar Düşün! Açıölçerdeki dereceyi kontrol edip uygun tanımı seç.</span>';
      }
    }

    // BÖLÜM 3 MOTORU: GEOMETRİK İNŞA
    const constMissions = [
      { title: '1. Park Ana Bulvarı (Doğru Çizimi)', tool: 'line', desc: 'A ve B noktalarını bağlayarak iki yöne sonsuz uzanan ⟷AB doğrusunu çiz.' },
      { title: '2. Liman Deniz Feneri (Işın Çizimi)', tool: 'ray', desc: 'K noktasından sabit başlayıp L yönünde denize uzanan [KL ışınını çiz.' },
      { title: '3. Gölet Ahşap İskelesi (Doğru Parçası)', tool: 'segment', desc: 'C noktasından başlayıp D noktasına tam 6 birim uzunluğunda [CD] parçası çiz.' }
    ];

    let currentConstMissionIdx = 0;
    let activeConstTool = 'line';
    let constStart = null;
    let constEnd = null;

    function setConstTool(tool) {
      playTone(450, 0.05);
      activeConstTool = tool;
      ['line', 'ray', 'segment'].forEach(t => {
        document.getElementById('tool-' + t).className = t === tool 
          ? 'px-3 py-1 rounded-lg bg-amber-500 text-slate-950 font-bold'
          : 'px-3 py-1 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700';
      });
    }

    function loadConstMission(idx) {
      currentConstMissionIdx = idx;
      constStart = null;
      constEnd = null;
      const m = constMissions[idx];
      setConstTool(m.tool);
      document.getElementById('sec3-title').textContent = m.title;
      document.getElementById('sec3-desc').textContent = m.desc;
      document.getElementById('sec3-feedback').className = 'hidden';
      renderConstCanvas();
    }

    function renderConstCanvas() {
      const svg = document.getElementById('sec3-canvas');
      svg.innerHTML = \`
        <defs>
          <marker id="arr1" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8"/>
          </marker>
        </defs>
        <!-- Grid -->
        \${Array.from({length: 15}).map((_, i) => \`<line x1="\${i*40}" y1="0" x2="\${i*40}" y2="400" stroke="#1e293b" stroke-width="1"/>\`).join('')}
        \${Array.from({length: 10}).map((_, i) => \`<line x1="0" y1="\${i*40}" x2="600" y2="\${i*40}" stroke="#1e293b" stroke-width="1"/>\`).join('')}

        <!-- Sabit Noktalar -->
        <g>
          <circle cx="160" cy="200" r="10" fill="#f43f5e" fill-opacity="0.2" stroke="#f43f5e" stroke-width="2"/>
          <circle cx="160" cy="200" r="5" fill="#f43f5e"/>
          <text x="160" y="180" text-anchor="middle" fill="#fda4af" font-size="12" font-weight="bold">\${currentConstMissionIdx === 1 ? 'K' : currentConstMissionIdx === 2 ? 'C' : 'A'}</text>

          <circle cx="400" cy="200" r="10" fill="#0ea5e9" fill-opacity="0.2" stroke="#0ea5e9" stroke-width="2"/>
          <circle cx="400" cy="200" r="5" fill="#0ea5e9"/>
          <text x="400" y="180" text-anchor="middle" fill="#7dd3fc" font-size="12" font-weight="bold">\${currentConstMissionIdx === 1 ? 'L' : currentConstMissionIdx === 2 ? 'D' : 'B'}</text>
        </g>

        <!-- Çizilen Geometrik Eleman -->
        <g id="const-drawing-layer"></g>
      \`;
    }

    function handleCanvas3Click(e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 600;
      const rawY = ((e.clientY - rect.top) / rect.height) * 400;
      const sx = Math.round(rawX / 40) * 40;
      const sy = Math.round(rawY / 40) * 40;

      if (!constStart) {
        playTone(550, 0.05);
        constStart = { x: sx, y: sy };
      } else {
        constEnd = { x: sx, y: sy };
        validateConstruction();
      }
    }

    function handleCanvas3Move(e) {
      if (!constStart || constEnd) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const rawX = ((e.clientX - rect.left) / rect.width) * 600;
      const rawY = ((e.clientY - rect.top) / rect.height) * 400;
      const sx = Math.round(rawX / 40) * 40;
      const sy = Math.round(rawY / 40) * 40;

      const layer = document.getElementById('const-drawing-layer');
      if (layer) {
        layer.innerHTML = \`<line x1="\${constStart.x}" y1="\${constStart.y}" x2="\${sx}" y2="\${sy}" stroke="#f59e0b" stroke-width="2" stroke-dasharray="4,4"/>\`;
      }
    }

    function validateConstruction() {
      const layer = document.getElementById('const-drawing-layer');
      const isTarget1 = Math.hypot(constStart.x - 160, constStart.y - 200) < 25;
      const isTarget2 = Math.hypot(constEnd.x - 400, constEnd.y - 200) < 25;

      if (activeConstTool === 'line') {
        layer.innerHTML = \`
          <line x1="\${constStart.x - 100}" y1="\${constStart.y}" x2="\${constEnd.x + 100}" y2="\${constEnd.y}" stroke="#10b981" stroke-width="4" marker-start="url(#arr1)" marker-end="url(#arr1)"/>
        \`;
      } else if (activeConstTool === 'ray') {
        layer.innerHTML = \`
          <circle cx="\${constStart.x}" cy="\${constStart.y}" r="6" fill="#f59e0b"/>
          <line x1="\${constStart.x}" y1="\${constStart.y}" x2="\${constEnd.x + 100}" y2="\${constEnd.y}" stroke="#10b981" stroke-width="4" marker-end="url(#arr1)"/>
        \`;
      } else {
        layer.innerHTML = \`
          <line x1="\${constStart.x}" y1="\${constStart.y}" x2="\${constEnd.x}" y2="\${constEnd.y}" stroke="#10b981" stroke-width="4" stroke-linecap="round"/>
          <circle cx="\${constStart.x}" cy="\${constStart.y}" r="5" fill="#10b981"/>
          <circle cx="\${constEnd.x}" cy="\${constEnd.y}" r="5" fill="#10b981"/>
        \`;
      }

      const fb = document.getElementById('sec3-feedback');
      fb.classList.remove('hidden');

      if (isTarget1 && isTarget2 && activeConstTool === constMissions[currentConstMissionIdx].tool) {
        playSuccess();
        addScore(120);
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-emerald-950/60 border-emerald-500 text-emerald-200 flex items-center justify-between';
        fb.innerHTML = \`
          <span>🎉 Kusursuz Çizim! Cetvel ve geometrik araçları ustalıkla kullanarak inşayı tamamladın!</span>
          \${currentConstMissionIdx < 2 ? \`<button onclick="loadConstMission(\${currentConstMissionIdx+1})" class="px-3 py-1.5 bg-emerald-500 text-slate-950 font-bold rounded-xl text-xs">Sıradaki İnşa ➔</button>\` : '<span class="font-bold text-amber-400">Tüm Geometri İnşaları Başarıyla Bitti! 🏆</span>'}
        \`;
      } else {
        playWrong();
        fb.className = 'mt-4 p-4 rounded-2xl text-sm font-medium border bg-rose-950/60 border-rose-500 text-rose-200 flex items-center justify-between';
        fb.innerHTML = \`
          <span>⚠️ Çizim kriterlere uymadı. Lütfen doğru aracı seçip hedeflenen iki noktayı dikkatlice birleştir.</span>
          <button onclick="loadConstMission(\${currentConstMissionIdx})" class="px-3 py-1.5 bg-slate-800 text-white font-bold rounded-xl text-xs">Tekrar Çiz</button>
        \`;
      }
    }

    function resetConst() {
      loadConstMission(currentConstMissionIdx);
    }

    // İlk Başlatma
    window.addEventListener('DOMContentLoaded', () => {
      loadRoadMission(0);
      loadAngleMission(0);
      loadConstMission(0);
    });
  </script>
</body>
</html>`;
}
