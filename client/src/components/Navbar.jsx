import React, { useState } from 'react';

export default function Navbar({ onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Programmes", href: "#programmes" },
    { label: "Achievements", href: "#achievements" },
    { label: "Summer Champ", href: "#summer" },
    { label: "Online", href: "#learn" },
   // { label: "Innovators", href: "#wall" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#F7FAFB]/95 backdrop-blur-md border-b-2 border-slate-500/10 py-4 transition-all">
      {/* Container stretched across outer edges */}
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-10 lg:px-12 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="font-extrabold text-[26px] tracking-[-0.03em] select-none flex items-center">
          <span className="text-[#00A896]">Stem</span>
          <span className="text-[#F2A900]">ora</span>
        </a>

        {/* Desktop Navigation Links with Pill Hover (No Blue Text) */}
        <ul className="hidden md:flex items-center space-x-1 lg:space-x-2 font-semibold text-[14.5px] text-[#0F172A]">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-2 rounded-full hover:bg-white text-[#0F172A] shadow-sm hover:shadow-sm transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions Wrapper (Enquire Now & Mobile Menu) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenAdmin}
            className="hidden sm:inline-flex items-center justify-center font-bold text-sm bg-white text-[#0F172A] border-2 border-[#0F172A] px-4 py-2.5 rounded-full hover:bg-slate-100 transition-colors"
          >
            Admin
          </button>

          {/* Enquire Now Pill Button */}
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center font-bold text-sm bg-[#00A896] text-[#0F172A] border-2 border-[#0F172A] px-6 py-2.5 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] hover:translate-y-[-1px] transition-all"
          >
            Enquire now
          </a>

          {/* Mobile Hamburger Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-[#0F172A] bg-white text-[#0F172A] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b-2 border-[#0F172A] px-6 py-5 shadow-lg mt-3">
          <ul className="flex flex-col gap-3 font-bold text-base text-[#0F172A]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-2 px-3 rounded-lg hover:bg-slate-100 text-[#0F172A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-3">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="w-full text-center block font-bold text-sm bg-[#00A896] text-[#0F172A] border-2 border-[#0F172A] py-3 rounded-full shadow-[2px_2px_0px_0px_rgba(15,23,42,1)]"
              >
                Enquire now
              </a>
            </li>
            <li>
              <button
                type="button"
                onClick={() => {
                  handleLinkClick();
                  onOpenAdmin?.();
                }}
                className="w-full text-center block font-bold text-sm bg-white text-[#0F172A] border-2 border-[#0F172A] py-3 rounded-full"
              >
                Admin
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}