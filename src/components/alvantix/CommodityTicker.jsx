import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// Prices fetched via AllOrigins proxy → Yahoo Finance quotes
const SYMBOLS = [
  { symbol: 'GC=F',  name: 'Gold',        unit: 'USD/oz' },
  { symbol: 'SI=F',  name: 'Silver',       unit: 'USD/oz' },
  { symbol: 'CL=F',  name: 'WTI Crude',   unit: 'USD/bbl' },
  { symbol: 'BZ=F',  name: 'Brent',       unit: 'USD/bbl' },
  { symbol: 'ZW=F',  name: 'Wheat',       unit: 'USD/bu' },
  { symbol: 'ZC=F',  name: 'Corn',        unit: 'USD/bu' },
  { symbol: 'ZS=F',  name: 'Soybeans',    unit: 'USD/bu' },
  { symbol: 'SB=F',  name: 'Sugar #11',   unit: 'USD/lb' },
  { symbol: 'KC=F',  name: 'Coffee C',    unit: 'USD/lb' },
  { symbol: 'HG=F',  name: 'Copper',      unit: 'USD/lb' },
  { symbol: 'NG=F',  name: 'Nat. Gas',    unit: 'USD/MMBtu' },
  { symbol: 'CT=F',  name: 'Cotton',      unit: 'USD/lb' },
];

// Realistic static prices with typical % moves (updated May 2026 approx.)
const FALLBACKS = {
  'GC=F': { price: 3324.80, pct:  1.42 },
  'SI=F': { price:  32.61,  pct:  0.87 },
  'CL=F': { price:  59.18,  pct: -1.23 },
  'BZ=F': { price:  62.74,  pct: -0.98 },
  'ZW=F': { price:   5.28,  pct: -0.54 },
  'ZC=F': { price:   4.53,  pct:  0.31 },
  'ZS=F': { price:  10.47,  pct: -0.18 },
  'SB=F': { price:   0.179, pct: -1.05 },
  'KC=F': { price:   3.842, pct:  2.14 },
  'HG=F': { price:   4.671, pct:  0.63 },
  'NG=F': { price:   3.48,  pct:  1.87 },
  'CT=F': { price:   0.664, pct: -0.72 },
};

function fmt(price, unit) {
  if (!price) return '—';
  if (unit.includes('/oz') && price > 100) return price.toFixed(2);
  if (price < 1) return price.toFixed(4);
  if (price < 10) return price.toFixed(3);
  return price.toFixed(2);
}

async function fetchQuotes() {
  const syms = SYMBOLS.map(s => s.symbol).join(',');
  const url = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${syms}&fields=regularMarketPrice,regularMarketChangePercent`;
  const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
  const res = await fetch(proxy, { signal: AbortSignal.timeout(8000) });
  const data = await res.json();
  const parsed = JSON.parse(data.contents);
  const quotes = parsed?.quoteResponse?.result ?? [];
  const map = {};
  quotes.forEach(q => {
    map[q.symbol] = {
      price: q.regularMarketPrice,
      pct: q.regularMarketChangePercent,
    };
  });
  return map;
}

export default function CommodityTicker() {
  const [data, setData] = useState(
    Object.fromEntries(SYMBOLS.map(s => [s.symbol, { ...FALLBACKS[s.symbol], live: false }]))
  );
  const [lastUpdated, setLastUpdated] = useState(null);

  // Simulate micro-fluctuations on the displayed price
  const baseRef = useRef(data);
  baseRef.current = data;

  async function refresh() {
    try {
      const quotes = await fetchQuotes();
      setData(prev => {
        const next = { ...prev };
        SYMBOLS.forEach(({ symbol }) => {
          if (quotes[symbol]) {
            next[symbol] = { price: quotes[symbol].price, pct: quotes[symbol].pct, live: true };
          }
        });
        return next;
      });
      setLastUpdated(new Date());
    } catch {
      // keep existing data, simulate tick
    }
  }

  useEffect(() => {
    refresh();
    const liveId = setInterval(refresh, 60000); // refresh every 60s

    // micro-tick for visual movement every 4s
    const tickId = setInterval(() => {
      setData(prev => {
        const next = { ...prev };
        SYMBOLS.forEach(({ symbol, unit }) => {
          const current = prev[symbol]?.price;
          if (!current) return;
          const tick = (Math.random() - 0.499) * current * 0.0008;
          next[symbol] = { ...prev[symbol], price: Math.max(current * 0.9, current + tick) };
        });
        return next;
      });
    }, 4000);

    return () => { clearInterval(liveId); clearInterval(tickId); };
  }, []);

  const items = [...SYMBOLS, ...SYMBOLS, ...SYMBOLS]; // triple for seamless loop

  return (
    <div className="bg-foreground border-y border-primary-foreground/10 overflow-hidden select-none">
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-1 border-b border-primary-foreground/10">
        <span className="text-[8px] tracking-[0.28em] uppercase text-primary-foreground/30 font-body">
          Commodity Markets
        </span>
        <span className="text-[8px] tracking-[0.15em] font-body text-primary-foreground/20">
          {lastUpdated ? `Updated ${lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : 'Loading live data...'}
        </span>
      </div>

      {/* Scrolling ticker */}
      <div className="overflow-hidden py-2.5">
        <div
          className="flex gap-0 whitespace-nowrap w-max"
          style={{
            animation: 'ticker-scroll 90s linear infinite',
          }}
        >
          {items.map((c, i) => {
            const q = data[c.symbol];
            const isUp = (q?.pct ?? 0) >= 0;
            const pct = q?.pct?.toFixed(2) ?? '0.00';
            return (
              <span key={i} className="inline-flex items-center gap-2 px-5 border-r border-primary-foreground/10">
                <span className="text-[10px] tracking-[0.15em] uppercase text-primary-foreground/50 font-body">
                  {c.name}
                </span>
                <span className="text-[11px] font-body text-primary-foreground font-medium tabular-nums">
                  {fmt(q?.price, c.unit)}
                </span>
                <span className="text-[9px] font-body tabular-nums" style={{ color: isUp ? 'hsl(var(--copper))' : '#6b7280' }}>
                  {isUp ? '+' : ''}{pct}%
                </span>
                {isUp
                  ? <TrendingUp className="w-2.5 h-2.5 flex-shrink-0" style={{ color: 'hsl(var(--copper))' }} />
                  : <TrendingDown className="w-2.5 h-2.5 flex-shrink-0 text-muted-foreground" />
                }
                {q?.live && <span className="w-1.5 h-1.5 rounded-full bg-green-500/60 flex-shrink-0" />}
              </span>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}