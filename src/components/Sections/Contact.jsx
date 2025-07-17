import React, { useState, useEffect } from "react";
import {
  FiSend,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
} from "react-icons/fi";

const Contact = () => {
  // State pentru a detecta dacă suntem pe mobil
  const [isMobile, setIsMobile] = useState(false);

  // Actualizăm starea isMobile când se schimbă dimensiunea ferestrei
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulăm trimiterea formularului
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      // Resetăm statusul de succes după 5 secunde
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  // Contact details
  const contactDetails = [
    {
      icon: <FiMail size={isMobile ? 16 : 20} />,
      label: "Email",
      value: "cristiancandidatu@hotmail.com",
    },
    {
      icon: <FiPhone size={isMobile ? 16 : 20} />,
      label: "Phone",
      value: "+40 763 842 881",
    },
    {
      icon: <FiMapPin size={isMobile ? 16 : 20} />,
      label: "Location",
      value: "Bucharest, Romania",
    },
  ];

  // Social links
  const socialLinks = [
    {
      icon: <FiGithub size={isMobile ? 18 : 22} />,
      url: "https://github.com/iamrainonline/iamrainonline",
      label: "GitHub",
    },
    {
      icon: <FiLinkedin size={isMobile ? 18 : 22} />,
      url: "https://www.linkedin.com/in/cristian-candidatu/",
      label: "LinkedIn",
    },
  ];

  return (
    <div
      className="relative bg-black min-h-screen w-full overflow-hidden py-12 md:py-28"
      id="contact"
    >
      {/* Background elements - mai puține linii pe mobil */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(isMobile ? 4 : 6)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Green glow effects - reduse pe mobil */}
      <div
        className={`absolute ${
          isMobile ? "top-1/4 w-48 h-48" : "top-1/3 w-96 h-96"
        } left-1/4 bg-green-400 opacity-5 blur-3xl rounded-full`}
      ></div>
      <div
        className={`absolute ${
          isMobile ? "bottom-1/4 w-36 h-36" : "bottom-1/4 w-64 h-64"
        } right-1/4 bg-green-400 opacity-5 blur-3xl rounded-full`}
      ></div>

      {/* Content container - padding-uri reduse pe mobil */}
      <div className="container max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section header - optimizat pentru mobil */}
        <div className="mb-8 md:mb-16 text-center relative">
          <div
            className={`absolute -top-10 md:-top-16 left-1/2 transform -translate-x-1/2 ${
              isMobile ? "text-5xl" : "text-6xl md:text-9xl"
            } font-bold text-white opacity-[10%]`}
          >
            CONTACT
          </div>
          <div className="font-mono text-green-400 text-xs md:text-sm uppercase mb-2 tracking-widest">
            Get In Touch
          </div>
          <h2 className="text-2xl md:text-5xl font-bold text-white mb-3 md:mb-4">
            Let's <span className="text-green-400">Talk</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-xs md:text-base leading-relaxed">
            Have a project in mind or just want to say hi? Feel free to reach
            out and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact card - mai subțire pe mobil */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Decorative corner effects - mai mici pe mobil */}
          <div
            className={`absolute top-0 left-0 ${
              isMobile ? "w-12 h-12" : "w-16 sm:w-20 h-16 sm:h-20"
            } border-t-2 border-l-2 border-green-400/30`}
          ></div>
          <div
            className={`absolute bottom-0 right-0 ${
              isMobile ? "w-12 h-12" : "w-16 sm:w-20 h-16 sm:h-20"
            } border-b-2 border-r-2 border-green-400/30`}
          ></div>

          {/* Contact grid - layout diferit pe mobil vs desktop */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-8 p-5 md:p-10">
            {/* Left column - Contact form */}
            <div className="md:col-span-3">
              <h3
                className={`${
                  isMobile ? "text-lg" : "text-xl"
                } text-white font-semibold mb-4 md:mb-6`}
              >
                Send a Message
              </h3>

              {submitSuccess ? (
                <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-4 md:p-6 text-center">
                  <FiSend className="text-green-400 text-3xl md:text-4xl mx-auto mb-2 md:mb-3" />
                  <h4 className="text-base md:text-lg text-white font-medium mb-1 md:mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-300 text-xs md:text-sm">
                    Thank you for reaching out! I'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-300 text-xs md:text-sm mb-1 md:mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-300 text-xs md:text-sm mb-1 md:mb-2"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-xs md:text-sm mb-1 md:mb-2"
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                      placeholder="Subject of your message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-xs md:text-sm mb-1 md:mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={isMobile ? 4 : 5}
                      className="w-full px-3 md:px-4 py-2 md:py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-4 md:px-6 py-2 md:py-3 mt-1 md:mt-2 bg-green-500 text-black text-sm font-medium rounded-md hover:bg-green-400 flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <FiSend
                      size={isMobile ? 14 : 16}
                      className={isSubmitting ? "animate-ping" : ""}
                    />
                  </button>
                </form>
              )}
            </div>

            {/* Right column - Contact info optimizat pentru mobil */}
            <div className="md:col-span-2 rounded-lg p-4 md:p-8 mt-6 md:mt-0 border-t border-gray-800 md:border-t-0">
              <h3
                className={`${
                  isMobile ? "text-lg" : "text-xl"
                } text-white font-semibold mb-4 md:mb-6`}
              >
                Contact Information
              </h3>

              <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div
                      className={`${
                        isMobile ? "p-2" : "p-3"
                      } bg-gray-800/70 rounded-md text-green-400 mr-3 md:mr-4`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-xs md:text-sm">
                        {item.label}
                      </h4>
                      <p
                        className={`text-white font-medium ${
                          isMobile ? "text-sm" : ""
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-xs md:text-sm uppercase tracking-widest text-green-400 font-mono mb-3 md:mb-4">
                Connect
              </h4>

              <div className="flex flex-wrap gap-2 md:gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    aria-label={link.label}
                    className={`${
                      isMobile ? "p-2" : "p-3"
                    } bg-gray-800/70 hover:bg-gray-700/70 rounded-md text-gray-300 hover:text-green-400 transition-colors duration-300`}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Availability badge - mai mic pe mobil */}
              <div className="mt-6 md:mt-10 inline-flex items-center px-3 md:px-4 py-1 md:py-1.5 rounded-full bg-green-400/10 border border-green-400/30">
                <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-green-400 mr-1.5 md:mr-2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="text-xxs md:text-xs text-green-400">
                  {isMobile ? "Available" : "Available for projects"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section number - mai mic pe mobil */}
        <div className="absolute bottom-2 md:bottom-10 right-4 md:right-10 font-mono text-xs md:text-sm text-gray-500">
          <span className="text-green-400">04</span>
          <span className="mx-1">/</span>
          <span>04</span>
        </div>
      </div>

      {/* Adăugăm text-xxs pentru fonturi foarte mici pe mobil */}
      <style jsx global>{`
        .text-xxs {
          font-size: 0.65rem;
          line-height: 1rem;
        }
      `}</style>
    </div>
  );
};

export default Contact;
