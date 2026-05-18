import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Wheat, Zap, Wine } from 'lucide-react';

const CATEGORIES = [
  { key: 'energy', label: 'Energy', icon: Zap },
  { key: 'agriculture', label: 'Agriculture', icon: Wheat },
  { key: 'metals', label: 'Metals & Finance', icon: TrendingUp },
  { key: 'wine', label: 'Wine & Food', icon: Wine },
];

const STATIC_DATA = {
  energy: [
    {
      title: 'OPEC+ extends output cuts through Q3 2026',
      summary: 'The alliance agreed to maintain voluntary cuts of 2.2 million b/d into the third quarter, citing persistent demand uncertainty from China and a slowdown in US manufacturing activity. Brent crude responded with a modest 1.2% gain before retracing on dollar strength.',
      tag: 'Supply',
      sentiment: 'bullish',
    },
    {
      title: 'European LNG demand rises as Russian pipeline flows remain limited',
      summary: 'EU member states imported 11.4 bcm of LNG in Q1 2026, up 8% year-on-year, as pipeline flows from Russia remain at a fraction of pre-2022 levels. US and Qatari exporters are the primary beneficiaries of the structural shift.',
      tag: 'Demand',
      sentiment: 'bullish',
    },
    {
      title: 'US natural gas inventories below 5-year average entering summer',
      summary: 'EIA weekly data shows storage at 1,742 bcf, approximately 9% below the seasonal five-year average. Warm weather forecasts for May–June are supporting Henry Hub prices, which have risen 18% since late March.',
      tag: 'Price',
      sentiment: 'bullish',
    },
  ],
  agriculture: [
    {
      title: 'Black Sea grain corridor faces renewed geopolitical disruption',
      summary: 'Ukrainian wheat export volumes dropped 14% month-on-month in April as port logistics were disrupted. CBOT wheat futures rose to a 4-month high of $5.42/bu before partial recovery, with market participants closely monitoring crop progress in the US Plains.',
      tag: 'Supply',
      sentiment: 'bearish',
    },
    {
      title: 'Brazil soy harvest reaches record 153 million tonnes',
      summary: 'CONAB revised its 2025/26 soybean harvest estimate upward to a record 153 mt, driven by favourable rainfall across Mato Grosso and Paraná. The surplus is expected to weigh on Chicago Board of Trade soybean futures through mid-year.',
      tag: 'Supply',
      sentiment: 'bearish',
    },
    {
      title: 'Sugar markets tighten as Indian export restrictions remain in place',
      summary: 'India, the world\'s second-largest sugar producer, has maintained its export ban for a second consecutive season, drawing down global inventories. Raw sugar on ICE trades near 18.5 c/lb, supported by reduced availability from Brazil\'s CS region early in the crushing season.',
      tag: 'Price',
      sentiment: 'bullish',
    },
  ],
  metals: [
    {
      title: 'Gold consolidates near all-time highs above $3,300/oz',
      summary: 'Spot gold remains elevated above $3,300/oz amid sustained central bank buying, particularly from emerging market reserve managers. Geopolitical uncertainty and de-dollarisation narratives continue to underpin demand, with ETF inflows turning positive for the third consecutive month.',
      tag: 'Price',
      sentiment: 'bullish',
    },
    {
      title: 'Copper demand outlook strengthened by AI data centre build-out',
      summary: 'LME copper prices have recovered to $4.67/lb, supported by forecasts of surging demand from hyperscale data centres and electrification infrastructure. Goldman Sachs raised its 12-month copper target to $5.20/lb, citing constrained mine supply from Chile and Peru.',
      tag: 'Demand',
      sentiment: 'bullish',
    },
    {
      title: 'Fed signals prolonged higher-for-longer rate environment',
      summary: 'FOMC minutes released this week indicated no rate cuts are expected before Q4 2026, as services inflation remains sticky at 3.8%. Dollar strength has capped upside in commodity prices broadly, with silver and platinum underperforming gold in recent weeks.',
      tag: 'Policy',
      sentiment: 'neutral',
    },
  ],
  wine: [
    {
      title: 'Spanish wine exports reach €3.1bn, up 6% year-on-year',
      summary: 'ICEX data confirms Spanish wine exports grew 6% in value in 2025 to €3.1bn, with the US, Germany and the UK remaining the top three destinations. Rioja and Ribera del Duero appellation wines drove most of the value growth, supported by premium positioning strategies.',
      tag: 'Trade',
      sentiment: 'bullish',
    },
    {
      title: 'Global wine consumption declines for fourth consecutive year',
      summary: 'OIV data shows global wine consumption fell to 221 million hectolitres in 2025, the lowest level since 2001. Structural declines in France, Italy and the UK are partially offset by growth in the US on-trade and emerging Asian markets, particularly South Korea and Japan.',
      tag: 'Demand',
      sentiment: 'bearish',
    },
    {
      title: 'Premium and ultra-premium segments outperform as polarisation deepens',
      summary: 'Despite volume declines, wines priced above €15 retail grew 4.2% by value in 2025, underscoring a bifurcation in the market. Producers with established export brands and quality certifications are gaining market share at the expense of bulk and private-label commodity wine.',
      tag: 'Market',
      sentiment: 'neutral',
    },
  ],
};

const sentimentColor = (s) => {
  if (s === 'bullish') return 'text-copper';
  if (s === 'bearish') return 'text-red-400';
  return 'text-muted-foreground';
};

export default function InsightsSection() {
  const [activeTab, setActiveTab] = useState('energy');

  const currentItems = STATIC_DATA[activeTab] || [];

  return (
    <section className="border-t border-border py-16 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-[10px] tracking-[0.3em] uppercase text-copper font-body mb-3">
              Insights & Market Analysis
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-medium">
              What's moving <span className="text-copper italic">the markets.</span>
            </motion.h2>
          </div>
          <p className="text-[10px] tracking-[0.15em] uppercase text-muted-foreground font-body">
            Curated · Sector intelligence
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 border-b border-border mb-10">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const active = activeTab === cat.key;
            return (
              <button key={cat.key} onClick={() => setActiveTab(cat.key)}
                className={`flex items-center gap-2 px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-body border-b-2 transition-all duration-300 ${
                  active
                    ? 'border-copper text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}>
                <Icon className="w-3 h-3" />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Articles */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="divide-y divide-border">
          {currentItems.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="grid md:grid-cols-12 gap-4 py-8 group">
              <div className="md:col-span-1 pt-1">
                <span className="text-[9px] tracking-[0.15em] font-body text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="md:col-span-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[8px] tracking-[0.2em] uppercase font-body px-2 py-0.5 border border-border text-muted-foreground">
                    {item.tag}
                  </span>
                  <span className={`text-[8px] tracking-[0.15em] uppercase font-body ${sentimentColor(item.sentiment)}`}>
                    {item.sentiment}
                  </span>
                </div>
                <h3 className="font-heading text-base md:text-lg font-medium leading-snug group-hover:text-copper transition-colors duration-300">
                  {item.title}
                </h3>
              </div>
              <div className="md:col-span-6 md:col-start-6">
                <p className="text-sm leading-[1.75] text-muted-foreground font-body">
                  {item.summary}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}