import { useState, useEffect, useRef } from "react";

const experiences = [
  {
    title: "Frontend Developer",
    date: "2021 - 2022",
    info: "Am dezvoltat UI-uri responsive și am colaborat cu backend-ul pentru implementare de API-uri.",
    skills: ["React", "Tailwind CSS", "JavaScript", "RESTful API"],
    company: "Zamolxis.org",
  },
  {
    title: "UI Designer",
    date: "2020 - 2021",
    info: "Am creat wireframe-uri și prototipuri pentru aplicații mobile și web folosind Figma.",
    skills: ["Figma", "Wireframing", "UX Design", "Prototyping"],
    company: "Codezilla.ro",
  },
  {
    title: "Frontend Developer",
    date: "2019 - 2020",
    info: "Am construit componente dinamice și am optimizat performanța aplicațiilor SPA.",
    skills: ["React", "Redux", "Performance", "SPA"],
    company: "WebDev.ro",
  },
  {
    title: "Junior Developer",
    date: "2018 - 2019",
    info: "Am învățat bazele HTML, CSS și JavaScript și am lucrat la proiecte mici de tip portofoliu.",
    skills: ["HTML", "CSS", "JavaScript", "Portfolio"],
    company: "TechStart.ro",
  },
];

const Experience = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [hasExited, setHasExited] = useState(false);

  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;

      // 1. Determine if we are in the Experience section
      const isInExperienceSection =
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight - viewportHeight;

      // 2. Determine if we've scrolled past the Experience section
      const isPastExperienceSection =
        scrollPosition >= sectionTop + sectionHeight - viewportHeight;

      // Update states based on scroll position
      setIsFixed(isInExperienceSection);
      setHasExited(isPastExperienceSection);

      // Calculate progress within the section for experience switching
      if (isInExperienceSection || isPastExperienceSection) {
        // How far have we scrolled within the scrollable portion of this section
        const scrollableHeight = sectionHeight - viewportHeight;
        const scrolledWithinSection = scrollPosition - sectionTop;
        const progressPercentage = Math.min(
          100,
          (scrolledWithinSection / scrollableHeight) * 100
        );

        setScrollProgress(progressPercentage);

        // Calculate current experience index
        const segmentSize = 100 / experiences.length;
        const newIndex = Math.min(
          Math.floor(progressPercentage / segmentSize),
          experiences.length - 1
        );

        if (newIndex !== currentIndex) {
          setCurrentIndex(newIndex);
          setIsAnimating(true);
          setTimeout(() => setIsAnimating(false), 800);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run once on component mount to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentIndex]);

  const getProgressInSection = () => {
    const segmentSize = 100 / experiences.length;
    const sectionStart = currentIndex * segmentSize;
    const progressInSection =
      ((scrollProgress - sectionStart) / segmentSize) * 100;
    return Math.min(100, Math.max(0, progressInSection));
  };

  // Animation classes
  const getTitleAnimation = () =>
    isAnimating ? "-translate-y-24 opacity-0" : "translate-y-0 opacity-100";
  const getDateAnimation = () =>
    isAnimating ? "opacity-0 blur-sm" : "opacity-100";
  const getInfoAnimation = () =>
    isAnimating ? "translate-y-24 opacity-0" : "translate-y-0 opacity-100";

  // Helper to extract years from date format
  const getYearFromDate = (dateStr, position) => {
    const years = dateStr.split(" - ");
    return years[position];
  };

  // Calculate section height based on number of experiences
  // Each experience should take up 100vh in scroll height
  const sectionHeight = experiences.length * 100 + 100; // Add extra height to ensure smooth scrolling

  return (
    <div
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${sectionHeight}vh` }}
    >
      {/* Matrix-style background - always visible in the section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Timeline navigation - similar to Hero's style */}
      <div
        className={`
          ${
            isFixed
              ? "fixed top-1/2 -translate-y-1/2"
              : hasExited
              ? "absolute bottom-1/2 translate-y-1/2"
              : "absolute top-1/2 -translate-y-1/2"
          } 
          right-8 z-50 
        `}
      >
        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 h-64 w-px bg-gray-700 rounded-full"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px bg-green-400 rounded-full transition-all duration-300"></div>

          {experiences.map((exp, index) => {
            const isActive = index === currentIndex;
            const isPast = index < currentIndex;
            const timelineYear = getYearFromDate(exp.date, 0);

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
                    const segmentHeight = scrollableHeight / experiences.length;
                    const targetScroll = sectionTop + index * segmentHeight;

                    window.scrollTo({
                      top: targetScroll,
                      behavior: "smooth",
                    });
                  }}
                >
                  <div
                    className={`absolute right-full mr-4 py-2 px-4 rounded-lg 
                      ${
                        isActive
                          ? "bg-gray-900/80 text-green-400 shadow-lg border border-green-400/30"
                          : "bg-gray-900/50 text-gray-400 shadow opacity-0 group-hover:opacity-100 border border-gray-800"
                      }
                      backdrop-blur-sm transition-all duration-500 min-w-[120px] text-right`}
                  >
                    <p className="text-center font-medium">{exp.title}</p>
                    <p className="text-center text-xs opacity-75">{exp.date}</p>
                  </div>

                  {/* Year marker */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-6 h-6 rounded-full border
                      ${
                        isActive
                          ? "scale-125 bg-green-400/20 border-green-400"
                          : isPast
                          ? "bg-gray-800/50 border-gray-700"
                          : "bg-gray-900/30 border-gray-800"
                      }
                      transition-all duration-500`}
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

      {/* Experience content - fixed when in section */}
      <div
        ref={contentRef}
        className={`
          ${
            isFixed
              ? "fixed top-0"
              : hasExited
              ? "absolute bottom-0"
              : "absolute top-0"
          } 
          left-0 w-full h-screen flex items-center justify-center overflow-hidden
        `}
      >
        <div className="relative max-w-6xl w-full mx-auto px-6">
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 h-20 bg-green-400 opacity-5 blur-3xl rounded-full"></div>

          {/* Experience Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="mb-3 text-green-400 font-mono text-sm tracking-wider">
                {experiences[currentIndex].company}
              </div>

              <div
                className={`transform transition-all duration-1000 ease-out ${getTitleAnimation()}`}
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                  {experiences[currentIndex].title}
                </h1>

                <div className={`mb-8 ${getDateAnimation()}`}>
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl font-bold text-white">
                      {getYearFromDate(experiences[currentIndex].date, 0)}
                    </span>
                    <span className="text-xl text-gray-500">→</span>
                    <span className="text-2xl font-bold text-green-400">
                      {getYearFromDate(experiences[currentIndex].date, 1)}
                    </span>
                  </div>
                </div>
              </div>

              <div
                className={`transform transition-all duration-1000 ease-out ${getInfoAnimation()}`}
              >
                <p className="text-lg text-gray-300 mb-10 leading-relaxed">
                  {experiences[currentIndex].info}
                </p>

                <div className="mb-10">
                  <h3 className="text-sm uppercase tracking-wider text-gray-600 mb-4">
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {experiences[currentIndex].skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-gray-800/50 text-green-400 rounded-full text-xs font-mono border border-gray-700/50 backdrop-blur-sm transition-all duration-300 hover:bg-gray-700/50"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <button className="group px-6 py-3 bg-green-400 text-black font-medium rounded-md hover:bg-green-500 transition-all duration-300 flex items-center gap-2">
                    <span>Vezi Proiect</span>
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M14 5l7 7m0 0l-7 7m7-7H3"
                      />
                    </svg>
                  </button>
                  <button className="px-6 py-3 border border-green-400/30 text-green-400 font-medium rounded-md hover:bg-green-400/10 transition-all duration-300">
                    Mai multe detalii
                  </button>
                </div>
              </div>

              {/* Digital signature/code */}
              <div className="font-mono text-xs text-gray-500 mt-10">
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span>
                  <code>const role = '{experiences[currentIndex].title}';</code>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400">&gt;</span>
                  <code>
                    const company = '{experiences[currentIndex].company}';
                  </code>
                </div>
              </div>
            </div>

            {/* Right Column - Visualization */}
            <div className="relative flex flex-col justify-center items-center">
              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-400/30"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-400/30"></div>

              {/* Visual element for the experience timeline */}
              <div className="w-full max-w-md aspect-square relative rounded-full">
                <div className="absolute inset-0 border-4 border-gray-800/30 rounded-full"></div>
                <div
                  className="absolute inset-0 border-4 border-green-400/50 rounded-full"
                  style={{
                    clipPath: `polygon(50% 50%, 50% 0%, ${
                      50 +
                      50 *
                        Math.sin((getProgressInSection() * 2 * Math.PI) / 100)
                    }% ${
                      50 -
                      50 *
                        Math.cos((getProgressInSection() * 2 * Math.PI) / 100)
                    }%)`,
                  }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl font-bold text-green-400 mb-2">
                      {Math.round(getProgressInSection())}%
                    </div>
                    <div className="text-xl text-gray-400">progress</div>
                  </div>
                </div>
              </div>

              {/* Status indicator */}
              <div className="absolute bottom-0 left-0 flex items-center">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  <span className="text-xs text-green-400">
                    {currentIndex === experiences.length - 1
                      ? "Prezent"
                      : "Istoric"}
                  </span>
                </div>
              </div>

              {/* Page indicator */}
              <div className="absolute bottom-0 right-0 font-mono text-sm text-gray-500">
                <span className="text-green-400">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>
                <span className="mx-1">/</span>
                <span>{String(experiences.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
