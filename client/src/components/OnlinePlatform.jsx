import React from 'react';

export default function OnlinePlatform() {
  const features = [
    "Live & recorded classes",
    "Build-along projects",
    "Quizzes & badges",
    "Parent progress reports"
  ];

  const courses = [
    { title: "Robotics Basics", progress: 80 },
    { title: "Circuits & Arduino", progress: 55 },
    { title: "Coding with AI", progress: 30 }
  ];

  return (
    <section id="learn" className="bg-navy text-white py-20 lg:py-24">
      <div className="max-w-[1120px] mx-auto px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <div className="font-extrabold text-gold text-sm tracking-[0.08em] uppercase mb-2.5">
            Online learning platform
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-[-0.025em] leading-[1.08] text-white">
            Keep building, even at home.
          </h2>
          <p className="mt-4 text-lg text-[#c6d4e0] max-w-[520px] leading-relaxed">
            Stemora Online brings the classroom home with guided video lessons, build-along projects and quizzes that track every learner’s progress.
          </p>

          {/* Feature Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-7">
            {features.map((feat) => (
              <div
                key={feat}
                className="border-2.5 border-[#3b5a76] rounded-[14px] p-3.5 px-4 font-bold text-[15px] flex items-center gap-2"
              >
                <span className="text-gold font-bold">✓</span> {feat}
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-brutal btn-gold text-navy inline-block">
            Get early access
          </a>
        </div>

        {/* Interactive Dashboard Mockup Card */}
        <div className="bg-white text-navy border-3 border-gold rounded-[20px] p-6 shadow-brutal-teal">
          <h4 className="font-bold text-base mb-4 text-navy flex items-center justify-between">
            <span>My learning · Grade 6-8</span>
            <span className="text-xs bg-paper border border-grid px-2.5 py-1 rounded-full text-mut font-semibold">
              Live Tracker
            </span>
          </h4>

          {courses.map((course) => (
            <div key={course.title} className="mb-4">
              <div className="flex justify-between font-bold text-[15px] mb-1.5">
                <span>{course.title}</span>
                <span>{course.progress}%</span>
              </div>
              <div className="h-3 border-2 border-navy rounded-full overflow-hidden bg-paper">
                <div
                  className="h-full bg-teal transition-all duration-1000 ease-out"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
            </div>
          ))}

          <div className="mt-5 pt-3 border-t border-grid flex justify-between items-center font-bold text-[15px]">
            <span>Badges earned</span>
            <span className="bg-gold/20 text-navy border border-gold px-3 py-1 rounded-full text-sm">
              🏅 4 Earned
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
