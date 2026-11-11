import React from 'react';

export default function WhyStemora({ items }) {
  const checkItems = items || [
    {
      title: "Hands-on by design",
      description: "Every concept is reinforced through building, testing and improving."
    },
    {
      title: "Age-wise curriculum",
      description: "Activities progress with students’ learning levels and abilities."
    },
    {
      title: "Real working models",
      description: "Learners see ideas come alive through functional projects."
    },
    {
      title: "Showcase opportunities",
      description: "Students present and celebrate what they create."
    }
  ];

  return (
    <section id="why" className="bg-teal border-y-3 border-navy py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        <div>
          <h2 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold tracking-[-0.025em] leading-[1.08] text-navy">
            Curiosity becomes something students can build.
          </h2>
          <p className="mt-4 text-lg text-navy max-w-[520px] leading-relaxed">
            We combine guided learning with practical experimentation so students understand concepts, build prototypes and gain confidence through doing.
          </p>
        </div>

        <ul className="grid gap-3.5">
          {checkItems.map((item, index) => (
            <li
              key={index}
              className="bg-white border-3 border-navy rounded-[14px] py-4 px-5 pl-16 relative shadow-sm"
            >
              <span className="absolute left-[18px] top-4 w-8 h-8 rounded-lg bg-gold border-2.5 border-navy grid place-items-center font-extrabold text-navy">
                ✓
              </span>
              <strong className="block text-lg sm:text-[19px] font-bold text-navy">
                {item.title}
              </strong>
              <span className="text-mut text-[15.5px] leading-snug">
                {item.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
