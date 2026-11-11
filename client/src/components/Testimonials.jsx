import React from 'react';

export default function Testimonials({ testimonials }) {
  const list = testimonials && testimonials.length > 0 ? testimonials : [
    {
      id: 1,
      quote: "Stemora completely transformed how our students engage with science. Watching 6th graders assemble and code their first functional robot was an incredible sight.",
      author_name: "Mrs. Radhika Iyer",
      role_school: "Principal, Greenfield International School",
      rating: 5
    },
    {
      id: 2,
      quote: "My son used to be glued to video games. After attending Stemora’s RoboCircuit workshop, he spent the entire weekend building breadboard circuits and explaining them to us!",
      author_name: "Dr. Arvind Swaminathan",
      role_school: "Parent, Indiranagar",
      rating: 5
    },
    {
      id: 3,
      quote: "The curriculum is exceptionally structured. Their instructors bring all materials, provide hands-on mentorship, and our teachers learned so much alongside the students.",
      author_name: "Mr. Anthony Fernandez",
      role_school: "STEM Department Head, St. Joseph’s Boys’ High School",
      rating: 5
    }
  ];

  return (
    <section className="bg-white border-y-3 border-navy py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8">
        <div className="text-center">
          <div className="font-extrabold text-teal-dark text-sm tracking-[0.08em] uppercase mb-2.5">
            Testimonials
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
            Loved by schools &amp; parents
          </h2>
        </div>

        {/* Testimonials 3 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-11">
          {list.map((item) => (
            <div
              key={item.id}
              className="bg-white border-3 border-navy rounded-[18px] p-6 pt-12 shadow-brutal relative flex flex-col justify-between"
            >
              {/* Giant quotation mark */}
              <span className="absolute top-1 left-5 text-[76px] font-extrabold text-gold leading-none pointer-events-none select-none">
                “
              </span>

              <div>
                <div className="text-gold tracking-[2px] font-bold text-lg mb-3">
                  {'★'.repeat(item.rating || 5)}
                </div>
                <p className="text-navy text-[15.5px] leading-relaxed relative z-10">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-grid">
                <b className="block text-navy font-bold text-base">
                  {item.author_name}
                </b>
                <small className="text-mut text-sm font-medium block">
                  {item.role_school}
                </small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
