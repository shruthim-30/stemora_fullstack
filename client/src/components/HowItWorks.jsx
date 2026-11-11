import React from 'react';

export default function HowItWorks() {
  const steps = [
    { step: 1, title: "Connect", desc: "Share your school’s goals" },
    { step: 2, title: "Customise", desc: "Choose the right programme" },
    { step: 3, title: "Create", desc: "Students build and explore" },
    { step: 4, title: "Celebrate", desc: "Showcase student projects" }
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-12 lg:gap-16">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
            How it works
          </h2>
          <p className="mt-3.5 text-lg text-mut max-w-[520px]">
            Four steps from first conversation to showcase day.
          </p>
        </div>

        {/* Vertical Timeline */}
        <ol className="border-l-4 border-navy ml-5 pl-0">
          {steps.map((item, index) => (
            <li
              key={item.step}
              className={`relative pl-11 ${index === steps.length - 1 ? 'pb-0' : 'pb-9'}`}
            >
              <i className="absolute -left-[24px] -top-1 w-11 h-11 rounded-full bg-gold border-3 border-navy grid place-items-center not-italic font-extrabold text-navy text-lg shadow-sm">
                {item.step}
              </i>
              <h3 className="text-[26px] font-bold text-navy">{item.title}</h3>
              <p className="text-mut text-[16px] mt-1">{item.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
