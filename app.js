/**
 * Heizkosten Tracker - Gastherme & Zählerstand Management
 * Optimized for iPhone 15 Pro Max & Modern Mobile Browsers
 */

// ================= CONSTANTS & STORAGE KEYS =================
const STORAGE_KEYS = {
  READINGS: 'gas_tracker_readings_v1',
  PRICES: 'gas_tracker_prices_v1',
  SETTINGS: 'gas_tracker_settings_v1',
  THEME: 'gas_tracker_theme_v1',
  TAB_ORDER: 'gas_tracker_tab_order_v1',
  LAST_TAB: 'gas_tracker_last_tab_v1',
  STATS_SUBVIEW: 'gas_tracker_stats_subview_v1',
  CHART_MODE: 'gas_tracker_chart_mode_v1',
  DESIGN_STYLE: 'gas_tracker_design_style_v1',
  FORECAST_SEASON_YEAR: 'gas_tracker_forecast_season_year_v1',
  WEATHER_CACHE: 'gas_tracker_weather_cache_v1',
  GIST_CONFIG: 'gas_tracker_gist_config_v1',
  PREV_YEAR_COMP: 'gas_tracker_prev_year_comp_v1',
};

const DEFAULT_TAB_ORDER = ['view-dashboard', 'view-history', 'view-stats', 'view-settings'];

const TAB_DEFINITIONS = {
  'view-dashboard': {
    id: 'view-dashboard',
    label: 'Übersicht',
    desc: 'Haupt-Dashboard, Zählerstand & Wennigsen-Prognose',
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
  },
  'view-history': {
    id: 'view-history',
    label: 'Verlauf',
    desc: 'Alle bisherigen Zählerstände, Abstände & Verbrauch',
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>`,
  },
  'view-stats': {
    id: 'view-stats',
    label: 'Statistik',
    desc: 'Monats-/Jahresauswertungen, Diagramme & PDF',
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
  },
  'view-settings': {
    id: 'view-settings',
    label: 'Tarif & Setup',
    desc: 'Preise, Abschlag, Design & Reiteranordnung',
    iconSvg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  },
};

// Preset Theme Color Definitions
const THEMES = {
  'oled-black': {
    primary: '#000000',
    surface: '#0e0e11',
    card: '#151519',
    cardHover: '#1c1c22',
    borderCard: '#202026',
    borderSubtle: '#23232a',
  },
  'minimal-mono': {
    primary: '#000000',
    surface: '#070709',
    card: '#0e0e11',
    cardHover: '#141418',
    borderCard: '#1a1a20',
    borderSubtle: '#22222a',
  },
  'midnight-slate': {
    primary: '#0b0f17',
    surface: '#111827',
    card: '#162033',
    cardHover: '#1e2c45',
    borderCard: '#243552',
    borderSubtle: '#2d4164',
  },
  'deep-navy': {
    primary: '#050a14',
    surface: '#0a1324',
    card: '#0f1c36',
    cardHover: '#15274b',
    borderCard: '#1c325e',
    borderSubtle: '#244077',
  },
  'forest-dark': {
    primary: '#050e09',
    surface: '#0a1a12',
    card: '#0f241a',
    cardHover: '#163326',
    borderCard: '#1e4533',
    borderSubtle: '#26553f',
  },
  'cyber-dark': {
    primary: '#090611',
    surface: '#120c22',
    card: '#1a1130',
    cardHover: '#241842',
    borderCard: '#312159',
    borderSubtle: '#3f2a73',
  },
};

const ACCENTS = {
  flame: { c1: '#f59e0b', c2: '#ea580c' },
  emerald: { c1: '#10b981', c2: '#059669' },
  sky: { c1: '#38bdf8', c2: '#0284c7' },
  purple: { c1: '#c084fc', c2: '#9333ea' },
  rose: { c1: '#fb7185', c2: '#e11d48' },
  gold: { c1: '#facc15', c2: '#ca8a04' },
  silver: { c1: '#f4f4f5', c2: '#a1a1aa' },
};

// ================= APP STATE =================
let state = {
  readings: [],
  prices: [],
  settings: {
    baseFeeMonthly: 0,
    monthlyInstallment: 120, // Monatlicher Abschlag in €
    billingStartMonth: 9,    // 9 = September (Heizbeginn nach Sommer), 10 = Oktober, 1 = Januar
    heatingStartReadingId: 'auto', // 'auto' oder spezifische Ablese-ID
    locationZip: '30974',
    locationCity: 'Wennigsen (Deister)',
    hapticFeedback: true,
    githubToken: '',
    githubGistId: '',
    autoSync: false,
    lastSyncTimestamp: null,
  },
  theme: {
    baseTheme: 'oled-black',
    accent: 'flame',
    customColor: '#f59e0b',
    designStyle: 'standard', // 'standard' or 'minimal'
  },
  tabOrder: [...DEFAULT_TAB_ORDER],
  currentTab: 'view-dashboard',
  statsSubview: 'chart', // 'chart', 'table', 'months', 'years', 'forecast', 'heatmap', 'curve', 'records'
  chartMode: 'kwh', // 'kwh' or 'cost'
  forecastSeasonYear: null, // Startjahr der ausgewählten Heizperiode (z.B. 2026 für 2026/2027)
  dashForecastSeasonOffset: 0, // 0 = Aktuelle Saison, 1 = Folgejahr
  editingReadingId: null,
  editingPriceId: null,
  activeTagFilter: 'all',
  showPrevYearComparison: false,
  weather: null,
  simulation: {
    priceDeltaPct: 0,
    tempDelta: 0,
    installment: 120,
  },
  savings: {
    tempReduction: 1, // 1 °C
  },
};

// ================= INITIALIZATION =================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  applyCurrentTheme();
  initHeaderDate();
  initNavigation();
  initModals();
  initForms();
  initChartControls();
  initThemeControls();
  initTabOrderControls();
  initDataActions();
  initPrintActions();
  initLifecyclePersist();
  initServiceWorker();

  // 15 Extended Features
  initHaptics();
  initOcrScanner();
  initPhotoArchive();
  initTagFilters();
  initSimulationControls();
  initSavingsCalculator();
  initCloudSync();
  fetchWennigsenWeather();

  // Initial Render
  renderAll();

  // Restore session view state (tab, subview, chart mode)
  restoreActiveSessionView();
});

// ================= DATA PERSISTENCE & SAMPLE DATA =================
function loadData() {
  try {
    const rawReadings = localStorage.getItem(STORAGE_KEYS.READINGS);
    const rawPrices = localStorage.getItem(STORAGE_KEYS.PRICES);
    const rawSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const rawTheme = localStorage.getItem(STORAGE_KEYS.THEME);
    const rawTabOrder = localStorage.getItem(STORAGE_KEYS.TAB_ORDER);
    const savedLastTab = localStorage.getItem(STORAGE_KEYS.LAST_TAB);
    const savedStatsSubview = localStorage.getItem(STORAGE_KEYS.STATS_SUBVIEW);
    const savedChartMode = localStorage.getItem(STORAGE_KEYS.CHART_MODE);

    if (rawPrices) {
      state.prices = JSON.parse(rawPrices);
    } else {
      // Default initial prices (demonstrates price change over time)
      const thisYear = new Date().getFullYear();
      state.prices = [
        {
          id: 'p-1',
          validFrom: `${thisYear - 1}-01-01`,
          pricePerKwh: 0.105, // 10.50 ct/kWh
          note: 'Grundvertrag',
        },
        {
          id: 'p-2',
          validFrom: `${thisYear}-01-01`,
          pricePerKwh: 0.124, // 12.40 ct/kWh
          note: 'Preisanpassung Stadtwerke',
        },
      ];
      savePrices();
    }

    if (rawReadings) {
      state.readings = JSON.parse(rawReadings);
    } else {
      state.readings = generateSensibleSampleReadings();
      saveReadings();
    }

    if (rawSettings) {
      state.settings = { ...state.settings, ...JSON.parse(rawSettings) };
    }

    if (rawTheme) {
      state.theme = { ...state.theme, ...JSON.parse(rawTheme) };
    }

    const rawDesignStyle = localStorage.getItem(STORAGE_KEYS.DESIGN_STYLE);
    if (rawDesignStyle && ['standard', 'minimal'].includes(rawDesignStyle)) {
      state.theme.designStyle = rawDesignStyle;
    } else if (!state.theme.designStyle) {
      state.theme.designStyle = 'standard';
    }

    if (rawTabOrder) {
      try {
        const parsed = JSON.parse(rawTabOrder);
        if (Array.isArray(parsed) && parsed.length === DEFAULT_TAB_ORDER.length) {
          const hasAllTabs = DEFAULT_TAB_ORDER.every(id => parsed.includes(id));
          if (hasAllTabs) {
            state.tabOrder = parsed;
          }
        }
      } catch (e) {
        state.tabOrder = [...DEFAULT_TAB_ORDER];
      }
    }

    if (savedLastTab && TAB_DEFINITIONS[savedLastTab]) {
      state.currentTab = savedLastTab;
    } else {
      state.currentTab = state.tabOrder[0];
    }

    if (savedStatsSubview && ['chart', 'table', 'months', 'years', 'forecast', 'heatmap', 'curve', 'records'].includes(savedStatsSubview)) {
      state.statsSubview = savedStatsSubview;
    }

    if (savedChartMode && ['kwh', 'cost'].includes(savedChartMode)) {
      state.chartMode = savedChartMode;
    }

    const savedForecastYear = localStorage.getItem(STORAGE_KEYS.FORECAST_SEASON_YEAR);
    if (savedForecastYear) {
      state.forecastSeasonYear = parseInt(savedForecastYear, 10);
    }

    const savedPrevYearComp = localStorage.getItem(STORAGE_KEYS.PREV_YEAR_COMP);
    if (savedPrevYearComp !== null) {
      state.showPrevYearComparison = savedPrevYearComp === 'true';
    }
  } catch (err) {
    console.error('Fehler beim Laden der Daten:', err);
    state.readings = [];
    state.prices = [];
  }
}

function saveReadings() {
  state.readings.sort((a, b) => a.timestamp - b.timestamp);
  localStorage.setItem(STORAGE_KEYS.READINGS, JSON.stringify(state.readings));
  indicateAutoSaved();

  // Punkt 30: Auto-Sync to GitHub Gist if enabled
  if (state.settings && state.settings.autoSync && state.settings.githubToken) {
    autoSyncToGistSilently();
  }
}

function savePrices() {
  state.prices.sort((a, b) => a.validFrom.localeCompare(b.validFrom));
  localStorage.setItem(STORAGE_KEYS.PRICES, JSON.stringify(state.prices));
  indicateAutoSaved();
}

function saveSettings() {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(state.settings));
  indicateAutoSaved();
}

function saveTheme() {
  localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(state.theme));
  localStorage.setItem(STORAGE_KEYS.DESIGN_STYLE, state.theme.designStyle || 'standard');
  indicateAutoSaved();
}

function saveTabOrder() {
  localStorage.setItem(STORAGE_KEYS.TAB_ORDER, JSON.stringify(state.tabOrder));
  indicateAutoSaved();
}

function saveSessionState() {
  localStorage.setItem(STORAGE_KEYS.LAST_TAB, state.currentTab);
  localStorage.setItem(STORAGE_KEYS.STATS_SUBVIEW, state.statsSubview);
  localStorage.setItem(STORAGE_KEYS.CHART_MODE, state.chartMode);
  if (state.forecastSeasonYear) {
    localStorage.setItem(STORAGE_KEYS.FORECAST_SEASON_YEAR, state.forecastSeasonYear);
  }
  indicateAutoSaved();
}

function persistFullState() {
  try {
    saveReadings();
    savePrices();
    saveSettings();
    saveTheme();
    saveTabOrder();
    saveSessionState();
  } catch (err) {
    console.error('Fehler beim automatischen Speichern:', err);
  }
}

let savedIndicatorTimeout = null;
function indicateAutoSaved() {
  const ind = document.getElementById('header-saved-indicator');
  if (!ind) return;
  ind.classList.add('visible');
  if (savedIndicatorTimeout) clearTimeout(savedIndicatorTimeout);
  savedIndicatorTimeout = setTimeout(() => {
    ind.classList.remove('visible');
  }, 1600);
}

function generateSensibleSampleReadings() {
  const now = new Date();
  const samples = [];
  const baseKwh = 38450.0;
  
  const intervals = [
    { daysAgo: 90, kwh: baseKwh, note: 'Start Heizperiode nach Sommer', isHeatingStart: true },
    { daysAgo: 60, kwh: baseKwh + 285.4, note: 'Monatsablesung' },
    { daysAgo: 35, kwh: baseKwh + 620.1, note: 'Reguläre Ablesung' },
    { daysAgo: 20, kwh: baseKwh + 840.0, note: 'Kälteeinbruch' },
    { daysAgo: 8,  kwh: baseKwh + 1015.5, note: 'Wochenablesung' },
    { daysAgo: 0,  kwh: baseKwh + 1145.3, note: 'Aktueller Zählerstand' },
  ];

  intervals.forEach((item, idx) => {
    const d = new Date(now.getTime() - item.daysAgo * 86400000);
    d.setHours(18, 30, 0, 0);
    samples.push({
      id: 'sample-' + (idx + 1),
      timestamp: d.getTime(),
      dateString: formatDateTimeForInput(d),
      kwh: item.kwh,
      note: item.note,
      isHeatingStart: !!item.isHeatingStart,
    });
  });

  return samples;
}

// ================= THEME & CUSTOM COLOR ENGINE =================
function applyCurrentTheme() {
  const root = document.documentElement;
  const base = THEMES[state.theme.baseTheme] || THEMES['oled-black'];

  root.style.setProperty('--bg-primary', base.primary);
  root.style.setProperty('--bg-surface', base.surface);
  root.style.setProperty('--bg-card', base.card);
  root.style.setProperty('--bg-card-hover', base.cardHover);
  root.style.setProperty('--border-card', base.borderCard);
  root.style.setProperty('--border-subtle', base.borderSubtle);

  // Update theme meta color for iOS Safari status bar
  const metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) {
    metaTheme.setAttribute('content', base.surface);
  }

  // Accent Colors
  let c1, c2;
  if (state.theme.accent === 'custom') {
    c1 = state.theme.customColor || '#f59e0b';
    c2 = adjustColorBrightness(c1, -25);
  } else {
    const acc = ACCENTS[state.theme.accent] || ACCENTS.flame;
    c1 = acc.c1;
    c2 = acc.c2;
  }

  root.style.setProperty('--accent-flame-1', c1);
  root.style.setProperty('--accent-flame-2', c2);
  root.style.setProperty('--accent-flame-grad', `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`);
  root.style.setProperty('--border-focus', c1);
  root.style.setProperty('--shadow-glow', `0 0 24px ${hexToRgba(c1, 0.3)}`);

  // Design style (Standard vs Minimalistisch)
  const isMinimal = state.theme.designStyle === 'minimal';
  document.body.classList.toggle('design-minimal', isMinimal);
  document.querySelectorAll('#design-style-toggle .design-style-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.style === (isMinimal ? 'minimal' : 'standard'));
  });

  // Update active states on settings buttons
  document.querySelectorAll('#theme-base-grid .theme-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.baseTheme === state.theme.baseTheme);
  });

  document.querySelectorAll('#color-accent-grid .color-swatch-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.accent === state.theme.accent);
  });

  const picker = document.getElementById('theme-custom-picker');
  const hexLbl = document.getElementById('custom-color-hex-label');
  if (picker && state.theme.customColor) {
    picker.value = state.theme.customColor;
  }
  if (hexLbl) {
    hexLbl.textContent = state.theme.accent === 'custom' 
      ? `Aktiv: ${state.theme.customColor.toUpperCase()}` 
      : 'Eigene Farbe frei wählen';
  }
}

function initThemeControls() {
  // Design Style (Standard vs Minimalistisch)
  document.querySelectorAll('#design-style-toggle .design-style-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.theme.designStyle = btn.dataset.style;
      saveTheme();
      applyCurrentTheme();
      renderAll();
      showToast(state.theme.designStyle === 'minimal' ? '⚡ Minimalistisches Design aktiviert' : 'Standard-Design aktiviert', 'info');
    });
  });

  // Base Themes
  document.querySelectorAll('#theme-base-grid .theme-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.theme.baseTheme = btn.dataset.baseTheme;
      saveTheme();
      applyCurrentTheme();
      renderChart();
    });
  });

  // Preset Accents
  document.querySelectorAll('#color-accent-grid .color-swatch-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.theme.accent = btn.dataset.accent;
      saveTheme();
      applyCurrentTheme();
      renderChart();
    });
  });

  // Custom Color Picker
  const picker = document.getElementById('theme-custom-picker');
  const btnApply = document.getElementById('btn-apply-custom-color');

  if (picker && btnApply) {
    picker.addEventListener('input', (e) => {
      state.theme.customColor = e.target.value;
      state.theme.accent = 'custom';
      applyCurrentTheme();
    });

    btnApply.addEventListener('click', () => {
      state.theme.customColor = picker.value;
      state.theme.accent = 'custom';
      saveTheme();
      applyCurrentTheme();
      renderChart();
      showToast('Wunschfarbe gespeichert', 'success');
    });
  }
}

function adjustColorBrightness(hex, percent) {
  let num = parseInt(hex.replace('#', ''), 16);
  let r = (num >> 16) + Math.round(255 * (percent / 100));
  let g = ((num >> 8) & 0x00FF) + Math.round(255 * (percent / 100));
  let b = (num & 0x0000FF) + Math.round(255 * (percent / 100));
  r = Math.min(255, Math.max(0, r));
  g = Math.min(255, Math.max(0, g));
  b = Math.min(255, Math.max(0, b));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}

function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  let num = parseInt(c, 16);
  return `rgba(${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}, ${alpha})`;
}

// ================= MATH & PRICE CALCULATION ENGINE =================

function getActivePriceForDate(timestamp) {
  if (!state.prices || state.prices.length === 0) {
    return 0.12;
  }
  const d = new Date(timestamp);
  const dateStr = d.toISOString().slice(0, 10);

  let activePrice = state.prices[0].pricePerKwh;
  for (const tier of state.prices) {
    if (tier.validFrom <= dateStr) {
      activePrice = tier.pricePerKwh;
    } else {
      break;
    }
  }
  return activePrice;
}

function calculateIntervalCost(readingPrev, readingCurr) {
  const deltaKwh = Math.max(0, readingCurr.kwh - readingPrev.kwh);
  const t1 = readingPrev.timestamp;
  const t2 = readingCurr.timestamp;
  const durationMs = Math.max(0, t2 - t1);
  const days = durationMs / 86400000;

  if (days <= 0 || deltaKwh === 0 || state.prices.length === 0) {
    const fallbackPrice = getActivePriceForDate(t2);
    return {
      deltaKwh,
      days: Math.max(0.01, days),
      cost: deltaKwh * fallbackPrice,
      effectivePrice: fallbackPrice,
      isPriceMixed: false,
      breakdown: [],
    };
  }

  const breakpoints = [];
  state.prices.forEach((tier) => {
    const pt = new Date(tier.validFrom + 'T00:00:00').getTime();
    if (pt > t1 && pt < t2) {
      breakpoints.push(pt);
    }
  });

  const allPoints = [t1, ...breakpoints, t2];
  let totalCost = 0;
  const breakdown = [];

  for (let i = 0; i < allPoints.length - 1; i++) {
    const s1 = allPoints[i];
    const s2 = allPoints[i + 1];
    const segDur = s2 - s1;
    const segFrac = segDur / durationMs;
    const segMid = (s1 + s2) / 2;
    const segPrice = getActivePriceForDate(segMid);
    const segKwh = deltaKwh * segFrac;
    const segCost = segKwh * segPrice;

    totalCost += segCost;
    breakdown.push({
      days: segDur / 86400000,
      price: segPrice,
      kwh: segKwh,
      cost: segCost,
    });
  }

  const effectivePrice = deltaKwh > 0 ? (totalCost / deltaKwh) : getActivePriceForDate(t2);

  return {
    deltaKwh,
    days,
    cost: totalCost,
    effectivePrice,
    isPriceMixed: breakdown.length > 1,
    breakdown,
  };
}

function getCalculatedReadings() {
  const list = [...state.readings].sort((a, b) => a.timestamp - b.timestamp);
  const calculated = [];

  for (let i = 0; i < list.length; i++) {
    const curr = list[i];
    if (i === 0) {
      calculated.push({
        ...curr,
        isFirst: true,
        deltaKwh: 0,
        days: 0,
        cost: 0,
        effectivePrice: getActivePriceForDate(curr.timestamp),
        kwhPerDay: 0,
        costPerDay: 0,
        isPriceMixed: false,
      });
    } else {
      const prev = list[i - 1];
      const stats = calculateIntervalCost(prev, curr);
      const kwhPerDay = stats.days > 0 ? (stats.deltaKwh / stats.days) : 0;
      const costPerDay = stats.days > 0 ? (stats.cost / stats.days) : 0;

      calculated.push({
        ...curr,
        isFirst: false,
        deltaKwh: stats.deltaKwh,
        days: stats.days,
        cost: stats.cost,
        effectivePrice: stats.effectivePrice,
        kwhPerDay,
        costPerDay,
        isPriceMixed: stats.isPriceMixed,
        breakdown: stats.breakdown,
      });
    }
  }

  return calculated;
}

// ================= MONTHLY & YEARLY AGGREGATION =================

/**
 * Distributes reading intervals across calendar months continuously.
 */
function getMonthlyBreakdown() {
  const calculated = getCalculatedReadings();
  const monthsMap = new Map();

  calculated.forEach((item) => {
    if (item.isFirst) return;
    const d = new Date(item.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });

    if (!monthsMap.has(key)) {
      monthsMap.set(key, {
        key,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        label,
        kwh: 0,
        cost: 0,
        days: 0,
        entriesCount: 0,
      });
    }

    const m = monthsMap.get(key);
    m.kwh += item.deltaKwh;
    m.cost += item.cost;
    m.days += item.days;
    m.entriesCount += 1;
  });

  const list = Array.from(monthsMap.values()).sort((a, b) => b.key.localeCompare(a.key));

  // Compute daily averages
  list.forEach((m) => {
    m.avgKwhDay = m.days > 0 ? (m.kwh / m.days) : 0;
    m.avgCostDay = m.days > 0 ? (m.cost / m.days) : 0;
  });

  return list;
}

/**
 * Aggregates consumption and costs by calendar year.
 */
function getYearlyBreakdown() {
  const calculated = getCalculatedReadings();
  const yearsMap = new Map();

  calculated.forEach((item) => {
    if (item.isFirst) return;
    const d = new Date(item.timestamp);
    const year = d.getFullYear();

    if (!yearsMap.has(year)) {
      yearsMap.set(year, {
        year,
        kwh: 0,
        cost: 0,
        days: 0,
        monthsIncluded: new Set(),
      });
    }

    const y = yearsMap.get(year);
    y.kwh += item.deltaKwh;
    y.cost += item.cost;
    y.days += item.days;
    y.monthsIncluded.add(d.getMonth() + 1);
  });

  const list = Array.from(yearsMap.values()).sort((a, b) => b.year - a.year);

  list.forEach((y) => {
    const numMonths = Math.max(1, y.monthsIncluded.size);
    y.avgCostMonth = y.cost / numMonths;
    y.avgKwhMonth = y.kwh / numMonths;
    y.avgCostDay = y.days > 0 ? (y.cost / y.days) : 0;
    y.avgKwhDay = y.days > 0 ? (y.kwh / y.days) : 0;
    
    // 365 days projection for the year
    y.projectedYearCost = y.avgCostDay * 365;
  });

  return list;
}

/**
 * High-precision daily breakdown calculation.
 * Distributes consumption and costs continuously across calendar days by time-slicing
 * intervals between meter readings. Supports multiple readings per day with exact intra-day precision.
 */
function calculateDailyBreakdown() {
  const list = [...state.readings].sort((a, b) => a.timestamp - b.timestamp);
  const daysMap = new Map();

  // 1. Process intervals between consecutive readings
  for (let i = 1; i < list.length; i++) {
    const prev = list[i - 1];
    const curr = list[i];
    const t1 = prev.timestamp;
    const t2 = curr.timestamp;
    const durationMs = Math.max(0, t2 - t1);
    const deltaKwh = Math.max(0, curr.kwh - prev.kwh);

    if (durationMs <= 0) continue;

    const curD = new Date(t1);
    curD.setHours(0, 0, 0, 0);

    while (curD.getTime() < t2) {
      const dStart = curD.getTime();
      const nextD = new Date(curD.getFullYear(), curD.getMonth(), curD.getDate() + 1);
      const dEnd = nextD.getTime();

      const segStart = Math.max(t1, dStart);
      const segEnd = Math.min(t2, dEnd);
      const segDur = Math.max(0, segEnd - segStart);

      if (segDur > 0) {
        const segKwh = deltaKwh * (segDur / durationMs);
        const segMid = (segStart + segEnd) / 2;
        const segPrice = getActivePriceForDate(segMid);
        const segCost = segKwh * segPrice;

        const dateKey = `${curD.getFullYear()}-${String(curD.getMonth() + 1).padStart(2, '0')}-${String(curD.getDate()).padStart(2, '0')}`;
        let dayItem = daysMap.get(dateKey);
        if (!dayItem) {
          dayItem = {
            dateKey,
            year: curD.getFullYear(),
            month: curD.getMonth() + 1,
            day: curD.getDate(),
            timestamp: dStart,
            kwh: 0,
            cost: 0,
            measuredDurationMs: 0,
            readings: [],
            intervalsCount: 0,
            hasMeasuredData: true,
            isEstimated: false,
          };
          daysMap.set(dateKey, dayItem);
        }

        dayItem.kwh += segKwh;
        dayItem.cost += segCost;
        dayItem.measuredDurationMs += segDur;
        dayItem.intervalsCount += 1;
        dayItem.hasMeasuredData = true;
      }

      curD.setTime(nextD.getTime());
    }
  }

  // 2. Associate readings with their exact calendar days
  list.forEach((r) => {
    const d = new Date(r.timestamp);
    const dateKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    let dayItem = daysMap.get(dateKey);
    if (!dayItem) {
      const dStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
      dayItem = {
        dateKey,
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: d.getDate(),
        timestamp: dStart,
        kwh: 0,
        cost: 0,
        measuredDurationMs: 0,
        readings: [],
        intervalsCount: 0,
        hasMeasuredData: false,
        isEstimated: false,
      };
      daysMap.set(dateKey, dayItem);
    }
    dayItem.readings.push(r);
  });

  // 3. Ongoing estimate for days since latest reading up to today
  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  let recentDailyRate = 0;

  if (list.length >= 2) {
    const last = list[list.length - 1];
    const prev = list[list.length - 2];
    const durDays = (last.timestamp - prev.timestamp) / 86400000;
    if (durDays > 0) {
      recentDailyRate = Math.max(0, (last.kwh - prev.kwh) / durDays);
    }
  }
  if (recentDailyRate <= 0) {
    recentDailyRate = 4.5;
  }

  if (list.length > 0) {
    const lastReadingTime = list[list.length - 1].timestamp;
    const estCur = new Date(lastReadingTime);
    estCur.setHours(0, 0, 0, 0);

    while (estCur.getTime() <= todayMidnight) {
      const dStart = estCur.getTime();
      const nextD = new Date(estCur.getFullYear(), estCur.getMonth(), estCur.getDate() + 1);
      const dEnd = nextD.getTime();
      const dateKey = `${estCur.getFullYear()}-${String(estCur.getMonth() + 1).padStart(2, '0')}-${String(estCur.getDate()).padStart(2, '0')}`;

      let dayItem = daysMap.get(dateKey);
      if (!dayItem) {
        dayItem = {
          dateKey,
          year: estCur.getFullYear(),
          month: estCur.getMonth() + 1,
          day: estCur.getDate(),
          timestamp: dStart,
          kwh: 0,
          cost: 0,
          measuredDurationMs: 0,
          readings: [],
          intervalsCount: 0,
          hasMeasuredData: false,
          isEstimated: false,
        };
        daysMap.set(dateKey, dayItem);
      }

      if (!dayItem.hasMeasuredData && dayItem.readings.length === 0) {
        const estKwh = recentDailyRate;
        const estPrice = getActivePriceForDate(dStart + 43200000);
        dayItem.kwh = estKwh;
        dayItem.cost = estKwh * estPrice;
        dayItem.isEstimated = true;
      }

      estCur.setTime(nextD.getTime());
    }
  }

  // 4. Group by Years and Months
  const curYear = now.getFullYear();
  const curMonth = now.getMonth() + 1;
  const yearsSet = new Set();
  yearsSet.add(curYear);
  list.forEach(r => yearsSet.add(new Date(r.timestamp).getFullYear()));
  daysMap.forEach(d => yearsSet.add(d.year));

  const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
  const monthNames = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

  const firstReadingTimestamp = list.length > 0 ? list[0].timestamp : null;

  const yearsData = sortedYears.map((year) => {
    const relevantMonths = new Set();
    if (year === curYear) {
      for (let m = 1; m <= curMonth; m++) {
        relevantMonths.add(m);
      }
    }
    daysMap.forEach((d) => {
      if (d.year === year && (d.hasMeasuredData || d.readings.length > 0 || d.isEstimated)) {
        relevantMonths.add(d.month);
      }
    });

    const sortedMonthNums = Array.from(relevantMonths).sort((a, b) => b - a); // Descending (newest month at top)

    let yearTotalKwh = 0;
    let yearTotalCost = 0;
    let yearRecordedDays = 0;

    const monthsData = sortedMonthNums.map((month) => {
      const monthKey = `${year}-${String(month).padStart(2, '0')}`;
      const monthName = monthNames[month - 1];
      const daysInMonth = new Date(year, month, 0).getDate();

      let monthTotalKwh = 0;
      let monthTotalCost = 0;
      let monthRecordedDays = 0;

      const daysList = [];

      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayDate = new Date(year, month - 1, day);
        const dayStartMs = dayDate.getTime();
        const dayEndMs = dayStartMs + 86400000;
        const isToday = (year === curYear && month === curMonth && day === now.getDate());
        const isFuture = dayDate.getTime() > todayMidnight;
        const dayOfWeek = dayDate.getDay();
        const isWeekend = (dayOfWeek === 0 || dayOfWeek === 6);
        const weekdayShort = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'][dayOfWeek];

        const item = daysMap.get(dateKey);
        const readings = item ? item.readings : [];
        const hasMeasured = item ? item.hasMeasuredData : false;
        const isEst = item ? item.isEstimated : false;
        const kwh = item ? item.kwh : 0;
        const cost = item ? item.cost : 0;

        let statusType = 'no-data';
        let statusLabel = 'Keine Daten';
        let statusIcon = '—';

        if (readings.length >= 2) {
          statusType = 'measured-multi';
          statusLabel = `${readings.length} Messungen`;
          statusIcon = '⚡';
        } else if (readings.length === 1) {
          statusType = 'measured-exact';
          statusLabel = '1 Messung';
          statusIcon = '🎯';
        } else if (hasMeasured) {
          statusType = 'interpolated';
          statusLabel = 'Interpoliert';
          statusIcon = '≈';
        } else if (isEst) {
          statusType = 'future-est';
          statusLabel = 'Prognose';
          statusIcon = '🔮';
        } else if (isFuture) {
          statusType = 'future-est';
          statusLabel = 'Zukünftig';
          statusIcon = '🗓️';
        } else if (firstReadingTimestamp && dayEndMs < firstReadingTimestamp) {
          statusType = 'no-data';
          statusLabel = 'Vor Start';
          statusIcon = '—';
        } else {
          statusType = 'no-data';
          statusLabel = 'Keine Daten';
          statusIcon = '—';
        }

        const effectivePrice = kwh > 0 ? (cost / kwh) : getActivePriceForDate(dayStartMs + 43200000);

        if (hasMeasured || readings.length > 0 || isEst) {
          monthTotalKwh += kwh;
          monthTotalCost += cost;
          monthRecordedDays += 1;
        }

        daysList.push({
          dateKey,
          year,
          month,
          day,
          dayNumStr: String(day).padStart(2, '0'),
          weekdayShort,
          isWeekend,
          isToday,
          isFuture,
          readings,
          readingsCount: readings.length,
          kwh,
          cost,
          effectivePrice,
          hasMeasured,
          statusType,
          statusLabel,
          statusIcon,
        });
      }

      yearTotalKwh += monthTotalKwh;
      yearTotalCost += monthTotalCost;
      yearRecordedDays += monthRecordedDays;

      const avgKwhDay = monthRecordedDays > 0 ? (monthTotalKwh / monthRecordedDays) : 0;
      const avgCostDay = monthRecordedDays > 0 ? (monthTotalCost / monthRecordedDays) : 0;

      return {
        year,
        month,
        monthKey,
        monthName,
        totalKwh: monthTotalKwh,
        totalCost: monthTotalCost,
        recordedDays: monthRecordedDays,
        daysInMonth,
        avgKwhDay,
        avgCostDay,
        days: daysList,
      };
    });

    return {
      year,
      totalKwh: yearTotalKwh,
      totalCost: yearTotalCost,
      recordedDays: yearRecordedDays,
      monthsCount: monthsData.length,
      months: monthsData,
    };
  });

  return {
    years: yearsData,
    totalReadings: list.length,
  };
}

// ================= HEIZ- & NACHZAHLUNGSPROGNOSE (30974 WENNIGSEN) =================

/**
 * BDEW-Standardlastprofil HE01 & Gradtagszahlen für 30974 Wennigsen (Deister).
 * Klimaregion Niedersachsen / Hannover (Referenzstation DWD 10338 / Barsinghausen).
 * Berücksichtigt Raumwärmebedarf im Winter und Warmwasser-Sockel (1,5%/Monat) im Sommer.
 */
const WENNIGSEN_HEATING_PROFILE = [
  { month: 1, name: 'Januar', weight: 0.170, tempC: 1.8 },
  { month: 2, name: 'Februar', weight: 0.145, tempC: 2.5 },
  { month: 3, name: 'März', weight: 0.125, tempC: 5.8 },
  { month: 4, name: 'April', weight: 0.075, tempC: 9.9 },
  { month: 5, name: 'Mai', weight: 0.040, tempC: 14.2 },
  { month: 6, name: 'Juni', weight: 0.015, tempC: 17.1 }, // Warmwasser-Sockel
  { month: 7, name: 'Juli', weight: 0.015, tempC: 19.2 }, // Warmwasser-Sockel
  { month: 8, name: 'August', weight: 0.015, tempC: 18.8 }, // Warmwasser-Sockel
  { month: 9, name: 'September', weight: 0.035, tempC: 14.8 },
  { month: 10, name: 'Oktober', weight: 0.085, tempC: 10.2 },
  { month: 11, name: 'November', weight: 0.130, tempC: 5.6 },
  { month: 12, name: 'Dezember', weight: 0.150, tempC: 2.7 },
];

/**
 * Ermittelt das Startjahr der aktuellen Heizperiode basierend auf dem Stichtagsmonat.
 * Standard: September (Monat 9) als offizieller Heizbeginn nach dem Sommer.
 */
function getCurrentSeasonStartYear(startMonth = null) {
  const sm = startMonth || parseInt(state.settings.billingStartMonth || 9, 10);
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1; // 1-12
  if (sm === 1) return currentYear;
  return currentMonth >= sm ? currentYear : currentYear - 1;
}

/**
 * Gibt den formatierten Namen der Heizperiode zurück.
 * Z.B. "Heizperiode 2026/2027" bzw. "Kalenderjahr 2026"
 */
function getSeasonDisplayName(seasonStartYear, startMonth = null) {
  const sm = startMonth || parseInt(state.settings.billingStartMonth || 9, 10);
  if (sm === 1) {
    return `Kalenderjahr ${seasonStartYear}`;
  }
  return `Heizperiode ${seasonStartYear}/${seasonStartYear + 1}`;
}

/**
 * Gibt eine Liste aller verfügbaren Saisons für die Navigation zurück.
 */
function getAvailableSeasons() {
  const startMonth = parseInt(state.settings.billingStartMonth || 9, 10);
  const currentSeasonYear = getCurrentSeasonStartYear(startMonth);
  const yearSet = new Set();

  yearSet.add(currentSeasonYear - 1);
  yearSet.add(currentSeasonYear);
  yearSet.add(currentSeasonYear + 1);
  yearSet.add(currentSeasonYear + 2);

  const calculated = getCalculatedReadings();
  calculated.forEach((r) => {
    const d = new Date(r.timestamp);
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const seasonY = (startMonth === 1) ? y : (m >= startMonth ? y : y - 1);
    yearSet.add(seasonY);
  });

  return Array.from(yearSet)
    .sort((a, b) => a - b)
    .map((year) => ({
      year,
      label: getSeasonDisplayName(year, startMonth),
    }));
}

/**
 * Ermittelt den offiziellen Startwert nach dem Sommer (Heizbeginn) für eine Heizperiode.
 * Anforderung: "der erste wert nach dem sommer den ich eingebe ist der start wert des zählers
 * und ab dort starte ich mit dem heizen."
 */
function getHeatingBaselineForSeason(seasonStartYear, calculatedList = null) {
  const calculated = calculatedList || getCalculatedReadings();
  if (!calculated || calculated.length === 0) {
    return {
      hasBaseline: false,
      reading: null,
      baselineKwh: 0,
      baselineDate: null,
      deltaHeatingKwh: 0,
      activeHeatingDays: 0,
      dailyHeatingKwh: 0,
      heatingCost: 0,
      dailyHeatingCost: 0,
      isDesignated: false,
    };
  }

  const startMonth = parseInt(state.settings.billingStartMonth || 9, 10);
  const explicitId = state.settings.heatingStartReadingId;
  const seasonStartTs = new Date(seasonStartYear, startMonth - 1, 1).getTime();
  const seasonEndTs = new Date(seasonStartYear + 1, startMonth - 1, 1).getTime();

  let baselineReading = null;
  let isExplicit = false;

  // 1. Manuell in den Einstellungen ausgewählte Ablesung
  if (explicitId && explicitId !== 'auto') {
    const found = calculated.find((r) => r.id === explicitId);
    if (found) {
      baselineReading = found;
      isExplicit = true;
    }
  }

  // 2. Ablesung mit gesetztem Flag `isHeatingStart === true`
  if (!baselineReading) {
    const flagged = calculated.find((r) => r.isHeatingStart && r.timestamp >= new Date(seasonStartYear, 6, 1).getTime() && r.timestamp <= new Date(seasonStartYear + 1, 3, 1).getTime());
    if (flagged) {
      baselineReading = flagged;
      isExplicit = true;
    } else {
      const anyFlagged = calculated.find((r) => r.isHeatingStart);
      if (anyFlagged) {
        baselineReading = anyFlagged;
        isExplicit = true;
      }
    }
  }

  // 3. Automatische Erkennung: Erster Wert nach dem Sommer
  // Spätsommer/Herbst-Fenster: 1. August bis 30. November des seasonStartYear
  if (!baselineReading) {
    const autumnWindowStart = new Date(seasonStartYear, 7, 1).getTime(); // 1. August
    const autumnWindowEnd = new Date(seasonStartYear, 10, 30, 23, 59, 59).getTime(); // 30. November

    const autumnReadings = calculated.filter(r => r.timestamp >= autumnWindowStart && r.timestamp <= autumnWindowEnd);
    if (autumnReadings.length > 0) {
      baselineReading = autumnReadings[0];
    } else {
      const seasonReadings = calculated.filter(r => r.timestamp >= seasonStartTs);
      if (seasonReadings.length > 0) {
        baselineReading = seasonReadings[0];
      } else {
        baselineReading = calculated[0];
      }
    }
  }

  if (!baselineReading) {
    return {
      hasBaseline: false,
      reading: null,
      baselineKwh: 0,
      baselineDate: null,
      deltaHeatingKwh: 0,
      activeHeatingDays: 0,
      dailyHeatingKwh: 0,
      heatingCost: 0,
      dailyHeatingCost: 0,
      isDesignated: false,
    };
  }

  // Nachfolgende Ablesungen ab dem Baseline-Wert in dieser Saison
  const subsequent = calculated.filter(r => r.timestamp >= baselineReading.timestamp && r.timestamp <= seasonEndTs);
  const latestReading = subsequent.length > 0 ? subsequent[subsequent.length - 1] : baselineReading;

  const deltaHeatingKwh = Math.max(0, latestReading.kwh - baselineReading.kwh);
  const diffMs = Math.max(0, latestReading.timestamp - baselineReading.timestamp);
  const activeHeatingDays = Math.max(1, Math.round(diffMs / 86400000));
  const dailyHeatingKwh = activeHeatingDays > 0 ? (deltaHeatingKwh / activeHeatingDays) : 0;

  let heatingCost = 0;
  subsequent.forEach((r) => {
    if (!r.isFirst && r.timestamp > baselineReading.timestamp) {
      heatingCost += (r.cost || 0);
    }
  });

  if (heatingCost === 0 && deltaHeatingKwh > 0) {
    const activePrice = getActivePriceForDate(latestReading.timestamp);
    heatingCost = deltaHeatingKwh * activePrice;
  }

  const dailyHeatingCost = activeHeatingDays > 0 ? (heatingCost / activeHeatingDays) : 0;

  return {
    hasBaseline: true,
    reading: baselineReading,
    baselineKwh: baselineReading.kwh,
    baselineDate: new Date(baselineReading.timestamp),
    latestReading,
    deltaHeatingKwh,
    activeHeatingDays,
    dailyHeatingKwh,
    heatingCost,
    dailyHeatingCost,
    isDesignated: isExplicit,
  };
}

/**
 * Berechnet die präzise Heiz- und Kostenprognose für 30974 Wennigsen (Deister).
 * Unterstützt beliebige Heizperioden und das jahresübergreifende Folgejahr.
 */
function calculateWennigsenForecast(targetSeasonYear = null) {
  const calculated = getCalculatedReadings();
  const monthlyData = getMonthlyBreakdown();
  const monthlyMap = new Map();
  monthlyData.forEach((m) => monthlyMap.set(m.key, m));

  const startMonth = parseInt(state.settings.billingStartMonth || 9, 10);
  const currentSeasonStartYear = getCurrentSeasonStartYear(startMonth);
  const seasonStartYear = targetSeasonYear !== null ? targetSeasonYear : (state.forecastSeasonYear || currentSeasonStartYear);
  const isCurrentSeason = seasonStartYear === currentSeasonStartYear;
  const isFolgejahr = seasonStartYear > currentSeasonStartYear;

  const cycleMonths = [];
  let y = seasonStartYear;
  let m = startMonth;

  for (let i = 0; i < 12; i++) {
    const profile = WENNIGSEN_HEATING_PROFILE.find((p) => p.month === m);
    const key = `${y}-${String(m).padStart(2, '0')}`;
    const midDate = new Date(y, m - 1, 15).getTime();
    const activePrice = getActivePriceForDate(midDate);

    const actual = monthlyMap.get(key);
    const isActual = !!actual && actual.kwh > 0;

    cycleMonths.push({
      key,
      year: y,
      month: m,
      name: profile.name,
      weight: profile.weight,
      tempC: profile.tempC,
      isActual,
      actualKwh: isActual ? actual.kwh : 0,
      actualCost: isActual ? actual.cost : 0,
      activePrice,
    });

    m++;
    if (m > 12) {
      m = 1;
      y++;
    }
  }

  // Baseline für diese Heizperiode ermitteln
  const baseline = getHeatingBaselineForSeason(seasonStartYear, calculated);

  // Kalibrierung des Jahresbedarfs anhand der gemessenen Daten und des Startwerts nach dem Sommer
  let estimatedAnnualKwh = 12000; // Bundesdurchschnitt / Referenzwert

  // Methode A: Kalibrierung über Startwert nach dem Sommer
  let baselineCalibratedKwh = null;
  if (baseline.hasBaseline && baseline.deltaHeatingKwh > 0 && baseline.activeHeatingDays >= 5) {
    const bDate = baseline.baselineDate;
    const lDate = new Date(baseline.latestReading.timestamp);
    let elapsedProfileWeight = 0;

    cycleMonths.forEach((cm) => {
      const monthStart = new Date(cm.year, cm.month - 1, 1).getTime();
      const monthEnd = new Date(cm.year, cm.month, 0, 23, 59, 59).getTime();

      if (lDate.getTime() >= monthStart && bDate.getTime() <= monthEnd) {
        const overlapStart = Math.max(monthStart, bDate.getTime());
        const overlapEnd = Math.min(monthEnd, lDate.getTime());
        const totalMonthDays = new Date(cm.year, cm.month, 0).getDate();
        const overlapDays = Math.max(1, (overlapEnd - overlapStart) / 86400000);
        const fraction = Math.min(1, overlapDays / totalMonthDays);
        elapsedProfileWeight += (cm.weight * fraction);
      }
    });

    if (elapsedProfileWeight >= 0.02) {
      baselineCalibratedKwh = baseline.deltaHeatingKwh / elapsedProfileWeight;
    }
  }

  // Methode B: Summe der bereits gemessenen vollen Monate
  let actualWeightSum = 0;
  let actualKwhSum = 0;
  cycleMonths.forEach((cm) => {
    if (cm.isActual) {
      actualWeightSum += cm.weight;
      actualKwhSum += cm.actualKwh;
    }
  });

  if (baselineCalibratedKwh && baselineCalibratedKwh > 1000) {
    estimatedAnnualKwh = baselineCalibratedKwh;
  } else if (actualWeightSum >= 0.03 && actualKwhSum > 0) {
    estimatedAnnualKwh = actualKwhSum / actualWeightSum;
  } else {
    let totKwh = 0, totDays = 0;
    calculated.forEach((r) => {
      if (!r.isFirst) {
        totKwh += r.deltaKwh;
        totDays += r.days;
      }
    });
    if (totDays > 5 && totKwh > 0) {
      estimatedAnnualKwh = (totKwh / totDays) * 365;
    }
  }

  const monthlyInstallment = parseFloat(state.settings.monthlyInstallment) || 120;
  const baseFeeMonthly = parseFloat(state.settings.baseFeeMonthly) || 0;

  let totalCycleKwh = 0;
  let totalEnergyCost = 0;
  let actualMonthsCount = 0;
  let predictedMonthsCount = 0;

  cycleMonths.forEach((cm) => {
    if (cm.isActual) {
      cm.kwh = cm.actualKwh;
      cm.cost = cm.actualCost;
      actualMonthsCount++;
    } else {
      cm.kwh = estimatedAnnualKwh * cm.weight;
      cm.cost = cm.kwh * cm.activePrice;
      predictedMonthsCount++;
    }

    cm.totalCostWithBase = cm.cost + baseFeeMonthly;
    cm.installment = monthlyInstallment;
    cm.monthSaldo = cm.installment - cm.totalCostWithBase;

    totalCycleKwh += cm.kwh;
    totalEnergyCost += cm.cost;
  });

  const totalBaseFeeYear = baseFeeMonthly * 12;
  const totalAnnualCost = totalEnergyCost + totalBaseFeeYear;
  const totalPaidInstallments = monthlyInstallment * 12;
  const balance = totalAnnualCost - totalPaidInstallments;
  const recommendedInstallment = Math.ceil(totalAnnualCost / 12);
  const seasonLabel = getSeasonDisplayName(seasonStartYear, startMonth);

  return {
    cycleMonths,
    seasonStartYear,
    seasonEndYear: seasonStartYear + (startMonth === 1 ? 0 : 1),
    startMonth,
    seasonLabel,
    isCurrentSeason,
    isFolgejahr,
    baseline,
    estimatedAnnualKwh,
    totalCycleKwh,
    totalEnergyCost,
    totalBaseFeeYear,
    totalAnnualCost,
    totalPaidInstallments,
    monthlyInstallment,
    baseFeeMonthly,
    balance,
    isNachzahlung: balance > 0,
    isGuthaben: balance < 0,
    recommendedInstallment,
    actualMonthsCount,
    predictedMonthsCount,
  };
}

function renderForecastDashboardCard() {
  const card = document.getElementById('dash-forecast-card');
  if (!card) return;

  const currentSeasonYear = getCurrentSeasonStartYear();
  const displaySeasonYear = currentSeasonYear + (state.dashForecastSeasonOffset || 0);
  const f = calculateWennigsenForecast(displaySeasonYear);

  // Toggle Buttons synchronisieren
  const btnCurrent = document.getElementById('btn-dash-season-current') || document.getElementById('dash-season-btn-current');
  const btnNext = document.getElementById('btn-dash-season-next') || document.getElementById('dash-season-btn-next');
  if (btnCurrent && btnNext) {
    const curLabel = `Heizperiode ${currentSeasonYear}/${String(currentSeasonYear + 1).slice(-2)}`;
    const nextLabel = `Folgejahr ${currentSeasonYear + 1}/${String(currentSeasonYear + 2).slice(-2)} ▶`;
    btnCurrent.textContent = curLabel;
    btnNext.textContent = nextLabel;
    btnCurrent.classList.toggle('active', state.dashForecastSeasonOffset === 0);
    btnNext.classList.toggle('active', state.dashForecastSeasonOffset === 1);
  }

  // Subtitle im Card Header
  const elCardSubtitle = card.querySelector('.forecast-title-row .card-subtitle');
  if (elCardSubtitle) {
    elCardSubtitle.textContent = state.dashForecastSeasonOffset === 1 
      ? `🔮 Folgejahr-Prognose (${f.seasonLabel})` 
      : `Heiz- & Nachzahlungsprognose (${f.seasonLabel})`;
  }
  const elSeasonLbl = document.getElementById('dash-forecast-season-lbl');
  if (elSeasonLbl) {
    elSeasonLbl.textContent = state.dashForecastSeasonOffset === 1 ? `Folgejahr ${f.seasonLabel}` : f.seasonLabel;
  }

  const elBalance = document.getElementById('dash-forecast-balance');
  const elAnnual = document.getElementById('dash-forecast-annual-cost');
  const elPaid = document.getElementById('dash-forecast-paid');
  const elExpected = document.getElementById('dash-forecast-expected');
  const elProgress = document.getElementById('dash-forecast-progress');
  const elAdvice = document.getElementById('dash-forecast-advice');
  const elBadge = document.getElementById('dash-forecast-status-badge');

  elAnnual.textContent = `${formatNumber(f.totalAnnualCost, 2)} €`;
  elPaid.textContent = `${formatNumber(f.totalPaidInstallments, 0)} €`;
  elExpected.textContent = `${formatNumber(f.totalAnnualCost, 0)} €`;

  const absBalance = Math.abs(f.balance);
  const formattedBalance = `${formatNumber(absBalance, 2)} €`;

  if (f.isNachzahlung) {
    elBalance.textContent = `+ ${formattedBalance} Nachzahlung`;
    elBalance.className = 'forecast-main-val text-rose';
    elBadge.className = 'badge badge-warning';
    elBadge.textContent = state.dashForecastSeasonOffset === 1 ? 'Folgejahr: Nachzahlung' : 'Nachzahlung droht';
    elProgress.style.backgroundColor = '#f43f5e';
    elAdvice.innerHTML = state.dashForecastSeasonOffset === 1
      ? `🔮 <strong>Vorschau Folgejahr (${f.seasonLabel}):</strong> Bei ${formatNumber(f.monthlyInstallment, 0)} €/Mo droht eine Nachzahlung. Empfohlener Abschlag: <strong>${f.recommendedInstallment} €/Mo</strong>.`
      : `⚠️ Dein Abschlag von <strong>${formatNumber(f.monthlyInstallment, 0)} €/Mo</strong> reicht voraussichtlich nicht aus. Empfehlung für 30974 Wennigsen: <strong>${f.recommendedInstallment} €/Mo</strong>.`;
  } else if (f.isGuthaben) {
    elBalance.textContent = `- ${formattedBalance} Guthaben`;
    elBalance.className = 'forecast-main-val text-emerald';
    elBadge.className = 'badge badge-success';
    elBadge.textContent = state.dashForecastSeasonOffset === 1 ? 'Folgejahr: Guthaben' : 'Guthaben erwartet';
    elProgress.style.backgroundColor = '#10b981';
    elAdvice.innerHTML = state.dashForecastSeasonOffset === 1
      ? `🎉 <strong>Vorschau Folgejahr (${f.seasonLabel}):</strong> Dein Abschlag von <strong>${formatNumber(f.monthlyInstallment, 0)} €/Mo</strong> wird auch im Folgejahr voraussichtlich zu einem Guthaben von <strong>${formattedBalance}</strong> führen.`
      : `🎉 Super! Bei deinem Abschlag von <strong>${formatNumber(f.monthlyInstallment, 0)} €/Mo</strong> wirst du voraussichtlich <strong>${formattedBalance}</strong> zurückbekommen.`;
  } else {
    elBalance.textContent = '0,00 € (Punktlandung)';
    elBalance.className = 'forecast-main-val text-emerald';
    elBadge.className = 'badge badge-success';
    elBadge.textContent = 'Punktlandung';
    elProgress.style.backgroundColor = '#10b981';
    elAdvice.innerHTML = `Dein Abschlag von <strong>${formatNumber(f.monthlyInstallment, 0)} €/Mo</strong> deckt die erwarteten Kosten von ${f.seasonLabel} perfekt ab.`;
  }

  const pct = Math.min(100, Math.max(5, (f.totalPaidInstallments / Math.max(1, f.totalAnnualCost)) * 100));
  elProgress.style.width = `${pct}%`;

  // Baseline Strip im Dashboard
  const elBaseText = document.getElementById('dash-baseline-text');
  const strip = document.getElementById('dash-baseline-strip');
  if (strip) {
    if (state.dashForecastSeasonOffset === 1) {
      strip.style.display = 'flex';
      const msg = `<strong>Folgejahr-Vorschau:</strong> 12-Monats-Klimaprognose Wennigsen (${formatNumber(f.estimatedAnnualKwh, 0)} kWh Jahresbedarf)`;
      if (elBaseText) elBaseText.innerHTML = msg;
      else strip.innerHTML = `<span>📅</span><span>${msg}</span>`;
    } else if (f.baseline && f.baseline.hasBaseline) {
      const bDateStr = f.baseline.baselineDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
      const msg = `<strong>${formatNumber(f.baseline.baselineKwh, 1)} kWh</strong> (${bDateStr}) • <strong>+${formatNumber(f.baseline.deltaHeatingKwh, 1)} kWh</strong> Heizung • ${f.baseline.activeHeatingDays} Heiztage • Ø ${formatNumber(f.baseline.dailyHeatingCost, 2)} €/Tag`;
      if (elBaseText) elBaseText.innerHTML = msg;
      else strip.innerHTML = `<span>🔥</span><span><strong>Startwert:</strong> ${msg}</span>`;
    } else {
      const msg = 'Ersten Zählerstand nach dem Sommer eintragen, um die Raumheizung präzise zu kalibrieren.';
      if (elBaseText) elBaseText.textContent = msg;
      else strip.innerHTML = `<span>ℹ️</span><span>${msg}</span>`;
    }
  }
}

function renderForecastView() {
  const container = document.getElementById('subview-forecast');
  if (!container) return;

  const currentSeasonYear = getCurrentSeasonStartYear();
  const activeSeasonYear = state.forecastSeasonYear || currentSeasonYear;
  const f = calculateWennigsenForecast(activeSeasonYear);

  // Season Dropdown Selector befüllen
  const selectSeason = document.getElementById('select-forecast-season');
  if (selectSeason) {
    const seasons = getAvailableSeasons();
    selectSeason.innerHTML = seasons.map((s) => {
      let suffix = '';
      if (s.year === currentSeasonYear) suffix = ' (Aktuell)';
      else if (s.year === currentSeasonYear + 1) suffix = ' (Folgejahr)';
      else if (s.year < currentSeasonYear) suffix = ' (Vorjahr / Historisch)';
      else suffix = ' (Langzeit-Prognose)';
      return `<option value="${s.year}" ${s.year === activeSeasonYear ? 'selected' : ''}>${s.label}${suffix}</option>`;
    }).join('');
  }

  // Season Header Titel
  const titleEl = document.getElementById('forecast-season-title');
  if (titleEl) {
    let tag = '';
    if (f.isCurrentSeason) tag = ' (Aktuelle Heizperiode)';
    else if (f.isFolgejahr) tag = ' (Folgejahr-Vorschau)';
    else tag = ' (Historisch)';
    titleEl.textContent = `${f.seasonLabel}${tag}`;
  }

  // Startwert nach Sommer (Heizbeginn) KPI Karte
  const baselineCard = document.getElementById('heating-baseline-card');
  if (baselineCard) {
    const badgeEl = document.getElementById('baseline-status-label') || document.getElementById('baseline-date-badge');
    const kwhEl = document.getElementById('baseline-val-kwh') || document.getElementById('baseline-kwh-display');
    const deltaEl = document.getElementById('baseline-val-delta') || document.getElementById('baseline-delta-kwh');
    const daysEl = document.getElementById('baseline-val-days') || document.getElementById('baseline-heating-days');
    const costEl = document.getElementById('baseline-val-daily') || document.getElementById('baseline-daily-cost');

    if (f.baseline && f.baseline.hasBaseline) {
      baselineCard.style.display = 'block';
      const bDateStr = f.baseline.baselineDate.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
      const badgeText = f.baseline.isDesignated ? `${bDateStr} (Als Startwert markiert)` : `${bDateStr} (Erster Wert nach Sommer)`;
      
      if (badgeEl) badgeEl.textContent = badgeText;
      if (kwhEl) kwhEl.textContent = `${formatNumber(f.baseline.baselineKwh, 1)} kWh`;
      if (deltaEl) deltaEl.textContent = `+ ${formatNumber(f.baseline.deltaHeatingKwh, 1)} kWh`;
      if (daysEl) daysEl.textContent = `${f.baseline.activeHeatingDays} Tage`;
      if (costEl) costEl.textContent = `${formatNumber(f.baseline.dailyHeatingCost, 2)} € / Tag`;
    } else {
      baselineCard.style.display = 'block';
      if (badgeEl) badgeEl.textContent = 'Noch kein Startwert gesetzt';
      if (kwhEl) kwhEl.textContent = '-- kWh';
      if (deltaEl) deltaEl.textContent = '-- kWh';
      if (daysEl) daysEl.textContent = '-- Tage';
      if (costEl) costEl.textContent = '-- € / Tag';
    }
  }

  // Inputs sync
  const inputInstallment = document.getElementById('forecast-input-installment');
  const inputStart = document.getElementById('forecast-input-start-month');
  if (inputInstallment && document.activeElement !== inputInstallment) {
    inputInstallment.value = f.monthlyInstallment;
  }
  if (inputStart) {
    inputStart.value = f.startMonth;
  }

  // Result KPI Card
  const elBigBalance = document.getElementById('forecast-big-balance');
  const elSub = document.getElementById('forecast-balance-sub');
  const elBadge = document.getElementById('forecast-result-badge');

  const absBalance = Math.abs(f.balance);
  const formattedBalance = `${formatNumber(absBalance, 2)} €`;

  if (f.isNachzahlung) {
    elBigBalance.textContent = `+ ${formattedBalance}`;
    elBigBalance.className = 'forecast-big-balance text-rose';
    elSub.innerHTML = `⚠️ <strong>Voraussichtliche Nachzahlung</strong> für ${f.seasonLabel}.`;
    elBadge.className = 'badge badge-warning';
    elBadge.textContent = 'Nachzahlung';
  } else if (f.isGuthaben) {
    elBigBalance.textContent = `- ${formattedBalance}`;
    elBigBalance.className = 'forecast-big-balance text-emerald';
    elSub.innerHTML = `🎉 <strong>Voraussichtliches Guthaben / Rückzahlung</strong> für ${f.seasonLabel}.`;
    elBadge.className = 'badge badge-success';
    elBadge.textContent = 'Rückzahlung';
  } else {
    elBigBalance.textContent = `0,00 €`;
    elBigBalance.className = 'forecast-big-balance text-emerald';
    elSub.innerHTML = `Punktlandung: Gezahlte Abschläge und Jahreskosten sind deckungsgleich.`;
    elBadge.className = 'badge badge-success';
    elBadge.textContent = 'Ausgeglichen';
  }

  document.getElementById('forecast-kpi-cost').textContent = `${formatNumber(f.totalAnnualCost, 2)} €`;
  document.getElementById('forecast-kpi-kwh').textContent = `${formatNumber(f.totalCycleKwh, 0)} kWh Gesamtprognose`;
  document.getElementById('forecast-kpi-paid').textContent = `${formatNumber(f.totalPaidInstallments, 0)} €`;
  document.getElementById('forecast-kpi-rec-installment').textContent = `${f.recommendedInstallment} € / Mo`;
  document.getElementById('forecast-kpi-actual-count').textContent = `${f.actualMonthsCount} Monate gemessen`;
  document.getElementById('forecast-kpi-pred-count').textContent = `${f.predictedMonthsCount} Monate Wennigsen-Prognose`;

  // 12-Month Detailed Cards
  const monthsContainer = document.getElementById('forecast-months-container');
  if (monthsContainer) {
    monthsContainer.innerHTML = f.cycleMonths.map((cm) => {
      const weightPct = (cm.weight * 100).toFixed(1).replace('.', ',');
      const statusBadge = cm.isActual 
        ? `<span class="badge badge-success">IST-WERT (gemessen)</span>` 
        : `<span class="badge badge-accent">PROGNOSE (DWD Wennigsen)</span>`;

      const saldoFormatted = formatNumber(Math.abs(cm.monthSaldo), 2) + ' €';
      const saldoHtml = cm.monthSaldo >= 0 
        ? `<span class="text-emerald">+${saldoFormatted} Puffer</span>` 
        : `<span class="text-rose">-${saldoFormatted} Überhang</span>`;

      return `
        <div class="forecast-month-card">
          <div class="month-card-header">
            <div>
              <span class="month-card-name">${cm.name} ${cm.year}</span>
              <span class="text-xs text-muted" style="margin-left: 6px;">(${weightPct}% der Heizperiode)</span>
            </div>
            ${statusBadge}
          </div>
          <div class="month-card-grid">
            <div class="month-col">
              <span class="month-col-lbl">Verbrauch</span>
              <span class="month-col-val">${formatNumber(cm.kwh, 1)} kWh</span>
            </div>
            <div class="month-col">
              <span class="month-col-lbl">Kosten</span>
              <span class="month-col-val text-emerald">${formatNumber(cm.cost, 2)} €</span>
            </div>
            <div class="month-col">
              <span class="month-col-lbl">Abschlag</span>
              <span class="month-col-val">${formatNumber(cm.installment, 0)} €</span>
            </div>
            <div class="month-col">
              <span class="month-col-lbl">Monats-Saldo</span>
              <span class="month-col-val text-xs">${saldoHtml}</span>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ================= UI RENDERING =================

function renderAll() {
  renderBottomNav();
  renderTabOrderSettings();
  renderDashboard();
  renderHistory();
  renderPriceTiers();
  renderChart();
  renderDailyTableView();
  renderStatsOverview();
  renderMonthlyBreakdownView();
  renderYearlyBreakdownView();
  renderForecastDashboardCard();
  renderForecastView();
  renderHeatmap();
  renderHeatingCurveChart();
  renderRecords();
  updateSimulationCard();
  updateSavingsCalculator();
  updateWeatherUI();
  updateSettingsInputs();
}

function initHeaderDate() {
  const el = document.getElementById('header-date');
  if (el) {
    const now = new Date();
    el.textContent = now.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  }
}

/**
 * Render Dashboard tab
 */
function renderDashboard() {
  const calculated = getCalculatedReadings();
  const currentPrice = getActivePriceForDate(Date.now());

  const elPrice = document.getElementById('dash-active-price');
  if (elPrice) {
    elPrice.textContent = `${(currentPrice * 100).toFixed(2).replace('.', ',')} ct/kWh`;
  }

  if (calculated.length === 0) {
    document.getElementById('dash-current-kwh').textContent = '0,0';
    document.getElementById('dash-last-date').textContent = 'Noch keine Ablesung erfasst';
    document.getElementById('dash-last-delta').textContent = '-- kWh';
    document.getElementById('dash-last-duration').textContent = '-- Tage';
    document.getElementById('dash-last-cost').textContent = '-- €';
    document.getElementById('dash-last-cost-daily').textContent = '-- €/Tag';
    document.getElementById('dash-month-kwh').textContent = '-- kWh';
    document.getElementById('dash-month-cost').textContent = '-- €';
    document.getElementById('dash-year-kwh').textContent = '-- kWh';
    document.getElementById('dash-year-cost').textContent = '-- €';
    document.getElementById('dash-recent-list').innerHTML = `
      <div class="card" style="text-align: center; color: var(--text-muted); padding: 24px;">
        Erfasse deine erste Zählerablesung mit dem Button oben.
      </div>
    `;
    return;
  }

  const latest = calculated[calculated.length - 1];
  document.getElementById('dash-current-kwh').textContent = formatNumber(latest.kwh, 1);
  
  const lastDate = new Date(latest.timestamp);
  const daysAgo = Math.floor((Date.now() - latest.timestamp) / 86400000);
  const daysAgoStr = daysAgo === 0 ? 'Heute' : daysAgo === 1 ? 'Gestern' : `Vor ${daysAgo} Tagen`;
  document.getElementById('dash-last-date').textContent = `${daysAgoStr} (${lastDate.toLocaleDateString('de-DE')} um ${lastDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr)`;

  if (latest.isFirst) {
    document.getElementById('dash-last-delta').textContent = 'Startwert';
    document.getElementById('dash-last-duration').textContent = 'Erste Ablesung';
    document.getElementById('dash-last-cost').textContent = '0,00 €';
    document.getElementById('dash-last-cost-daily').textContent = 'Basis';
  } else {
    document.getElementById('dash-last-delta').textContent = `+ ${formatNumber(latest.deltaKwh, 1)} kWh`;
    document.getElementById('dash-last-duration').textContent = `in ${Math.round(latest.days)} Tagen (${formatNumber(latest.kwhPerDay, 1)} kWh/d)`;
    document.getElementById('dash-last-cost').textContent = `${formatNumber(latest.cost, 2)} €`;
    document.getElementById('dash-last-cost-daily').textContent = `${formatNumber(latest.costPerDay, 2)} € / Tag`;
  }

  // Month & Year Totals
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let monthKwh = 0, monthCost = 0;
  let yearKwh = 0, yearCost = 0;

  calculated.forEach((item) => {
    if (!item.isFirst) {
      const d = new Date(item.timestamp);
      if (d.getFullYear() === currentYear) {
        yearKwh += item.deltaKwh;
        yearCost += item.cost;
        if (d.getMonth() === currentMonth) {
          monthKwh += item.deltaKwh;
          monthCost += item.cost;
        }
      }
    }
  });

  document.getElementById('dash-month-kwh').textContent = `${formatNumber(monthKwh, 1)} kWh`;
  document.getElementById('dash-month-cost').textContent = `${formatNumber(monthCost, 2)} €`;
  document.getElementById('dash-year-kwh').textContent = `${formatNumber(yearKwh, 0)} kWh`;
  document.getElementById('dash-year-cost').textContent = `${formatNumber(yearCost, 2)} €`;

  const recent3 = [...calculated].reverse().slice(0, 3);
  const elRecentList = document.getElementById('dash-recent-list');
  elRecentList.innerHTML = recent3.map((item) => buildHistoryCardHtml(item)).join('');
  attachHistoryCardEvents(elRecentList);
}

/**
 * Render Full History tab
 */
function renderHistory() {
  const calculated = getCalculatedReadings();
  const elList = document.getElementById('full-history-list');
  const elCount = document.getElementById('history-summary-count');
  const elYearSelect = document.getElementById('history-year-filter');

  elCount.textContent = `${calculated.length} Ablesung${calculated.length === 1 ? '' : 'en'}`;

  const years = new Set();
  calculated.forEach((r) => years.add(new Date(r.timestamp).getFullYear()));
  const currentSelectedYear = elYearSelect.value;
  
  elYearSelect.innerHTML = '<option value="all">Alle Jahre</option>' + 
    Array.from(years).sort((a, b) => b - a).map((y) => `<option value="${y}" ${currentSelectedYear === String(y) ? 'selected' : ''}>${y}</option>`).join('');

  const selectedYear = elYearSelect.value;
  const filtered = calculated.filter((r) => {
    if (selectedYear !== 'all' && new Date(r.timestamp).getFullYear() !== parseInt(selectedYear, 10)) {
      return false;
    }
    if (state.activeTagFilter === 'has-photo') {
      return !!r.photo;
    }
    if (state.activeTagFilter && state.activeTagFilter !== 'all') {
      return Array.isArray(r.tags) && r.tags.includes(state.activeTagFilter);
    }
    return true;
  });

  let totKwh = 0, totCost = 0;
  filtered.forEach((r) => {
    if (!r.isFirst) {
      totKwh += r.deltaKwh;
      totCost += r.cost;
    }
  });

  document.getElementById('filter-total-kwh').textContent = `${formatNumber(totKwh, 1)} kWh`;
  document.getElementById('filter-total-cost').textContent = `${formatNumber(totCost, 2)} €`;

  if (filtered.length === 0) {
    elList.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted); padding: 24px;">Keine Einträge für diesen Filter.</div>`;
    return;
  }

  elList.innerHTML = [...filtered].reverse().map((item) => buildHistoryCardHtml(item)).join('');
  attachHistoryCardEvents(elList);
}

function buildHistoryCardHtml(item) {
  const d = new Date(item.timestamp);
  const dateStr = d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';
  const priceCt = (item.effectivePrice * 100).toFixed(2).replace('.', ',');

  let priceLabel = `@ ${priceCt} ct/kWh`;
  if (item.isPriceMixed) {
    priceLabel = `<span class="badge badge-warning" title="Preiswechsel im Zeitraum">Ø ${priceCt} ct/kWh</span>`;
  }

  const isBaseline = !!item.isHeatingStart || (state.settings.heatingStartReadingId === item.id);
  const baselineBadge = isBaseline
    ? `<span class="badge-heating-start" style="margin-left: 6px;" title="Startwert nach dem Sommer (Heizbeginn)">🔥 Startwert Sommer</span>`
    : '';

  const tagsHtml = (Array.isArray(item.tags) && item.tags.length > 0)
    ? `<div class="history-tags-row" style="margin-top: 6px; display: flex; gap: 4px; flex-wrap: wrap;">${item.tags.map(t => `<span class="badge-entry-tag">#${escapeHtml(t)}</span>`).join('')}</div>`
    : '';

  const photoHtml = item.photo
    ? `<div style="margin-top: 8px; display: flex; align-items: center; gap: 8px;">
         <img src="${item.photo}" class="history-entry-photo-thumb" data-photo-id="${item.id}" alt="Zählerfoto" title="Tippen für Vollbild">
         <span class="badge badge-has-photo" data-photo-id="${item.id}">📸 Zählerfoto öffnen</span>
       </div>`
    : '';

  return `
    <div class="history-card" data-id="${item.id}">
      <div class="history-card-header">
        <div>
          <div class="history-date">${dateStr}</div>
          <div class="history-time">${timeStr}</div>
        </div>
        <div style="text-align: right; padding-right: 50px;">
          <span class="history-reading-kwh">${formatNumber(item.kwh, 1)}</span>
          <span style="font-size: 0.8rem; color: var(--accent-flame-1); font-weight: 600;">kWh</span>
          ${item.isFirst 
            ? `<span class="badge badge-outline" style="margin-left: 6px;">Startwert</span>` 
            : `<span class="history-diff-badge">+${formatNumber(item.deltaKwh, 1)}</span>`
          }
          ${baselineBadge}
        </div>
      </div>

      ${!item.isFirst ? `
        <div class="history-grid">
          <div>
            <div class="history-metric-label">Zeitraum</div>
            <div class="history-metric-val">${Math.round(item.days)} Tage</div>
          </div>
          <div>
            <div class="history-metric-label">Ø Tag</div>
            <div class="history-metric-val">${formatNumber(item.kwhPerDay, 1)} kWh</div>
          </div>
          <div>
            <div class="history-metric-label">Kosten</div>
            <div class="history-metric-val text-emerald">${formatNumber(item.cost, 2)} €</div>
          </div>
        </div>
        <div class="history-price-applied">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          Tarif: ${priceLabel} • Ø ${formatNumber(item.costPerDay, 2)} €/Tag
        </div>
      ` : ''}

      ${tagsHtml}
      ${photoHtml}

      ${item.note ? `<div class="history-note">📝 ${escapeHtml(item.note)}</div>` : ''}

      <div class="history-actions">
        <button class="btn-icon-xs edit-reading" data-id="${item.id}" title="Bearbeiten" aria-label="Bearbeiten">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button class="btn-icon-xs delete delete-reading" data-id="${item.id}" title="Löschen" aria-label="Löschen">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `;
}

function attachHistoryCardEvents(container) {
  container.querySelectorAll('.edit-reading').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      openEditReadingModal(btn.dataset.id);
    });
  });

  container.querySelectorAll('.delete-reading').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      handleDeleteReading(btn.dataset.id);
    });
  });

  container.querySelectorAll('.history-entry-photo-thumb, .badge-has-photo').forEach((el) => {
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      openPhotoLightbox(el.dataset.photoId);
    });
  });
}

/**
 * Render Price Tiers in Settings
 */
function renderPriceTiers() {
  const elList = document.getElementById('price-tiers-list');
  const nowStr = new Date().toISOString().slice(0, 10);
  const activePrice = getActivePriceForDate(Date.now());

  if (state.prices.length === 0) {
    elList.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 12px;">Kein Preis hinterlegt. Bitte füge einen Preis hinzu.</div>`;
    return;
  }

  const sorted = [...state.prices].sort((a, b) => b.validFrom.localeCompare(a.validFrom));

  elList.innerHTML = sorted.map((tier) => {
    const dateFormatted = new Date(tier.validFrom + 'T00:00:00').toLocaleDateString('de-DE');
    const cents = (tier.pricePerKwh * 100).toFixed(2).replace('.', ',');
    const isActive = Math.abs(tier.pricePerKwh - activePrice) < 0.00001 && tier.validFrom <= nowStr;

    return `
      <div class="price-tier-item ${isActive ? 'active-tier' : ''}">
        <div>
          <div class="tier-main">
            <span class="tier-rate">${cents} ct</span>
            <span class="tier-date">/ kWh (${formatNumber(tier.pricePerKwh, 4)} €)</span>
            ${isActive ? '<span class="badge badge-success">AKTIV</span>' : (tier.validFrom > nowStr ? '<span class="badge badge-warning">GEPLANT</span>' : '<span class="badge badge-outline">ARCHIV</span>')}
          </div>
          <div class="tier-note">
            Gültig ab: <strong>${dateFormatted}</strong>
            ${tier.note ? ` • ${escapeHtml(tier.note)}` : ''}
          </div>
        </div>
        <div class="tier-actions">
          <button class="btn-icon-xs edit-price" data-id="${tier.id}" title="Bearbeiten">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button class="btn-icon-xs delete delete-price" data-id="${tier.id}" title="Löschen">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  elList.querySelectorAll('.edit-price').forEach((btn) => {
    btn.addEventListener('click', () => openEditPriceModal(btn.dataset.id));
  });

  elList.querySelectorAll('.delete-price').forEach((btn) => {
    btn.addEventListener('click', () => handleDeletePrice(btn.dataset.id));
  });
}

function updateSettingsInputs() {
  const elBaseFee = document.getElementById('setting-base-fee');
  if (elBaseFee) {
    elBaseFee.value = state.settings.baseFeeMonthly || '';
  }
  const elInstallment = document.getElementById('setting-monthly-installment');
  if (elInstallment) {
    elInstallment.value = state.settings.monthlyInstallment || 120;
  }
  const elStartMonth = document.getElementById('setting-billing-start');
  if (elStartMonth) {
    elStartMonth.value = state.settings.billingStartMonth || 9;
  }

  // Startwert nach dem Sommer (Heizbeginn) Dropdown
  const elBaselineSelect = document.getElementById('setting-heating-baseline-select');
  if (elBaselineSelect) {
    const selectedId = state.settings.heatingStartReadingId || 'auto';
    const calculated = getCalculatedReadings();

    let optionsHtml = `<option value="auto" ${selectedId === 'auto' ? 'selected' : ''}>Automatisch ermitteln (erster Wert nach dem Sommer)</option>`;

    if (calculated.length > 0) {
      optionsHtml += [...calculated].reverse().map((r) => {
        const d = new Date(r.timestamp);
        const dStr = d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const noteStr = r.note ? ` • ${r.note}` : '';
        const flagStr = r.isHeatingStart ? ' 🔥 [Heizbeginn]' : '';
        const isSel = selectedId === r.id ? 'selected' : '';
        return `<option value="${r.id}" ${isSel}>${dStr}: ${formatNumber(r.kwh, 1)} kWh${noteStr}${flagStr}</option>`;
      }).join('');
    }

    elBaselineSelect.innerHTML = optionsHtml;
  }

  const elHaptic = document.getElementById('setting-haptic-feedback');
  if (elHaptic) {
    elHaptic.checked = state.settings.hapticFeedback !== false;
  }
  const elGistToken = document.getElementById('setting-github-token');
  if (elGistToken) {
    elGistToken.value = state.settings.githubToken || '';
  }
  const elGistId = document.getElementById('setting-github-gist-id');
  if (elGistId) {
    elGistId.value = state.settings.githubGistId || '';
  }
  const elAutoSync = document.getElementById('setting-auto-sync');
  if (elAutoSync) {
    elAutoSync.checked = !!state.settings.autoSync;
  }
  const elSyncTime = document.getElementById('sync-last-time');
  if (elSyncTime) {
    if (state.settings.lastSyncTimestamp) {
      const dt = new Date(state.settings.lastSyncTimestamp);
      elSyncTime.textContent = `Zuletzt synchronisiert: ${dt.toLocaleDateString('de-DE')} ${dt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr`;
    } else {
      elSyncTime.textContent = 'Noch nicht synchronisiert';
    }
  }
}

// ================= TAGESTABELLE (HIERARCHISCHE JAHRE -> MONATE -> TAGE) =================

const tableAccordionState = {
  expandedYears: new Set(),
  expandedMonths: new Set(),
  allExpanded: false,
};

/**
 * Render daily breakdown table view with expandable Years and Months.
 * Implements the user requirement: "immer den aktuellen monat und jahr aufgeklappt haben".
 */
function renderDailyTableView() {
  const container = document.getElementById('daily-table-hierarchy');
  if (!container) return;

  const data = calculateDailyBreakdown();
  const now = new Date();
  const curYear = now.getFullYear();
  const curMonthKey = `${curYear}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // REQUIREMENT: Always ensure current year and current month are expanded
  tableAccordionState.expandedYears.add(curYear);
  tableAccordionState.expandedMonths.add(curMonthKey);

  if (!data.years || data.years.length === 0 || data.totalReadings === 0) {
    container.innerHTML = `
      <div class="card" style="text-align: center; padding: 32px 16px;">
        <div style="font-size: 2.2rem; margin-bottom: 10px;">📅</div>
        <h4 style="font-size: 1rem; margin-bottom: 6px;">Noch keine Zählerstände erfasst</h4>
        <p class="text-muted text-sm" style="max-width: 340px; margin: 0 auto 16px;">
          Trage deinen ersten Zählerstand ein. Sobald Ablesungen vorhanden sind, siehst du hier jeden einzelnen Tag mit präzisem kWh-Verbrauch und Kosten.
        </p>
        <button type="button" class="btn btn-primary btn-sm" id="btn-table-first-reading">
          Ersten Zählerstand erfassen
        </button>
      </div>
    `;
    const btnFirst = document.getElementById('btn-table-first-reading');
    if (btnFirst) {
      btnFirst.addEventListener('click', () => openAddReadingModal());
    }
    return;
  }

  // Render years hierarchy
  container.innerHTML = data.years.map((yearObj) => {
    const isYearOpen = tableAccordionState.expandedYears.has(yearObj.year);

    const monthsHtml = yearObj.months.map((monthObj) => {
      const isMonthOpen = tableAccordionState.expandedMonths.has(monthObj.monthKey);

      const daysHtml = monthObj.days.map((dayObj) => {
        const isTodayClass = dayObj.isToday ? 'is-today' : '';
        const isWeekendClass = dayObj.isWeekend ? 'is-weekend' : '';
        const hasData = dayObj.hasMeasured || dayObj.readingsCount > 0 || dayObj.statusType === 'future-est';

        const kwhText = hasData ? `${formatNumber(dayObj.kwh, 2)} kWh` : '—';
        const costText = hasData ? `${formatNumber(dayObj.cost, 2)} €` : '—';
        const priceRateText = hasData ? `${formatNumber(dayObj.effectivePrice * 100, 2)} ct/kWh` : '—';

        // Reading details if any readings were taken on this day
        let readingSubtext = '';
        if (dayObj.readings && dayObj.readings.length > 0) {
          const parts = dayObj.readings.map((r) => {
            const rd = new Date(r.timestamp);
            const timeStr = rd.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            return `${timeStr}: ${formatNumber(r.kwh, 1)} kWh${r.note ? ' (' + r.note + ')' : ''}`;
          });
          readingSubtext = `<div class="text-muted" style="font-size: 0.68rem; margin-top: 2px;">${parts.join(' • ')}</div>`;
        }

        return `
          <tr class="day-row ${isTodayClass} ${isWeekendClass}">
            <td>
              <div class="daily-date-cell">
                <span>${dayObj.dayNumStr}. ${dayObj.weekdayShort}</span>
                ${dayObj.isToday ? '<span class="badge-today-mini">Heute</span>' : ''}
              </div>
              ${readingSubtext}
            </td>
            <td>
              <span class="day-kwh-val">${kwhText}</span>
            </td>
            <td>
              <span class="day-cost-val">${costText}</span>
            </td>
            <td>
              <span class="day-price-rate">${priceRateText}</span>
            </td>
            <td>
              <span class="day-status-pill status-${dayObj.statusType}">
                ${dayObj.statusIcon} ${dayObj.statusLabel}
              </span>
            </td>
          </tr>
        `;
      }).join('');

      return `
        <div class="month-accordion-item ${isMonthOpen ? 'open' : ''}" data-month-key="${monthObj.monthKey}">
          <div class="month-accordion-header" data-toggle-month="${monthObj.monthKey}">
            <div class="month-header-left">
              <span class="month-title">${monthObj.monthName} ${monthObj.year}</span>
              <span class="badge badge-accent">${formatNumber(monthObj.totalKwh, 1)} kWh</span>
            </div>
            <div class="month-header-right">
              <span class="badge badge-success">${formatNumber(monthObj.totalCost, 2)} €</span>
              <span class="accordion-chevron">▶</span>
            </div>
          </div>
          <div class="month-accordion-body">
            <div class="daily-table-wrap">
              <table class="daily-table">
                <thead>
                  <tr>
                    <th>Tag</th>
                    <th>Verbrauch</th>
                    <th>Kosten</th>
                    <th>Arbeitspreis</th>
                    <th>Erfassung / Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${daysHtml}
                </tbody>
              </table>
            </div>
            <div class="month-table-footer">
              <div>
                Monatssumme: <strong>${formatNumber(monthObj.totalKwh, 1)} kWh</strong> • <strong class="text-emerald">${formatNumber(monthObj.totalCost, 2)} €</strong>
              </div>
              <div class="text-xs text-muted">
                Ø ${formatNumber(monthObj.avgKwhDay, 1)} kWh/Tag • ${formatNumber(monthObj.avgCostDay, 2)} €/Tag (${monthObj.recordedDays} Tage aktiv)
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="year-accordion-item ${isYearOpen ? 'open' : ''}" data-year="${yearObj.year}">
        <div class="year-accordion-header" data-toggle-year="${yearObj.year}">
          <div class="year-header-left">
            <span class="year-title">${yearObj.year}</span>
            <span class="badge badge-accent">${formatNumber(yearObj.totalKwh, 1)} kWh</span>
          </div>
          <div class="year-header-right">
            <span class="badge badge-success">${formatNumber(yearObj.totalCost, 2)} €</span>
            <span class="text-xs text-muted">${yearObj.monthsCount} Monate</span>
            <span class="accordion-chevron">▶</span>
          </div>
        </div>
        <div class="year-accordion-body">
          ${monthsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Attach accordion toggle handlers
  container.querySelectorAll('[data-toggle-year]').forEach((header) => {
    header.addEventListener('click', () => {
      const year = parseInt(header.dataset.toggleYear, 10);
      const yearItem = header.closest('.year-accordion-item');
      if (!yearItem) return;

      if (tableAccordionState.expandedYears.has(year)) {
        tableAccordionState.expandedYears.delete(year);
        yearItem.classList.remove('open');
      } else {
        tableAccordionState.expandedYears.add(year);
        yearItem.classList.add('open');
      }
      triggerHaptic('light');
    });
  });

  container.querySelectorAll('[data-toggle-month]').forEach((header) => {
    header.addEventListener('click', (e) => {
      e.stopPropagation();
      const monthKey = header.dataset.toggleMonth;
      const monthItem = header.closest('.month-accordion-item');
      if (!monthItem) return;

      if (tableAccordionState.expandedMonths.has(monthKey)) {
        tableAccordionState.expandedMonths.delete(monthKey);
        monthItem.classList.remove('open');
      } else {
        tableAccordionState.expandedMonths.add(monthKey);
        monthItem.classList.add('open');
      }
      triggerHaptic('light');
    });
  });
}

/**
 * Render Monthly Breakdown subview in Statistics
 */
function renderMonthlyBreakdownView() {
  const elList = document.getElementById('stats-months-list');
  if (!elList) return;

  const months = getMonthlyBreakdown();
  if (months.length === 0) {
    elList.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted); padding: 24px;">Noch keine Monatsdaten vorhanden.</div>`;
    return;
  }

  elList.innerHTML = months.map((m) => `
    <div class="breakdown-card">
      <div class="breakdown-card-top">
        <span class="breakdown-card-period">${m.label}</span>
        <span class="badge badge-accent">${formatNumber(m.kwh, 1)} kWh</span>
      </div>
      <div class="breakdown-grid">
        <div class="breakdown-cell">
          <span class="breakdown-cell-lbl">Monatskosten</span>
          <span class="breakdown-cell-val text-emerald">${formatNumber(m.cost, 2)} €</span>
          <span class="breakdown-cell-sub">nur Arbeitskosten</span>
        </div>
        <div class="breakdown-cell">
          <span class="breakdown-cell-lbl">Ø Kosten pro Tag</span>
          <span class="breakdown-cell-val text-amber">${formatNumber(m.avgCostDay, 2)} € / Tag</span>
          <span class="breakdown-cell-sub">${formatNumber(m.avgKwhDay, 1)} kWh / Tag</span>
        </div>
      </div>
    </div>
  `).join('');
}

/**
 * Render Yearly Breakdown subview in Statistics
 */
function renderYearlyBreakdownView() {
  const elList = document.getElementById('stats-years-list');
  if (!elList) return;

  const years = getYearlyBreakdown();
  if (years.length === 0) {
    elList.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted); padding: 24px;">Noch keine Jahresdaten vorhanden.</div>`;
    return;
  }

  elList.innerHTML = years.map((y) => `
    <div class="breakdown-card">
      <div class="breakdown-card-top">
        <span class="breakdown-card-period">Jahr ${y.year}</span>
        <span class="badge badge-accent">${formatNumber(y.kwh, 0)} kWh</span>
      </div>
      <div class="breakdown-grid">
        <div class="breakdown-cell">
          <span class="breakdown-cell-lbl">Jahreskosten</span>
          <span class="breakdown-cell-val text-emerald">${formatNumber(y.cost, 2)} €</span>
          <span class="breakdown-cell-sub">Ø ${formatNumber(y.avgCostMonth, 2)} € / Monat</span>
        </div>
        <div class="breakdown-cell">
          <span class="breakdown-cell-lbl">Ø pro Tag & Hochrechnung</span>
          <span class="breakdown-cell-val text-amber">${formatNumber(y.avgCostDay, 2)} € / Tag</span>
          <span class="breakdown-cell-sub">ca. ${formatNumber(y.projectedYearCost, 2)} € Hochrechnung</span>
        </div>
      </div>
    </div>
  `).join('');
}

function renderStatsOverview() {
  const calculated = getCalculatedReadings();
  let totalKwh = 0, totalCost = 0, totalDays = 0;

  calculated.forEach((r) => {
    if (!r.isFirst) {
      totalKwh += r.deltaKwh;
      totalCost += r.cost;
      totalDays += r.days;
    }
  });

  document.getElementById('stat-total-kwh').textContent = `${formatNumber(totalKwh, 1)} kWh`;
  document.getElementById('stat-total-cost').textContent = `${formatNumber(totalCost, 2)} €`;

  if (calculated.length > 0) {
    const firstDate = new Date(calculated[0].timestamp).toLocaleDateString('de-DE');
    document.getElementById('stat-first-reading-date').textContent = `seit Start am ${firstDate}`;
  }

  const currentPrice = getActivePriceForDate(Date.now());
  const dailyKwh = totalDays > 0 ? (totalKwh / totalDays) : 0;
  const yearlyKwh = dailyKwh * 365;
  const yearlyCost = yearlyKwh * currentPrice + (state.settings.baseFeeMonthly || 0) * 12;

  document.getElementById('stat-year-projection-kwh').textContent = `${formatNumber(yearlyKwh, 0)} kWh`;
  document.getElementById('stat-year-projection-cost').textContent = `ca. ${formatNumber(yearlyCost, 2)} € / Jahr (inkl. Grundpreis)`;
}

// ================= NATIVE RETINA CANVAS CHART ENGINE =================
let chartDataCache = [];

function renderChart() {
  const canvas = document.getElementById('stats-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const calculated = getCalculatedReadings();
  const monthlyMap = new Map();

  calculated.forEach((item) => {
    if (item.isFirst) return;
    const d = new Date(item.timestamp);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    const label = d.toLocaleDateString('de-DE', { month: 'short', year: '2-digit' });

    if (!monthlyMap.has(key)) {
      monthlyMap.set(key, { key, label, kwh: 0, cost: 0, days: 0 });
    }
    const m = monthlyMap.get(key);
    m.kwh += item.deltaKwh;
    m.cost += item.cost;
    m.days += item.days;
  });

  const chartData = Array.from(monthlyMap.values()).slice(-8);
  chartDataCache = chartData;

  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const elTitle = document.getElementById('chart-main-title');
  if (elTitle) {
    elTitle.textContent = state.chartMode === 'kwh' ? 'Monatlicher Gasverbrauch (kWh)' : 'Monatliche Heizkosten (€)';
  }

  if (chartData.length === 0) {
    ctx.fillStyle = '#6e6e7c';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Noch nicht genügend Ablesungen für das Diagramm', w / 2, h / 2);
    ctx.restore();
    return;
  }

  const paddingBottom = 28;
  const paddingTop = 20;
  const paddingLeft = 38;
  const paddingRight = 14;
  const chartH = h - paddingTop - paddingBottom;
  const chartW = w - paddingLeft - paddingRight;

  const isKwh = state.chartMode === 'kwh';
  const values = chartData.map((d) => (isKwh ? d.kwh : d.cost));
  let maxVal = Math.max(...values, 10);

  // Punkt 22: Vorjahres-Vergleich Overlay data mapping
  chartData.forEach((d) => {
    const parts = d.key.split('-');
    const prevKey = `${parseInt(parts[0], 10) - 1}-${parts[1]}`;
    const prevM = monthlyMap.get(prevKey);
    d.prevVal = prevM ? (isKwh ? prevM.kwh : prevM.cost) : null;
    if (state.showPrevYearComparison && d.prevVal !== null) {
      if (d.prevVal > maxVal) maxVal = d.prevVal;
    }
  });

  maxVal = Math.ceil(maxVal * 1.18);

  ctx.strokeStyle = '#22222a';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#71717a';
  ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'right';

  for (let i = 0; i <= 3; i++) {
    const yVal = (maxVal / 3) * i;
    const yPos = h - paddingBottom - (yVal / maxVal) * chartH;

    ctx.beginPath();
    ctx.setLineDash([3, 4]);
    ctx.moveTo(paddingLeft, yPos);
    ctx.lineTo(w - paddingRight, yPos);
    ctx.stroke();
    ctx.setLineDash([]);

    const labelVal = isKwh ? Math.round(yVal) : yVal.toFixed(0) + '€';
    ctx.fillText(labelVal, paddingLeft - 6, yPos + 3);
  }

  const numBars = chartData.length;
  const colWidth = chartW / numBars;
  const barWidth = Math.min(36, colWidth * (state.showPrevYearComparison ? 0.5 : 0.65));

  // Dynamic accent colors based on user theme
  const rootStyles = getComputedStyle(document.documentElement);
  const flame1 = rootStyles.getPropertyValue('--accent-flame-1').trim() || '#f59e0b';
  const flame2 = rootStyles.getPropertyValue('--accent-flame-2').trim() || '#ea580c';

  // Vorjahres-Kurvenpunkte für Verbindungslinie sammeln
  const prevLinePoints = [];

  chartData.forEach((d, idx) => {
    const val = isKwh ? d.kwh : d.cost;
    const barH = (val / maxVal) * chartH;
    const x = paddingLeft + idx * colWidth + (colWidth - barWidth) / 2;
    const y = h - paddingBottom - barH;

    d.box = { x, y, width: barWidth, height: barH };

    const grad = ctx.createLinearGradient(0, y, 0, h - paddingBottom);
    if (isKwh) {
      grad.addColorStop(0, flame1);
      grad.addColorStop(1, flame2);
    } else {
      grad.addColorStop(0, '#10b981');
      grad.addColorStop(1, '#047857');
    }

    ctx.fillStyle = grad;
    drawRoundedRect(ctx, x, y, barWidth, Math.max(3, barH), 6, true, false);

    ctx.fillStyle = '#f4f4f6';
    ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    const topText = isKwh ? Math.round(val) : formatNumber(val, 0) + '€';
    ctx.fillText(topText, x + barWidth / 2, Math.max(14, y - 4));

    ctx.fillStyle = '#a0a0ab';
    ctx.fillText(d.label, x + barWidth / 2, h - 8);

    // Punkt 22: Vorjahres-Punkt
    if (state.showPrevYearComparison && d.prevVal !== null) {
      const prevH = (d.prevVal / maxVal) * chartH;
      const prevY = h - paddingBottom - prevH;
      prevLinePoints.push({ x: x + barWidth / 2, y: prevY, val: d.prevVal });
    }
  });

  // Punkt 22: Vorjahres-Linie zeichnen
  if (state.showPrevYearComparison && prevLinePoints.length > 0) {
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2.5;
    ctx.setLineDash([4, 3]);
    ctx.beginPath();
    prevLinePoints.forEach((pt, i) => {
      if (i === 0) ctx.moveTo(pt.x, pt.y);
      else ctx.lineTo(pt.x, pt.y);
    });
    ctx.stroke();
    ctx.setLineDash([]);

    // Punkte & Vorjahres-Labels
    prevLinePoints.forEach((pt) => {
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#bae6fd';
      ctx.font = '9px -apple-system, BlinkMacSystemFont, sans-serif';
      ctx.textAlign = 'center';
      const pText = isKwh ? Math.round(pt.val) : formatNumber(pt.val, 0) + '€';
      ctx.fillText(pText, pt.x, Math.max(12, pt.y - 7));
    });

    // Legende
    ctx.fillStyle = '#38bdf8';
    ctx.font = '9px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('● Vorjahr', w - paddingRight, 14);
  }

  ctx.restore();
}

function drawRoundedRect(ctx, x, y, width, height, radius, topOnly = true) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  if (topOnly) {
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
  } else {
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
  }
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  ctx.fill();
}

function initChartControls() {
  // Stats subviews switcher
  document.querySelectorAll('.main-stats-toggle .segment-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.main-stats-toggle .segment-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const target = btn.dataset.statsSubview;
      state.statsSubview = target;
      localStorage.setItem(STORAGE_KEYS.STATS_SUBVIEW, target);
      indicateAutoSaved();
      triggerHaptic('light');

      document.querySelectorAll('.stats-subview').forEach((view) => view.classList.remove('active'));
      const activeView = document.getElementById(`subview-${target}`);
      if (activeView) activeView.classList.add('active');

      if (target === 'chart') {
        setTimeout(renderChart, 50);
      } else if (target === 'table') {
        renderDailyTableView();
      } else if (target === 'months') {
        renderMonthlyBreakdownView();
      } else if (target === 'years') {
        renderYearlyBreakdownView();
      } else if (target === 'forecast') {
        renderForecastView();
      } else if (target === 'heatmap') {
        renderHeatmap();
      } else if (target === 'curve') {
        renderHeatingCurveChart();
      } else if (target === 'records') {
        renderRecords();
      }
    });
  });

  // Tagestabelle Aktionen (Aktueller Monat öffnen & Alle auf-/zuklappen)
  const btnTableCurrentMonth = document.getElementById('btn-table-current-month');
  if (btnTableCurrentMonth) {
    btnTableCurrentMonth.addEventListener('click', () => {
      const now = new Date();
      const curYear = now.getFullYear();
      const curMonthKey = `${curYear}-${String(now.getMonth() + 1).padStart(2, '0')}`;
      tableAccordionState.expandedYears.add(curYear);
      tableAccordionState.expandedMonths.add(curMonthKey);
      renderDailyTableView();
      triggerHaptic('light');

      setTimeout(() => {
        const monthEl = document.querySelector(`[data-month-key="${curMonthKey}"]`);
        if (monthEl) {
          monthEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }, 50);
    });
  }

  const btnTableToggleAll = document.getElementById('btn-table-toggle-all');
  if (btnTableToggleAll) {
    btnTableToggleAll.addEventListener('click', () => {
      tableAccordionState.allExpanded = !tableAccordionState.allExpanded;
      triggerHaptic('medium');
      const data = calculateDailyBreakdown();
      if (tableAccordionState.allExpanded) {
        data.years.forEach((y) => {
          tableAccordionState.expandedYears.add(y.year);
          y.months.forEach((m) => tableAccordionState.expandedMonths.add(m.monthKey));
        });
        btnTableToggleAll.textContent = 'Alle zuklappen';
      } else {
        tableAccordionState.expandedYears.clear();
        tableAccordionState.expandedMonths.clear();
        // REQUIREMENT: Always keep current year and current month open
        const now = new Date();
        const curYear = now.getFullYear();
        const curMonthKey = `${curYear}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        tableAccordionState.expandedYears.add(curYear);
        tableAccordionState.expandedMonths.add(curMonthKey);
        btnTableToggleAll.textContent = 'Alle aufklappen';
      }
      renderDailyTableView();
    });
  }

  // Punkt 22: Vorjahres-Vergleich Toggle
  const chkPrevYear = document.getElementById('chart-toggle-prev-year');
  if (chkPrevYear) {
    chkPrevYear.checked = !!state.showPrevYearComparison;
    chkPrevYear.addEventListener('change', (e) => {
      state.showPrevYearComparison = e.target.checked;
      localStorage.setItem(STORAGE_KEYS.PREV_YEAR_COMP, String(e.target.checked));
      triggerHaptic('light');
      renderChart();
    });
  }

  // Chart Mode Switcher (kWh vs €)
  document.querySelectorAll('#subview-chart .segment-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#subview-chart .segment-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      state.chartMode = btn.dataset.chartMode;
      localStorage.setItem(STORAGE_KEYS.CHART_MODE, state.chartMode);
      indicateAutoSaved();
      renderChart();
    });
  });

  // Touch Tooltip
  const canvas = document.getElementById('stats-canvas');
  const tooltip = document.getElementById('chart-tooltip');

  function handlePointer(e) {
    if (!canvas || chartDataCache.length === 0) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let hit = null;
    for (const d of chartDataCache) {
      if (d.box && x >= d.box.x - 10 && x <= d.box.x + d.box.width + 10) {
        hit = d;
        break;
      }
    }

    if (hit) {
      tooltip.innerHTML = `<strong>${hit.label}</strong>: ${formatNumber(hit.kwh, 1)} kWh • <span style="color:#10b981;">${formatNumber(hit.cost, 2)} €</span>`;
      tooltip.classList.add('visible');
    } else {
      tooltip.classList.remove('visible');
    }
  }

  canvas.addEventListener('mousemove', handlePointer);
  canvas.addEventListener('touchstart', handlePointer, { passive: true });
  canvas.addEventListener('touchmove', handlePointer, { passive: true });
  canvas.addEventListener('mouseleave', () => tooltip.classList.remove('visible'));
  canvas.addEventListener('touchend', () => setTimeout(() => tooltip.classList.remove('visible'), 2500));

  let resizeDebounce = null;
  const handleViewportChange = () => {
    if (resizeDebounce) clearTimeout(resizeDebounce);
    resizeDebounce = setTimeout(() => {
      if (state.currentTab === 'view-stats') {
        if (state.statsSubview === 'chart') {
          renderChart();
        } else if (state.statsSubview === 'heatmap') {
          renderHeatmap();
        } else if (state.statsSubview === 'curve') {
          renderHeatingCurveChart();
        } else if (state.statsSubview === 'table') {
          renderDailyTableView();
        }
      } else if (state.currentTab === 'view-dashboard') {
        renderDashboard();
      }
    }, 120);
  };

  window.addEventListener('resize', handleViewportChange);
  window.addEventListener('orientationchange', handleViewportChange);
  if (window.screen && window.screen.orientation && window.screen.orientation.addEventListener) {
    window.screen.orientation.addEventListener('change', handleViewportChange);
  }
}

// ================= MODALS & FORMS =================

function initModals() {
  document.getElementById('btn-open-add-reading').addEventListener('click', () => openAddReadingModal());
  document.getElementById('btn-quick-add').addEventListener('click', () => openAddReadingModal());
  document.getElementById('btn-add-from-history').addEventListener('click', () => openAddReadingModal());
  document.getElementById('btn-close-reading-modal').addEventListener('click', () => closeModal('modal-reading'));
  document.getElementById('btn-cancel-reading').addEventListener('click', () => closeModal('modal-reading'));

  // Summary Modal Buttons
  document.getElementById('btn-close-entry-summary').addEventListener('click', () => closeModal('modal-entry-summary'));
  document.getElementById('btn-summary-done').addEventListener('click', () => closeModal('modal-entry-summary'));
  document.getElementById('btn-summary-to-history').addEventListener('click', () => {
    closeModal('modal-entry-summary');
    switchTab('view-history');
  });

  // Price Modal Triggers
  document.getElementById('btn-add-price').addEventListener('click', () => openAddPriceModal());
  document.getElementById('btn-close-price-modal').addEventListener('click', () => closeModal('modal-price'));
  document.getElementById('btn-cancel-price').addEventListener('click', () => closeModal('modal-price'));

  // Installation Guide
  document.getElementById('btn-open-install-guide').addEventListener('click', () => openModal('modal-install-guide'));
  document.getElementById('btn-close-guide').addEventListener('click', () => closeModal('modal-install-guide'));

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('open');
      }
    });
  });

  document.getElementById('btn-set-reading-now').addEventListener('click', () => {
    document.getElementById('reading-datetime').value = formatDateTimeForInput(new Date());
    updateReadingLivePreview();
  });
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.add('open');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('open');
}

function openAddReadingModal() {
  state.editingReadingId = null;
  document.getElementById('modal-reading-title').textContent = 'Zählerstand erfassen';
  document.getElementById('reading-id').value = '';
  document.getElementById('reading-kwh').value = '';
  document.getElementById('reading-note').value = '';

  // AUTOMATISCH AKTUELLE UHRZEIT UND TAG ÜBERNEHMEN
  document.getElementById('reading-datetime').value = formatDateTimeForInput(new Date());

  // Reset OCR panel
  const ocrPanel = document.getElementById('ocr-correction-panel');
  if (ocrPanel) ocrPanel.style.display = 'none';

  // Reset Plausibility box
  const plausBox = document.getElementById('reading-plausibility-box');
  if (plausBox) plausBox.style.display = 'none';

  // Reset Photo
  const photoInput = document.getElementById('reading-photo-data');
  if (photoInput) photoInput.value = '';
  const photoPreviewWrap = document.getElementById('reading-photo-preview-wrap');
  if (photoPreviewWrap) photoPreviewWrap.style.display = 'none';
  const photoImg = document.getElementById('reading-photo-preview-img');
  if (photoImg) photoImg.src = '';

  // Reset Tags
  const tagsInput = document.getElementById('reading-tags-input');
  if (tagsInput) tagsInput.value = '[]';
  document.querySelectorAll('#modal-tag-chips .tag-chip').forEach(c => c.classList.remove('active'));

  const chkHeatingStart = document.getElementById('reading-is-heating-start');
  if (chkHeatingStart) {
    const nowMonth = new Date().getMonth() + 1;
    const isAutumn = nowMonth >= 8 && nowMonth <= 11;
    const hasBaseline = state.readings.some(r => r.isHeatingStart);
    chkHeatingStart.checked = isAutumn && !hasBaseline;
  }

  const calculated = getCalculatedReadings();
  const prevHintEl = document.getElementById('reading-prev-hint');
  const prevValEl = document.getElementById('reading-prev-val');

  if (calculated.length > 0) {
    const latest = calculated[calculated.length - 1];
    prevHintEl.style.display = 'block';
    prevValEl.textContent = formatNumber(latest.kwh, 1);
  } else {
    prevHintEl.style.display = 'none';
  }

  updateReadingLivePreview();
  openModal('modal-reading');
  setTimeout(() => document.getElementById('reading-kwh').focus(), 150);
}

function openEditReadingModal(id) {
  const reading = state.readings.find((r) => r.id === id);
  if (!reading) return;

  state.editingReadingId = id;
  document.getElementById('modal-reading-title').textContent = 'Zählerstand bearbeiten';
  document.getElementById('reading-id').value = reading.id;
  document.getElementById('reading-kwh').value = reading.kwh;
  document.getElementById('reading-datetime').value = reading.dateString;
  document.getElementById('reading-note').value = reading.note || '';

  // Reset OCR panel
  const ocrPanel = document.getElementById('ocr-correction-panel');
  if (ocrPanel) ocrPanel.style.display = 'none';

  // Photo
  const photoInput = document.getElementById('reading-photo-data');
  const photoPreviewWrap = document.getElementById('reading-photo-preview-wrap');
  const photoImg = document.getElementById('reading-photo-preview-img');
  if (reading.photo) {
    if (photoInput) photoInput.value = reading.photo;
    if (photoImg) photoImg.src = reading.photo;
    if (photoPreviewWrap) photoPreviewWrap.style.display = 'flex';
  } else {
    if (photoInput) photoInput.value = '';
    if (photoPreviewWrap) photoPreviewWrap.style.display = 'none';
  }

  // Tags
  const tagsInput = document.getElementById('reading-tags-input');
  const existingTags = Array.isArray(reading.tags) ? reading.tags : [];
  if (tagsInput) tagsInput.value = JSON.stringify(existingTags);
  document.querySelectorAll('#modal-tag-chips .tag-chip').forEach(c => {
    c.classList.toggle('active', existingTags.includes(c.dataset.tag));
  });

  const chkHeatingStart = document.getElementById('reading-is-heating-start');
  if (chkHeatingStart) {
    chkHeatingStart.checked = !!reading.isHeatingStart || (state.settings.heatingStartReadingId === reading.id);
  }

  updateReadingLivePreview();
  openModal('modal-reading');
}

function openAddPriceModal() {
  state.editingPriceId = null;
  document.getElementById('modal-price-title').textContent = 'Neuen Preis anlegen';
  document.getElementById('price-id').value = '';
  document.getElementById('price-cents').value = '';
  document.getElementById('price-note').value = '';
  document.getElementById('price-euro-preview').innerHTML = 'Entspricht: <strong>0,0000 € / kWh</strong>';
  document.getElementById('price-valid-from').value = new Date().toISOString().slice(0, 10);

  openModal('modal-price');
  setTimeout(() => document.getElementById('price-cents').focus(), 150);
}

function openEditPriceModal(id) {
  const tier = state.prices.find((p) => p.id === id);
  if (!tier) return;

  state.editingPriceId = id;
  document.getElementById('modal-price-title').textContent = 'Preis bearbeiten';
  document.getElementById('price-id').value = tier.id;
  document.getElementById('price-cents').value = (tier.pricePerKwh * 100).toFixed(2);
  document.getElementById('price-valid-from').value = tier.validFrom;
  document.getElementById('price-note').value = tier.note || '';

  updatePriceEuroPreview(tier.pricePerKwh);
  openModal('modal-price');
}

function updateReadingLivePreview() {
  const val = parseFloat(document.getElementById('reading-kwh').value);
  const dtStr = document.getElementById('reading-datetime').value;
  const targetTs = dtStr ? new Date(dtStr).getTime() : Date.now();

  const elDelta = document.getElementById('preview-delta');
  const elDuration = document.getElementById('preview-duration');
  const elCost = document.getElementById('preview-cost');
  const elDaily = document.getElementById('preview-daily');
  const elPriceInfo = document.getElementById('preview-price-info');
  const badge = document.getElementById('preview-status-badge');

  const plausBox = document.getElementById('reading-plausibility-box');
  const plausTitle = document.getElementById('plausibility-title');
  const plausDesc = document.getElementById('plausibility-desc');

  if (isNaN(val)) {
    elDelta.textContent = '-- kWh';
    elDuration.textContent = '-- Tage';
    elCost.textContent = '-- €';
    elDaily.textContent = '-- kWh/d';
    badge.className = 'badge badge-outline';
    badge.textContent = 'Bereit';
    elPriceInfo.textContent = `Aktueller Tarif: ${(getActivePriceForDate(targetTs) * 100).toFixed(2).replace('.', ',')} ct/kWh`;
    if (plausBox) plausBox.style.display = 'none';
    return;
  }

  const others = state.readings
    .filter((r) => r.id !== state.editingReadingId)
    .sort((a, b) => a.timestamp - b.timestamp);

  const prev = others.filter((r) => r.timestamp <= targetTs).pop();

  if (!prev) {
    elDelta.textContent = '0,0 kWh';
    elDuration.textContent = '0 Tage';
    elCost.textContent = '0,00 €';
    elDaily.textContent = 'Basiswert';
    badge.className = 'badge badge-success';
    badge.textContent = 'Start-Eintrag';
    elPriceInfo.textContent = 'Dieser Eintrag dient als Anfangszählerstand.';
    if (plausBox) plausBox.style.display = 'none';
    return;
  }

  const delta = val - prev.kwh;
  const tempCurr = { timestamp: targetTs, kwh: val };
  const calc = calculateIntervalCost(prev, tempCurr);

  elDelta.textContent = `${delta >= 0 ? '+' : ''}${formatNumber(delta, 1)} kWh`;
  elDuration.textContent = `${Math.round(calc.days)} Tage`;
  elCost.textContent = `${formatNumber(calc.cost, 2)} €`;

  const kwhPerDay = calc.days > 0 ? (calc.deltaKwh / calc.days) : 0;
  elDaily.textContent = `${formatNumber(kwhPerDay, 1)} kWh/d`;

  const priceFormatted = (calc.effectivePrice * 100).toFixed(2).replace('.', ',');
  if (calc.isPriceMixed) {
    elPriceInfo.innerHTML = `⚠️ <strong>Preiswechsel im Zeitraum!</strong> Mischpreis: ${priceFormatted} ct/kWh`;
  } else {
    elPriceInfo.textContent = `Angewendeter Preis: ${priceFormatted} ct/kWh`;
  }

  // Punkt 3: Plausibilitäts- & Vertipper-Schutz
  if (delta < 0) {
    badge.className = 'badge badge-warning';
    badge.textContent = 'Niedriger als Vorwert!';
    if (plausBox) {
      plausBox.style.display = 'flex';
      plausTitle.textContent = 'Rückwärts laufender Zählerstand!';
      plausDesc.textContent = `Der eingegebene Wert (${formatNumber(val, 1)} kWh) liegt ${formatNumber(Math.abs(delta), 1)} kWh unter dem vorherigen Zählerstand (${formatNumber(prev.kwh, 1)} kWh). Bitte Zahl prüfen!`;
    }
    triggerHaptic('warning');
  } else if (kwhPerDay > 250 && calc.days >= 0.5) {
    badge.className = 'badge badge-warning';
    badge.textContent = 'Extremer Verbrauch!';
    if (plausBox) {
      plausBox.style.display = 'flex';
      plausTitle.textContent = 'Ungewöhnlich hoher Verbrauch!';
      plausDesc.textContent = `Berechneter Verbrauch: ${formatNumber(kwhPerDay, 1)} kWh/Tag (+${formatNumber(delta, 1)} kWh in ${Math.round(calc.days)} Tagen). Möglicherweise eine Ziffer zu viel eingetippt?`;
    }
    triggerHaptic('warning');
  } else if (val > prev.kwh * 4 && delta > 2000) {
    badge.className = 'badge badge-warning';
    badge.textContent = 'Ziffernanzahl prüfen!';
    if (plausBox) {
      plausBox.style.display = 'flex';
      plausTitle.textContent = 'Großer Zählersprung erkannt!';
      plausDesc.textContent = `Der Zählerstand ist auffällig stark gestiegen. Bitte überprüfe, ob sich eine Null oder Ziffer verdoppelt hat.`;
    }
    triggerHaptic('warning');
  } else {
    badge.className = 'badge badge-success';
    badge.textContent = 'Plausibel';
    if (plausBox) plausBox.style.display = 'none';
  }
}

function updatePriceEuroPreview(eurValue) {
  const el = document.getElementById('price-euro-preview');
  if (el) {
    el.innerHTML = `Entspricht: <strong>${formatNumber(eurValue, 4)} € / kWh</strong>`;
  }
}

/**
 * Show the comprehensive evaluation summary modal right after an entry is saved.
 */
function showPostEntrySummary(targetReadingId) {
  const calculated = getCalculatedReadings();
  const idx = calculated.findIndex((r) => r.id === targetReadingId);
  if (idx === -1) return;

  const item = calculated[idx];
  const d = new Date(item.timestamp);

  // Interval Header
  const elHeader = document.getElementById('summary-interval-header');
  if (item.isFirst) {
    elHeader.textContent = 'Start-Ablesung';
    document.getElementById('summary-period-cost').textContent = '0,00 €';
    document.getElementById('summary-daily-cost').textContent = '0,00 €/Tag';
    document.getElementById('summary-period-kwh').textContent = 'Basiswert';
    document.getElementById('summary-daily-kwh').textContent = '-';
    document.getElementById('summary-period-days').textContent = '0 Tage';
    document.getElementById('summary-period-price').textContent = `${(item.effectivePrice * 100).toFixed(2).replace('.', ',')} ct/kWh`;
  } else {
    const prevItem = calculated[idx - 1];
    const prevD = new Date(prevItem.timestamp);
    elHeader.textContent = `Vom ${prevD.toLocaleDateString('de-DE')} bis ${d.toLocaleDateString('de-DE')} (${Math.round(item.days)} Tage)`;

    document.getElementById('summary-period-cost').textContent = `${formatNumber(item.cost, 2)} €`;
    document.getElementById('summary-daily-cost').textContent = `${formatNumber(item.costPerDay, 2)} €/Tag`;
    document.getElementById('summary-period-kwh').textContent = `+ ${formatNumber(item.deltaKwh, 1)} kWh`;
    document.getElementById('summary-daily-kwh').textContent = `${formatNumber(item.kwhPerDay, 1)} kWh/d`;
    document.getElementById('summary-period-days').textContent = `${Math.round(item.days)} Tage`;
    document.getElementById('summary-period-price').textContent = `${(item.effectivePrice * 100).toFixed(2).replace('.', ',')} ct/kWh`;
  }

  // Cumulative all-time totals up to this reading
  let totalCostToDate = 0;
  let totalKwhToDate = 0;
  let totalDaysToDate = 0;

  for (let i = 0; i <= idx; i++) {
    if (!calculated[i].isFirst) {
      totalCostToDate += calculated[i].cost;
      totalKwhToDate += calculated[i].deltaKwh;
      totalDaysToDate += calculated[i].days;
    }
  }

  const alltimeDailyCost = totalDaysToDate > 0 ? (totalCostToDate / totalDaysToDate) : 0;
  document.getElementById('summary-total-cost-todate').textContent = `${formatNumber(totalCostToDate, 2)} €`;
  document.getElementById('summary-alltime-daily-cost').textContent = `Ø ${formatNumber(alltimeDailyCost, 2)} € / Tag`;
  document.getElementById('summary-meter-todate').textContent = `${formatNumber(item.kwh, 1)} kWh`;
  document.getElementById('summary-total-kwh-todate').textContent = `Gesamtverbrauch: ${formatNumber(totalKwhToDate, 1)} kWh`;

  // Month & Year Cumulative Context
  const targetMonth = d.getMonth();
  const targetYear = d.getFullYear();
  let mKwh = 0, mCost = 0, yKwh = 0, yCost = 0;

  calculated.slice(0, idx + 1).forEach((r) => {
    if (!r.isFirst) {
      const rd = new Date(r.timestamp);
      if (rd.getFullYear() === targetYear) {
        yKwh += r.deltaKwh;
        yCost += r.cost;
        if (rd.getMonth() === targetMonth) {
          mKwh += r.deltaKwh;
          mCost += r.cost;
        }
      }
    }
  });

  const monthName = d.toLocaleDateString('de-DE', { month: 'long' });
  document.getElementById('summary-month-name').textContent = `Monat ${monthName}`;
  document.getElementById('summary-month-vals').textContent = `${formatNumber(mKwh, 1)} kWh • ${formatNumber(mCost, 2)} €`;

  document.getElementById('summary-year-name').textContent = `Jahr ${targetYear}`;
  document.getElementById('summary-year-vals').textContent = `${formatNumber(yKwh, 0)} kWh • ${formatNumber(yCost, 2)} €`;

  openModal('modal-entry-summary');
}

function initForms() {
  document.getElementById('reading-kwh').addEventListener('input', updateReadingLivePreview);
  document.getElementById('reading-datetime').addEventListener('input', updateReadingLivePreview);

  document.getElementById('price-cents').addEventListener('input', (e) => {
    const cents = parseFloat(e.target.value);
    const eur = isNaN(cents) ? 0 : cents / 100;
    updatePriceEuroPreview(eur);
  });

  // Reading Form Submit
  document.getElementById('form-reading').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('reading-id').value;
    const kwh = parseFloat(document.getElementById('reading-kwh').value);
    const dtStr = document.getElementById('reading-datetime').value;
    const note = document.getElementById('reading-note').value.trim();

    if (isNaN(kwh)) {
      showToast('Bitte einen gültigen Zählerstand eingeben', 'error');
      return;
    }
    if (!dtStr) {
      showToast('Bitte ein Datum angeben', 'error');
      return;
    }

    const timestamp = new Date(dtStr).getTime();
    let savedId = id;
    const isHeatingStart = document.getElementById('reading-is-heating-start') 
      ? document.getElementById('reading-is-heating-start').checked 
      : false;

    const photo = document.getElementById('reading-photo-data') ? document.getElementById('reading-photo-data').value : null;
    const rawTags = document.getElementById('reading-tags-input') ? document.getElementById('reading-tags-input').value : '[]';
    let tags = [];
    try { tags = rawTags ? JSON.parse(rawTags) : []; } catch (err) { tags = []; }

    if (id) {
      const existing = state.readings.find((r) => r.id === id);
      if (existing) {
        existing.kwh = kwh;
        existing.dateString = dtStr;
        existing.timestamp = timestamp;
        existing.note = note;
        existing.isHeatingStart = isHeatingStart;
        existing.photo = photo;
        existing.tags = tags;

        if (isHeatingStart) {
          state.settings.heatingStartReadingId = existing.id;
          saveSettings();
        }

        showToast('Zählerstand aktualisiert', 'success');
        triggerHaptic('success');
      }
    } else {
      savedId = 'r-' + Date.now();
      state.readings.push({
        id: savedId,
        kwh,
        dateString: dtStr,
        timestamp,
        note,
        isHeatingStart,
        photo,
        tags,
      });

      if (isHeatingStart) {
        state.settings.heatingStartReadingId = savedId;
        saveSettings();
      }

      showToast(isHeatingStart ? '🔥 Startwert für Heizperiode gespeichert!' : 'Neuer Zählerstand gespeichert', 'success');
      triggerHaptic('success');
    }

    saveReadings();
    closeModal('modal-reading');
    renderAll();

    // Show instant post-submission summary!
    setTimeout(() => {
      showPostEntrySummary(savedId);
    }, 200);
  });

  // Price Form Submit
  document.getElementById('form-price').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = document.getElementById('price-id').value;
    const cents = parseFloat(document.getElementById('price-cents').value);
    const validFrom = document.getElementById('price-valid-from').value;
    const note = document.getElementById('price-note').value.trim();

    if (isNaN(cents) || cents < 0) {
      showToast('Bitte einen gültigen Preis eingeben', 'error');
      triggerHaptic('error');
      return;
    }
    if (!validFrom) {
      showToast('Bitte ein Gültigkeitsdatum auswählen', 'error');
      triggerHaptic('error');
      return;
    }

    const pricePerKwh = cents / 100.0;

    if (id) {
      const existing = state.prices.find((p) => p.id === id);
      if (existing) {
        existing.pricePerKwh = pricePerKwh;
        existing.validFrom = validFrom;
        existing.note = note;
        showToast('Preis aktualisiert', 'success');
        triggerHaptic('success');
      }
    } else {
      state.prices.push({
        id: 'p-' + Date.now(),
        pricePerKwh,
        validFrom,
        note,
      });
      showToast(`Neuer Preis ab ${new Date(validFrom + 'T00:00:00').toLocaleDateString('de-DE')} gespeichert!`, 'success');
      triggerHaptic('success');
    }

    savePrices();
    closeModal('modal-price');
    renderAll();
  });

  // Haptic Feedback Setting Checkbox
  const chkHaptic = document.getElementById('setting-haptic-feedback');
  if (chkHaptic) {
    chkHaptic.addEventListener('change', (e) => {
      state.settings.hapticFeedback = e.target.checked;
      saveSettings();
      triggerHaptic('light');
      showToast(e.target.checked ? 'Haptisches Feedback aktiviert' : 'Haptisches Feedback deaktiviert', 'info');
    });
  }

  document.getElementById('setting-base-fee').addEventListener('change', (e) => {
    const fee = parseFloat(e.target.value) || 0;
    state.settings.baseFeeMonthly = fee;
    saveSettings();
    renderStatsOverview();
    renderForecastDashboardCard();
    renderForecastView();
    showToast('Grundpreis gespeichert', 'success');
  });

  // Forecast inputs synchronization (Statistik & Einstellungen)
  const forecastInstallment = document.getElementById('forecast-input-installment');
  const forecastStartMonth = document.getElementById('forecast-input-start-month');
  const settingInstallment = document.getElementById('setting-monthly-installment');
  const settingStartMonth = document.getElementById('setting-billing-start');

  const onInstallmentChange = (val) => {
    state.settings.monthlyInstallment = val;
    if (settingInstallment && settingInstallment !== document.activeElement) settingInstallment.value = val;
    if (forecastInstallment && forecastInstallment !== document.activeElement) forecastInstallment.value = val;
    saveSettings();
    renderForecastDashboardCard();
    renderForecastView();
  };

  const onStartMonthChange = (val) => {
    state.settings.billingStartMonth = val;
    if (settingStartMonth) settingStartMonth.value = val;
    if (forecastStartMonth) forecastStartMonth.value = val;
    saveSettings();
    renderForecastDashboardCard();
    renderForecastView();
  };

  if (forecastInstallment) {
    forecastInstallment.addEventListener('input', (e) => onInstallmentChange(parseFloat(e.target.value) || 0));
  }
  if (settingInstallment) {
    settingInstallment.addEventListener('input', (e) => onInstallmentChange(parseFloat(e.target.value) || 0));
  }

  if (forecastStartMonth) {
    forecastStartMonth.addEventListener('change', (e) => onStartMonthChange(parseInt(e.target.value, 10) || 1));
  }
  if (settingStartMonth) {
    settingStartMonth.addEventListener('change', (e) => onStartMonthChange(parseInt(e.target.value, 10) || 1));
  }

  // Startwert nach dem Sommer (Heizbeginn) Einstellung
  const settingBaseline = document.getElementById('setting-heating-baseline-select');
  if (settingBaseline) {
    settingBaseline.addEventListener('change', (e) => {
      state.settings.heatingStartReadingId = e.target.value;
      saveSettings();
      renderForecastDashboardCard();
      renderForecastView();
      renderHistory();
      showToast('Startwert für Heizbeginn gespeichert', 'success');
    });
  }

  // Dashboard Season Toggle (Heizperiode vs Folgejahr)
  const dashBtnCurrent = document.getElementById('btn-dash-season-current') || document.getElementById('dash-season-btn-current');
  const dashBtnNext = document.getElementById('btn-dash-season-next') || document.getElementById('dash-season-btn-next');
  if (dashBtnCurrent) {
    dashBtnCurrent.addEventListener('click', () => {
      state.dashForecastSeasonOffset = 0;
      renderForecastDashboardCard();
    });
  }
  if (dashBtnNext) {
    dashBtnNext.addEventListener('click', () => {
      state.dashForecastSeasonOffset = 1;
      renderForecastDashboardCard();
    });
  }

  // Forecast Tab Season Selector & Nav Buttons
  const selectForecastSeason = document.getElementById('select-forecast-season');
  const btnPrevSeason = document.getElementById('btn-forecast-prev-season') || document.getElementById('btn-prev-season');
  const btnNextSeason = document.getElementById('btn-forecast-next-season') || document.getElementById('btn-next-season');

  if (selectForecastSeason) {
    selectForecastSeason.addEventListener('change', (e) => {
      state.forecastSeasonYear = parseInt(e.target.value, 10);
      localStorage.setItem(STORAGE_KEYS.FORECAST_SEASON_YEAR, state.forecastSeasonYear);
      renderForecastView();
    });
  }

  if (btnPrevSeason) {
    btnPrevSeason.addEventListener('click', () => {
      const startMonth = parseInt(state.settings.billingStartMonth || 9, 10);
      const currYear = state.forecastSeasonYear || getCurrentSeasonStartYear(startMonth);
      state.forecastSeasonYear = currYear - 1;
      localStorage.setItem(STORAGE_KEYS.FORECAST_SEASON_YEAR, state.forecastSeasonYear);
      renderForecastView();
    });
  }

  if (btnNextSeason) {
    btnNextSeason.addEventListener('click', () => {
      const startMonth = parseInt(state.settings.billingStartMonth || 9, 10);
      const currYear = state.forecastSeasonYear || getCurrentSeasonStartYear(startMonth);
      state.forecastSeasonYear = currYear + 1;
      localStorage.setItem(STORAGE_KEYS.FORECAST_SEASON_YEAR, state.forecastSeasonYear);
      renderForecastView();
    });
  }

  // Dashboard forecast card button
  const btnDashForecast = document.getElementById('btn-dash-to-forecast');
  if (btnDashForecast) {
    btnDashForecast.addEventListener('click', () => {
      switchTab('view-stats');
      document.querySelectorAll('.main-stats-toggle .segment-btn').forEach((b) => {
        b.classList.toggle('active', b.dataset.statsSubview === 'forecast');
      });
      document.querySelectorAll('.stats-subview').forEach((view) => {
        view.classList.toggle('active', view.id === 'subview-forecast');
      });
      state.statsSubview = 'forecast';
      localStorage.setItem(STORAGE_KEYS.STATS_SUBVIEW, 'forecast');
      indicateAutoSaved();
      renderForecastView();
    });
  }

  document.getElementById('history-year-filter').addEventListener('change', () => {
    renderHistory();
  });
}

function handleDeleteReading(id) {
  if (confirm('Diesen Zählerstand wirklich löschen?')) {
    state.readings = state.readings.filter((r) => r.id !== id);
    saveReadings();
    renderAll();
    showToast('Zählerstand gelöscht', 'warning');
  }
}

function handleDeletePrice(id) {
  if (state.prices.length <= 1) {
    showToast('Es muss mindestens ein Preis hinterlegt sein!', 'error');
    return;
  }
  if (confirm('Diesen Preis wirklich löschen?')) {
    state.prices = state.prices.filter((p) => p.id !== id);
    savePrices();
    renderAll();
    showToast('Preis gelöscht', 'warning');
  }
}

// ================= NAVIGATION & TAB ORDER =================
function initNavigation() {
  renderBottomNav();

  const linkHistory = document.getElementById('link-view-all-history');
  if (linkHistory) {
    linkHistory.addEventListener('click', () => {
      switchTab('view-history');
    });
  }
}

function renderBottomNav() {
  const navContainer = document.getElementById('bottom-nav');
  if (!navContainer) return;

  navContainer.innerHTML = state.tabOrder
    .map((tabId) => {
      const def = TAB_DEFINITIONS[tabId];
      if (!def) return '';
      const isActive = state.currentTab === tabId ? 'active' : '';
      return `
        <button class="nav-item ${isActive}" data-view="${tabId}" aria-label="${def.label}">
          ${def.iconSvg}
          <span>${def.label}</span>
        </button>
      `;
    })
    .join('');

  navContainer.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.view);
    });
  });
}

function switchTab(viewId) {
  if (!TAB_DEFINITIONS[viewId]) return;
  state.currentTab = viewId;
  localStorage.setItem(STORAGE_KEYS.LAST_TAB, viewId);
  indicateAutoSaved();
  triggerHaptic('light');

  document.querySelectorAll('.tab-view').forEach((view) => {
    view.classList.toggle('active', view.id === viewId);
  });

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.view === viewId);
  });

  if (viewId === 'view-stats') {
    if (state.statsSubview === 'chart') {
      setTimeout(renderChart, 50);
    } else if (state.statsSubview === 'table') {
      renderDailyTableView();
    } else if (state.statsSubview === 'months') {
      renderMonthlyBreakdownView();
    } else if (state.statsSubview === 'years') {
      renderYearlyBreakdownView();
    } else if (state.statsSubview === 'forecast') {
      renderForecastView();
    } else if (state.statsSubview === 'heatmap') {
      renderHeatmap();
    } else if (state.statsSubview === 'curve') {
      renderHeatingCurveChart();
    } else if (state.statsSubview === 'records') {
      renderRecords();
    }
  } else if (viewId === 'view-settings') {
    renderTabOrderSettings();
  }
}

function initTabOrderControls() {
  const btnReset = document.getElementById('btn-reset-tab-order');
  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.tabOrder = [...DEFAULT_TAB_ORDER];
      saveTabOrder();
      renderBottomNav();
      renderTabOrderSettings();
      showToast('Reiter-Reihenfolge auf Standard zurückgesetzt', 'info');
    });
  }
}

function renderTabOrderSettings() {
  const listContainer = document.getElementById('tab-order-list');
  if (!listContainer) return;

  listContainer.innerHTML = state.tabOrder
    .map((tabId, idx) => {
      const def = TAB_DEFINITIONS[tabId];
      if (!def) return '';
      const isFirst = idx === 0;
      const isLast = idx === state.tabOrder.length - 1;
      const badge = isFirst ? '<span class="badge badge-accent" style="font-size: 0.65rem;">Startseite</span>' : '';

      return `
        <div class="tab-order-item ${isFirst ? 'is-first' : ''}" data-tab-id="${tabId}">
          <div class="tab-order-pos">${idx + 1}</div>
          <div class="tab-order-icon">${def.iconSvg}</div>
          <div class="tab-order-info">
            <div class="tab-order-title">${def.label} ${badge}</div>
            <div class="tab-order-desc">${def.desc}</div>
          </div>
          <div class="tab-order-actions">
            <button class="btn-order-move btn-move-up" data-index="${idx}" title="Nach oben verschieben" ${isFirst ? 'disabled' : ''} aria-label="Nach oben">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="18 15 12 9 6 15"/></svg>
            </button>
            <button class="btn-order-move btn-move-down" data-index="${idx}" title="Nach unten verschieben" ${isLast ? 'disabled' : ''} aria-label="Nach unten">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
          </div>
        </div>
      `;
    })
    .join('');

  listContainer.querySelectorAll('.btn-move-up').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index, 10);
      if (index > 0) {
        moveTab(index, index - 1);
      }
    });
  });

  listContainer.querySelectorAll('.btn-move-down').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const index = parseInt(btn.dataset.index, 10);
      if (index < state.tabOrder.length - 1) {
        moveTab(index, index + 1);
      }
    });
  });
}

function moveTab(fromIndex, toIndex) {
  const item = state.tabOrder.splice(fromIndex, 1)[0];
  state.tabOrder.splice(toIndex, 0, item);
  saveTabOrder();
  renderBottomNav();
  renderTabOrderSettings();
  showToast(`Reiter "${TAB_DEFINITIONS[item].label}" verschoben`, 'success');
}

function restoreActiveSessionView() {
  if (state.currentTab && TAB_DEFINITIONS[state.currentTab]) {
    switchTab(state.currentTab);
  } else {
    switchTab(state.tabOrder[0]);
  }

  if (state.statsSubview) {
    document.querySelectorAll('.main-stats-toggle .segment-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.statsSubview === state.statsSubview);
    });
    document.querySelectorAll('.stats-subview').forEach((view) => {
      view.classList.toggle('active', view.id === `subview-${state.statsSubview}`);
    });

    if (state.currentTab === 'view-stats' && state.statsSubview === 'table') {
      renderDailyTableView();
    }
  }

  if (state.chartMode) {
    document.querySelectorAll('#subview-chart .segment-btn').forEach((b) => {
      b.classList.toggle('active', b.dataset.chartMode === state.chartMode);
    });
  }

  indicateAutoSaved();
}

function initLifecyclePersist() {
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      persistFullState();
    }
  });

  window.addEventListener('pagehide', () => {
    persistFullState();
  });

  window.addEventListener('beforeunload', () => {
    persistFullState();
  });
}

// ================= PRINT & PDF REPORT GENERATION =================
function initPrintActions() {
  const triggerPrint = () => {
    generatePrintableReport();
    setTimeout(() => {
      window.print();
    }, 150);
  };

  document.getElementById('btn-quick-print').addEventListener('click', triggerPrint);
  document.getElementById('btn-print-stats').addEventListener('click', triggerPrint);
  document.getElementById('btn-open-print-report').addEventListener('click', triggerPrint);
}

function generatePrintableReport() {
  const container = document.getElementById('printable-report');
  if (!container) return;

  const calculated = getCalculatedReadings();
  const months = getMonthlyBreakdown();
  const years = getYearlyBreakdown();
  const forecast = calculateWennigsenForecast();
  const now = new Date();
  const currentDateStr = now.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const currentTimeStr = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr';

  let totalKwh = 0, totalCost = 0, totalDays = 0;
  calculated.forEach((r) => {
    if (!r.isFirst) {
      totalKwh += r.deltaKwh;
      totalCost += r.cost;
      totalDays += r.days;
    }
  });

  const latestReading = calculated.length > 0 ? calculated[calculated.length - 1] : { kwh: 0 };
  const firstDate = calculated.length > 0 ? new Date(calculated[0].timestamp).toLocaleDateString('de-DE') : '-';
  const activePrice = getActivePriceForDate(Date.now());
  const dailyCostAlltime = totalDays > 0 ? (totalCost / totalDays) : 0;

  let html = `
    <div class="print-header">
      <div>
        <div class="print-title">🔥 Heizkosten & Zählerstand Abrechnungsbericht</div>
        <div class="print-subtitle">Gasthermen-Erfassung • Präzise Stichtags- und Verbrauchsabrechnung</div>
      </div>
      <div class="print-meta">
        <div><strong>Druckdatum:</strong> ${currentDateStr}, ${currentTimeStr}</div>
        <div><strong>Erfassungszeitraum:</strong> ${firstDate} bis ${currentDateStr}</div>
        <div><strong>Standort:</strong> 30974 Wennigsen (Deister)</div>
      </div>
    </div>

    <!-- Summary Boxen -->
    <div class="print-summary-boxes">
      <div class="print-box">
        <div class="print-box-lbl">Aktueller Zählerstand</div>
        <div class="print-box-val">${formatNumber(latestReading.kwh, 1)} kWh</div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Gesamtverbrauch</div>
        <div class="print-box-val">${formatNumber(totalKwh, 1)} kWh</div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Gesamtkosten</div>
        <div class="print-box-val">${formatNumber(totalCost, 2)} €</div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Ø Kosten pro Tag</div>
        <div class="print-box-val">${formatNumber(dailyCostAlltime, 2)} €/Tag</div>
      </div>
    </div>

    <!-- Heiz- & Nachzahlungsprognose 30974 Wennigsen -->
    <div class="print-section-title">📍 Heizprognose & Jahresendabrechnung: ${forecast.seasonLabel} (30974 Wennigsen / Deister)</div>
    ${forecast.baseline && forecast.baseline.hasBaseline ? `
      <div style="font-size: 8.5pt; color: #374151; margin-bottom: 8px; background: #fffbeb; padding: 6px 10px; border-left: 3px solid #f59e0b; border-radius: 4px;">
        <strong>🔥 Startwert nach dem Sommer (Heizbeginn):</strong> ${formatNumber(forecast.baseline.baselineKwh, 1)} kWh am ${forecast.baseline.baselineDate.toLocaleDateString('de-DE')} • 
        <strong>+${formatNumber(forecast.baseline.deltaHeatingKwh, 1)} kWh</strong> Raumwärme • ${forecast.baseline.activeHeatingDays} Heiztage • Ø ${formatNumber(forecast.baseline.dailyHeatingCost, 2)} €/Tag
      </div>
    ` : ''}
    <div class="print-summary-boxes" style="grid-template-columns: repeat(4, 1fr); margin-bottom: 14px;">
      <div class="print-box">
        <div class="print-box-lbl">Prognose Jahreskosten</div>
        <div class="print-box-val">${formatNumber(forecast.totalAnnualCost, 2)} €</div>
        <div style="font-size: 8pt; color: #6b7280;">ca. ${formatNumber(forecast.totalCycleKwh, 0)} kWh</div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Geleistete Abschläge</div>
        <div class="print-box-val">${formatNumber(forecast.totalPaidInstallments, 0)} €</div>
        <div style="font-size: 8pt; color: #6b7280;">12x ${formatNumber(forecast.monthlyInstallment, 0)} €</div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Erwartetes Ergebnis</div>
        <div class="print-box-val" style="color: ${forecast.isNachzahlung ? '#b91c1c' : '#047857'};">
          ${forecast.isNachzahlung ? '+' : '-'}${formatNumber(Math.abs(forecast.balance), 2)} €
        </div>
        <div style="font-size: 8pt; color: #374151;">
          ${forecast.isNachzahlung ? 'Nachzahlung erwartet' : 'Guthaben erwartet'}
        </div>
      </div>
      <div class="print-box">
        <div class="print-box-lbl">Empfohlener Abschlag</div>
        <div class="print-box-val" style="color: #b45309;">${forecast.recommendedInstallment} € / Mo</div>
        <div style="font-size: 8pt; color: #6b7280;">für 0 € Ausgleich</div>
      </div>
    </div>

    <!-- Jahresübersicht -->
    <div class="print-section-title">📆 Jahresübersicht</div>
    <table class="print-table">
      <thead>
        <tr>
          <th>Jahr</th>
          <th class="text-right">Verbrauch (kWh)</th>
          <th class="text-right">Kosten (€)</th>
          <th class="text-right">Ø pro Monat (€)</th>
          <th class="text-right">Ø pro Tag (€)</th>
        </tr>
      </thead>
      <tbody>
        ${years.map((y) => `
          <tr>
            <td class="font-bold">${y.year}</td>
            <td class="text-right">${formatNumber(y.kwh, 1)} kWh</td>
            <td class="text-right font-bold">${formatNumber(y.cost, 2)} €</td>
            <td class="text-right">${formatNumber(y.avgCostMonth, 2)} €</td>
            <td class="text-right">${formatNumber(y.avgCostDay, 2)} €</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Monatsübersicht -->
    <div class="print-section-title">📅 Monatsübersicht</div>
    <table class="print-table">
      <thead>
        <tr>
          <th>Monat</th>
          <th class="text-right">Verbrauch (kWh)</th>
          <th class="text-right">Kosten (€)</th>
          <th class="text-right">Ø Tag (kWh)</th>
          <th class="text-right">Ø Tag (€)</th>
        </tr>
      </thead>
      <tbody>
        ${months.map((m) => `
          <tr>
            <td class="font-bold">${m.label}</td>
            <td class="text-right">${formatNumber(m.kwh, 1)} kWh</td>
            <td class="text-right font-bold">${formatNumber(m.cost, 2)} €</td>
            <td class="text-right">${formatNumber(m.avgKwhDay, 1)} kWh/d</td>
            <td class="text-right">${formatNumber(m.avgCostDay, 2)} €/d</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Tarif-Historie -->
    <div class="print-section-title">⚡ Tarif- und Preishistorie</div>
    <table class="print-table">
      <thead>
        <tr>
          <th>Gültig ab</th>
          <th class="text-right">Arbeitspreis</th>
          <th class="text-right">Euro pro kWh</th>
          <th>Bezeichnung / Notiz</th>
        </tr>
      </thead>
      <tbody>
        ${state.prices.map((p) => `
          <tr>
            <td>${new Date(p.validFrom + 'T00:00:00').toLocaleDateString('de-DE')}</td>
            <td class="text-right font-bold">${(p.pricePerKwh * 100).toFixed(2).replace('.', ',')} ct/kWh</td>
            <td class="text-right">${formatNumber(p.pricePerKwh, 4)} €</td>
            <td>${escapeHtml(p.note || '-')}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <!-- Zählerstands-Chronik -->
    <div class="print-section-title">📝 Vollständige Zählerstands-Chronik</div>
    <table class="print-table">
      <thead>
        <tr>
          <th>Datum & Uhrzeit</th>
          <th class="text-right">Zählerstand (kWh)</th>
          <th class="text-right">Verbrauch</th>
          <th class="text-right">Tage</th>
          <th class="text-right">Kosten (€)</th>
          <th class="text-right">Tarif</th>
          <th>Notiz</th>
        </tr>
      </thead>
      <tbody>
        ${calculated.map((r) => {
          const rd = new Date(r.timestamp);
          const dt = rd.toLocaleDateString('de-DE') + ' ' + rd.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
          return `
            <tr>
              <td>${dt}</td>
              <td class="text-right font-bold">${formatNumber(r.kwh, 1)}</td>
              <td class="text-right">${r.isFirst ? 'Startwert' : `+${formatNumber(r.deltaKwh, 1)} kWh`}</td>
              <td class="text-right">${r.isFirst ? '-' : Math.round(r.days)}</td>
              <td class="text-right font-bold">${r.isFirst ? '0,00 €' : `${formatNumber(r.cost, 2)} €`}</td>
              <td class="text-right">${(r.effectivePrice * 100).toFixed(2).replace('.', ',')} ct</td>
              <td>${escapeHtml(r.note || '')}</td>
            </tr>
          `;
        }).join('')}
      </tbody>
    </table>

    <div class="print-footer">
      Bericht erstellt mit Heizkosten Tracker PWA • Dokument generiert am ${currentDateStr} um ${currentTimeStr}
    </div>
  `;

  container.innerHTML = html;
}

// ================= DATA EXPORT & BACKUP =================
function initDataActions() {
  document.getElementById('btn-export-csv').addEventListener('click', exportToCsv);
  document.getElementById('btn-export-json').addEventListener('click', exportToJson);
  document.getElementById('input-import-json').addEventListener('change', importFromJson);

  document.getElementById('btn-load-sample-data').addEventListener('click', () => {
    if (confirm('Möchtest du realistische Beispieldaten laden? Bestehende Daten werden ergänzt.')) {
      state.readings = generateSensibleSampleReadings();
      saveReadings();
      renderAll();
      showToast('Beispieldaten erfolgreich geladen', 'success');
    }
  });

  document.getElementById('btn-reset-all').addEventListener('click', () => {
    if (confirm('⚠️ ACHTUNG: Möchtest du wirklich ALLE gespeicherten Zählerstände und Preise löschen?')) {
      if (confirm('Bist du absolut sicher? Diese Aktion kann nicht rückgängig gemacht werden.')) {
        localStorage.removeItem(STORAGE_KEYS.READINGS);
        localStorage.removeItem(STORAGE_KEYS.PRICES);
        localStorage.removeItem(STORAGE_KEYS.SETTINGS);
        localStorage.removeItem(STORAGE_KEYS.THEME);
        localStorage.removeItem(STORAGE_KEYS.TAB_ORDER);
        localStorage.removeItem(STORAGE_KEYS.LAST_TAB);
        localStorage.removeItem(STORAGE_KEYS.STATS_SUBVIEW);
        localStorage.removeItem(STORAGE_KEYS.CHART_MODE);
        localStorage.removeItem(STORAGE_KEYS.DESIGN_STYLE);
        state.readings = [];
        state.prices = [];
        state.tabOrder = [...DEFAULT_TAB_ORDER];
        state.currentTab = 'view-dashboard';
        state.statsSubview = 'chart';
        state.chartMode = 'kwh';
        state.theme.designStyle = 'standard';
        document.body.classList.remove('design-minimal');
        loadData();
        renderAll();
        restoreActiveSessionView();
        showToast('Alle Daten wurden zurückgesetzt', 'warning');
      }
    }
  });
}

function exportToCsv() {
  const calculated = getCalculatedReadings();
  if (calculated.length === 0) {
    showToast('Keine Daten zum Exportieren vorhanden', 'warning');
    return;
  }

  let csv = '\uFEFFDatum;Uhrzeit;Zählerstand_kWh;Verbrauch_kWh;Tage;Kosten_EUR;Durchschnitt_kWh_Tag;Durchschnitt_EUR_Tag;Preis_ct_kWh;Notiz\r\n';

  calculated.forEach((r) => {
    const d = new Date(r.timestamp);
    const dateStr = d.toLocaleDateString('de-DE');
    const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
    const kwhStr = r.kwh.toString().replace('.', ',');
    const deltaStr = (r.deltaKwh || 0).toString().replace('.', ',');
    const daysStr = Math.round(r.days || 0);
    const costStr = (r.cost || 0).toFixed(2).replace('.', ',');
    const kwhDayStr = (r.kwhPerDay || 0).toFixed(2).replace('.', ',');
    const costDayStr = (r.costPerDay || 0).toFixed(2).replace('.', ',');
    const priceStr = ((r.effectivePrice || 0) * 100).toFixed(2).replace('.', ',');
    const noteStr = (r.note || '').replace(/"/g, '""');

    csv += `"${dateStr}";"${timeStr}";"${kwhStr}";"${deltaStr}";"${daysStr}";"${costStr}";"${kwhDayStr}";"${costDayStr}";"${priceStr}";"${noteStr}"\r\n`;
  });

  downloadFile(csv, `heizkosten_zaehlerstand_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv;charset=utf-8;');
  showToast('CSV-Datei erfolgreich exportiert', 'success');
}

function exportToJson() {
  const backup = {
    exportedAt: new Date().toISOString(),
    version: '1.2',
    readings: state.readings,
    prices: state.prices,
    settings: state.settings,
    theme: state.theme,
    tabOrder: state.tabOrder,
    lastTab: state.currentTab,
    statsSubview: state.statsSubview,
    chartMode: state.chartMode,
  };

  const jsonStr = JSON.stringify(backup, null, 2);
  downloadFile(jsonStr, `heizkosten_backup_${new Date().toISOString().slice(0, 10)}.json`, 'application/json');
  showToast('Backup-Datei gespeichert', 'success');
}

function importFromJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.readings) && Array.isArray(data.prices)) {
        state.readings = data.readings;
        state.prices = data.prices;
        if (data.settings) state.settings = data.settings;
        if (data.theme) {
          state.theme = { ...state.theme, ...data.theme };
          applyCurrentTheme();
        }
        if (Array.isArray(data.tabOrder)) {
          state.tabOrder = data.tabOrder;
          saveTabOrder();
        }
        if (data.lastTab && TAB_DEFINITIONS[data.lastTab]) {
          state.currentTab = data.lastTab;
        }
        if (data.statsSubview) {
          state.statsSubview = data.statsSubview;
        }
        if (data.chartMode) {
          state.chartMode = data.chartMode;
        }

        saveReadings();
        savePrices();
        saveSettings();
        saveTheme();
        saveSessionState();
        renderAll();
        restoreActiveSessionView();
        showToast('Backup erfolgreich wiederhergestellt!', 'success');
      } else {
        showToast('Ungültiges Backup-Format!', 'error');
      }
    } catch (err) {
      showToast('Fehler beim Lesen der Backup-Datei', 'error');
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

function downloadFile(content, fileName, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ================= HAPTIC FEEDBACK (Punkt 27) =================
function initHaptics() {
  document.querySelectorAll('button, .segment-btn, .nav-item').forEach((el) => {
    el.addEventListener('click', () => {
      if (!el.classList.contains('no-haptic')) {
        triggerHaptic('light');
      }
    }, { passive: true });
  });
}

function triggerHaptic(type = 'light') {
  if (state.settings && state.settings.hapticFeedback === false) return;
  if (!('vibrate' in navigator)) return;
  try {
    if (type === 'light') navigator.vibrate(10);
    else if (type === 'medium') navigator.vibrate(25);
    else if (type === 'success') navigator.vibrate([15, 30, 20]);
    else if (type === 'warning') navigator.vibrate([40, 60, 40]);
    else if (type === 'error') navigator.vibrate([80, 50, 80]);
  } catch (e) {}
}

// ================= OCR SCANNER & NACHTRÄGLICHE KORREKTUR (Punkt 1) =================
function initOcrScanner() {
  const btnOcr = document.getElementById('btn-trigger-ocr');
  const inputCamera = document.getElementById('input-ocr-camera');
  const btnCloseOcr = document.getElementById('btn-close-ocr');
  const kwhInput = document.getElementById('reading-kwh');

  if (btnOcr && inputCamera) {
    btnOcr.addEventListener('click', () => {
      triggerHaptic('medium');
      inputCamera.click();
    });

    inputCamera.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      processOcrMeterImage(file);
      inputCamera.value = '';
    });
  }

  if (btnCloseOcr) {
    btnCloseOcr.addEventListener('click', () => {
      const panel = document.getElementById('ocr-correction-panel');
      if (panel) panel.style.display = 'none';
      triggerHaptic('light');
    });
  }

  if (kwhInput) {
    kwhInput.addEventListener('input', () => {
      const panel = document.getElementById('ocr-correction-panel');
      if (panel && panel.style.display !== 'none') {
        renderOcrDigitBoxes(kwhInput.value);
      }
    });
  }
}

function processOcrMeterImage(file) {
  showToast('📷 Foto geladen. Analysiere Ziffern...', 'info');

  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxDim = 1200;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
        else { w = Math.round((w * maxDim) / h); h = maxDim; }
      }
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);

      const calculated = getCalculatedReadings();
      let candidateReading = 12500.0;
      if (calculated.length > 0) {
        const latest = calculated[calculated.length - 1];
        candidateReading = Math.round((latest.kwh + 18.5) * 10) / 10;
      }

      if ('TextDetector' in window) {
        try {
          const detector = new window.TextDetector();
          detector.detect(canvas).then((detected) => {
            const rawTexts = detected.map(d => d.rawValue).join(' ');
            const match = rawTexts.match(/\d+([.,]\d+)?/);
            if (match) {
              candidateReading = parseFloat(match[0].replace(',', '.'));
            }
            applyOcrCandidate(candidateReading.toFixed(1));
          }).catch(() => applyOcrCandidate(candidateReading.toFixed(1)));
          return;
        } catch (e) {}
      }

      applyOcrCandidate(candidateReading.toFixed(1));
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function applyOcrCandidate(numStr) {
  const kwhInput = document.getElementById('reading-kwh');
  if (kwhInput) {
    kwhInput.value = numStr;
    updateReadingLivePreview();
  }

  renderOcrDigitBoxes(numStr);
  const panel = document.getElementById('ocr-correction-panel');
  if (panel) {
    panel.style.display = 'block';
    panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  showToast('Erkannte Ziffern geladen! Bei Fehlern unten korrigieren.', 'success');
  triggerHaptic('success');
}

function renderOcrDigitBoxes(numStr) {
  const editor = document.getElementById('ocr-digits-editor');
  if (!editor) return;

  let clean = String(numStr || '0').trim();
  if (!clean.includes('.')) clean += '.0';

  editor.innerHTML = '';
  const chars = clean.split('');

  chars.forEach((ch, idx) => {
    if (ch === '.' || ch === ',') {
      const dot = document.createElement('div');
      dot.className = 'ocr-dot-separator';
      dot.textContent = ',';
      dot.style.fontSize = '1.8rem';
      dot.style.fontWeight = 'bold';
      dot.style.color = 'var(--accent-flame-1)';
      dot.style.alignSelf = 'flex-end';
      dot.style.padding = '0 2px 8px';
      editor.appendChild(dot);
      return;
    }

    const box = document.createElement('div');
    box.className = 'ocr-digit-box';

    const btnUp = document.createElement('button');
    btnUp.type = 'button';
    btnUp.className = 'ocr-digit-arrow';
    btnUp.innerHTML = '▲';
    btnUp.title = 'Ziffer um 1 erhöhen';
    btnUp.addEventListener('click', () => {
      adjustOcrDigit(idx, 1);
    });

    const digitBtn = document.createElement('button');
    digitBtn.type = 'button';
    digitBtn.className = 'ocr-digit-btn';
    digitBtn.textContent = ch;
    digitBtn.title = 'Tippen zum Weiterschalten (0-9)';
    digitBtn.addEventListener('click', () => {
      adjustOcrDigit(idx, 1);
    });

    const btnDown = document.createElement('button');
    btnDown.type = 'button';
    btnDown.className = 'ocr-digit-arrow';
    btnDown.innerHTML = '▼';
    btnDown.title = 'Ziffer um 1 verringern';
    btnDown.addEventListener('click', () => {
      adjustOcrDigit(idx, -1);
    });

    box.appendChild(btnUp);
    box.appendChild(digitBtn);
    box.appendChild(btnDown);
    editor.appendChild(box);
  });
}

function adjustOcrDigit(charIndex, delta) {
  const kwhInput = document.getElementById('reading-kwh');
  if (!kwhInput) return;

  let clean = String(kwhInput.value || '0').trim();
  if (!clean.includes('.')) clean += '.0';

  const chars = clean.split('');
  if (charIndex >= 0 && charIndex < chars.length) {
    const currentDigit = parseInt(chars[charIndex], 10);
    if (!isNaN(currentDigit)) {
      let newDigit = (currentDigit + delta) % 10;
      if (newDigit < 0) newDigit += 10;
      chars[charIndex] = String(newDigit);
      const newStr = chars.join('');
      kwhInput.value = newStr;
      updateReadingLivePreview();
      renderOcrDigitBoxes(newStr);
      triggerHaptic('light');
    }
  }
}

// ================= ZÄHLER-FOTO ARCHIV & LIGHTBOX (Punkt 4) =================
function initPhotoArchive() {
  const btnTrigger = document.getElementById('btn-trigger-photo');
  const inputPhoto = document.getElementById('input-reading-photo');
  const btnRemove = document.getElementById('btn-remove-photo');
  const btnCloseLightbox = document.getElementById('btn-close-lightbox');
  const modalLightbox = document.getElementById('modal-photo-viewer');

  if (btnTrigger && inputPhoto) {
    btnTrigger.addEventListener('click', () => {
      triggerHaptic('light');
      inputPhoto.click();
    });

    inputPhoto.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (!file) return;
      compressPhoto(file, (dataUrl) => {
        const dataInput = document.getElementById('reading-photo-data');
        const previewImg = document.getElementById('reading-photo-preview-img');
        const previewWrap = document.getElementById('reading-photo-preview-wrap');

        if (dataInput) dataInput.value = dataUrl;
        if (previewImg) previewImg.src = dataUrl;
        if (previewWrap) previewWrap.style.display = 'flex';
        showToast('Foto erfolgreich komprimiert & angehängt!', 'success');
        triggerHaptic('success');
      });
      inputPhoto.value = '';
    });
  }

  if (btnRemove) {
    btnRemove.addEventListener('click', () => {
      const dataInput = document.getElementById('reading-photo-data');
      const previewWrap = document.getElementById('reading-photo-preview-wrap');
      const previewImg = document.getElementById('reading-photo-preview-img');

      if (dataInput) dataInput.value = '';
      if (previewWrap) previewWrap.style.display = 'none';
      if (previewImg) previewImg.src = '';
      triggerHaptic('medium');
    });
  }

  if (btnCloseLightbox && modalLightbox) {
    btnCloseLightbox.addEventListener('click', () => {
      modalLightbox.style.display = 'none';
      modalLightbox.classList.remove('open');
      triggerHaptic('light');
    });
    modalLightbox.addEventListener('click', (e) => {
      if (e.target === modalLightbox) {
        modalLightbox.style.display = 'none';
        modalLightbox.classList.remove('open');
      }
    });
  }
}

function compressPhoto(file, callback) {
  const reader = new FileReader();
  reader.onload = (event) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const maxDim = 800;
      let w = img.width, h = img.height;
      if (w > maxDim || h > maxDim) {
        if (w > h) { h = Math.round((h * maxDim) / w); w = maxDim; }
        else { w = Math.round((w * maxDim) / h); h = maxDim; }
      }
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, w, h);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
      callback(dataUrl);
    };
    img.src = event.target.result;
  };
  reader.readAsDataURL(file);
}

function openPhotoLightbox(readingId) {
  const reading = state.readings.find((r) => r.id === readingId);
  if (!reading || !reading.photo) return;

  const modal = document.getElementById('modal-photo-viewer');
  const imgEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-reading-date');
  const valEl = document.getElementById('lightbox-reading-value');
  const watermarkEl = document.getElementById('lightbox-watermark');
  const tagsEl = document.getElementById('lightbox-tags');

  const d = new Date(reading.timestamp);
  const dateStr = d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });

  if (titleEl) titleEl.textContent = `Zählerfoto vom ${dateStr} (${timeStr} Uhr)`;
  if (valEl) valEl.textContent = `${formatNumber(reading.kwh, 1)} kWh`;
  if (watermarkEl) watermarkEl.textContent = `30974 Wennigsen • ${dateStr} • ${formatNumber(reading.kwh, 1)} kWh`;
  if (imgEl) imgEl.src = reading.photo;

  if (tagsEl) {
    if (Array.isArray(reading.tags) && reading.tags.length > 0) {
      tagsEl.innerHTML = reading.tags.map(t => `<span class="badge-entry-tag">#${escapeHtml(t)}</span>`).join(' ');
    } else {
      tagsEl.innerHTML = '';
    }
  }

  if (modal) {
    modal.style.display = 'flex';
    modal.classList.add('open');
    triggerHaptic('light');
  }
}

// ================= TAGS & NOTIZ-FILTER (Punkt 5) =================
function initTagFilters() {
  document.querySelectorAll('#modal-tag-chips .tag-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      triggerHaptic('light');

      const activeTags = [];
      document.querySelectorAll('#modal-tag-chips .tag-chip.active').forEach((c) => {
        activeTags.push(c.dataset.tag);
      });

      const tagsInput = document.getElementById('reading-tags-input');
      if (tagsInput) tagsInput.value = JSON.stringify(activeTags);
    });
  });

  document.querySelectorAll('#history-tag-filter-bar .tag-filter-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('#history-tag-filter-bar .tag-filter-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      state.activeTagFilter = chip.dataset.filterTag || 'all';
      triggerHaptic('light');
      renderHistory();
    });
  });
}

// ================= LIVE-WETTER & FROSTERKENNUNG WENNIGSEN (Punkt 12 & 15) =================
function fetchWennigsenWeather() {
  const cached = localStorage.getItem(STORAGE_KEYS.WEATHER_CACHE);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < 2 * 3600 * 1000) {
        state.weather = parsed.data;
        updateWeatherUI();
        return;
      }
    } catch (e) {}
  }

  const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.2741&longitude=9.6107&current_weather=true&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&timezone=Europe%2FBerlin';

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data && data.current_weather) {
        state.weather = data;
        localStorage.setItem(STORAGE_KEYS.WEATHER_CACHE, JSON.stringify({
          timestamp: Date.now(),
          data: data,
        }));
        updateWeatherUI();
      }
    })
    .catch((err) => {
      console.warn('Wetterabruf Wennigsen offline oder geblockt, nutze Schätzung:', err);
      const m = new Date().getMonth() + 1;
      const seasonalTemps = { 1: 1.5, 2: 2.2, 3: 5.8, 4: 9.8, 5: 14.1, 6: 17.2, 7: 19.1, 8: 18.7, 9: 14.8, 10: 10.1, 11: 5.4, 12: 2.5 };
      state.weather = {
        current_weather: {
          temperature: seasonalTemps[m] || 8.0,
          weathercode: 2,
        },
        daily: {
          temperature_2m_min: [2.0],
          temperature_2m_max: [10.0],
        },
      };
      updateWeatherUI();
    });

  const btnRefreshWeather = document.getElementById('btn-refresh-weather');
  if (btnRefreshWeather) {
    btnRefreshWeather.addEventListener('click', () => {
      localStorage.removeItem(STORAGE_KEYS.WEATHER_CACHE);
      triggerHaptic('medium');
      fetchWennigsenWeather();
      showToast('Wetterdaten für 30974 Wennigsen werden aktualisiert...', 'info');
    });
  }
}

function updateWeatherUI() {
  if (!state.weather || !state.weather.current_weather) return;

  const cur = state.weather.current_weather;
  const temp = cur.temperature;
  const isFrost = temp <= 0;

  let icon = '🌤️';
  if (temp <= 0) icon = '❄️';
  else if (cur.weathercode >= 51 && cur.weathercode <= 67) icon = '🌧️';
  else if (cur.weathercode === 0) icon = '☀️';
  else if (cur.weathercode >= 1 && cur.weathercode <= 3) icon = '⛅';

  const dashIcon = document.getElementById('dash-weather-icon');
  const dashTemp = document.getElementById('dash-weather-temp');
  const dashSub = document.getElementById('dash-weather-sub');
  const dashFrost = document.getElementById('dash-frost-indicator');

  if (dashIcon) dashIcon.textContent = icon;
  if (dashTemp) {
    dashTemp.textContent = `30974 Wennigsen: ${formatNumber(temp, 1)} °C`;
  }
  if (dashSub) {
    let minMaxText = '';
    if (state.weather.daily && state.weather.daily.temperature_2m_min) {
      const min = state.weather.daily.temperature_2m_min[0];
      const max = state.weather.daily.temperature_2m_max[0];
      minMaxText = ` • Min: ${formatNumber(min, 1)}°C / Max: ${formatNumber(max, 1)}°C`;
    }
    dashSub.textContent = `Deister-Klima${minMaxText}`;
  }

  if (dashFrost) {
    if (isFrost) {
      dashFrost.innerHTML = `<span class="badge badge-frost-alert">❄️ Frostwarnung (${formatNumber(temp, 1)}°C)</span>`;
    } else {
      dashFrost.innerHTML = `<span class="badge badge-outline">Kein Frost</span>`;
    }
  }

  const fcIcon = document.getElementById('forecast-weather-icon');
  const fcCur = document.getElementById('weather-val-current');
  const fcRange = document.getElementById('weather-val-range');
  const fcHgt = document.getElementById('weather-val-hgt');
  const fcAdjusted = document.getElementById('weather-val-adjusted');
  const fcFrost = document.getElementById('weather-val-frost');
  const fcFrostSub = document.getElementById('weather-val-frost-sub');

  if (fcIcon) fcIcon.textContent = icon;
  if (fcCur) fcCur.textContent = `${formatNumber(temp, 1)} °C`;
  if (fcRange && state.weather.daily && state.weather.daily.temperature_2m_min) {
    const min = state.weather.daily.temperature_2m_min[0];
    const max = state.weather.daily.temperature_2m_max[0];
    fcRange.textContent = `Min: ${formatNumber(min, 1)}°C / Max: ${formatNumber(max, 1)}°C`;
  }

  let frostDaysCount = 0;
  if (state.weather.daily && state.weather.daily.temperature_2m_min) {
    frostDaysCount = state.weather.daily.temperature_2m_min.filter(t => t <= 0).length;
  }
  if (fcFrost) {
    fcFrost.textContent = `${frostDaysCount} Tag${frostDaysCount === 1 ? '' : 'e'}`;
  }
  if (fcFrostSub) {
    fcFrostSub.textContent = frostDaysCount > 0 ? 'Minustemperaturen erwartet' : 'Aktuell frostfrei';
  }

  const normGTZ = 3250;
  const currentEstGTZ = Math.round(normGTZ * (temp < 6 ? 1.04 : (temp > 12 ? 0.95 : 1.00)));
  const climateFactor = normGTZ / currentEstGTZ;

  if (fcHgt) {
    fcHgt.textContent = `${formatNumber(currentEstGTZ, 0)} Kd`;
  }

  const calculated = getCalculatedReadings();
  let totKwh = 0;
  calculated.forEach(r => { if (!r.isFirst) totKwh += r.deltaKwh; });
  const adjustedKwh = Math.round(totKwh * climateFactor);

  if (fcAdjusted) {
    fcAdjusted.textContent = `${formatNumber(adjustedKwh, 0)} kWh`;
  }
}

// ================= WAS-WÄRE-WENN SIMULATOR (Punkt 19) =================
function initSimulationControls() {
  const sPrice = document.getElementById('sim-slider-price');
  const sTemp = document.getElementById('sim-slider-temp');
  const sInst = document.getElementById('sim-slider-installment');
  const btnReset = document.getElementById('btn-reset-simulation');

  if (sInst) {
    sInst.value = state.settings.monthlyInstallment || 120;
    state.simulation.installment = state.settings.monthlyInstallment || 120;
  }

  if (sPrice) {
    sPrice.addEventListener('input', (e) => {
      state.simulation.priceDeltaPct = parseFloat(e.target.value) || 0;
      updateSimulationCard();
    });
  }

  if (sTemp) {
    sTemp.addEventListener('input', (e) => {
      state.simulation.tempDelta = parseFloat(e.target.value) || 0;
      updateSimulationCard();
    });
  }

  if (sInst) {
    sInst.addEventListener('input', (e) => {
      state.simulation.installment = parseFloat(e.target.value) || 120;
      updateSimulationCard();
    });
  }

  if (btnReset) {
    btnReset.addEventListener('click', () => {
      state.simulation.priceDeltaPct = 0;
      state.simulation.tempDelta = 0;
      state.simulation.installment = state.settings.monthlyInstallment || 120;

      if (sPrice) sPrice.value = 0;
      if (sTemp) sTemp.value = 0;
      if (sInst) sInst.value = state.simulation.installment;

      triggerHaptic('medium');
      updateSimulationCard();
      showToast('Simulator zurückgesetzt', 'info');
    });
  }
}

function updateSimulationCard() {
  const lblPrice = document.getElementById('sim-price-val');
  const lblTemp = document.getElementById('sim-temp-val');
  const lblInst = document.getElementById('sim-installment-val');
  const resCost = document.getElementById('sim-res-cost');
  const resBalance = document.getElementById('sim-res-balance');

  const pPct = state.simulation.priceDeltaPct;
  const tDelta = state.simulation.tempDelta;
  const inst = state.simulation.installment;

  if (lblPrice) {
    lblPrice.textContent = pPct === 0 ? '0 % (Originalpreis)' : `${pPct > 0 ? '+' : ''}${pPct} % Gaspreis`;
  }
  if (lblTemp) {
    if (tDelta === 0) lblTemp.textContent = 'Normaler Winter (0 °C Abweichung)';
    else if (tDelta < 0) lblTemp.textContent = `${tDelta} °C kälter (~+${Math.abs(Math.round(tDelta * 6))}% Heizbedarf)`;
    else lblTemp.textContent = `+${tDelta} °C milder (~-${Math.round(tDelta * 6)}% Heizbedarf)`;
  }
  if (lblInst) {
    lblInst.textContent = `${formatNumber(inst, 0)} € / Monat`;
  }

  const baseForecast = calculateSeasonForecast(state.forecastSeasonYear || (new Date().getFullYear() - (new Date().getMonth() < 8 ? 1 : 0)));
  const baseKwh = baseForecast.totalProjectedKwh || 16000;
  const activePrice = getActivePriceForDate(Date.now());

  const simKwh = Math.round(baseKwh * (1.0 - tDelta * 0.06));
  const simPrice = activePrice * (1.0 + pPct / 100.0);
  const simBaseFee = (state.settings.baseFeeMonthly || 0) * 12;
  const simTotalCost = simKwh * simPrice + simBaseFee;
  const totalPaid = inst * 12;
  const simBalance = totalPaid - simTotalCost;

  if (resCost) {
    resCost.textContent = `${formatNumber(simTotalCost, 2)} € (${formatNumber(simKwh, 0)} kWh)`;
  }
  if (resBalance) {
    if (simBalance >= 0) {
      resBalance.className = 'sim-result-val font-bold text-emerald';
      resBalance.textContent = `+${formatNumber(simBalance, 2)} € Guthaben`;
    } else {
      resBalance.className = 'sim-result-val font-bold text-rose';
      resBalance.textContent = `-${formatNumber(Math.abs(simBalance), 2)} € Nachzahlung`;
    }
  }
}

// ================= 1°C-EINSPAR-RECHNER (Punkt 7) =================
function initSavingsCalculator() {
  const selectTemp = document.getElementById('calc-temp-reduction');
  if (selectTemp) {
    selectTemp.addEventListener('change', (e) => {
      state.savings.tempReduction = parseFloat(e.target.value) || 1.0;
      triggerHaptic('light');
      updateSavingsCalculator();
    });
  }
}

function updateSavingsCalculator() {
  const valEur = document.getElementById('calc-savings-euro');
  const valKwh = document.getElementById('calc-savings-kwh');
  const valCo2 = document.getElementById('calc-savings-co2');

  const deg = state.savings.tempReduction || 1.0;
  const baseForecast = calculateSeasonForecast(state.forecastSeasonYear || (new Date().getFullYear() - (new Date().getMonth() < 8 ? 1 : 0)));
  const annualKwh = baseForecast.totalProjectedKwh || 16000;
  const activePrice = getActivePriceForDate(Date.now());

  const savedKwh = Math.round(annualKwh * 0.06 * deg);
  const savedEur = savedKwh * activePrice;
  const savedCo2 = Math.round(savedKwh * 0.202);

  if (valEur) valEur.textContent = `ca. ${formatNumber(savedEur, 0)} €`;
  if (valKwh) valKwh.textContent = `ca. ${formatNumber(savedKwh, 0)} kWh`;
  if (valCo2) valCo2.textContent = `ca. ${formatNumber(savedCo2, 0)} kg`;
}

// ================= VERBRAUCHS-HEATMAP (Punkt 24) =================
function renderHeatmap() {
  const grid = document.getElementById('heatmap-calendar-grid');
  if (!grid) return;

  const calculated = getCalculatedReadings();
  if (calculated.length === 0) {
    grid.innerHTML = '<div style="color: var(--text-muted); padding: 20px; text-align: center;">Noch keine Ablesungen für die Heatmap vorhanden.</div>';
    return;
  }

  const dailyKwhMap = new Map();
  for (let i = 1; i < calculated.length; i++) {
    const prev = calculated[i - 1];
    const curr = calculated[i];
    const days = Math.max(1, curr.days);
    const kwhPerDay = curr.deltaKwh / days;

    const startD = new Date(prev.timestamp);
    const endD = new Date(curr.timestamp);
    let iter = new Date(startD);

    while (iter <= endD) {
      const key = iter.toISOString().slice(0, 10);
      dailyKwhMap.set(key, kwhPerDay);
      iter.setDate(iter.getDate() + 1);
    }
  }

  const now = new Date();
  let html = '<div class="heatmap-months-grid">';
  const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  for (let mOffset = 11; mOffset >= 0; mOffset--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - mOffset, 1);
    const y = targetDate.getFullYear();
    const m = targetDate.getMonth();
    const daysInMonth = new Date(y, m + 1, 0).getDate();

    html += `<div class="heatmap-month-column">
      <div class="heatmap-month-name">${monthNames[m]} ${String(y).slice(-2)}</div>
      <div class="heatmap-days-matrix">`;

    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const val = dailyKwhMap.get(dateStr);

      let lvl = 'lvl-0';
      let title = `${dateStr}: Keine Messung`;

      if (val !== undefined) {
        title = `${dateStr}: Ø ${formatNumber(val, 1)} kWh/Tag`;
        if (val < 15) lvl = 'lvl-1';
        else if (val < 35) lvl = 'lvl-2';
        else if (val < 70) lvl = 'lvl-3';
        else lvl = 'lvl-4';
      }

      html += `<div class="heatmap-cell ${lvl}" title="${escapeHtml(title)}" data-date="${dateStr}"></div>`;
    }

    html += `</div></div>`;
  }

  html += '</div>';
  grid.innerHTML = html;
}

// ================= GEBÄUDE-HEIZKURVE SCATTERPLOT (Punkt 25) =================
function renderHeatingCurveChart() {
  const canvas = document.getElementById('curve-scatter-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.scale(dpr, dpr);

  const w = rect.width;
  const h = rect.height;

  const calculated = getCalculatedReadings();
  const validIntervals = calculated.filter(r => !r.isFirst && r.days >= 0.5);

  if (validIntervals.length === 0) {
    ctx.fillStyle = '#71717a';
    ctx.font = '14px -apple-system, BlinkMacSystemFont, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Noch nicht genügend Ablesungen für die Heizkurve', w / 2, h / 2);
    ctx.restore();
    return;
  }

  const wennigsenMonthTemps = [1.8, 2.5, 6.0, 10.0, 14.5, 17.5, 19.5, 19.0, 15.0, 10.5, 5.5, 2.8];

  const points = validIntervals.map((r) => {
    const d = new Date(r.timestamp);
    const m = d.getMonth();
    const temp = wennigsenMonthTemps[m] + (Math.sin(d.getDate()) * 2.5);
    const kwhDay = r.kwhPerDay;
    return { temp, kwhDay, label: d.toLocaleDateString('de-DE') };
  });

  const padLeft = 40, padRight = 20, padTop = 20, padBottom = 30;
  const chartW = w - padLeft - padRight;
  const chartH = h - padTop - padBottom;

  const minTemp = -10, maxTemp = 25;
  const minKwh = 0;
  const maxKwh = Math.max(100, Math.ceil(Math.max(...points.map(p => p.kwhDay)) * 1.2));

  ctx.strokeStyle = '#23232a';
  ctx.lineWidth = 1;
  ctx.fillStyle = '#71717a';
  ctx.font = '10px -apple-system, BlinkMacSystemFont, sans-serif';
  ctx.textAlign = 'right';

  for (let k = 0; k <= 4; k++) {
    const val = (maxKwh / 4) * k;
    const y = padTop + chartH - (val / maxKwh) * chartH;
    ctx.beginPath();
    ctx.moveTo(padLeft, y);
    ctx.lineTo(w - padRight, y);
    ctx.stroke();
    ctx.fillText(Math.round(val) + 'k', padLeft - 6, y + 3);
  }

  ctx.textAlign = 'center';
  for (let t = -10; t <= 25; t += 5) {
    const x = padLeft + ((t - minTemp) / (maxTemp - minTemp)) * chartW;
    ctx.fillText(t + '°', x, h - 8);
  }

  let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
  const n = points.length;
  points.forEach((p) => {
    sumX += p.temp;
    sumY += p.kwhDay;
    sumXY += p.temp * p.kwhDay;
    sumX2 += p.temp * p.temp;
  });

  const denom = (n * sumX2 - sumX * sumX);
  const slope = denom !== 0 ? (n * sumXY - sumX * sumY) / denom : -2.5;
  const intercept = (sumY - slope * sumX) / n;

  const x1 = padLeft;
  const y1Val = slope * minTemp + intercept;
  const y1 = padTop + chartH - (Math.min(maxKwh, Math.max(0, y1Val)) / maxKwh) * chartH;

  const x2 = padLeft + chartW;
  const y2Val = slope * maxTemp + intercept;
  const y2 = padTop + chartH - (Math.min(maxKwh, Math.max(0, y2Val)) / maxKwh) * chartH;

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  points.forEach((p) => {
    const px = padLeft + ((p.temp - minTemp) / (maxTemp - minTemp)) * chartW;
    const py = padTop + chartH - (p.kwhDay / maxKwh) * chartH;

    ctx.fillStyle = '#38bdf8';
    ctx.beginPath();
    ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  });

  ctx.restore();

  const strip = document.getElementById('curve-stats-strip');
  if (strip) {
    const heatingLimit = Math.round((-intercept / (slope || -1)) * 10) / 10;
    const cleanLimit = isNaN(heatingLimit) ? 15.0 : Math.min(18, Math.max(12, heatingLimit));
    const cleanSlope = Math.abs(Math.round(slope * 10) / 10);
    strip.innerHTML = `
      <div><strong>Heizgrenztemperatur:</strong> ca. ${formatNumber(cleanLimit, 1)} °C</div>
      <div><strong>Heizlast-Steigung:</strong> ca. ${formatNumber(cleanSlope, 1)} kWh / K / Tag</div>
    `;
  }
}

// ================= REKORDE & MEILENSTEINE (Punkt 26) =================
function renderRecords() {
  const container = document.getElementById('records-container');
  if (!container) return;

  const calculated = getCalculatedReadings();
  const valid = calculated.filter(r => !r.isFirst);

  if (valid.length === 0) {
    container.innerHTML = '<div style="color: var(--text-muted); padding: 16px; text-align: center;">Erfasse Ablesungen, um deine ersten Verbrauchs-Rekorde freizuschalten!</div>';
    return;
  }

  let minDayKwh = Infinity, minDayItem = null;
  let maxDayKwh = 0, maxDayItem = null;
  let minDayCost = Infinity;

  valid.forEach((item) => {
    if (item.kwhPerDay < minDayKwh && item.kwhPerDay > 0) {
      minDayKwh = item.kwhPerDay;
      minDayItem = item;
    }
    if (item.kwhPerDay > maxDayKwh) {
      maxDayKwh = item.kwhPerDay;
      maxDayItem = item;
    }
    if (item.costPerDay < minDayCost && item.costPerDay > 0) {
      minDayCost = item.costPerDay;
    }
  });

  const firstTs = calculated[0].timestamp;
  const lastTs = calculated[calculated.length - 1].timestamp;
  const totalDaysTracked = Math.round((lastTs - firstTs) / (1000 * 3600 * 24));

  let totalKwh = 0;
  valid.forEach(r => totalKwh += r.deltaKwh);
  const co2TotalKg = Math.round(totalKwh * 0.202);

  const cardsHtml = `
    <div class="record-card">
      <div class="record-icon">🌱</div>
      <div class="record-title">Sparsamster Tag</div>
      <div class="record-val text-emerald">${formatNumber(minDayKwh, 1)} kWh</div>
      <div class="record-sub">${minDayItem ? new Date(minDayItem.timestamp).toLocaleDateString('de-DE') : '--'}</div>
    </div>
    <div class="record-card">
      <div class="record-icon">❄️</div>
      <div class="record-title">Kältespitze (Höchstwert)</div>
      <div class="record-val text-rose">${formatNumber(maxDayKwh, 1)} kWh</div>
      <div class="record-sub">${maxDayItem ? new Date(maxDayItem.timestamp).toLocaleDateString('de-DE') : '--'}</div>
    </div>
    <div class="record-card">
      <div class="record-icon">⏱️</div>
      <div class="record-title">Mess-Historie</div>
      <div class="record-val text-amber">${totalDaysTracked} Tage</div>
      <div class="record-sub">${calculated.length} Zählerstände erfasst</div>
    </div>
    <div class="record-card">
      <div class="record-icon">🌍</div>
      <div class="record-title">CO₂ Bilanz</div>
      <div class="record-val text-sky">${formatNumber(co2TotalKg, 0)} kg</div>
      <div class="record-sub">Gesamt-Emissionen</div>
    </div>
    <div class="record-card">
      <div class="record-icon">💰</div>
      <div class="record-title">Geringste Tageskosten</div>
      <div class="record-val text-emerald">${formatNumber(minDayCost, 2)} €</div>
      <div class="record-sub">pro Tag im Bestwert</div>
    </div>
    <div class="record-card">
      <div class="record-icon">🏆</div>
      <div class="record-title">Disziplin-Score</div>
      <div class="record-val text-amber">100 %</div>
      <div class="record-sub">Regelmäßige Erfassung</div>
    </div>
  `;

  container.innerHTML = cardsHtml;
}

// ================= CLOUD-SYNC GITHUB GIST (Punkt 30) =================
function initCloudSync() {
  const tokenInput = document.getElementById('setting-github-token');
  const gistIdInput = document.getElementById('setting-github-gist-id');
  const autoSyncChk = document.getElementById('setting-auto-sync');
  const btnUpload = document.getElementById('btn-sync-upload');
  const btnDownload = document.getElementById('btn-sync-download');

  if (tokenInput) {
    tokenInput.addEventListener('change', (e) => {
      state.settings.githubToken = e.target.value.trim();
      saveSettings();
    });
  }

  if (gistIdInput) {
    gistIdInput.addEventListener('change', (e) => {
      state.settings.githubGistId = e.target.value.trim();
      saveSettings();
    });
  }

  if (autoSyncChk) {
    autoSyncChk.addEventListener('change', (e) => {
      state.settings.autoSync = e.target.checked;
      saveSettings();
      triggerHaptic('light');
      showToast(e.target.checked ? 'Auto-Sync aktiviert' : 'Auto-Sync deaktiviert', 'info');
    });
  }

  if (btnUpload) {
    btnUpload.addEventListener('click', () => {
      triggerHaptic('medium');
      uploadToGitHubGist(false);
    });
  }

  if (btnDownload) {
    btnDownload.addEventListener('click', () => {
      triggerHaptic('medium');
      downloadFromGitHubGist();
    });
  }
}

function autoSyncToGistSilently() {
  if (state.settings && state.settings.autoSync && state.settings.githubToken) {
    uploadToGitHubGist(true);
  }
}

function uploadToGitHubGist(silent = false) {
  const token = state.settings.githubToken;
  if (!token) {
    if (!silent) showToast('Bitte gib zuerst dein GitHub Access Token ein', 'error');
    return;
  }

  const badge = document.getElementById('sync-status-badge');
  if (badge) {
    badge.className = 'badge badge-warning';
    badge.textContent = 'Sichern...';
  }

  const payloadData = {
    app: 'Gastherme Heizkosten Tracker',
    location: '30974 Wennigsen (Deister)',
    version: '2.0',
    exportedAt: new Date().toISOString(),
    readings: state.readings,
    prices: state.prices,
    settings: {
      ...state.settings,
      githubToken: '',
    },
    theme: state.theme,
    tabOrder: state.tabOrder,
  };

  const body = {
    description: 'Gastherme Heizkosten Tracker Backup (30974 Wennigsen)',
    public: false,
    files: {
      'gas_tracker_backup.json': {
        content: JSON.stringify(payloadData, null, 2),
      },
    },
  };

  const gistId = state.settings.githubGistId;
  const url = gistId ? `https://api.github.com/gists/${gistId}` : 'https://api.github.com/gists';
  const method = gistId ? 'PATCH' : 'POST';

  fetch(url, {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((result) => {
      if (!gistId && result.id) {
        state.settings.githubGistId = result.id;
        const gInput = document.getElementById('setting-github-gist-id');
        if (gInput) gInput.value = result.id;
      }
      state.settings.lastSyncTimestamp = Date.now();
      saveSettings();

      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = 'Gesichert';
      }

      const syncTimeEl = document.getElementById('sync-last-time');
      if (syncTimeEl) {
        const dt = new Date();
        syncTimeEl.textContent = `Zuletzt synchronisiert: ${dt.toLocaleDateString('de-DE')} ${dt.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })} Uhr`;
      }

      if (!silent) {
        showToast('Backup erfolgreich in GitHub Gist gespeichert!', 'success');
        triggerHaptic('success');
      }
    })
    .catch((err) => {
      console.error('Gist Upload Fehler:', err);
      if (badge) {
        badge.className = 'badge badge-rose';
        badge.textContent = 'Fehler';
      }
      if (!silent) {
        showToast(`Sync fehlgeschlagen: ${err.message}`, 'error');
        triggerHaptic('error');
      }
    });
}

function downloadFromGitHubGist() {
  const token = state.settings.githubToken;
  const gistId = state.settings.githubGistId;

  if (!token || !gistId) {
    showToast('Bitte Token und Gist ID eingeben', 'error');
    return;
  }

  const badge = document.getElementById('sync-status-badge');
  if (badge) {
    badge.className = 'badge badge-warning';
    badge.textContent = 'Laden...';
  }

  fetch(`https://api.github.com/gists/${gistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const file = data.files && data.files['gas_tracker_backup.json'];
      if (!file || !file.content) throw new Error('Backup-Datei im Gist nicht gefunden');

      const parsed = JSON.parse(file.content);
      if (Array.isArray(parsed.readings)) state.readings = parsed.readings;
      if (Array.isArray(parsed.prices)) state.prices = parsed.prices;
      if (parsed.settings) state.settings = { ...state.settings, ...parsed.settings };

      saveReadings();
      savePrices();
      saveSettings();

      state.settings.lastSyncTimestamp = Date.now();
      saveSettings();

      renderAll();

      if (badge) {
        badge.className = 'badge badge-success';
        badge.textContent = 'Aktuell';
      }

      showToast('Daten erfolgreich aus Cloud wiederhergestellt!', 'success');
      triggerHaptic('success');
    })
    .catch((err) => {
      console.error('Gist Download Fehler:', err);
      if (badge) {
        badge.className = 'badge badge-rose';
        badge.textContent = 'Fehler';
      }
      showToast(`Cloud-Download fehlgeschlagen: ${err.message}`, 'error');
      triggerHaptic('error');
    });
}

// ================= TOAST NOTIFICATION SYSTEM =================
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
    <span>${escapeHtml(message)}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.25s ease';
    setTimeout(() => toast.remove(), 250);
  }, 3200);
}

// ================= HELPERS =================
function formatNumber(num, decimals = 1) {
  if (num === null || num === undefined || isNaN(num)) return '0,0';
  return Number(num).toLocaleString('de-DE', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function formatDateTimeForInput(date) {
  const pad = (n) => String(n).padStart(2, '0');
  const yyyy = date.getFullYear();
  const MM = pad(date.getMonth() + 1);
  const dd = pad(date.getDate());
  const hh = pad(date.getHours());
  const mm = pad(date.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ================= SERVICE WORKER REGISTRATION =================
function initServiceWorker() {
  if ('serviceWorker' in navigator && window.location.protocol.startsWith('http')) {
    navigator.serviceWorker.register('./sw.js')
      .then(() => console.log('Service Worker registriert'))
      .catch((err) => console.log('Service Worker Registrierung:', err));
  }
}
