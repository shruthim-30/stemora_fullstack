
import React from 'react';

export default function About() {
  return (
    <section id="about" className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

        {/* About Information */}
        <div>
          <div className="font-extrabold text-teal-dark text-sm tracking-[0.08em] uppercase mb-2.5">
            About us
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] leading-[1.08] text-navy">
            Where curiosity meets the workbench.
          </h2>

          <p className="mt-4 text-lg text-mut max-w-[520px] leading-relaxed">
            Stemora is an innovation-driven STEM education company delivering hands-on robotics, electronics, AI and coding sessions at schools across Bangalore. We turn textbook ideas into things students can build, test and show off.
          </p>

          {/* Mission & Vision Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-7">

            <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal">
              <h3 className="text-2xl font-bold mb-2 text-navy">
                Our Mission
              </h3>
              <p className="text-mut text-[15px] leading-relaxed">
                To make hands-on STEM learning accessible to every school child and build confident, creative problem solvers.
              </p>
            </div>

            <div className="bg-white border-3 border-navy rounded-[18px] p-6 shadow-brutal">
              <h3 className="text-2xl font-bold mb-2 text-navy">
                Our Vision
              </h3>
              <p className="text-mut text-[15px] leading-relaxed">
                A generation of young innovators who imagine, build and lead the technology of tomorrow.
              </p>
            </div>

          </div>
        </div>

        {/* Founder / Team Photograph */}
        
{/* Founder / Team Photograph */}
<div className="w-full overflow-hidden rounded-[20px] border-3 border-navy shadow-[7px_7px_0_#0D2136]">
  <img
    src="/images/5.jpeg"
    alt="STEMORA team conducting a robotics workshop with students"
    className="block w-full aspect-[2/1] object-cover object-center"
  />
</div>


      </div>
    </section>
  );
}
