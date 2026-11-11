
import React from 'react';

const icons = [
  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
    stroke="#0D2136" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="5" y="8" width="14" height="11" rx="3"/>
    <path d="M12 8V4M9 13h.01M15 13h.01M9 16h6"/>
  </svg>,

  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
    stroke="#0D2136" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect x="6" y="6" width="12" height="12" rx="2"/>
    <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>
  </svg>,

  <svg width="34" height="34" viewBox="0 0 24 24" fill="none"
    stroke="#0D2136" strokeWidth="2.2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v1a3 3 0 0 0 3 3M17 6h3v1a3 3 0 0 1-3 3M12 14v4M8 21h8"/>
  </svg>
];

const defaultItems = [
  {
    id: "robotics",
    title: "Robotics Course",
    description: "A structured, age-appropriate journey into robotics, sensors, motors and coding. Students assemble and program working models.",
    tag: "For schools · Grade-wise learning",
    actionText: "Learn more",
    actionLink: "#contact"
  },
  {
    id: "robocircuit",
    title: "RoboCircuit Course",
    description: "A deeper hands-on pathway from electronic circuits to microcontroller-based robotics and functional prototypes.",
    tag: "Circuits · Arduino · Robotics",
    actionText: "Learn more",
    actionLink: "#contact"
  },
  {
    id: "festival",
    title: "Robotics Festival",
    description: "A high-energy celebration of innovation with project showcases, challenges, demonstrations and student participation.",
    tag: "Showcase · Compete · Celebrate",
    actionText: "Learn more",
    actionLink: "#festival"
  }
];

const iconColors = ["#20ADA9", "#F5B323", "#FFFFFF"];

export default function Programmes({ programmes }) {
  const items = programmes?.length ? programmes : defaultItems;

  return (
    <section
      id="programmes"
      className="py-16 lg:py-20 bg-[#F7FAFB]"
    >
      <div className="w-full max-w-[1148px] mx-auto px-6 lg:px-0">

        {/* Heading */}
        <h2 className="text-[40px] sm:text-[52px] leading-[1.12] font-extrabold tracking-[-0.035em] text-[#0D2136]">
          Three ways to spark innovation
        </h2>

        <p className="mt-3.5 text-[20px] leading-[1.5] text-[#526B87] max-w-[570px]">
          Programmes designed for curiosity, creativity and real-world skills.
        </p>

        {/* Three Programme Cards */}
        <div className="
          grid grid-cols-1 md:grid-cols-3
          mt-[52px]
          w-full
          bg-white
          border-[3px] border-[#0D2136]
          rounded-[22px]
          shadow-[10px_10px_0px_#0D2136]
          overflow-hidden
        ">

          {items.slice(0, 3).map((item, index) => (

            <article
              key={item.id || index}
              className={`
                min-w-0
                h-auto md:h-[400px]
                p-[34px_32px_28px]
                flex flex-col
                ${index !== 0
                  ? 'border-t-[3px] md:border-t-0 md:border-l-[3px] border-[#0D2136]'
                  : ''}
              `}
            >

              {/* Icon */}
              <div
                className="w-[68px] h-[68px] shrink-0 rounded-[18px] grid place-items-center mb-[23px] border-[3px] border-[#0D2136]"
                style={{ backgroundColor: iconColors[index] }}
              >
                {icons[index]}
              </div>

              {/* Title */}
              <h3 className="text-[27px] leading-[1.2] font-bold mb-[10px] text-[#0D2136] tracking-[-0.025em]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-[17px] leading-[1.5] text-[#526B87] flex-1">
                {item.description}
              </p>

              {/* Tag */}
              <div className="font-extrabold text-[16px] mt-5 mb-[17px] text-[#008D89]">
                {item.tag}
              </div>

              {/* Learn More */}
              <a
                href={item.actionLink || "#contact"}
                className="w-fit font-extrabold text-[18px] text-[#0D2136] underline decoration-[#F5A623] decoration-[3px] underline-offset-[6px] hover:text-[#008D89] transition-colors"
              >
                {item.actionText || "Learn more"}
              </a>

            </article>

          ))}

        </div>

        {/* Contact Text */}
        <p className="mt-[34px] text-[20px] leading-[1.5] text-[#0D2136]">
          Not sure which programme fits your school?{" "}
          <a
            href="#contact"
            className="font-extrabold text-[#008D89] underline decoration-2 underline-offset-4"
          >
            Talk to our team
          </a>{" "}
          and we’ll help you choose.
        </p>

      </div>
    </section>
  );
}

