import { useState, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const Hero = () => {
  const stats = [
    { title: "Projects", value: "24+" },
    { title: "Experience", value: "5 years" },
    { title: "Technologies", value: "12+" },
  ];

  const socialLinks = [
    {
      id: 1,
      icon: <FiGithub size={16} />,
      url: "https://github.com/iamrainonline",
      label: "GitHub",
    },
    {
      id: 2,
      icon: <FiLinkedin size={16} />,
      url: "https://www.linkedin.com/in/cristian-candidatu/",
      label: "LinkedIn",
    },
    {
      id: 3,
      icon: <FiMail size={16} />,
      url: "mailto:cristiancandidatu@Hotmail.com",
      label: "Email",
    },
  ];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [windowWidth, setWindowWidth] = useState(0);
  const [hoveredSocial, setHoveredSocial] = useState(null);
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

  // Handle hover for social icons
  const handleSocialHover = (socialId) => {
    setHoveredSocial(socialId);
  };

  // Determine if we're on mobile or desktop
  const isMobile = windowWidth < 768;

  return (
    <div
      ref={heroRef}
      className="relative bg-black min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Fixed Social Media Links - desktop only */}
      <div className="fixed left-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group"
            onMouseEnter={() => handleSocialHover(link.id)}
            onMouseLeave={() => handleSocialHover(null)}
          >
            <div
              className={`p-2 rounded-full flex items-center justify-center transition-all duration-300 ${
                hoveredSocial === link.id
                  ? "bg-green-400 text-black"
                  : "bg-gray-800/70 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {link.icon}
            </div>
            <div
              className={`absolute left-10 whitespace-nowrap bg-gray-800 text-white text-xs px-2 py-1 rounded-md transition-all duration-300 ${
                hoveredSocial === link.id
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-2 pointer-events-none"
              }`}
            >
              {link.label}
            </div>
          </a>
        ))}
        <div className="h-14 w-px bg-green-400/30 mt-2"></div>
      </div>

      {/* Dark grid background - always visible in the section */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:18px_18px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {/* Reduce number of vertical lines on mobile for performance */}
          {[...Array(isMobile ? 4 : 10)].map((_, i) => (
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

      {/* Green glow effects - smaller */}
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobile
            ? "top-1/4 left-1/2 -translate-x-1/2 w-32 h-32"
            : "top-1/3 left-1/4 w-64 h-64"
        }`}
      ></div>
      <div
        className={`absolute bg-green-400 opacity-5 blur-3xl rounded-full ${
          isMobile
            ? "bottom-1/4 left-1/2 -translate-x-1/2 w-24 h-24"
            : "bottom-1/4 right-1/4 w-48 h-48"
        }`}
      ></div>

      {/* Main Content - 30% smaller */}
      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full px-3 md:px-4">
        <div className="container max-w-5xl mx-auto flex flex-col items-center justify-center">
          {/* Hero Card - 30% smaller */}
          <div
            className={`
            relative bg-gray-900/80 backdrop-blur-md rounded-lg border border-gray-800 shadow-2xl overflow-hidden
            w-full ${isMobile ? "max-w-md my-8" : "max-w-5xl my-auto"}
          `}
          >
            {/* Decorative corner effects - smaller */}
            <div className="absolute top-0 left-0 w-8 sm:w-16 h-8 sm:h-16 border-t-2 border-l-2 border-green-400/30"></div>
            <div className="absolute bottom-0 right-0 w-8 sm:w-16 h-8 sm:h-16 border-b-2 border-r-2 border-green-400/30"></div>
            <div className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 w-3/5 h-14 bg-green-400 opacity-10 blur-3xl rounded-full"></div>

            {/* Grid different on mobile vs desktop */}
            <div
              className={`${
                isMobile
                  ? "grid grid-cols-1 gap-0"
                  : "grid grid-cols-1 lg:grid-cols-2 gap-0"
              }`}
            >
              {/* Left Content - 30% smaller */}
              <div
                className={`${
                  isMobile ? "p-4" : "p-6 sm:p-7 lg:p-10"
                } flex flex-col justify-center`}
              >
                <div className="mb-2 sm:mb-3 text-green-400 font-mono text-xs tracking-wider">
                  Software Developer
                </div>

                {/* Name */}
                <div
                  className={`${isMobile ? "scale-90 -ml-2" : ""} origin-left`}
                >
                  <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                    Cristian Candidatu
                  </h1>
                </div>

                <p
                  className={`${
                    isMobile ? "text-sm mt-1" : "text-base mt-2"
                  } text-gray-300 max-w-lg mb-4 sm:mb-7 leading-relaxed`}
                >
                  Software Developer passionate about fast, modern, and scalable
                  interfaces, specialized in React and interactive digital
                  experiences.
                </p>

                {/* Buttons - smaller */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-7">
                  <a
                    href="#contact"
                    className={`
                      border border-green-400/40 text-green-400 font-medium rounded-md 
                      hover:bg-green-400/10 transition-all duration-300
                      ${isMobile ? "px-3 py-1.5 text-xs" : "px-6 py-3 text-sm"}
                    `}
                  >
                    Let's work together
                  </a>
                </div>

                {/* Digital signature/code - smaller */}
                <div className="font-mono text-xs text-gray-500 mt-auto hidden md:block">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code className="text-xs">
                      const developer = new Developer('Cristian Candidatu');
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code className="text-xs">
                      developer.createAwesomeExperiences();
                    </code>
                  </div>
                </div>
              </div>

              {/* Right Content - 30% smaller */}
              <div
                className={`relative ${
                  isMobile ? "p-4 pt-0" : "p-6 sm:p-7 lg:p-10"
                } bg-gray-950/50 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col`}
              >
                {/* Top section - smaller */}
                <div className={`${isMobile ? "mb-4" : "mb-6 sm:mb-7"}`}>
                  <h2
                    className={`font-mono text-green-400 text-xs uppercase ${
                      isMobile ? "mb-3" : "mb-4 sm:mb-5"
                    } tracking-widest`}
                  >
                    Experience & Skills
                  </h2>

                  {/* Tech banner - smaller */}
                  <div
                    className={`relative overflow-hidden bg-gray-800/80 rounded-lg ${
                      isMobile ? "p-3" : "p-4 sm:p-5"
                    } ${isMobile ? "mb-4" : "mb-6"} border border-gray-700`}
                  >
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-24 sm:w-32 h-24 sm:h-32 bg-green-400/10 rounded-full blur-2xl"></div>

                    <div
                      className={`${
                        isMobile ? "text-2xl" : "text-3xl sm:text-4xl"
                      } font-bold text-white mb-1`}
                    >
                      5+
                    </div>
                    <div
                      className={`text-xs text-gray-300 uppercase tracking-wider`}
                    >
                      Years Experience
                    </div>

                    <div
                      className={`${
                        isMobile ? "mt-3" : "mt-4"
                      } flex flex-wrap gap-1.5`}
                    >
                      {[
                        "React",
                        "JavaScript",
                        "TypeScript",
                        ...(isMobile ? [] : ["Tailwind", "Node.js"]),
                      ].map((tech, i) => (
                        <span
                          key={i}
                          className={`${
                            isMobile
                              ? "px-2 py-0.5 text-xs"
                              : "px-3 py-1 text-xs"
                          } rounded-full bg-gray-700/80 text-green-400 border border-gray-600`}
                        >
                          {tech}
                        </span>
                      ))}
                      {/* "More" indicator on mobile */}
                      {isMobile && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-gray-700/80 text-gray-400 border border-gray-600">
                          +2
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Stats Grid - smaller */}
                <div className="grid grid-cols-3 gap-1.5 sm:gap-3">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className={`relative overflow-hidden bg-gray-800/80 rounded-lg ${
                        isMobile ? "p-2" : "p-3 sm:p-4"
                      } border border-gray-700 group hover:border-green-400/30 transition-colors duration-300`}
                    >
                      <div className="absolute top-0 right-0 w-12 h-12 bg-green-400/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <p
                        className={`${
                          isMobile ? "text-lg" : "text-xl sm:text-2xl"
                        } font-bold text-green-400 mb-0.5`}
                      >
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-300 uppercase tracking-wider">
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom section - smaller */}
                <div className="mt-auto pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                  <div>
                    <div
                      className={`inline-flex items-center ${
                        isMobile ? "px-2 py-1" : "px-3 py-1"
                      } rounded-full bg-green-400/10 border border-green-400/30`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                      <span
                        className={`${
                          isMobile ? "text-xs" : "text-xs"
                        } text-green-400`}
                      >
                        {isMobile ? "Available" : "Available for projects"}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`font-mono ${
                      isMobile ? "text-xs" : "text-sm"
                    } text-gray-400`}
                  >
                    <span className="text-green-400">01</span>
                    <span className="mx-1">/</span>
                    <span>04</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social media for mobile only - smaller */}
        {isMobile && (
          <div className="w-full flex justify-center space-x-4 py-4 z-20">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors p-1.5"
              >
                {link.icon}
              </a>
            ))}
          </div>
        )}

        {/* Scroll indicator animation - smaller */}
        <div className="mt-6 flex flex-col items-center mb-4 z-20">
          <div className="text-gray-400 text-xs font-mono mb-1.5 opacity-70">
            SCROLL
          </div>
          <div className="w-5 h-8 border-2 border-gray-400 rounded-full flex justify-center opacity-70">
            <div className="scroll-dot w-1 h-1 bg-green-400 rounded-full mt-1.5 animate-scrollDown"></div>
          </div>
        </div>
      </div>

      {/* Styles - adjusted for smaller size */}
      <style jsx global>{`
        /* Animation for scroll indicator */
        @keyframes scrollDown {
          0% {
            transform: translateY(0);
            opacity: 0.8;
          }
          50% {
            transform: translateY(18px);
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 0.8;
          }
        }

        .animate-scrollDown {
          animation: scrollDown 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Hero;
