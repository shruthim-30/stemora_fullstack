import React from 'react';

export default function RoboticsFestival() {
  const highlights = [
    {
      title: "Student projects",
      description: "Showcase working models and creative solutions."
    },
    {
      title: "School partnerships",
      description: "Build a programme around your school’s needs."
    },
    {
      title: "Memorable experiences",
      description: "Turn learning into something students remember."
    }
  ];

  return (
    <section id="festival" className="bg-navy text-white text-center py-20 lg:py-24 border-b-3 border-navy">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <div className="font-bold text-gold text-sm tracking-[0.08em] uppercase mb-3">
          Stemora Robotics Festival
        </div>
        <h2 className="text-5xl sm:text-7xl lg:text-[110px] font-extrabold tracking-[-0.03em] leading-none my-3 text-white">
          Ideas on display.
        </h2>
        <p className="text-lg sm:text-[20px] text-[#c6d4e0] mb-9">
          Young innovators. Big imagination. Real creations.
        </p>

        {/* 3 Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-10 text-left">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="border-2.5 border-[#3b5a76] rounded-[16px] p-[22px] bg-navy/50"
            >
              <strong className="block text-[19px] text-gold font-bold mb-1.5">
                {h.title}
              </strong>
              <span className="text-[#c6d4e0] text-[15.5px] leading-relaxed">
                {h.description}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="btn-brutal bg-gold text-navy border-gold hover:border-gold shadow-none hover:shadow-brutal hover:bg-[#e09b17]"
        >
          Plan a festival
        </a>
      </div>
    </section>
  );
}
