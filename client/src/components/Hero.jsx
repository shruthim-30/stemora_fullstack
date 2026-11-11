import React from 'react';
import PhotoPlaceholder from './PhotoPlaceholder';

export default function Hero() {
  return (
    <header className="pt-14 pb-20 text-center max-w-[1120px] mx-auto px-6 lg:px-8">
      {/* Pill Badge */}
      <div className="inline-block bg-white border-2.5 border-navy rounded-full px-4 py-1.5 font-bold text-sm mb-6 shadow-sm">
        Lighting Young Minds
      </div>

      {/* Main Hero Heading */}
      <h1 className="text-5xl sm:text-7xl lg:text-[96px] font-extrabold tracking-[-0.025em] leading-[1.05] text-navy">
        Build skills.<br />
        Build{' '}
        <em className="not-italic bg-gold px-3 py-0.5 rounded-[14px] inline-block -rotate-[1.5deg] border-3 border-navy shadow-[3px_3px_0_#0D2136]">
          confidence.
        </em>
      </h1>

      {/* Hero Subtitle */}
      <p className="max-w-[560px] mx-auto mt-7 mb-9 text-lg sm:text-[19px] text-mut leading-relaxed">
        Inspiring the next generation of innovators through hands-on robotics, electronics, AI and coding experiences in your school.
      </p>

      {/* Call to Actions */}
      <div className="flex gap-4 justify-center flex-wrap mb-14">
        <a href="#programmes" className="btn-brutal btn-gold text-navy">
          Explore programmes
        </a>
        <a href="#contact" className="btn-brutal btn-white text-navy">
          Book a school demo
        </a>
      </div>

      {/* Hero 3-Photo Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr] gap-[22px] text-left">
        <PhotoPlaceholder
          label="Students building robots"
          minHeight="260px"
          className="w-full"
        />
        <PhotoPlaceholder
          label="Classroom session"
          minHeight="260px"
          className="w-full"
        />
        <PhotoPlaceholder
          label="Project showcase"
          minHeight="260px"
          className="w-full"
        />
      </div>
    </header>
  );
}
