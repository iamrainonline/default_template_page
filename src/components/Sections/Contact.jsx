import React, { useState } from "react";
import {
  FiSend,
  FiMail,
  FiMapPin,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiTwitter,
} from "react-icons/fi";

const Contact = () => {
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
    { icon: <FiMail size={20} />, label: "Email", value: "hello@example.com" },
    { icon: <FiPhone size={20} />, label: "Phone", value: "+40 123 456 789" },
    {
      icon: <FiMapPin size={20} />,
      label: "Location",
      value: "Bucharest, Romania",
    },
  ];

  // Social links
  const socialLinks = [
    { icon: <FiGithub size={22} />, url: "#", label: "GitHub" },
    { icon: <FiLinkedin size={22} />, url: "#", label: "LinkedIn" },
    { icon: <FiTwitter size={22} />, url: "#", label: "Twitter" },
  ];

  return (
    <div className="relative bg-black min-h-screen w-full overflow-hidden py-20 md:py-28">
      {/* Background elements */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute inset-0 flex justify-between opacity-10">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-px h-full bg-gray-600"></div>
          ))}
        </div>
      </div>

      {/* Green glow effects */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-green-400 opacity-5 blur-3xl rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-green-400 opacity-5 blur-3xl rounded-full"></div>

      {/* Content container */}
      <div className="container max-w-6xl mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-12 md:mb-16 text-center relative">
          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl md:text-9xl font-bold text-white opacity-5">
            CONTACT
          </div>
          <div className="font-mono text-green-400 text-sm uppercase mb-2 tracking-widest">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Let's <span className="text-green-400">Talk</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-sm md:text-base">
            Have a project in mind or just want to say hi? Feel free to reach
            out and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact card */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-800 shadow-2xl overflow-hidden">
          {/* Decorative corner effects */}
          <div className="absolute top-0 left-0 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-l-2 border-green-400/30"></div>
          <div className="absolute bottom-0 right-0 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-r-2 border-green-400/30"></div>

          {/* Contact grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 p-8 md:p-10">
            {/* Left column - Contact form */}
            <div className="md:col-span-3">
              <h3 className="text-xl text-white font-semibold mb-6">
                Send a Message
              </h3>

              {submitSuccess ? (
                <div className="bg-green-400/10 border border-green-400/30 rounded-lg p-6 text-center">
                  <FiSend className="text-green-400 text-4xl mx-auto mb-3" />
                  <h4 className="text-lg text-white font-medium mb-2">
                    Message Sent!
                  </h4>
                  <p className="text-gray-300 text-sm">
                    Thank you for reaching out! I'll get back to you as soon as
                    possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-gray-300 text-sm mb-2"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-gray-300 text-sm mb-2"
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
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                        placeholder="Your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-gray-300 text-sm mb-2"
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
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition"
                      placeholder="Subject of your message"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-gray-300 text-sm mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-transparent transition resize-none"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-3 mt-2 bg-green-500 text-black font-medium rounded-md hover:bg-green-400 flex items-center justify-center gap-2 transition-all duration-300 ${
                      isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                    }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                    <FiSend className={isSubmitting ? "animate-ping" : ""} />
                  </button>
                </form>
              )}
            </div>

            {/* Right column - Contact info */}
            <div className="md:col-span-2  rounded-lg p-8 ">
              <h3 className="text-xl text-white font-semibold mb-6">
                Contact Information
              </h3>

              <div className="space-y-6 mb-8">
                {contactDetails.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="p-3 bg-gray-800/70 rounded-md text-green-400 mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-gray-400 text-sm">{item.label}</h4>
                      <p className="text-white font-medium">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              <h4 className="text-sm uppercase tracking-widest text-green-400 font-mono mb-4">
                Connect
              </h4>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    aria-label={link.label}
                    className="p-3 bg-gray-800/70 hover:bg-gray-700/70 rounded-md text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>

              {/* Availability badge */}
              <div className="mt-10 inline-flex items-center px-4 py-1.5 rounded-full bg-green-400/10 border border-green-400/30">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-[pulse_2s_cubic-bezier(0.4,0,0.6,1)_infinite]"></span>
                <span className="text-xs text-green-400">
                  Available for projects
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Section number */}
        <div className="absolute bottom-4 md:bottom-10 right-4 md:right-10 font-mono text-sm text-gray-500">
          <span className="text-green-400">04</span>
          <span className="mx-1">/</span>
          <span>04</span>
        </div>
      </div>
    </div>
  );
};

export default Contact;
