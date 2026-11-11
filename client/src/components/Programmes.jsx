import React from 'react';

export default function Programmes({ programmes }) {
  const items = programmes || [
    {
      id: "robotics",
      title: "Robotics Course",
      iconBg: "bg-teal",
      description: "A structured, age-appropriate journey into robotics, sensors, motors and coding. Students assemble and program working models.",
      tag: "For schools · Grade-wise learning",
      actionText: "Learn more",
      actionLink: "#contact",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0D2136" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="8" width="14" height="11" rx="3"/>
          <path d="M12 8V4M9 13h.01M15 13h.01M9 16h6"/>
        </svg>
      )
    },
    {
      id: "robocircuit",
      title: "RoboCircuit Course",
      iconBg: "bg-gold",
      description: "A deeper hands-on pathway from electronic circuits to microcontroller-based robotics and functional prototypes.",
      tag: "Circuits · Arduino · Robotics",
      actionText: "Learn more",
      actionLink: "#contact",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0D2136" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="6" y="6" width="12" height="12" rx="2"/>
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>
        </svg>
      )
    },
    {
      id: "festival",
      title: "Robotics Festival",
      iconBg: "bg-white",
      description: "A high-energy celebration of innovation with project showcases, challenges, demonstrations and student participation.",
      tag: "Showcase · Compete · Celebrate",
      actionText: "Learn more",
      actionLink: "#festival",
      icon: (
        <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0D2136" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 14v4M8 21h8"/>
        </svg>
      )
    }
  ];

  return (
    <section id="programmes" className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
          Three ways to spark innovation
        </h2>
        <p className="mt-3.5 text-lg text-mut max-w-[520px]">
          Programmes designed for curiosity, creativity and real-world skills.
        </p>

        {/* 3 Column Grid with Neo-brutalist Borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 mt-12 bg-white border-3 border-navy rounded-[20px] shadow-brutal-lg overflow-hidden">
          {items.map((item, index) => (
            <article
              key={item.id || index}
              className={`p-8 sm:p-[34px_30px_30px] flex flex-col ${
                index !== 0 ? 'border-t-3 md:border-t-0 md:border-l-3 border-navy' : ''
              }`}
            >
              <div className={`w-16 h-16 rounded-2xl grid place-items-center mb-[22px] border-3 border-navy ${item.iconBg || 'bg-teal'}`}>
                {item.icon}
              </div>
              <h3 className="text-[27px] font-bold mb-3 text-navy">{item.title}</h3>
              <p className="text-mut flex-1 leading-relaxed text-[15.5px]">{item.description}</p>
              <div className="font-bold text-sm my-4 text-teal-dark">{item.tag}</div>
              <a
                href={item.actionLink}
                className="font-extrabold underline decoration-gold decoration-[3px] underline-offset-[5px] text-navy hover:text-teal-dark transition-colors"
              >
                {item.actionText}
              </a>
            </article>
          ))}
        </div>

        <p className="mt-8 text-[17px] text-navy">
          Not sure which programme fits your school?{' '}
          <a href="#contact" className="font-extrabold text-teal-dark underline decoration-2">
            Talk to our team
          </a>{' '}
          and we’ll help you choose.
        </p>
      </div>
    </section>
  );
}
