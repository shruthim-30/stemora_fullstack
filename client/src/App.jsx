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
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

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

    api.getAdminSession()
      .then(setAdminAuthenticated)
      .catch(error => console.warn('[ADMIN] Could not verify admin session:', error.message));
  }, []);

  const handlePhotoUpdate = async (id, newUrl) => {
    const innovator = content.innovators.find(item => item.id === id);
    if (!innovator) throw new Error('Innovator not found.');

    const updated = await api.saveInnovator({ ...innovator, photo_url: newUrl });
    setContent(prev => ({
      ...prev,
      innovators: prev.innovators.map(item => item.id === id ? updated : item)
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

      {/* 9. Summer programme */}
      <SummerChamp settings={content.settings} />

      {/* 10. Stemora Online Learning Platform */}
      <OnlinePlatform />

      {/* 11. Student innovators */}
      <WallOfInnovators
        innovators={content.innovators}
        editable={adminAuthenticated}
        onPhotoUpdate={handlePhotoUpdate}
      />

      {/* 12. Community testimonials */}
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
        onAuthChange={setAdminAuthenticated}
      />
    </div>
  );
}
