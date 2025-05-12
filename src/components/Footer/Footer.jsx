import { useState, useEffect, useRef } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiArrowUp,
} from "react-icons/fi";

const Footer = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [scrollProgress, setScrollProgress] = useState(0);
  const footerRef = useRef(null);

  // Calculează progresul scroll-ului pentru efecte animate
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY / totalScroll;
      setScrollProgress(currentProgress * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Rulează un efect de terminal typing
  const [terminalText, setTerminalText] = useState("");
  const fullText = `[ Process completed with exit code 0 ]`;

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setTerminalText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(intervalId);
      }
    }, 60);

    return () => clearInterval(intervalId);
  }, []);

  // Funcție de scroll to top animat
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      ref={footerRef}
      className="relative bg-black py-12 w-full overflow-hidden"
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* Green line divider */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>

      {/* Progress bar (subtle) */}
      <div className="absolute top-0 left-0 h-0.5 bg-green-400/20">
        <div
          className="h-full bg-green-400"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Subtle glow effect */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-32 bg-green-400 opacity-5 blur-3xl rounded-full"></div>

      <div className="container max-w-6xl mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left - Logo/branding avec terminal effect */}
          <div className="mb-6 md:mb-0">
            <div className="font-mono text-xs text-gray-500 flex items-center">
              <span className="text-green-400 mr-2">&gt;</span>
              <span className="text-gray-300">{terminalText}</span>
              <span className="w-2 h-4 bg-green-400 animate-blink ml-1"></span>
            </div>
          </div>

          {/* Right - scroll to top and year */}
          <div className="flex items-center">
            <p className="text-sm text-gray-400 mr-8">
              <span className="text-green-400">&copy;</span> {year}{" "}
              <span className="text-white">Cristian Candidatu</span>
            </p>

            <button
              onClick={scrollToTop}
              className="group w-10 h-10 flex items-center justify-center rounded-full bg-gray-900 border border-gray-800 hover:border-green-400/30 transition-colors duration-300"
            >
              <FiArrowUp className="text-gray-400 group-hover:text-green-400 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute bottom-6 left-6 w-16 h-px bg-green-400/30"></div>
      <div className="absolute bottom-6 left-6 w-px h-16 bg-green-400/30"></div>

      <div className="absolute top-6 right-6 w-16 h-px bg-green-400/30"></div>
      <div className="absolute top-6 right-6 w-px h-16 bg-green-400/30"></div>

      {/* Section number */}
      <div className="absolute bottom-6 right-6 font-mono text-sm text-gray-500">
        <span className="text-green-400">04</span>
        <span className="mx-1">/</span>
        <span>04</span>
      </div>
    </footer>
  );
};

export default Footer;

/* CSS necesar pentru animații */
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes blink {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
  }
  
  .animate-blink {
    animation: blink 1s step-end infinite;
  }
`;
document.head.appendChild(styleSheet);
