import React from 'react';

export default function TickerTape() {
  const items = [
    { title: "Hands-on", subtitle: "Learning by building" },
    { title: "School-ready", subtitle: "Grade-wise programmes" },
    { title: "Creative", subtitle: "Real problem solving" }
  ];

  return (
    <div className="bg-navy text-white overflow-hidden border-y-3 border-navy py-5">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 flex justify-between items-center gap-5 flex-wrap">
        {items.map((item, index) => (
          <div key={index} className="flex items-center font-extrabold text-lg sm:text-[20px]">
            <span className="inline-block w-3 h-3 rounded-full bg-gold mr-3 shrink-0" />
            <span>{item.title}</span>
            <small className="font-normal text-[15px] text-[#aebfcd] ml-2.5">
              {item.subtitle}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
