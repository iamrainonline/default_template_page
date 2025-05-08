import { useState, useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { FiGithub, FiLinkedin, FiTwitter, FiMail } from "react-icons/fi";

const Hero = () => {
  const stats = [
    { title: "Proiecte", value: "24+" },
    { title: "Experiență", value: "5 ani" },
    { title: "Tehnologii", value: "12+" },
  ];

  const socialLinks = [
    { icon: <FiGithub />, url: "#" },
    { icon: <FiLinkedin />, url: "#" },
    { icon: <FiTwitter />, url: "#" },
    { icon: <FiMail />, url: "#" },
  ];

  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cubesRef = useRef([]);
  const lastHoveredRef = useRef(null);
  const animationRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Setup
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      width / -8,
      width / 8,
      height / 8,
      height / -8,
      1,
      1000
    );
    camera.position.z = 10;

    // Renderer with higher contrast
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Grid settings - more squares for finer grid
    const cols = 36;
    const cubeSize = width / cols;
    const rows = Math.ceil(height / cubeSize);

    // Geometry and materials
    const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, 0.1);
    const edges = new THREE.EdgesGeometry(geometry);
    const lineMaterial = new THREE.LineBasicMaterial({
      color: "#334155",
      opacity: 0.1,
      transparent: true,
    });

    // Cube positioning offset
    const offsetX = (cols * cubeSize) / 2 - cubeSize / 2;
    const offsetY = (rows * cubeSize) / 2 - cubeSize / 2;

    // Create cubes
    const cubes = [];
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const group = new THREE.Group();

        // Fill material (transparent by default)
        const fillMaterial = new THREE.MeshBasicMaterial({
          color: "#4ade80",
          transparent: true,
          opacity: 0,
        });
        const mesh = new THREE.Mesh(geometry, fillMaterial);

        // Border
        const outline = new THREE.LineSegments(edges, lineMaterial);

        group.add(mesh);
        group.add(outline);

        // Position group
        group.position.x = i * cubeSize - offsetX;
        group.position.y = j * cubeSize - offsetY;

        scene.add(group);
        cubes.push(mesh);
      }
    }

    cubesRef.current = cubes;
    sceneRef.current = scene;

    // Raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (event) => {
      mouse.x = (event.clientX / width) * 2 - 1;
      mouse.y = -(event.clientY / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(cubesRef.current);

      if (intersects.length > 0) {
        const hovered = intersects[0].object;

        // If new hover target
        if (hovered !== lastHoveredRef.current) {
          // Reset previous one
          if (lastHoveredRef.current) {
            gsap.to(lastHoveredRef.current.material, {
              opacity: 0,
              duration: 0.8,
              ease: "power2.out",
            });
          }

          // Fade in new hovered
          gsap.to(hovered.material, {
            opacity: 0.2,
            duration: 0.4,
            ease: "power2.out",
          });

          lastHoveredRef.current = hovered;
        }
      } else {
        // No cube hovered now, fade out previous one
        if (lastHoveredRef.current) {
          gsap.to(lastHoveredRef.current.material, {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          });
          lastHoveredRef.current = null;
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;

      renderer.setSize(newWidth, newHeight);
      camera.left = newWidth / -2;
      camera.right = newWidth / 2;
      camera.top = newHeight / 2;
      camera.bottom = newHeight / -2;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      // Clean up THREE.js resources
      scene.clear();
      geometry.dispose();
      edges.dispose();
      lineMaterial.dispose();

      cubesRef.current.forEach((cube) => {
        cube.material.dispose();
      });

      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative bg-black min-h-screen">
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

      {/* Three.js canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

      {/* Social media - left side */}
      <div className="absolute left-10 top-1/2 transform -translate-y-1/2 z-20 flex flex-col items-center space-y-5">
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="text-gray-400 hover:text-green-400 transition-colors text-xl"
          >
            {link.icon}
          </a>
        ))}
        <div className="h-20 w-px bg-green-400/30 mt-4"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl w-full mx-auto">
          {/* Hero Card */}
          <div className="relative bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
            {/* Decorative corner effects */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-green-400/30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-green-400/30"></div>
            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 h-20 bg-green-400 opacity-5 blur-3xl rounded-full"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Left Content */}
              <div className="p-10 lg:p-16 flex flex-col justify-center">
                <div className="mb-3 text-green-400 font-mono text-sm tracking-wider">
                  FRONTEND DEVELOPER
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
                  Cristian <span className="text-green-400">Candidatu</span>
                </h1>

                <p className="text-lg text-gray-300 max-w-2xl mb-8 leading-relaxed">
                  Frontend Developer cu pasiune pentru interfețe rapide, moderne
                  și scalabile, specializat în React și experiențe digitale
                  interactive.
                </p>

                {/* Buttons */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <button className="group px-6 py-3 bg-green-400 text-black font-medium rounded-md hover:bg-green-500 transition-all duration-300 flex items-center gap-2">
                    <span>Vezi Portofoliu</span>
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
                    Contactează-mă
                  </button>
                </div>

                {/* Digital signature/code */}
                <div className="font-mono text-xs text-gray-500 mt-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code>
                      const developer = new Developer('Cristian Candidatu');
                    </code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">&gt;</span>
                    <code>developer.createAwesomeExperiences();</code>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="relative p-10 lg:p-16 bg-gray-900/70 border-t lg:border-t-0 lg:border-l border-gray-800 flex flex-col">
                {/* Top section */}
                <div className="mb-10">
                  <h2 className="font-mono text-green-400 text-sm uppercase mb-6 tracking-widest">
                    Experiență & Abilități
                  </h2>

                  {/* Tech banner */}
                  <div className="relative overflow-hidden bg-gray-800/50 rounded-lg p-6 mb-6 border border-gray-700">
                    <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>

                    <div className="text-4xl font-bold text-white mb-1">5+</div>
                    <div className="text-sm text-gray-400 uppercase tracking-wider">
                      Ani Experiență
                    </div>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {[
                        "React",
                        "JavaScript",
                        "TypeScript",
                        "Tailwind",
                        "Node.js",
                      ].map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs rounded-full bg-gray-700 text-green-400 border border-gray-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => (
                    <div
                      key={index}
                      className="relative overflow-hidden bg-gray-800/50 rounded-lg p-5 border border-gray-700 group hover:border-green-400/30 transition-colors duration-300"
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-green-400/5 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <p className="text-3xl font-bold text-green-400 mb-1">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-400 uppercase tracking-wider">
                        {stat.title}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Bottom section with current status */}
                <div className="mt-auto pt-10 flex items-center justify-between">
                  <div>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-400/10 border border-green-400/20">
                      <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                      <span className="text-xs text-green-400">
                        Disponibil pentru proiecte
                      </span>
                    </div>
                  </div>

                  <div className="font-mono text-sm text-gray-500">
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
