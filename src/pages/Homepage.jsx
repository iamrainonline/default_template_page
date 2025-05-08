import React from "react";
import Experience from "../components/Sections/Experience";
import Hero from "../components/Sections/Hero";
import Projects from "../components/Sections/Projects";

const Homepage = () => {
  return (
    <div className="relative">
      <Hero />
      <Experience />
      <Projects />
      {/* You can add your Footer here */}
      <div className="bg-gray-900 text-gray-400 py-16 text-center">
        <p>© 2025 Your Portfolio. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Homepage;
