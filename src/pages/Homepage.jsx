import Experience from "../components/Sections/Experience";
import Hero from "../components/Sections/Hero";
import Projects from "../components/Sections/Projects";
import Spacer from "../components/Sections/utils/Spacer";
import Contact from "../components/Sections/Contact";
const Homepage = () => {
  return (
    <div className="relative">
      <Hero />
      <Spacer />
      <Experience />
      <Spacer />
      <Projects />
      <Spacer />
      <Contact />
    </div>
  );
};

export default Homepage;
