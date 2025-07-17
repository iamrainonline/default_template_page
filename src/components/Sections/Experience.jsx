import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiCalendar, FiChevronDown, FiChevronUp } from "react-icons/fi";

const experiences = [
  {
    title: "Codezilla.ro",
    date: "Mar 2021 - Aug 2021",
    info: "Codezilla.ro - Web development & services",
    skills: ["React", "Tailwind CSS", "JavaScript"],
    company: "Frontend Developer",
    achievements: [
      "Designed and build static frontend web pages and templates for companies of all sizes. Created resizable and reusable Ads and Banners using CSS,HTML, Photoshop, Javascript and GSAP Library",
    ],
  },
  {
    title: "Plant An App",
    date: "Aug 2021 - Now 2022",
    info: "PlantAnApp.com - A low-code, cloud-based platform for rapid web apps.",
    skills: ["React", "Redux", "Performance", "SPA"],
    company: "Fullstack Developer",
    achievements: [
      "Built web applications using the PlantAnApp platform, customizing functionality with JavaScript, C#, and CSS.",
      "Designed and structured relational databases (T-SQL) for client applications,performing database architecture and planning based on specific business requirements.",
    ],
  },
  {
    title: "i-Tom Solutions",
    date: "Nov 2022 - Sep 2023",
    info: "i-Tom Solutions - Control & Intelligence (C2I) Systems Development.",
    skills: ["Figma", "Wireframing", "UX Design", "Prototyping"],
    company: "Frontend Designer",
    achievements: [
      "Modernized the websites FGO.ro and 24edu by replacing outdated codebases with modern front-end technologies",
      "Implemented TypeScript, React, and Redux to improve code quality, maintainability, and performance across both platforms",
    ],
  },
  {
    title: "Zamolx.ro",
    date: "Nov 2023 - May 2025",
    info: "Zamolx.ro | Zamolxis.org - Web development & Cybersecurity services",
    skills: ["React", "Tailwind CSS", "JavaScript", "PHP", "React Native"],
    company: "Fullstack Developer",
    achievements: [
      "Built training.simulatedsecurity.com, a web application for interactive cybersecurity training.",
      "Worked on a real-time personal security app in React Native, PHP and MySQL allowing users to request emergency assistance via an SOS button.",
    ],
  },
];

const Experience = () => {
  const [expandedItems, setExpandedItems] = useState(new Set());
  const experienceRef = useRef(null);
  const sectionRef = useRef(null);

  const toggleExpanded = (index) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  // Animation for experience items on mount
  useEffect(() => {
    if (experienceRef.current) {
      const experienceItems =
        experienceRef.current.querySelectorAll(".experience-item");

      gsap.fromTo(
        experienceItems,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: experienceRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }
  }, []);

  return (
    <div className="relative bg-black min-h-screen w-full overflow-hidden">
      <div
        ref={sectionRef}
        className="relative bg-black min-h-screen w-full overflow-hidden py-20"
      >
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          {/* Header Section */}
          <div className="mb-20 md:mb-24 text-center relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl md:text-9xl font-bold text-white opacity-[10%]">
              EXPERIENCE
            </div>
            <div className="font-mono text-green-400 text-sm uppercase mb-2 md:mb-3 tracking-widest">
              Career
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
              Work <span className="text-green-400">Experience</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
              A timeline of my professional journey, showcasing the roles and
              technologies that have shaped my career in web development.
            </p>
          </div>

          {/* Experience Timeline */}
          <div ref={experienceRef} className="max-w-4xl mx-auto">
            <div className="space-y-8 md:space-y-12">
              {experiences.map((experience, index) => (
                <div key={index} className="experience-item group relative">
                  {/* Timeline Line */}
                  <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gray-800"></div>

                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-8 top-6 w-0.5 h-0.5 bg-green-400 rounded-full transform -translate-x-1/2 shadow-lg shadow-green-400/50"></div>

                  {/* Content */}
                  <div className="pl-8 md:pl-16">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-green-400 transition-colors">
                          {experience.title}
                        </h3>
                        <p className="text-green-400 font-medium text-sm md:text-base">
                          {experience.company}
                        </p>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-mono">
                          <FiCalendar size={14} />
                          {experience.date}
                        </div>

                        <button
                          onClick={() => toggleExpanded(index)}
                          className="text-gray-400 hover:text-green-400 transition-colors p-2 rounded-md hover:bg-gray-900/50"
                        >
                          {expandedItems.has(index) ? (
                            <FiChevronUp size={18} />
                          ) : (
                            <FiChevronDown size={18} />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Company Info */}
                    <p className="text-gray-400 text-sm md:text-base mb-4 leading-relaxed">
                      {experience.info}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {experience.skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs rounded-md bg-gray-900/70 text-green-400 border border-gray-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Achievements - Expandable */}
                    {expandedItems.has(index) && (
                      <div className="pt-4 border-t border-gray-800">
                        <h4 className="font-mono text-green-400 text-sm uppercase mb-3 tracking-widest">
                          Key Achievements
                        </h4>
                        <div className="space-y-3">
                          {experience.achievements.map((achievement, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                              <p className="text-gray-300 text-sm leading-relaxed">
                                {achievement}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Number */}
          <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 font-mono text-sm text-gray-500">
            <span className="text-green-400">02</span>
            <span className="mx-1">/</span>
            <span>04</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
