import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/alvantix/Navbar';
import HeroSection from '../components/alvantix/HeroSection';
import HeroImage from '../components/alvantix/HeroImage';
import StatsGrid from '../components/alvantix/StatsGrid';
import AboutSection from '../components/alvantix/AboutSection';
import SectorsSection from '../components/alvantix/SectorsSection';
import ServicesSection from '../components/alvantix/ServicesSection';
import GlobalSection from '../components/alvantix/GlobalSection';
import ContactCTA from '../components/alvantix/ContactCTA';
import CommodityTicker from '../components/alvantix/CommodityTicker';
import PartnerCTAs from '../components/alvantix/PartnerCTAs';
import InsightsSection from '../components/alvantix/InsightsSection';
import NewsFeed from '../components/alvantix/NewsFeed';

const IMAGES = {
  hero: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/62c94c2d4_generated_d6e9169f.png',
  food: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/89699e36e_generated_36b4e174.png',
  wine: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/15475c939_generated_878242b1.png',
  tech: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/ae09259ad_generated_139ebed7.png',
  commodities: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/44ecdab50_generated_6480d018.png',
  services: 'https://media.base44.com/images/public/69fa43f9fdc9178cf719b838/bc8336979_generated_3e648e6b.png',
};

export default function Home() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <Navbar />
      <HeroSection />
      <HeroImage src={IMAGES.hero} />
      <CommodityTicker />
      <StatsGrid />
      <AboutSection />
      <SectorsSection images={IMAGES} />
      <ServicesSection />
      <GlobalSection />
      <InsightsSection />
      <NewsFeed />
      <PartnerCTAs />
      <ContactCTA />
    </div>
  );
}