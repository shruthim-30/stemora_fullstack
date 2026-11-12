
import React from 'react';

export default function Achievements() {

  // Fixed achievement numbers
  const currentStats = {
    students_trained: "6000+",
    sessions_delivered: "500+",
    projects_built: "100+",
    partner_schools: "15+"
  };

  return (
    <section id="achievements" className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 text-center">

        {/* Section Heading */}
        <div className="font-extrabold text-teal-dark text-sm tracking-[0.08em] uppercase mb-2.5">
          Achievements
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
          Proof that kids can build big.
        </h2>

        <p className="mt-3.5 text-lg text-mut max-w-[520px] mx-auto">
          Real numbers, verified by students, teachers and school leadership across Bangalore.
        </p>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-[18px] mt-11 text-center">

          {/* Students Trained */}
          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.students_trained}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Students trained
            </span>
          </div>

          {/* Sessions Delivered */}
          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.sessions_delivered}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Sessions delivered
            </span>
          </div>

          {/* Projects Built */}
          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.projects_built}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Projects built
            </span>
          </div>

          {/* Partner Schools */}
          <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal transition-transform hover:-translate-y-1">
            <b className="block text-3xl sm:text-[46px] font-extrabold text-teal-dark tracking-[-0.03em] leading-none mb-2">
              {currentStats.partner_schools}
            </b>
            <span className="font-semibold text-mut text-sm sm:text-base">
              Partner schools
            </span>
          </div>

        </div>

        {/* STEMORA Photo Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[18px] mt-11 text-left">

          {/* Large Robotics Festival Image */}
          <div className="sm:col-span-2 sm:row-span-2 overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/6.jpeg"
              alt="STEMORA robotics festival"
              className="w-full h-[360px] sm:h-full min-h-[360px] object-cover object-center"
            />
          </div>

          {/* Award / Prize Day */}
          <div className="overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/14.jpeg"
              alt="Student award and prize ceremony"
              className="w-full h-[170px] object-cover object-center"
            />
          </div>

          {/* Circuit Workshop */}
          <div className="overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/8.jpeg"
              alt="Students participating in electronics circuit workshop"
              className="w-full h-[170px] object-cover object-center"
            />
          </div>

          {/* Team Challenge */}
          <div className="overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/9.jpeg"
              alt="Students working together on robotics challenges"
              className="w-full h-[170px] object-cover object-center"
            />
          </div>

          {/* School Visit */}
          <div className="overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/10.jpeg"
              alt="STEMORA school visit and robotics session"
              className="w-full h-[170px] object-cover object-center"
            />
          </div>

          {/* Student Demo and Test Bench */}
          <div className="sm:col-span-2 md:col-span-4 overflow-hidden rounded-[18px] border-3 border-navy shadow-brutal">
            <img
              src="/images/11.jpeg"
              alt="Students demonstrating hands-on robotics projects"
              className="w-full h-[230px] sm:h-[280px] object-cover object-center"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
