import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, Flame, BarChart2, Ship } from 'lucide-react';

const TOPICS = [
  { key: 'energy', label: 'Energy', icon: Flame, color: 'text-orange-400' },
  { key: 'commodities', label: 'Commodities', icon: BarChart2, color: 'text-copper' },
  { key: 'trade', label: 'International Trade', icon: Ship, color: 'text-blue-400' },
  { key: 'macro', label: 'Macro & Policy', icon: Globe2, color: 'text-green-400' },
];

const FEED = {
  energy: {
    summary: 'Energy markets are navigating a complex interplay between OPEC+ supply discipline, weak Chinese demand and a structural shift in European LNG infrastructure. Brent crude remains rangebound between $60–68/bbl as macro headwinds offset geopolitical risk premiums.',
    items: [
      { headline: 'OPEC+ reaffirms production cut strategy through Q3 2026', source: 'Reuters', region: 'Global', impact: 'supply', urgency: 'high', body: 'At its Vienna meeting, OPEC+ confirmed the extension of 2.2 mb/d voluntary cuts into Q3 2026 as the alliance attempts to stabilise Brent above $60/bbl. Internal compliance from Iraq and Kazakhstan remains a point of contention, with overproduction estimates at ~180 kb/d.' },
      { headline: 'US oil production holds near record 13.4 mb/d despite lower rig count', source: 'EIA', region: 'United States', impact: 'supply', urgency: 'medium', body: 'US crude output remains near its all-time high of 13.4 mb/d despite the Baker Hughes rig count falling to 479, the lowest since December 2023. Efficiency gains in the Permian Basin continue to offset reduced drilling activity, complicating OPEC+ efforts to tighten balances.' },
      { headline: 'European gas storage at 40% capacity ahead of summer injection season', source: 'GIE', region: 'Europe', impact: 'demand', urgency: 'medium', body: 'EU gas storage stands at 40.1% of capacity entering May, well below the 65% average for this time of year. The storage deficit is accelerating LNG imports and supporting TTF natural gas prices, which have risen 22% since January to €38/MWh.' },
      { headline: 'Iran nuclear talks collapse, adding geopolitical premium to crude', source: 'FT', region: 'Middle East', impact: 'price', urgency: 'high', body: 'US-Iran diplomatic talks broke down in April, raising the prospect of renewed sanctions enforcement and potential supply disruptions to Iranian crude exports of approximately 1.7 mb/d. The risk premium in Brent is estimated at $2–4/bbl by most trading desks.' },
    ],
  },
  commodities: {
    summary: 'Precious metals are outperforming on safe-haven demand and central bank buying, while agricultural markets face a mixed outlook — tight sugar and coffee supplies contrast with record South American grain harvests weighing on wheat and soy.',
    items: [
      { headline: 'Gold breaks $3,300/oz as central bank buying accelerates', source: 'Bloomberg', region: 'Global', impact: 'demand', urgency: 'high', body: 'Spot gold reached $3,324/oz this week, supported by net central bank purchases of 290 tonnes in Q1 2026 — the strongest quarterly buying on record. China, Poland and Czechia were the largest accumulators, reflecting continued de-dollarisation of reserve portfolios.' },
      { headline: 'Copper prices recover on AI-linked electrification demand forecasts', source: 'LME', region: 'Global', impact: 'demand', urgency: 'medium', body: 'LME copper has retraced to $4.67/lb after a brief dip to $4.30 in March, driven by revised demand forecasts for data centre construction and grid infrastructure. Analysts at Goldman Sachs project a 2.4 million tonne supply deficit by 2028 if no new large-scale mines are brought online.' },
      { headline: 'Coffee arabica hits multi-year high on Brazil drought concerns', source: 'ICE', region: 'Americas', impact: 'supply', urgency: 'high', body: 'ICE arabica coffee futures rose to $3.84/lb, the highest since 2011, after Brazil\'s Minas Gerais coffee belt reported below-average rainfall during the critical flowering period. Vietnam\'s robusta output is also declining, tightening the global supply balance further.' },
      { headline: 'Wheat futures retreat as Russian export data shows strong volumes', source: 'USDA', region: 'Europe / Black Sea', impact: 'supply', urgency: 'low', body: 'CBOT wheat futures eased to $5.28/bu after Russian export data for April showed shipments of 4.1 million tonnes, above expectations. Russia\'s 2025/26 harvest is estimated at 82 mt by IKAR, providing a buffer to global supply that is capping upside in grain prices.' },
    ],
  },
  trade: {
    summary: 'Global trade flows are being reshaped by US tariff escalation, Red Sea shipping disruptions and the ongoing US-China decoupling dynamic. Companies with diversified supply chains and multi-regional commercial networks are best positioned to navigate the structural changes.',
    items: [
      { headline: 'US tariffs on Chinese goods expanded to cover new industrial categories', source: 'WSJ', region: 'US / China', impact: 'policy', urgency: 'high', body: 'The US Trade Representative announced an expansion of Section 301 tariffs to cover an additional $18bn in Chinese goods, including advanced batteries, solar components and certain food processing equipment. China has signalled retaliatory measures targeting US agricultural exports, particularly soybeans and pork.' },
      { headline: 'Red Sea shipping diversions add 12–14 days to Asia-Europe transit times', source: 'Maersk', region: 'Middle East / Asia', impact: 'supply', urgency: 'high', body: 'Approximately 85% of container shipping traffic continues to avoid the Suez Canal route, diverting via the Cape of Good Hope. Freight rates on the Asia-North Europe corridor have stabilised at $2,800–3,100/FEU, roughly 3x pre-crisis levels, with no near-term resolution expected.' },
      { headline: 'EU-Mercosur trade agreement ratification advances in European Parliament', source: 'Politico', region: 'Europe / Americas', impact: 'policy', urgency: 'medium', body: 'The EU-Mercosur trade agreement, covering €100bn in annual bilateral trade, moved closer to ratification after key Parliamentary committee approval. Opposition from France and Poland over agricultural market access concerns remains a hurdle, but final ratification is now expected by end-2026.' },
      { headline: 'Latin American ports invest $12bn in capacity expansion through 2030', source: 'Port Economics', region: 'Americas', impact: 'supply', urgency: 'low', body: 'Brazil, Chile and Peru have announced a combined $12bn in port infrastructure investment, aimed at expanding capacity for commodity exports as Chinese demand for copper, iron ore and soybeans remains structurally elevated. The Santos port expansion alone will add 15 million TEU of annual capacity.' },
    ],
  },
  macro: {
    summary: 'The macro backdrop remains challenging for risk assets: US inflation is stickier than expected, the Fed has deferred rate cuts, and China\'s recovery is uneven. Dollar strength is creating headwinds for emerging market commodity exporters, though geopolitical risks are providing support for hard assets.',
    items: [
      { headline: 'Federal Reserve holds rates, signals no cuts before Q4 2026', source: 'Federal Reserve', region: 'United States', impact: 'policy', urgency: 'high', body: 'The FOMC voted unanimously to maintain the Fed Funds rate at 4.50–4.75% at its May meeting, with Chair Powell citing services inflation at 3.8% and a resilient labour market as reasons for caution. Futures markets have fully priced out any cut before September, with the base case now a single 25bp reduction in Q4.' },
      { headline: 'China Q1 GDP grows 4.7%, below the 5% government target', source: 'NBS China', region: 'China', impact: 'demand', urgency: 'medium', body: 'China\'s economy grew 4.7% year-on-year in Q1 2026, falling short of the official 5% target amid persistent property sector weakness and subdued consumer confidence. Industrial output and fixed asset investment are the main drags, while export growth at 6.2% provides a partial offset.' },
      { headline: 'Dollar index strengthens to 104.5 as rate differential widens', source: 'Bloomberg', region: 'Global', impact: 'price', urgency: 'medium', body: 'The DXY dollar index climbed to 104.5, its highest since November 2025, as the divergence between US and European monetary policy becomes more pronounced. A stronger dollar is a headwind for commodity prices denominated in USD, particularly for importers in emerging markets facing currency depreciation.' },
      { headline: 'IMF revises global growth down to 2.8% for 2026', source: 'IMF', region: 'Global', impact: 'demand', urgency: 'medium', body: 'The IMF\'s April World Economic Outlook cut the 2026 global growth forecast by 0.4pp to 2.8%, citing trade fragmentation, elevated interest rates and geopolitical tensions. Emerging and developing economies in Asia remain the primary growth engines, while Europe is projected at a modest 1.2%.' },
    ],
  },
};

const urgencyDot = { high: 'bg-red-400', medium: 'bg-copper', low: 'bg-green-400' };
const impactStyle = {
  supply: 'border-orange-400/30 text-orange-400',
  demand: 'border-blue-400/30 text-blue-400',
  price: 'border-copper/40 text-copper',
  policy: 'border-green-400/30 text-green-400',
};

export default function NewsFeed() {
  const [activeTab, setActiveTab] = useState('energy');
  const [expanded, setExpanded] = useState(null);

  const handleTab = (key) => {
    setActiveTab(key);
    setExpanded(null);
  };

  const current = FEED[activeTab];

  return (
    <section className="bg-foreground text-primary-foreground py-16 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="flex items-center gap-2 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-400" />
              </span>
              <p className="text-[10px] tracking-[0.3em] uppercase text-copper font-body">
                Geopolitical & Market Intelligence
              </p>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="font-heading text-3xl md:text-5xl font-medium text-primary-foreground">
              Forces shaping <span className="italic text-copper">global trade.</span>
            </motion.h2>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-0 border-b border-primary-foreground/10 mb-10">
          {TOPICS.map(t => {
            const Icon = t.icon;
            const active = activeTab === t.key;
            return (
              <button key={t.key} onClick={() => handleTab(t.key)}
                className={`flex items-center gap-2 px-5 py-3 text-[10px] tracking-[0.18em] uppercase font-body border-b-2 transition-all duration-300 ${
                  active
                    ? 'border-copper text-primary-foreground'
                    : 'border-transparent text-primary-foreground/30 hover:text-primary-foreground/70'
                }`}>
                <Icon className={`w-3 h-3 ${active ? t.color : ''}`} />
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Market Summary */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab + '-summary'}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="mb-8 px-5 py-4 border border-copper/20 bg-copper/5">
            <p className="text-[9px] tracking-[0.25em] uppercase text-copper font-body mb-1">Market Overview</p>
            <p className="text-sm leading-[1.75] text-primary-foreground/70 font-body">{current.summary}</p>
          </motion.div>
        </AnimatePresence>

        {/* Feed */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="divide-y divide-primary-foreground/8">
            {current.items.map((item, i) => {
              const isOpen = expanded === i;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="py-6 cursor-pointer group"
                  onClick={() => setExpanded(isOpen ? null : i)}>
                  <div className="grid md:grid-cols-12 gap-4 items-start">
                    {/* Urgency + number */}
                    <div className="md:col-span-1 flex items-center gap-2 pt-1">
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${urgencyDot[item.urgency] || 'bg-primary-foreground/20'}`} />
                      <span className="text-[9px] font-body text-primary-foreground/20 tracking-[0.1em]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Tags */}
                    <div className="md:col-span-2 flex flex-wrap gap-1.5 pt-0.5">
                      <span className={`text-[7px] tracking-[0.18em] uppercase font-body border px-1.5 py-0.5 ${impactStyle[item.impact] || 'border-primary-foreground/10 text-primary-foreground/30'}`}>
                        {item.impact}
                      </span>
                      <span className="text-[7px] tracking-[0.15em] uppercase font-body border border-primary-foreground/10 text-primary-foreground/30 px-1.5 py-0.5">
                        {item.region}
                      </span>
                    </div>

                    {/* Headline */}
                    <div className="md:col-span-7">
                      <h3 className={`font-heading text-base md:text-lg font-medium leading-snug transition-colors duration-300 ${isOpen ? 'text-copper' : 'text-primary-foreground group-hover:text-copper'}`}>
                        {item.headline}
                      </h3>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
                            className="mt-3 text-sm leading-[1.75] text-primary-foreground/55 font-body overflow-hidden">
                            {item.body}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Source + expand */}
                    <div className="md:col-span-2 text-right pt-1 flex flex-col items-end gap-2">
                      <span className="text-[8px] tracking-[0.15em] uppercase text-primary-foreground/25 font-body">{item.source}</span>
                      <span className={`text-[8px] tracking-[0.12em] uppercase font-body transition-colors ${isOpen ? 'text-copper' : 'text-primary-foreground/20 group-hover:text-primary-foreground/40'}`}>
                        {isOpen ? 'collapse ↑' : 'read more ↓'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-primary-foreground/10 flex items-center justify-between">
          <p className="text-[8px] tracking-[0.18em] uppercase text-primary-foreground/20 font-body">
            Sector intelligence curated by Alvantix analysts · May 2026
          </p>
          <p className="text-[8px] tracking-[0.15em] uppercase text-primary-foreground/15 font-body">
            For informational purposes only
          </p>
        </div>

      </div>
    </section>
  );
}