import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    // <footer className="bg-white border-t border-black">
    //   <div className="container mx-auto px-4 pt-10 pb-6">
    //     {/* Top section with columns */}
    //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
    //       {/* Company info */}
    //       <div>
    //         <h3 className="text-lg font-bold mb-4">PetStore</h3>
    //         <p className="mb-4">
    //           Magazinul tău preferat pentru toate nevoile animalelor tale de
    //           companie. Oferim produse de calitate și servicii excelente din
    //           2010.
    //         </p>
    //         <div className="flex space-x-3">
    //           <a
    //             href="#"
    //             className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
    //             aria-label="Facebook"
    //           >
    //             <Facebook size={18} />
    //           </a>
    //           <a
    //             href="#"
    //             className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
    //             aria-label="Instagram"
    //           >
    //             <Instagram size={18} />
    //           </a>
    //           <a
    //             href="#"
    //             className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
    //             aria-label="Twitter"
    //           >
    //             <Twitter size={18} />
    //           </a>
    //           <a
    //             href="#"
    //             className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
    //             aria-label="Youtube"
    //           >
    //             <Youtube size={18} />
    //           </a>
    //         </div>
    //       </div>

    //       {/* Quick links */}
    //       <div>
    //         <h3 className="text-lg font-bold mb-4">Link-uri Rapide</h3>
    //         <ul className="space-y-2">
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Despre Noi
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Servicii
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Produse Noi
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Oferte Speciale
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Blog
    //             </a>
    //           </li>
    //           <li>
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-600 transition-colors"
    //             >
    //               Cariere
    //             </a>
    //           </li>
    //         </ul>
    //       </div>

    //       {/* Contact */}
    //       <div>
    //         <h3 className="text-lg font-bold mb-4">Contact</h3>
    //         <ul className="space-y-3">
    //           <li className="flex items-start">
    //             <MapPin size={18} className="mr-2 mt-1 flex-shrink-0" />
    //             <span>Strada Exemplu, Nr. 123, București, România</span>
    //           </li>
    //           <li className="flex items-center">
    //             <Phone size={18} className="mr-2 flex-shrink-0" />
    //             <span>+40 123 456 789</span>
    //           </li>
    //           <li className="flex items-center">
    //             <Mail size={18} className="mr-2 flex-shrink-0" />
    //             <span>contact@petstore.ro</span>
    //           </li>
    //         </ul>
    //         <div className="mt-4">
    //           <h4 className="font-medium mb-2">Program:</h4>
    //           <p>Luni - Vineri: 9:00 - 20:00</p>
    //           <p>Sâmbătă: 10:00 - 18:00</p>
    //           <p>Duminică: 10:00 - 16:00</p>
    //         </div>
    //       </div>

    //       {/* Newsletter */}
    //       <div>
    //         <h3 className="text-lg font-bold mb-4">
    //           Abonează-te la Newsletter
    //         </h3>
    //         <p className="mb-4">
    //           Primește ultimele noutăți și oferte speciale direct în inbox-ul
    //           tău.
    //         </p>
    //         <form className="mb-4">
    //           <div className="flex mb-2">
    //             <input
    //               type="email"
    //               placeholder="Adresa ta de email"
    //               className="flex-1 px-4 py-2 border border-black focus:outline-none"
    //             />
    //             <button
    //               type="submit"
    //               className="bg-black text-white px-4 py-2 hover:bg-gray-800 transition-colors"
    //             >
    //               Abonare
    //             </button>
    //           </div>
    //           <label className="flex items-start">
    //             <input type="checkbox" className="mt-1 mr-2" />
    //             <span className="text-sm">
    //               Sunt de acord cu prelucrarea datelor mele personale conform
    //               Politicii de confidențialitate.
    //             </span>
    //           </label>
    //         </form>
    //       </div>
    //     </div>

    //     {/* Benefits */}
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-t border-b border-gray-200">
    //       <div className="flex items-center">
    //         <Truck size={24} className="mr-3" />
    //         <div>
    //           <h4 className="font-bold">Livrare Rapidă</h4>
    //           <p className="text-sm">La comenzi peste 200 lei</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <CreditCard size={24} className="mr-3" />
    //         <div>
    //           <h4 className="font-bold">Plată Sigură</h4>
    //           <p className="text-sm">Metode multiple de plată</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <ShieldCheck size={24} className="mr-3" />
    //         <div>
    //           <h4 className="font-bold">Cumpărături Sigure</h4>
    //           <p className="text-sm">Garanție 30 de zile</p>
    //         </div>
    //       </div>
    //       <div className="flex items-center">
    //         <Heart size={24} className="mr-3" />
    //         <div>
    //           <h4 className="font-bold">Serviciu Clienți</h4>
    //           <p className="text-sm">Suport 7 zile pe săptămână</p>
    //         </div>
    //       </div>
    //     </div>

    //     {/* Bottom section */}
    //     <div className="pt-6 flex flex-col md:flex-row justify-between items-center">
    //       <p className="text-sm mb-4 md:mb-0">
    //         &copy; {new Date().getFullYear()} PetStore. Toate drepturile
    //         rezervate.
    //       </p>
    //       <div className="flex space-x-4 text-sm">
    //         <a href="#" className="hover:underline">
    //           Termeni și Condiții
    //         </a>
    //         <span>|</span>
    //         <a href="#" className="hover:underline">
    //           Politica de Confidențialitate
    //         </a>
    //         <span>|</span>
    //         <a href="#" className="hover:underline">
    //           Cookies
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
    <div>s</div>
  );
};

export default Footer;
