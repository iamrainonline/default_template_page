import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FiExternalLink, FiGithub, FiArrowRight } from "react-icons/fi";

const Projects = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [hoveredProject, setHoveredProject] = useState(null);
  const projectsRef = useRef(null);

  // Project categories
  const categories = [
    { id: "all", label: "Toate" },
    { id: "frontend", label: "Frontend" },
    { id: "fullstack", label: "Full Stack" },
    { id: "design", label: "UI/UX" },
  ];

  // Project data
  const projects = [
    {
      id: 1,
      title: "E-commerce Dashboard",
      description:
        "Dashboard interactiv pentru managementul produselor și analiza vânzărilor, cu focus pe UX și performanță.",
      image: "https://picsum.photos/600/300",
      categories: ["frontend", "design"],
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
      image: "https://picsum.photos/600/300",
      categories: ["fullstack"],
      technologies: ["Next.js", "TypeScript", "Supabase", "TailwindCSS"],
      links: {
        live: "#",
        github: "#",
      },
      featured: true,
    },
    {
      id: 3,
      title: "Travel Booking Platform",
      description:
        "Platformă de rezervări cu integrare de plăți și sistem de recenzii pentru diverse destinații turistice.",
      image: "https://picsum.photos/600/300",
      categories: ["fullstack", "design"],
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
      image: "https://picsum.photos/600/300",
      categories: ["frontend", "design"],
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
      image: "https://picsum.photos/600/300",
      categories: ["frontend"],
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
      image: "https://picsum.photos/600/300",
      categories: ["fullstack"],
      technologies: ["React", "Firebase", "Material UI", "Redux"],
      links: {
        live: "#",
        github: "#",
      },
      featured: false,
    },
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeTab === "all"
      ? projects
      : projects.filter((project) => project.categories.includes(activeTab));

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
  }, [activeTab]);

  // Handle hover animation for project cards
  const handleProjectHover = (projectId) => {
    setHoveredProject(projectId);
  };

  return (
    <div className="relative bg-black py-24">
      {/* Matrix-style background */}
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

      {/* Green glow effect */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-400 opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-400 opacity-5 blur-3xl rounded-full"></div>

      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-16 text-center relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-9xl font-bold text-white opacity-5">
            PROJECTS
          </div>
          <div className="font-mono text-green-400 text-sm uppercase mb-3 tracking-widest">
            Portfolio
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proiecte <span className="text-green-400">Recente</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            O selecție din proiectele mele recente care demonstrează abilitățile
            și pasiunea mea pentru dezvoltarea de interfețe moderne și
            funcționale.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`px-5 py-2 rounded-md transition-all duration-300 text-sm font-medium ${
                activeTab === category.id
                  ? "bg-green-400 text-black"
                  : "border border-green-400/30 text-green-400 hover:bg-green-400/10"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative bg-gray-900/80 backdrop-blur-sm rounded-xl border border-gray-800 overflow-hidden hover:border-green-400/30 transition-all duration-300"
              onMouseEnter={() => handleProjectHover(project.id)}
              onMouseLeave={() => handleProjectHover(null)}
            >
              {/* Featured badge */}
              {project.featured && (
                <div className="absolute top-4 left-4 z-20 px-2 py-1 bg-green-400 text-black text-xs font-medium rounded">
                  Featured
                </div>
              )}

              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black/30 z-10"></div>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay with links */}
                <div className="absolute inset-0 bg-green-400/0 group-hover:bg-green-400/20 z-10 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="flex gap-4">
                    <a
                      href={project.links.github}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/80 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      <FiGithub size={18} />
                    </a>
                    <a
                      href={project.links.live}
                      className="w-10 h-10 flex items-center justify-center rounded-full bg-black/80 text-green-400 hover:bg-green-400 hover:text-black transition-all duration-300"
                    >
                      <FiExternalLink size={18} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 3).map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs rounded-md bg-gray-800 text-green-400 border border-gray-700"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-800 text-gray-400">
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
                  <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>

              {/* Decorative corner */}
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-green-400/0 group-hover:border-green-400/30 transition-colors duration-300"></div>
            </div>
          ))}
        </div>

        {/* View All Projects Button */}
        <div className="mt-14 text-center">
          <a
            href="#"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-800/80 backdrop-blur-sm text-white font-medium rounded-md hover:bg-green-400 hover:text-black transition-all duration-300 border border-gray-700 hover:border-green-400"
          >
            Vezi toate proiectele
            <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Section Number */}
        <div className="absolute bottom-10 right-10 font-mono text-sm text-gray-500">
          <span className="text-green-400">02</span>
          <span className="mx-1">/</span>
          <span>04</span>
        </div>
      </div>
    </div>
  );
};

export default Projects;
