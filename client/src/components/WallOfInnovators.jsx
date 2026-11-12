import React from 'react';
import PhotoPlaceholder from './PhotoPlaceholder';

export default function WallOfInnovators({ innovators, onPhotoUpdate, editable = false }) {
  const list = innovators && innovators.length > 0 ? innovators : [
    {
      id: 1,
      badge: "Innovator of the Month",
      name: "Aarav Sharma",
      project: "Built an Obstacle-Avoiding Smart Rover using ultrasonic sensors and Arduino.",
      grade_school: "Grade 7 · National Public School, Bangalore",
      photo_url: ""
    },
    {
      id: 2,
      badge: "Top Builder",
      name: "Diya Rajesh",
      project: "Designed a working robotic arm that sorts colored objects using micro-servos.",
      grade_school: "Grade 6 · Delhi Public School, Bangalore",
      photo_url: ""
    },
    {
      id: 3,
      badge: "Creative Thinker",
      name: "Rohan Verma",
      project: "Invented an automated classroom plant-watering system with soil moisture sensors.",
      grade_school: "Grade 8 · Greenwood High, Bangalore",
      photo_url: ""
    },
    {
      id: 4,
      badge: "Circuit Star",
      name: "Ananya Kulkarni",
      project: "Mastered integrated circuits and built a light-tracking solar panel prototype.",
      grade_school: "Grade 5 · Bethany High School, Bangalore",
      photo_url: ""
    },
    {
      id: 5,
      badge: "Team Leader",
      name: "Kavya & Kabir",
      project: "Led the student team that won 1st Place in the Bangalore Inter-School Roborace.",
      grade_school: "Grade 8 · The Valley School, Bangalore",
      photo_url: ""
    },
    {
      id: 6,
      badge: "Rising Coder",
      name: "Siddharth Menon",
      project: "Programmed an AI gesture-controlled LED matrix board in just 4 sessions.",
      grade_school: "Grade 4 · Inventure Academy, Bangalore",
      photo_url: ""
    }
  ];

  return (
    <section id="wall" className="py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 text-center">
        <div className="font-extrabold text-teal-dark text-sm tracking-[0.08em] uppercase mb-2.5">
          Wall of Innovators
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] text-navy">
          Innovators of the Month
        </h2>
        <p className="mt-3.5 text-lg text-mut max-w-[520px] mx-auto">
          Celebrating six students who built, tested and inspired this month.
        </p>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-11 text-left">
          {list.map((student) => (
            <article
              key={student.id}
              className="bg-white border-3 border-navy rounded-[20px] overflow-hidden shadow-brutal relative flex flex-col transition-transform hover:-translate-y-1"
            >
              <span className="absolute top-3 left-3 z-10 bg-gold border-2.5 border-navy rounded-full py-0.5 px-3 font-extrabold text-xs text-navy shadow-sm">
                {student.badge || "Innovator"}
              </span>

              <PhotoPlaceholder
                label={`Photo of ${student.name}`}
                initialImage={student.photo_url}
                editable={editable}
                minHeight="190px"
                className="!border-0 !border-b-3 !border-navy !rounded-none !shadow-none"
                onImageChange={(newUrl) => {
                  if (onPhotoUpdate) onPhotoUpdate(student.id, newUrl);
                }}
              />

              <div className="p-5 pb-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[21px] font-bold text-navy leading-snug">
                    {student.name}
                  </h3>
                  <p className="text-mut text-[15px] mt-1.5 leading-relaxed">
                    {student.project}
                  </p>
                </div>
                <div className="text-[13px] font-bold text-teal-dark mt-3 pt-2 border-t border-grid">
                  {student.grade_school}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
