import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import NameDemoCDN from "./animations/NameDemoCDN";

const Hero = () => {
  const stats = [
    { title: "Projects", value: "24+" },
    { title: "Experience", value: "5 years" },
    { title: "Technologies", value: "12+" },
  ];

  const socialLinks = [
    { icon: <FiGithub size={18} />, url: "https://github.com/iamrainonline" },
    {
      icon: <FiLinkedin size={18} />,
      url: "https://www.linkedin.com/in/cristian-candidatu/",
    },
    { icon: <FiMail size={18} />, url: "mailto:cristiancandidatu@Hotmail.com" },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(0);
  const heroRef = useRef(null);

  // Effect to track window size (for responsive design)
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Effect to track mouse position (for hover effect on grid)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;

      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    // Add event listener only on desktop - save resources on mobile
    if (windowWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowWidth]);

  // Determine if we're on mobile or desktop
  const isMobile = windowWidth < 768;

  return (
    <div
      ref={heroRef}
      className="pt-10 relative bg-black min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Dark grid background - always visible in the section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {/* Reduce number of vertical lines on mobile for performance */}
          {[...Array(isMobile ? 6 : 10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Reactive grid (desktop only - removed on mobile for performance) */}
      {!isMobile && (
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-6 pointer-events-none">
          {Array.from({ length: 12 * 6 }).map((_, index) => {
            const col = index % 12;
            const row = Math.floor(index / 12);

            // Calculate distance from mouse position to cell center (simplified)
            const cellWidth = 100 / 12; // percentage
            const cellHeight = 100 / 6; // percentage
            const cellCenterX = (col + 0.5) * cellWidth;
            const cellCenterY = (row + 0.5) * cellHeight;

            const mouseX =
              (mousePosition.x / (heroRef.current?.clientWidth || 1)) * 100;
            const mouseY =
              (mousePosition.y / (heroRef.current?.clientHeight || 1)) * 100;

            const distance = Math.sqrt(
              Math.pow(cellCenterX - mouseX, 2) +
                Math.pow(cellCenterY - mouseY, 2)
            );

            // Opacity based on distance
            const opacity = distance < 20 ? (1 - distance / 20) * 0.2 : 0;

            return (
              <div
                key={index}
                className="border border-gray-800/20"
                style={{
                  backgroundColor: `rgba(74, 222, 128, ${opacity})`,
                  transition: "background-color 0.3s ease-out",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Green glow effects - resized and positioned differently on mobile */}
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobile
            ? "top-1/4 left-1/2 -translate-x-1/2 w-64 h-64"
            : "top-1/3 left-1/4 w-96 h-96"
        }`}
      ></div>
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobile
            ? "bottom-1/4 left-1/2 -translate-x-1/2 w-48 h-48"
            : "bottom-1/4 right-1/4 w-64 h-64"
        }`}
      ></div>

      {/* Social media - left on desktop, bottom on mobile */}
      {isMobile ? (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-8">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      ) : (
        <div className="absolute left-6 md:left-10 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-5">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              className="text-gray-400 hover:text-green-400 transition-colors"
            >
              {link.icon}
            </a>
          ))}
          <div className="h-20 w-px bg-green-400/30 mt-4"></div>
        </div>
      )}

      {/* Main Content - Perfectly centered */}
      <div className="relative z-20 flex items-center justify-center min-h-screen w-full px-4 md:px-6">
        <div className="container max-w-7xl mx-auto flex items-center justify-center">
          {/* Hero Card - LARGER and perfectly centered */}
          <div
            className={`
            relative bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden
            w-full ${isMobile ? "max-w-xl" : "max-w-7xl"} my-auto
          `}
          >
            {/* Decorative corner effects */}
            <div className="absolute top-0 left-0 w-16 sm:w-24 h-16 sm:h-24 border-t-2 border-l-2 border-green-400/30"></div>
            <div className="absolute bottom-0 right-0 w-16 sm:w-24 h-16 sm:h-24 border-b-2 border-r-2 border-green-400/30"></div>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 h-20 bg-green-400 opacity-10 blur-3xl rounded-full"></div>

            {/* Grid different on mobile vs desktop */}
            <div
              className={`${
                isMobile
                  ? "grid grid-cols-1 gap-0"
                  : "grid grid-cols-1 lg:grid-cols-2 gap-0"
              }`}
            >
              {/* Left Content - Adjusted padding and spacing for mobile */}
              <div className="p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
                <div className="mb-4 text-green-400 font-mono text-sm tracking-wider">
                  FRONTEND DEVELOPER
                </div>
                <NameDemoCDN />

                <p
                  className={`${
                    isMobile ? "text-base" : "text-lg"
                  } text-gray-300 max-w-xl mb-8 sm:mb-10 leading-relaxed`}
                >
                  Frontend Developer passionate about fast, modern, and scalable
                  interfaces, specialized in React and interactive digital
                  experiences.
                </p>

                {/* Buttons - larger with more padding */}
                <div className="flex flex-wrap gap-4 sm:gap-5 mb-8 sm:mb-10">
                  <a
                    href="#portfolio"
                    className={`
                      group bg-green-500 text-black font-medium rounded-md hover:bg-green-400 
                      transition-all duration-300 flex items-center gap-2
                      ${isMobile ? "px-5 py-3 text-sm" : "px-8 py-4 text-base"}
                    `}
                  >
                    <span>View Portfolio</span>
                    <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </a>

                  <a
                    href="#contact"
                    className={`
                      border border-green-400/40 text-green-400 font-medium rounded-md 
                      hover:bg-green-400/10 transition-all duration-300
                      ${isMobile ? "px-5 py-3 text-sm" : "px-8 py-4 text-base"}
                    `}
                  >
                    Contact Me
                  </a>
                </div>

                {/* Digital signature/code - hidden on very small mobile */}
                <div className="font-mono text-xs text-gray-500 mt-auto hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code>
                      const developer = new Developer('Christian Candidate');
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code>developer.createAwesomeExperiences();</code>
                  </div>
                </div>
              </div>

              {/* Right Content - Adjusted for mobile */}
              <div className="relative p-8 sm:p-10 lg:p-14 bg-gray-950/50 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col">
                {/* Top section - adjusted for mobile */}
                <div className="mb-8 sm:mb-10">
                  <h2 className="font-mono text-green-400 text-sm uppercase mb-6 sm:mb-8 tracking-widest">
                    Experience & Skills
                  </h2>

                  {/* Tech banner - more prominent */}
                  <div className="relative overflow-hidden bg-gray-800/80 rounded-lg p-6 sm:p-7 mb-8 border border-gray-700">
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-48 h-48 bg-green-400/10 rounded-full blur-2xl"></div>

                    <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                      5+
                    </div>
                    <div className="text-sm text-gray-300 uppercase tracking-wider">
                      Years Experience
                    </div>

                    <div className="mt-5 sm:mt-6 flex flex-wrap gap-2">
                      {/* Reduced number of technologies on mobile */}
                      {[
                        "React",
                        "JavaScript",
                        "TypeScript",
                        ...(isMobile ? [] : ["Tailwind", "Node.js"]),
                      ].map((tech, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 text-xs rounded-full bg-gray-700/80 text-green-400 border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                      {/* "More" indicator on mobile */}
                      {isMobile && (
                        <span className="px-4 py-1.5 text-xs rounded-full bg-gray-700/80 text-gray-400 border border-gray-600">
                          +2
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid - 3 column grid on mobile too */}
                <div className="grid grid-cols-3 gap-3 sm:gap-5">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden bg-gray-800/80 rounded-lg p-4 sm:p-6 border border-gray-700 group hover:border-green-400/30 transition-colors duration-300"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-400/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <p className="text-2xl sm:text-3xl font-bold text-green-400 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-300 uppercase tracking-wider">
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom section - adapted for mobile */}
                <div className="mt-auto pt-8 sm:pt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                  <div>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-green-400/10 border border-green-400/30">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                      <span className="text-xs text-green-400">
                        {isMobile ? "Available" : "Available for projects"}
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-sm text-gray-400">
                    <span className="text-green-400">01</span>
                    <span className="mx-1">/</span>
                    <span>04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
