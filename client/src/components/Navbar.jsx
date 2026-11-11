import React, { useState } from 'react';

export default function Navbar({ onOpenAdmin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Programmes", href: "#programmes" },
    { label: "Achievements", href: "#achievements" },
    { label: "Summer Champ", href: "#summer" },
    { label: "Online", href: "#learn" },
    { label: "Innovators", href: "#wall" },
    { label: "Contact", href: "#contact" },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#F7FAFB]/95 backdrop-blur-md border-b-2 border-grid py-3.5 transition-all">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="font-extrabold text-[26px] tracking-[-0.03em] text-teal select-none">
          Stem<b className="text-gold font-extrabold">ora</b>
        </a>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-1 font-semibold text-[14.5px] text-navy">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3.5 py-2 rounded-full hover:bg-white transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA & Admin Access */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAdmin}
            title="Open Admin Dashboard"
            className="text-xs font-bold px-3 py-1.5 rounded-full border border-navy/30 bg-white/60 hover:bg-white text-navy transition-colors"
          >
            ⚙️ Admin
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-block btn-brutal btn-teal py-2.5 px-5 text-sm"
          >
            Enquire now
          </a>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-navy bg-white text-navy focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
        <div className="md:hidden bg-white border-b-3 border-navy px-6 py-4 shadow-brutal mt-3">
          <ul className="flex flex-col gap-2 font-bold text-base text-navy">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-2 px-3 rounded-lg hover:bg-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="btn-brutal btn-teal w-full text-center block"
              >
                Enquire now
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
