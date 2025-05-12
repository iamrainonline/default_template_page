import React, { useEffect, useRef } from "react";

const NameDemoCDN = ({ text = "Candidatu Cristian" }) => {
  // Modificat numele implicit
  const textRef = useRef(null);

  useEffect(() => {
    // Verificăm dacă anime.js este deja încărcat
    if (typeof window !== "undefined" && !window.anime) {
      // Încărcăm anime.js din CDN
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.1/anime.min.js";
      script.async = true;
      script.onload = () => animateText();
      document.body.appendChild(script);
    } else {
      // Anime.js există deja, aplicăm animația
      animateText();
    }

    function animateText() {
      if (!textRef.current || !window.anime) return;

      // Resetăm conținutul la fiecare re-render pentru a evita duplicarea span-urilor
      const letters = [...text]
        .map((letter) => {
          // Verifică dacă caracterul este un spațiu pentru a-l trata diferit
          return letter === " "
            ? letter
            : `<span class="letter">${letter}</span>`;
        })
        .join("");

      textRef.current.innerHTML = letters;

      // Creăm timeline-ul de animație
      const animation = window.anime
        .timeline({ loop: true })
        .add({
          targets: ".ml2 .letter",
          scale: [6, 1],
          opacity: [0, 1],
          translateZ: 0,
          easing: "easeOutExpo",
          duration: 950,
          delay: (el, i) => 70 * i,
        })
        .add({
          targets: ".ml2",
          opacity: 0,
          duration: 3000,
          easing: "easeOutExpo",
          delay: 5000,
        });

      return () => {
        if (animation && animation.pause) animation.pause();
      };
    }

    return () => {
      // Curățăm animația (dacă există)
      if (window.anime && window.anime.running) {
        window.anime.running.forEach((anim) => {
          if (anim.pause) anim.pause();
        });
      }
    };
  }, [text]); // Rulăm efectul când se schimbă textul

  return (
    <h1 className="text-green-400 ml2" ref={textRef}>
      {text}
    </h1>
  );
};

// Adăugăm stilurile necesare în componenta noastră
const styles = `
  .ml2 {
    font-weight: 900;
    font-size: 3.5rem;
    color: white;
  }
  
  .ml2 .letter {
    display: inline-block;
    line-height: 1em;
  }
`;

// Aplicăm stilurile
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default NameDemoCDN;
