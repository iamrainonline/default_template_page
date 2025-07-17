import React, { useEffect, useRef, useState } from "react";

const NameDemoCDN = ({ text = "Candidatu Cristian" }) => {
  // Adăugăm state pentru a detecta lățimea ecranului
  const [isMobile, setIsMobile] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    // Detectăm dacă suntem pe mobil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Verificăm inițial și adăugăm event listener pentru resize
    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Curățăm event listener-ul
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

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
    <h1
      className={`text-green-400 ml2 ${isMobile ? "mobile-text" : ""}`}
      ref={textRef}
    >
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
  
  .ml2.mobile-text {
    font-size: 2.2rem;  /* Font mai mic pe mobil */
  }
  
  .ml2 .letter {
    display: inline-block;
    line-height: 1em;
  }
  
  /* Media query pentru asigurarea responsivității */
  @media (max-width: 480px) {
    .ml2 {
      font-size: 1.8rem;
      margin-left: 12px;
    }
    
    .ml2.mobile-text {
      font-size: 1.8rem;
    }
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
