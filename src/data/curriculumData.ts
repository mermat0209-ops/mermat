import { AngleQuestion, RoadMission, ConstructionMission, Badge } from '../types/game';

export interface ConceptGuide {
  id: string;
  title: string;
  subtitle: string;
  symbol: string;
  description: string;
  realWorldExample: string;
  properties: string[];
  visualSvg: string;
}

export const CONCEPT_GUIDES: ConceptGuide[] = [
  {
    id: 'point',
    title: 'Nokta',
    subtitle: 'Geometrinin en temel yapı taşı',
    symbol: 'A, B, C',
    description: 'Boyutu (eni, boyu, yüksekliği) olmayan, uzayda veya düzlemde tam bir konumu belirten geometrik ifadedir. Alfabenin büyük harfleriyle gösterilir.',
    realWorldExample: 'Haritadaki şehir işaretleri, duvardaki raptiye izi, gökyüzündeki bir yıldız.',
    properties: [
      'Boyutsuzdur (ölçülebilir uzunluğu yoktur).',
      'Büyük harfle adlandırılır (Örn: A noktası).',
      'Bir noktadan sonsuz sayıda doğru geçer.'
    ],
    visualSvg: 'point'
  },
  {
    id: 'line',
    title: 'Doğru',
    subtitle: 'İki yöne sonsuza kadar uzanan çizgi',
    symbol: 'AB doğrusu veya ⟷AB (veya d doğrusu)',
    description: 'Aynı doğrultuda iki ucu da sınırsızca sonsuza uzanan noktalar kümesidir. Kalınlığı yoktur, sadece uzunluğu (o da sonsuz) vardır.',
    realWorldExample: 'Sonsuza uzandığı hayal edilen tren rayı, ufuk çizgisi.',
    properties: [
      'Her iki ucunda da ok işareti bulunur (sonsuzluğu simgeler).',
      'İki farklı noktadan yalnız bir doğru geçer!',
      'Uzunluğu ölçülemez çünkü iki ucu sınırsızdır.'
    ],
    visualSvg: 'line'
  },
  {
    id: 'ray',
    title: 'Işın',
    subtitle: 'Başlangıcı sabit, bir ucu sonsuza uzanan çizgi',
    symbol: '[AB ışını (A başlangıç noktası)',
    description: 'Bir ucu kapalı (sabit bir başlangıç noktası olan), diğer ucu ise aynı doğrultuda sonsuza uzanan geometrik şekildir.',
    realWorldExample: 'El fenerinden çıkan ışık huzmesi, Güneş ışınları, deniz feneri ışığı.',
    properties: [
      'Başlangıç noktası köşeli parantezle gösterilir: [AB',
      'Bir ucunda ok işareti bulunur.',
      'Uzunluğu ölçülemez (bir yönde sonsuzdur).'
    ],
    visualSvg: 'ray'
  },
  {
    id: 'segment',
    title: 'Doğru Parçası',
    subtitle: 'İki ucu sınırlı çizgi',
    symbol: '[AB] ve uzunluğu |AB|',
    description: 'Bir doğru üzerindeki iki nokta ve bu iki nokta arasında kalan tüm noktaların oluşturduğu şekildir. İki ucu da kapalıdır.',
    realWorldExample: 'Kurşun kalem, cetvelin kenarı, masa kenarı, iki elektrik direği arasındaki tel.',
    properties: [
      'İki ucu sınırlıdır, köşeli parantezle gösterilir: [AB]',
      'Uzunluğu ölçülebilir! Uzunluğu |AB| şeklinde gösterilir (Örn: |AB| = 6 cm).',
      'İki nokta arasındaki en kısa yoldur.'
    ],
    visualSvg: 'segment'
  },
  {
    id: 'parallel',
    title: 'Paralel Doğrular',
    subtitle: 'Asla kesişmeyen yol arkadaşları',
    symbol: 'd₁ // d₂ veya AB // CD',
    description: 'Aynı düzlemde bulunan ve uzatıldıklarında hiçbir zaman kesişmeyen doğrulardır. Aralarındaki mesafe her noktada daima eşittir.',
    realWorldExample: 'Tren raylarının iki demiri, merdivenin basamakları, defter çizgileri.',
    properties: [
      'Ortak hiçbir noktaları yoktur.',
      'Aralarındaki dik uzaklık daima sabittir.',
      'Sembolü // şeklindedir.'
    ],
    visualSvg: 'parallel'
  },
  {
    id: 'perpendicular',
    title: 'Dik Kesişen Doğrular',
    subtitle: 'Tam 90 derecelik köşe oluşturan doğrular',
    symbol: 'd₁ ⊥ d₂ veya AB ⊥ CD',
    description: 'Bir noktada kesişen ve aralarındaki açı tam 90° (dik açı) olan doğrulardır.',
    realWorldExample: 'Artı işareti (+), pencere pervazının köşeleri, T-kavşak, elektrik direği ve zemin.',
    properties: [
      'Kesişme açısı tam 90 derecedir.',
      'Kesişme yerine küçük bir kare ve nokta konur (diklik işareti).',
      'Sembolü ⊥ (ters T) şeklindedir.'
    ],
    visualSvg: 'perpendicular'
  },
  {
    id: 'intersecting',
    title: 'Kesişen Doğrular',
    subtitle: 'Tek bir ortak noktası olan yollar',
    symbol: 'd₁ ∩ d₂ = {K}',
    description: 'Aynı düzlemde bulunan ve yalnız bir ortak noktası olan doğrulardır. Kesiştikleri noktada komşu ve ters açılar oluştururlar.',
    realWorldExample: 'Çarpı işareti (X), makasın kolları, yol kavşağı.',
    properties: [
      'Yalnız bir ortak kesişim noktaları vardır.',
      'Aralarında dar ve geniş açılar (veya dik açı) oluşur.'
    ],
    visualSvg: 'intersecting'
  },
  {
    id: 'angles',
    title: 'Açılar ve Açı Çeşitleri',
    subtitle: 'Başlangıç noktası aynı iki ışının buluşması',
    symbol: 's(ÂBC) veya m(ÂBC)',
    description: 'Başlangıç noktaları ortak olan iki ışının birleşimine açı denir. İki kolun açıklığına göre 4 temel sınıfa ayrılır.',
    realWorldExample: 'Açılan kapı, saatin akrep ve yelkovanı, makas ağzı, çatı eğimleri.',
    properties: [
      'Dar Açı: Ölçüsü 0° ile 90° arasındadır.',
      'Dik Açı: Ölçüsü tam 90° dir.',
      'Geniş Açı: Ölçüsü 90° ile 180° arasındadır.',
      'Doğru Açı: Ölçüsü tam 180° dir (Düz çizgi).'
    ],
    visualSvg: 'angles'
  }
];

export const ROAD_MISSIONS: RoadMission[] = [
  {
    id: 'road-1',
    title: 'Görev 1: Yeşil Vadi Bisiklet Yolu (Paralel Doğru)',
    concept: 'paralel',
    description: 'Şehir planında kırmızı ile gösterilen "Mimar Sinan Bulvarı"na tam paralel yeni bir bisiklet yolu inşa etmelisin! Izgaradaki doğru noktaları birleştirerek paralel yolu oluştur.',
    pedagogicalNote: 'Paralel doğruların arasındaki dik uzaklık her noktada aynıdır ve bu doğrular asla kesişmez (d₁ // d₂).',
    baseRoad: { x1: 60, y1: 140, x2: 540, y2: 140, name: 'Mimar Sinan Bulvarı' },
    targetPoints: [
      { x: 60, y: 260, label: 'K', id: 'p0' },
      { x: 540, y: 260, label: 'L', id: 'p1' },
      { x: 180, y: 340, label: 'M', id: 'p2' },
      { x: 420, y: 220, label: 'N', id: 'p3' },
    ],
    correctPairs: [[0, 1]], // Connecting K and L creates a horizontal line at y=260, parallel to y=140
    symbolNote: 'Bulvar // Bisiklet Yolu',
    hint: 'Mimar Sinan Bulvarı yatay bir doğrudur. Ona paralel olması için seçeceğin yolun da aynı yükseklikte yatay kalması gerekir! K ve L noktalarına dikkat et.'
  },
  {
    id: 'road-2',
    title: 'Görev 2: Şehir Hastanesi Acil Servis Yolu (Dik Kesişen Doğru)',
    concept: 'dik',
    description: 'Ambulansların hızla hastaneye ulaşabilmesi için ana caddeye tam 90 derecelik dik bir acil servis yolu açmamız gerekiyor ($d_1 \\perp d_2$). Doğru noktaları seçerek dik yolu çiz!',
    pedagogicalNote: 'İki doğru kesiştiğinde aralarındaki açı tam 90° oluyorsa bu doğrulara dik kesişen doğrular denir (⊥).',
    baseRoad: { x1: 80, y1: 220, x2: 520, y2: 220, name: 'Cumhuriyet Caddesi' },
    targetPoints: [
      { x: 300, y: 60, label: 'A', id: 'p0' },
      { x: 300, y: 380, label: 'B', id: 'p1' },
      { x: 140, y: 100, label: 'C', id: 'p2' },
      { x: 460, y: 360, label: 'D', id: 'p3' },
    ],
    correctPairs: [[0, 1]], // A and B are vertical at x=300, perpendicular to horizontal at y=220
    symbolNote: 'Cadde ⊥ Acil Servis Yolu',
    hint: 'Yatay bir caddeye dik olmak için çizginin tam yukarıdan aşağıya (dikey) inmesi gerekir. A(300, 60) ve B(300, 380) noktalarını birleştirmeyi dene!'
  },
  {
    id: 'road-3',
    title: 'Görev 3: Botanik Parkı Çapraz Yürüyüş Yolu (Kesişen Doğru)',
    concept: 'kesisen',
    description: 'Doğu ve batı kapılarını birbirine bağlayan Park Bulvarı ile kesişen, fakat dik olmayan ferah bir yürüyüş yolu planlıyoruz. Kesişen yolu inşa et.',
    pedagogicalNote: 'Aynı düzlemde tek bir ortak noktası olan doğrulara kesişen doğrular denir. Aralarındaki açı 90° değilse eğik kesişirler.',
    baseRoad: { x1: 70, y1: 200, x2: 530, y2: 200, name: 'Park Bulvarı' },
    targetPoints: [
      { x: 120, y: 80, label: 'E', id: 'p0' },
      { x: 480, y: 320, label: 'F', id: 'p1' },
      { x: 70, y: 320, label: 'G', id: 'p2' },
      { x: 530, y: 320, label: 'H', id: 'p3' },
    ],
    correctPairs: [[0, 1]], // E to F intersects y=200 at an angle
    symbolNote: 'Park Bulvarı ∩ Yürüyüş Yolu = {Meydan}',
    hint: 'E ve F noktaları Park Bulvarı’nı tam ortadan eğik bir açıyla keserek harika bir geçit oluşturur!'
  }
];

export const ANGLE_QUESTIONS: AngleQuestion[] = [
  {
    id: 'ang-1',
    title: 'Müze Çatısının Güneş Paneli Açısı',
    scenario: 'Ekolojik Bilim Müzesi çatısına yerleştirilen güneş panellerinin eğimini inceleyen mimar ekibine katıl. Bu açı türünü belirle!',
    structureName: 'Bilim Müzesi Güneş Çatısı',
    svgScene: 'museum',
    angleValue: 42,
    correctType: 'dar',
    points: {
      vertex: { x: 300, y: 300 },
      arm1: { x: 480, y: 300 },
      arm2: { x: 434, y: 179 } // ~42 deg
    },
    explanation: 'Ölçülen açı 42° dir. 0° ile 90° arasında olduğu için bu açı bir "DAR AÇI"dır. Çatıların yağmur ve kar tutmaması için dar açılı eğimler kullanılır.',
    hint: 'Açı dik açıdan (90° yani L şeklinden) daha mı dar yoksa daha mı geniş? Kollar birbirine 90° ye göre daha yakın!'
  },
  {
    id: 'ang-2',
    title: 'Şehir Saat Kulesi: Saat Tam 03:00!',
    scenario: 'Meydandaki tarihi saat kulesinde saat tam 3:00’ü gösteriyor. Akrep ile yelkovanın oluşturduğu açıyı dedektif büyüteciyle incele.',
    structureName: 'Tarihi Saat Kulesi (03:00)',
    svgScene: 'clock',
    angleValue: 90,
    correctType: 'dik',
    points: {
      vertex: { x: 300, y: 250 },
      arm1: { x: 450, y: 250 }, // Akrep 3'e bakıyor
      arm2: { x: 300, y: 100 }  // Yelkovan 12'ye bakıyor
    },
    explanation: 'Saat 3:00’te akrep ve yelkovan tam birbirine diktir. Oluşan açı tam 90° dir ve "DİK AÇI" olarak adlandırılır. Sembolü köşedeki kare ve noktadır.',
    hint: 'Kollar tam bir "L" harfi gibi dik duruyor! Saat kadranındaki 12 ile 3 arası çeyrek dairedir (360° / 4 = 90°).'
  },
  {
    id: 'ang-3',
    title: 'Boğaziçi Asma Köprüsü Taşıyıcı Halatı',
    scenario: 'Şehrin iki yakasını birleştiren modern asma köprü kulesindeki dev çelik gergi halatının zeminle yaptığı geniş açıyı kontrol et.',
    structureName: 'Asma Köprü Kulesi Halat Bağlantısı',
    svgScene: 'bridge',
    angleValue: 135,
    correctType: 'genis',
    points: {
      vertex: { x: 300, y: 280 },
      arm1: { x: 480, y: 280 },
      arm2: { x: 172, y: 152 } // ~135 deg
    },
    explanation: 'Köprü halatının oluşturduğu açı 135° dir. 90° den büyük ve 180° den küçük olduğu için bu açı bir "GENİŞ AÇI"dır. Köprünün dengesini sağlar.',
    hint: 'Bu açı bir dik açıdan (90°) daha fazla açılmış, kolları birbirine oldukça uzak. 90° ile 180° arasındaki açılara ne denir?'
  },
  {
    id: 'ang-4',
    title: 'Baraj Su Seviyesi Düz Ufuk Hattı',
    scenario: 'Şehrin su ihtiyacını karşılayan hidroelektrik baraj gölünde su yüzeyinin kıyı çizgisiyle oluşturduğu dümdüz açıyı incele.',
    structureName: 'Baraj Gölü Su Düzlemi',
    svgScene: 'dam',
    angleValue: 180,
    correctType: 'dogru',
    points: {
      vertex: { x: 300, y: 240 },
      arm1: { x: 480, y: 240 },
      arm2: { x: 120, y: 240 } // Exactly 180 deg
    },
    explanation: 'Açının kolları zıt yönlere uzanarak dümdüz bir çizgi oluşturmuştur. Ölçüsü tam 180° dir ve "DOĞRU AÇI" olarak adlandırılır.',
    hint: 'Kollar zıt yönde doğrusal bir çizgi oluşturmuş! Ölçüsü tam 180° olan açı çeşidini hatırla.'
  }
];

export const CONSTRUCTION_MISSIONS: ConstructionMission[] = [
  {
    id: 'const-1',
    title: 'Millet Bahçesi Ana Gezinti Yolu (Doğru Çizimi)',
    type: 'line',
    description: 'Yeni parkın ortasından geçen sonsuz uzanımlı bir ana doğru çizmelisin. "İki farklı noktadan yalnız bir doğru geçer" kuralını uygula. A ve B noktalarını seçerek ⟷AB doğrusunu oluştur!',
    symbol: '⟷AB Doğrusu',
    hint: 'Doğru aracı seçiliyken A noktasına tıklayıp ardından B noktasına tıkla. Doğrunun her iki ucu da sonsuza ok işaretiyle uzanacaktır.',
    realWorldContext: 'Sonsuza uzanan ana bulvar aksı.'
  },
  {
    id: 'const-2',
    title: 'Deniz Feneri Güvenlik Işığı (Işın Çizimi)',
    type: 'ray',
    description: 'Liman girişindeki Deniz Feneri (K noktası) sabit başlangıç noktasıdır. Gemilere yol göstermek için fenerden denize (L noktasına) doğru [KL ışını fırlat!',
    symbol: '[KL Işını',
    hint: 'Işın aracını seç. İlk tıkladığın nokta sabit başlangıç noktası (K), ikinci tıkladığın nokta ise ışının içinden geçtiği yön noktası (L) olacaktır.',
    realWorldContext: 'Fenerden çıkan ve bir ucu sınırsız yayılan ışık huzmesi.'
  },
  {
    id: 'const-3',
    title: 'Ahşap Yürüyüş İskelesi (Ölçülü Doğru Parçası)',
    type: 'segment',
    requiredLength: 6, // 6 grid units
    description: 'Gölet kenarındaki iskele için tam 6 birim uzunluğunda bir [CD] doğru parçası inşa etmelisin (|CD| = 6 br). İki ucu sınırlı bu parçayı çiz.',
    symbol: '[CD] Doğru Parçası (|CD| = 6 br)',
    hint: 'Doğru parçası aracıyla C noktasından başlayıp sağa veya aşağıya tam 6 birim kare sayarak D noktasına ulaş ve tıkla!',
    realWorldContext: 'Sabit uzunluktaki ahşap yürüyüş iskelesi.'
  }
];

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'badge-roads',
    title: 'Ulaşım Mühendisi',
    description: 'Paralel ve dik kesişen tüm cadde görevlerini başarıyla tamamladı.',
    icon: 'Compass',
    unlocked: false
  },
  {
    id: 'badge-angles',
    title: 'Açı Dedektifi',
    description: 'Dar, dik, geniş ve doğru açıları mimari yapılarda hatasız tespit etti.',
    icon: 'Maximize2',
    unlocked: false
  },
  {
    id: 'badge-architect',
    title: 'Baş Mimar',
    description: 'Nokta, doğru, ışın ve doğru parçası inşalarını cetvel hassasiyetinde yaptı.',
    icon: 'Award',
    unlocked: false
  },
  {
    id: 'badge-master',
    title: 'TYMM 5. Sınıf Geometri Ustası',
    description: 'Tüm aşamaları üstün başarıyla bitirip Mimarlık Lisansı kazandı.',
    icon: 'Crown',
    unlocked: false
  }
];
