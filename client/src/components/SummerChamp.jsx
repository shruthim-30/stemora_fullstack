import React from 'react';
import PhotoPlaceholder from './PhotoPlaceholder';

export default function SummerChamp({ settings }) {
  const currentSettings = settings || {
    summer_dates: "April 10 – May 25, 2027",
    summer_grades: "Grades 3 – 10 (Ages 8-16)",
    summer_venue: "Stemora Innovation Labs, Bangalore"
  };

  const pills = [
    "Robotics",
    "Electronics",
    "AI & Coding",
    "Team challenges",
    "Grand showcase"
  ];

  return (
    <section id="summer" className="bg-gold border-y-3 border-navy py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="font-extrabold text-navy text-sm tracking-[0.08em] uppercase mb-2.5">
            Summer 2027
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] leading-[1.08] text-navy">
            Innovative{' '}
            <em className="not-italic bg-navy text-gold px-3 py-0.5 rounded-[12px] inline-block">
              Summer Champ
            </em>{' '}
            2027
          </h2>
          <p className="mt-4 text-lg text-navy max-w-[520px] leading-relaxed">
            A high-energy summer camp where kids build robots, wire circuits, code games and compete as champions.
          </p>

          {/* Badges/Pills */}
          <div className="flex flex-wrap gap-2.5 my-6">
            {pills.map((pill) => (
              <span
                key={pill}
                className="bg-white border-2.5 border-navy rounded-full px-4 py-1.5 font-bold text-sm text-navy shadow-sm"
              >
                {pill}
              </span>
            ))}
          </div>

          <p className="font-bold text-navy mb-6 text-sm sm:text-base leading-relaxed">
            Dates: <span className="underline decoration-navy/40">{currentSettings.summer_dates}</span> · Ages/Grades: <span className="underline decoration-navy/40">{currentSettings.summer_grades}</span> · Venue: <span className="underline decoration-navy/40">{currentSettings.summer_venue}</span>
          </p>

          <a
            href="#contact"
            className="btn-brutal bg-navy text-white hover:bg-teal-dark border-navy shadow-brutal"
          >
            Reserve a seat
          </a>
        </div>

        {/* 2 Summer Camp Photos */}
        <div className="grid gap-[18px]">
          <PhotoPlaceholder
            label="Summer camp action shot"
            minHeight="210px"
          />
          <PhotoPlaceholder
            label="Champions trophy moment"
            minHeight="210px"
          />
        </div>
      </div>
    </section>
  );
}
