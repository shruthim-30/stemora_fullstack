import React from 'react';
import PhotoPlaceholder from './PhotoPlaceholder';

export default function Achievements({ stats }) {
  const currentStats = stats || {
    students_trained: "2,500+",
    sessions_delivered: "450+",
    projects_built: "1,800+",
    partner_schools: "35+"
  };

  return (
    <section id="achievements" className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 text-center">
        <div className="font-extrabold text-teal-dark text-sm tracking-[0.08em] uppercase mb-2.5">
          Achievements
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
          Proof that kids can build big.
        </h2>
        <p className="mt-3.5 text-lg text-mut max-w-[520px] mx-auto">
          Real numbers, verified by students, teachers and school leadership across Bangalore.
        </p>

        {/* Dynamic 4 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-[18px] mt-11 text-center">
          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.students_trained || '2,500+'}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Students trained
            </span>
          </div>

          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.sessions_delivered || '450+'}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Sessions delivered
            </span>
          </div>

          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.projects_built || '1,800+'}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Projects built
            </span>
          </div>

          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.partner_schools || '35+'}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Partner schools
            </span>
          </div>
        </div>

        {/* 6 Photo Gallery Grid with Span 2 Featured Photo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[18px] mt-11 text-left">
          <div className="sm:col-span-2 sm:row-span-2">
            <PhotoPlaceholder
              label="Robotics festival moment"
              minHeight="360px"
              className="h-full"
            />
          </div>
          <div>
            <PhotoPlaceholder
              label="Award / prize day"
              minHeight="170px"
            />
          </div>
          <div>
            <PhotoPlaceholder
              label="Circuit workshop"
              minHeight="170px"
            />
          </div>
          <div>
            <PhotoPlaceholder
              label="Team challenge"
              minHeight="170px"
            />
          </div>
          <div>
            <PhotoPlaceholder
              label="School visit"
              minHeight="170px"
            />
          </div>
          <div className="sm:col-span-2 md:col-span-4">
            <PhotoPlaceholder
              label="Student demo & hands-on test bench"
              minHeight="170px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
