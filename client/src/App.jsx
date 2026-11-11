import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TickerTape from './components/TickerTape';
import About from './components/About';
import Programmes from './components/Programmes';
import WhyStemora from './components/WhyStemora';
import HowItWorks from './components/HowItWorks';
import Achievements from './components/Achievements';
import SummerChamp from './components/SummerChamp';
import OnlinePlatform from './components/OnlinePlatform';
import WallOfInnovators from './components/WallOfInnovators';
import Testimonials from './components/Testimonials';
import RoboticsFestival from './components/RoboticsFestival';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import AdminModal from './components/AdminModal';
import { defaultContent } from './data/defaultContent';
import { api } from './services/api';

export default function App() {
  const [content, setContent] = useState(defaultContent);
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    async function loadRemoteContent() {
      const data = await api.getContent();
      if (data) {
        setContent(prev => ({
          ...prev,
          stats: data.stats || prev.stats,
          innovators: data.innovators || prev.innovators,
          testimonials: data.testimonials || prev.testimonials,
          settings: data.settings || prev.settings
        }));
      }
    }
    loadRemoteContent();
  }, []);

  const handlePhotoUpdate = (id, newUrl) => {
    setContent(prev => ({
      ...prev,
      innovators: prev.innovators.map(inv => 
        inv.id === id ? { ...inv, photo_url: newUrl } : inv
      )
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-navy selection:bg-gold selection:text-navy">
      {/* 1. Sticky Navigation */}
      <Navbar onOpenAdmin={() => setAdminOpen(true)} />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Ticker Tape */}
      <TickerTape />

      {/* 4. About Us */}
      <About />

      {/* 5. Programmes */}
      <Programmes programmes={content.programmes} />

      {/* 6. Why Stemora Checklist */}
      <WhyStemora items={content.whyItems} />

      {/* 7. How It Works Timeline */}
      <HowItWorks />

      {/* 8. Achievements & Dynamic Statistics */}
      <Achievements stats={content.stats} />

      {/* 9. Summer Champ 2027 */}
      <SummerChamp settings={content.settings} />

      {/* 10. Stemora Online Learning Platform */}
      <OnlinePlatform />

      {/* 11. Wall of Innovators */}
      <WallOfInnovators 
        innovators={content.innovators} 
        onPhotoUpdate={handlePhotoUpdate}
      />

      {/* 12. Testimonials */}
      <Testimonials testimonials={content.testimonials} />

      {/* 13. Stemora Robotics Festival */}
      <RoboticsFestival />

      {/* 14. Contact & School Demo Booking Form */}
      <ContactSection settings={content.settings} />

      {/* 15. Footer */}
      <Footer onOpenAdmin={() => setAdminOpen(true)} />

      {/* Dynamic Admin Control Panel Modal */}
      <AdminModal
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        content={content}
        onContentUpdated={(newContent) => setContent(newContent)}
      />
    </div>
  );
}
