import { useState, useEffect, useRef } from "react";
import {
  FiCalendar,
  FiCode,
  FiChevronRight,
  FiChevronLeft,
  FiAward,
} from "react-icons/fi";

// Date pentru experiențe
const experiences = [
  {
    title: "Plant An App",
    date: "2019 - 2020",
    info: "PlantAnApp.com - A low-code, cloud-based platform for rapid web apps.",
    skills: ["React", "Redux", "Performance", "SPA"],
    company: "Frontend Developer",
    achievements: [
      "Built web applications using the PlantAnApp platform, customizing functionality with JavaScript, C#, and CSS.",
      "Designed and structured relational databases (T-SQL) for client applications,performing database architecture and planning based on specific business requirements.",
    ],
  },
  {
    title: "i-Tom Solutions",
    date: "2022 - 2023",
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
    date: "2023 - 2025",
    info: "Zamolx.ro | Zamolxis.org - Web development & Cybersecurity services",
    skills: ["React", "Tailwind CSS", "JavaScript", "PHP", "React Native"],
    company: "Frontend Developer",
    achievements: [
      "Built training.simulatedsecurity.com, a web application for interactive cybersecurity training.",
      "Worked on a real-time personal security app in React Native, PHP and MySQL allowing users to request emergency assistance via an SOS button.",
    ],
  },
];

const Experience = () => {
  // State
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [hasExited, setHasExited] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  // Refs
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

  // Detectăm lățimea ferestrei pentru comportament responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize(); // Set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Funcția pentru scroll handling
  useEffect(() => {
    if (isMobileView) return; // Nu activăm efectul pe mobil

    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      // Determină dacă suntem în secțiunea Experience
      const isInExperienceSection =
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight - viewportHeight;

      // Determină dacă am trecut de secțiunea Experience
      const isPastExperienceSection =
        scrollPosition >= sectionTop + sectionHeight - viewportHeight;

      // Actualizează stările în funcție de poziția scroll-ului
      setIsFixed(isInExperienceSection);
      setHasExited(isPastExperienceSection);

      // Calculează progresul în cadrul secțiunii
      if (isInExperienceSection || isPastExperienceSection) {
        const scrollableHeight = sectionHeight - viewportHeight;
        const scrolledWithinSection = scrollPosition - sectionTop;
        const progressPercentage = Math.min(
          100,
          (scrolledWithinSection / scrollableHeight) * 100
        );

        setScrollProgress(progressPercentage);

        // Calculează indexul experienței curente
        const segmentSize = 100 / experiences.length;
        const newIndex = Math.min(
          Math.floor(progressPercentage / segmentSize),
          experiences.length - 1
        );

        if (newIndex !== currentIndex) {
          changeExperience(newIndex);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Inițial pentru a seta starea corect

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex, isMobileView]);

  // Funcție pentru animarea conținutului când se schimbă experiența
  const changeExperience = (index) => {
    if (index >= 0 && index < experiences.length && index !== currentIndex) {
      setCurrentIndex(index);
      setIsAnimating(true);
      setShowSkills(false);

      // Resetăm animația după un delay
      setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => setShowSkills(true), 300);
      }, 500);
    }
  };

  // Funcții de navigare pentru mobil
  const goToPrevious = () =>
    currentIndex > 0 && changeExperience(currentIndex - 1);
  const goToNext = () =>
    currentIndex < experiences.length - 1 && changeExperience(currentIndex + 1);

  // Helper pentru a calcula progresul în secțiunea curentă
  const getProgressInSection = () => {
    const segmentSize = 100 / experiences.length;
    const sectionStart = currentIndex * segmentSize;
    const progressInSection =
      ((scrollProgress - sectionStart) / segmentSize) * 100;
    return Math.min(100, Math.max(0, progressInSection));
  };

  // Helper pentru a extrage anii din string-ul de dată
  const getYearFromDate = (dateStr, position) => {
    const years = dateStr.split(" - ");
    return years[position];
  };

  // Calculăm înălțimea secțiunii
  const sectionHeight = isMobileView
    ? "auto"
    : `${experiences.length * 100 + 100}vh`;

  return (
    <div
      ref={sectionRef}
      className="relative bg-black py-16 md:py-24 w-full overflow-hidden"
      style={{ height: sectionHeight }}
    >
      {/* Background static */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(isMobileView ? 6 : 10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Green glow effects */}
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobileView
            ? "top-1/4 left-1/2 transform -translate-x-1/2 w-64 h-64"
            : "top-1/3 left-1/4 w-96 h-96"
        }`}
      ></div>
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobileView
            ? "bottom-1/4 left-1/2 transform -translate-x-1/2 w-48 h-48"
            : "bottom-1/4 right-1/4 w-64 h-64"
        }`}
      ></div>

      {/* Timeline navigation */}
      {!isMobileView && (
        <div
          className={`
          ${
            isFixed
              ? "fixed top-1/2 -translate-y-1/2"
              : hasExited
              ? "absolute bottom-1/2 translate-y-1/2"
              : "absolute top-1/2 -translate-y-1/2"
          }
          right-8 z-40 hidden md:block
        `}
        >
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-64 w-px bg-gray-700 rounded-full"></div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-green-400 rounded-full transition-all duration-300"></div>

            {experiences.map((exp, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;

              return (
                <div
                  key={index}
                  className="relative mb-16"
                  style={{ marginTop: index === 0 ? "0" : "" }}
                >
                  <div
                    className="group flex items-center cursor-pointer"
                    onClick={() => {
                      const sectionTop = sectionRef.current?.offsetTop || 0;
                      const scrollableHeight =
                        sectionRef.current?.offsetHeight - window.innerHeight ||
                        0;
                      const segmentHeight =
                        scrollableHeight / experiences.length;
                      const targetScroll = sectionTop + index * segmentHeight;

                      window.scrollTo({
                        top: targetScroll,
                        behavior: "smooth",
                      });
                    }}
                  >
                    <div
                      className={`absolute right-full mr-4 py-2 px-4 rounded-md 
                      ${
                        isActive
                          ? "bg-gray-900/90 text-green-400 shadow-lg border border-green-400/30"
                          : "bg-gray-900/70 text-gray-400 shadow opacity-0 group-hover:opacity-100 border border-gray-800"
                      } backdrop-blur-sm transition-all duration-500 min-w-[120px] text-right`}
                    >
                      <p className="text-center font-medium">{exp.title}</p>
                      <p className="text-center text-xs opacity-75">
                        {exp.date}
                      </p>
                    </div>

                    {/* Year marker */}
                    <div
                      className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border
                      ${
                        isActive
                          ? "bg-green-400/20 border-green-400"
                          : isPast
                          ? "bg-gray-800/50 border-gray-700"
                          : "bg-gray-900/30 border-gray-800"
                      } transition-all duration-500`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isActive
                            ? "bg-green-400"
                            : isPast
                            ? "bg-gray-500"
                            : "bg-gray-700"
                        }`}
                      ></span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Experience content */}
      <div
        ref={contentRef}
        className={`
          ${
            !isMobileView
              ? isFixed
                ? "fixed top-0"
                : hasExited
                ? "absolute bottom-0"
                : "absolute top-0"
              : ""
          } 
          left-0 w-full ${!isMobileView ? "h-screen" : ""} 
          flex items-center justify-center overflow-hidden
        `}
      >
        <div className="container max-w-7xl mx-auto px-6 md:px-8 relative">
          {/* Section Header */}
          <div className="mb-12 md:mb-16 text-center relative">
            <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl md:text-9xl font-bold text-white opacity-5">
              EXPERIENCE
            </div>
            <div className="font-mono text-green-400 text-sm uppercase mb-2 tracking-widest">
              Professional Path
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Professional <span className="text-green-400">Experience</span>
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base">
              My professional journey in web development, from the first steps
              to complex projects and advanced performance optimization.
            </p>
          </div>

          {/* Mobile navigation dots */}
          {isMobileView && (
            <div className="mb-8 flex justify-center">
              <div className="inline-flex items-center bg-gray-900/70 backdrop-blur-sm border border-gray-800 rounded-full px-5 py-2.5 shadow-lg">
                {experiences.map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-3 h-3 mx-2 rounded-full cursor-pointer transition-all duration-300 ${
                      idx === currentIndex
                        ? "bg-green-400 scale-125"
                        : "bg-gray-600"
                    }`}
                    onClick={() => changeExperience(idx)}
                  ></div>
                ))}
              </div>
            </div>
          )}

          {/* Two-column layout with cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* Left Column - Content card */}
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl p-6 md:p-8">
              {/* Company badge & date */}
              <div className="mb-5 flex items-center justify-center md:justify-start">
                <span className="inline-flex items-center py-1.5 px-4 rounded-md text-sm font-medium bg-green-400/10 text-green-400 border border-green-400/30">
                  {experiences[currentIndex].company}
                </span>
                <span className="ml-3 flex items-center text-gray-300 text-sm">
                  <FiCalendar className="mr-1 text-green-400" />
                  {experiences[currentIndex].date}
                </span>
              </div>

              {/* Title */}
              <div
                ref={titleRef}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "translateY(20px)" : "translateY(0)",
                }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-5 text-white text-center md:text-left">
                  {experiences[currentIndex].title}
                </h1>
              </div>

              {/* Info & Skills */}
              <div
                ref={infoRef}
                className="transition-all duration-500 ease-out"
                style={{
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating ? "translateY(20px)" : "translateY(0)",
                }}
              >
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:text-base text-center md:text-left">
                  {experiences[currentIndex].info}
                </p>

                {/* Achievements */}
                <div className="mb-5 bg-gray-950/50 backdrop-blur-sm border border-gray-800 rounded-lg p-4 shadow-lg">
                  <h3 className="text-xs uppercase mb-3 flex items-center text-green-400 font-semibold">
                    <FiAward className="mr-2" /> Achievements
                  </h3>
                  <ul className="space-y-2">
                    {experiences[currentIndex].achievements.map(
                      (achievement, idx) => (
                        <li
                          key={idx}
                          className="flex items-start mb-1 text-xs md:text-sm text-gray-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 mr-2.5 flex-shrink-0 bg-green-400"></div>
                          {achievement}
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Skills */}
                <div className="mb-5">
                  <h3 className="text-xs uppercase mb-3 flex items-center justify-center md:justify-start text-green-400 font-semibold">
                    <FiCode className="mr-2" /> Tehnologies
                  </h3>
                  <div
                    className={`flex flex-wrap gap-2 justify-center md:justify-start transition-opacity duration-300 ${
                      showSkills ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {experiences[currentIndex].skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800/70 text-green-400 rounded-md text-xs font-medium border border-gray-700/50 backdrop-blur-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-green-400/20"></div>
              </div>
            </div>

            {/* Right Column - Progress card */}
            <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-xl p-6 md:p-8 flex flex-col items-center justify-center">
              {/* Years */}
              <div className="mb-6 md:mb-8">
                <div className="text-gray-400 mb-2 text-xs text-center">
                  Date
                </div>
                <div className="flex items-center justify-center space-x-3 md:space-x-4">
                  <span
                    className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                      isAnimating ? "text-green-400 scale-125" : "text-white"
                    }`}
                  >
                    {getYearFromDate(experiences[currentIndex].date, 0)}
                  </span>
                  <span className="text-2xl md:text-3xl text-gray-500">—</span>
                  <span
                    className={`text-2xl md:text-3xl font-bold transition-all duration-500 ${
                      isAnimating ? "text-green-400 scale-125" : "text-white"
                    }`}
                  >
                    {getYearFromDate(experiences[currentIndex].date, 1)}
                  </span>
                </div>
              </div>

              {/* Fixed Progress circle - SVG-ul nu se mai rotește */}
              <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-lg p-5 w-full max-w-xs shadow-lg mb-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-24 md:w-28 h-24 md:h-28 mb-3">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      {/* Background pattern */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="#1a202c"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        fill="none"
                        stroke="rgba(74, 222, 128, 0.2)"
                        strokeWidth="1"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="#2d374810"
                        strokeWidth="6"
                      />

                      {/* Progress circle */}

                      {/* Dots around circle */}
                      {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2 - Math.PI / 2; // Adjusted starting angle
                        const x = 50 + Math.cos(angle) * 38;
                        const y = 50 + Math.sin(angle) * 38;
                        const inProgress =
                          (i / 12) * 100 <= getProgressInSection();
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy={y}
                            r="1.5"
                            fill={inProgress ? "#4ade80" : "#4b5563"}
                            opacity={inProgress ? "1" : "0.3"}
                          />
                        );
                      })}
                      {/* Shine effect */}
                      <defs>
                        <linearGradient
                          id="progressGlare"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop
                            offset="0%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                          />
                          <stop
                            offset="50%"
                            stopColor="#ffffff"
                            stopOpacity="0.5"
                          />
                          <stop
                            offset="100%"
                            stopColor="#ffffff"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <circle
                        cx="50"
                        cy="50"
                        r="38"
                        fill="none"
                        stroke="url(#progressGlare)"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeDasharray="238.76"
                        strokeDashoffset={
                          238.76 - (238.76 * getProgressInSection()) / 100
                        }
                        transform="rotate(-90 50 50)"
                        opacity="0.6"
                        style={{
                          transition: "stroke-dashoffset 0.5s ease-out",
                        }}
                      />
                    </svg>

                    {/* Progress percentage */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-center">
                        <div className="text-xl md:text-2xl font-bold text-green-400">
                          {Math.round(getProgressInSection())}%
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          progres
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Page indicator */}
                  <div className="mt-2 font-mono text-xs text-gray-500">
                    <span className="text-green-400">
                      {String(currentIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="mx-1">/</span>
                    <span>{String(experiences.length).padStart(2, "0")}</span>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-[pulse_2s_ease-in-out_infinite]"></span>
                <span className="text-xs text-green-400">
                  {currentIndex === experiences.length - 1
                    ? "Current Position"
                    : "Previous Experience"}
                </span>
              </div>

              {/* Mobile navigation buttons */}
              {isMobileView && (
                <div className="flex justify-center gap-4 mt-5">
                  <button
                    onClick={goToPrevious}
                    disabled={currentIndex === 0}
                    className={`w-10 h-10 flex items-center justify-center rounded-full 
                      ${
                        currentIndex === 0
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                          : "bg-gray-800 text-white hover:bg-gray-700"
                      } transition-colors shadow-lg`}
                  >
                    <FiChevronLeft size={20} />
                  </button>
                  <button
                    onClick={goToNext}
                    disabled={currentIndex === experiences.length - 1}
                    className={`w-10 h-10 flex items-center justify-center rounded-full 
                      ${
                        currentIndex === experiences.length - 1
                          ? "bg-gray-800 text-gray-600 cursor-not-allowed"
                          : "bg-green-500 text-black hover:bg-green-400"
                      } transition-colors shadow-lg`}
                  >
                    <FiChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Terminal text - ELIMINAT */}

      {/* Section Number */}
      <div
        className={`
          ${!isMobileView && isFixed ? "fixed" : "absolute"} 
          bottom-4 md:bottom-10 right-4 md:right-10 font-mono text-sm text-gray-500
        `}
      >
        <span className="text-green-400">02</span>
        <span className="mx-1">/</span>
        <span>04</span>
      </div>

      {/* CSS Animation Keyframes */}
      <style jsx>{`
        /* Eliminat keyframes pentru terminal-scroll */
      `}</style>
    </div>
  );
};

export default Experience;
