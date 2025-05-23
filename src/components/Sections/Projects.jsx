import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef(null);

  // Detectăm lățimea ferestrei pentru comportament responsive
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Setăm starea inițială
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Efect pentru a urmări poziția mouse-ului (pentru efectul de hover pe grid)
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setMousePosition({ x, y });
    };

    // Adăugăm event listener doar pe desktop - economisim resurse pe mobil
    if (windowWidth > 768) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [windowWidth]);

  // Determinăm dacă suntem pe mobil sau desktop
  const isMobile = windowWidth < 768;

  // Project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description:
        "Dashboard interactiv pentru managementul produselor și analiza vânzărilor, cu focus pe UX și performanță.",
      technologies: ["React", "Redux", "Tailwind CSS", "Chart.js"],
      links: {
        live: "#",
        github: "#",
      },
      featured: true,
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Aplicație completă pentru managementul proiectelor și sarcinilor cu funcționalități de colaborare în timp real.",
      technologies: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
      links: {
        live: "#",
        github: "#",
      },
      featured: false,
    },
    {
      id: 3,
      title: "Travel Booking Platform",
      description:
        "Platformă de rezervări cu integrare de plăți și sistem de recenzii pentru diverse destinații turistice.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe API"],
      links: {
        live: "#",
        github: "#",
      },
      featured: false,
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Site de portofoliu modern cu animații fluide și interacțiuni dinamice, optimizat pentru performanță.",
      technologies: ["React", "Three.js", "GSAP", "Tailwind CSS"],
      links: {
        live: "#",
        github: "#",
      },
      featured: true,
    },
    {
      id: 5,
      title: "Weather Dashboard",
      description:
        "Dashboard pentru informații meteo în timp real cu vizualizări interactive și prognoze detaliate.",
      technologies: ["JavaScript", "Weather API", "Chart.js", "CSS3"],
      links: {
        live: "#",
        github: "#",
      },
      featured: false,
    },
    {
      id: 6,
      title: "Social Media Platform",
      description:
        "Platformă de social media cu funcționalități de mesagerie, partajare conținut și networking.",
      technologies: ["React", "Firebase", "Material UI", "Redux"],
      links: {
        live: "#",
        github: "#",
      },
      featured: false,
    },
  ];

  // Animation for project cards on mount
  useEffect(() => {
    if (projectsRef.current) {
      const projectCards =
        projectsRef.current.querySelectorAll(".project-card");

      gsap.fromTo(
        projectCards,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top bottom-=100",
          },
        }
      );
    }
  }, []);

  // Handle hover animation for project cards
  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
  };

  return (
    <div
      ref={sectionRef}
      className="relative bg-black min-h-screen w-full overflow-hidden py-24 md:py-32"
    >
      {/* Matrix-style background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(isMobile ? 6 : 10)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Reactive grid (doar pe desktop - eliminat pe mobil pentru performanță) */}
      {!isMobile && (
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none">
          {Array.from({ length: 12 * 12 }).map((_, index) => {
            const col = index % 12;
            const row = Math.floor(index / 12);

            // Calculate distance from mouse position to cell center (simplified)
            const cellWidth = 100 / 12; // percentage
            const cellHeight = 100 / 12; // percentage - acum e pătrat
            const cellCenterX = (col + 0.5) * cellWidth;
            const cellCenterY = (row + 0.5) * cellHeight;

            const mouseX =
              (mousePosition.x / (sectionRef.current?.clientWidth || 1)) * 100;
            const mouseY =
              (mousePosition.y / (sectionRef.current?.clientHeight || 1)) * 100;

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

      {/* Green glow effects */}
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

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - îmbunătățit */}
        <div className="mb-20 md:mb-24 text-center relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl md:text-9xl font-bold text-white opacity-5">
            PROJECTS
          </div>
          <div className="font-mono text-green-400 text-sm uppercase mb-2 md:mb-3 tracking-widest">
            Portfolio
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Proiecte <span className="text-green-400">Recente</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mx-auto text-sm md:text-base leading-relaxed">
            O selecție din proiectele mele recente care demonstrează abilitățile
            și pasiunea mea pentru dezvoltarea de interfețe moderne și
            funcționale.
          </p>
        </div>

        {/* Projects Grid - Folder ca element principal */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-20 md:gap-x-8 md:gap-y-24"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative"
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              {/* Folder este CARDUL */}
              <div className="relative mb-5 mx-auto">
                <div className="relative group/folder flex flex-col items-center justify-center w-full">
                  <div className="file relative w-[260px] h-[160px] cursor-pointer origin-bottom [perspective:1500px] z-50">
                    {/* Folder exterior - culoare galbenă originală */}
                    <div className="work-5 bg-amber-600 w-full h-full origin-top rounded-2xl rounded-tl-none group-hover/folder:shadow-[0_20px_40px_rgba(0,0,0,.3)] transition-all ease duration-300 relative after:absolute after:content-[''] after:bottom-[99%] after:left-0 after:w-20 after:h-4 after:bg-amber-600 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[15px] before:left-[75.5px] before:w-4 before:h-4 before:bg-amber-600 before:[clip-path:polygon(0_35%,0%_100%,50%_100%);]"></div>

                    {/* Folder straturi interioare */}
                    <div className="work-4 absolute inset-1 bg-zinc-400 rounded-2xl transition-all ease duration-300 origin-bottom select-none group-hover/folder:[transform:rotateX(-20deg)]"></div>
                    <div className="work-3 absolute inset-1 bg-zinc-300 rounded-2xl transition-all ease duration-300 origin-bottom group-hover/folder:[transform:rotateX(-30deg)]"></div>
                    <div className="work-2 absolute inset-1 bg-zinc-200 rounded-2xl transition-all ease duration-300 origin-bottom group-hover/folder:[transform:rotateX(-38deg)]"></div>

                    {/* Folder interior principal - culoare galbenă originală */}
                    <div className="work-1 absolute bottom-0 bg-gradient-to-t from-amber-500 to-amber-400 w-full h-[156px] rounded-2xl rounded-tr-none after:absolute after:content-[''] after:bottom-[99%] after:right-0 after:w-[146px] after:h-[16px] after:bg-amber-400 after:rounded-t-2xl before:absolute before:content-[''] before:-top-[10px] before:right-[142px] before:size-3 before:bg-amber-400 before:[clip-path:polygon(100%_14%,50%_100%,100%_100%);] transition-all ease duration-300 origin-bottom flex items-end group-hover/folder:shadow-[inset_0_20px_40px_#fbbf24,_inset_0_-20px_40px_#d97706] group-hover/folder:[transform:rotateX(-46deg)_translateY(1px)]">
                      {/* Featured badge */}
                      {project.featured && (
                        <div className="absolute top-4 left-4 px-2.5 py-1 bg-white/80 text-amber-800 text-xs font-semibold rounded-sm shadow-md z-20">
                          Featured
                        </div>
                      )}

                      {/* Project links */}
                      <div className="absolute top-4 right-4 flex gap-2 z-20">
                        <a
                          href={project.links.github}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/70 text-amber-800 hover:bg-white hover:text-amber-600 transition-all duration-300"
                        >
                          <FiGithub size={16} />
                        </a>
                        <a
                          href={project.links.live}
                          className="w-8 h-8 flex items-center justify-center rounded-full bg-white/70 text-amber-800 hover:bg-white hover:text-amber-600 transition-all duration-300"
                        >
                          <FiExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project info - no background */}
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 mx-auto max-w-xs">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap justify-center gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 text-xs rounded-md bg-gray-900/70 text-green-400 border border-gray-800"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2.5 py-1 text-xs rounded-md bg-gray-900/70 text-gray-300 border border-gray-800">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* View Project Button */}
                <a
                  href={project.links.live}
                  className="inline-flex items-center text-sm font-medium text-green-400 hover:text-green-300 transition-colors"
                >
                  Vezi proiectul
                  <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-900/80 backdrop-blur-sm text-white font-medium rounded-md hover:bg-green-500 hover:text-black transition-all duration-300 border border-gray-800 hover:border-green-500 shadow-lg"
          >
            Vezi toate proiectele
            <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Section Number */}
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 font-mono text-sm text-gray-500">
          <span className="text-green-400">03</span>
          <span className="mx-1">/</span>
          <span>04</span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
