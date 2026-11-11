import React from 'react';

export default function Footer({ onOpenAdmin }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-3 border-navy py-7 text-sm text-mut">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-5">
        <div className="flex items-center gap-2.5 flex-wrap">
          <a href="#" className="font-extrabold text-[20px] tracking-[-0.03em] text-teal">
            Stem<b className="text-gold font-extrabold">ora</b>
          </a>
          <span className="font-medium text-mut">· Lighting Young Minds</span>
          <span className="text-xs text-mut/70 ml-2">© {currentYear} Stemora</span>
        </div>

        <ul className="flex items-center gap-6 font-semibold text-navy flex-wrap justify-center">
          <li><a href="#about" className="hover:text-teal-dark transition-colors">About</a></li>
          <li><a href="#programmes" className="hover:text-teal-dark transition-colors">Programmes</a></li>
          <li><a href="#summer" className="hover:text-teal-dark transition-colors">Summer Champ</a></li>
          <li><a href="#learn" className="hover:text-teal-dark transition-colors">Online</a></li>
          <li><a href="#contact" className="hover:text-teal-dark transition-colors">Contact</a></li>
          <li>
            
          </li>
        </ul>
      </div>
    </footer>
  );
}
