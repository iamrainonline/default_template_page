import React, { useState } from "react";
import {
  Home,
  Cat,
  Dog,
  Rat,
  Scissors,
  Phone,
  User,
  ShoppingCart,
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 w-full">
      {/* Container cu bordură neagră în loc de glasmorphism */}
      <div className="bg-white border-b border-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand name */}
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🐾</div>
              <div className="font-bold text-xl text-black">PetStore</div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
              >
                <Home className="mr-1" size={18} /> Acasă
              </a>
              <div className="relative group">
                <a
                  href="/cats"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Cat className="mr-1" size={18} /> Pisici
                </a>
                <div className="absolute left-0 mt-1 w-48 bg-white border border-black rounded-md shadow-lg hidden group-hover:block">
                  <a
                    href="/cats/food"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Hrană
                  </a>
                  <a
                    href="/cats/toys"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Jucării
                  </a>
                  <a
                    href="/cats/accessories"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Accesorii
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a
                  href="/dogs"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Dog className="mr-1" size={18} /> Câini
                </a>
                <div className="absolute left-0 mt-1 w-48 bg-white border border-black rounded-md shadow-lg hidden group-hover:block">
                  <a
                    href="/dogs/food"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Hrană
                  </a>
                  <a
                    href="/dogs/toys"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Jucării
                  </a>
                  <a
                    href="/dogs/accessories"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Accesorii
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a
                  href="/small-pets"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Rat className="mr-1" size={18} /> Animale Mici
                </a>
                <div className="absolute left-0 mt-1 w-48 bg-white border border-black rounded-md shadow-lg hidden group-hover:block">
                  <a
                    href="/small-pets/rodents"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Rozătoare
                  </a>
                  <a
                    href="/small-pets/birds"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Păsări
                  </a>
                  <a
                    href="/small-pets/fish"
                    className="block px-4 py-2 hover:bg-black hover:text-white transition-colors"
                  >
                    Pești
                  </a>
                </div>
              </div>
              <a
                href="/services"
                className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
              >
                <Scissors className="mr-1" size={18} /> Servicii
              </a>
              <a
                href="/contact"
                className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
              >
                <Phone className="mr-1" size={18} /> Contact
              </a>
            </div>

            {/* User account and cart */}
            <div className="hidden md:flex items-center space-x-4">
              <a
                href="/account"
                className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
              >
                <User size={20} />
              </a>
              <a
                href="/cart"
                className="relative text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
              >
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors focus:outline-none"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-1 border-t border-gray-200 pt-3">
                <a
                  href="/"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Home className="mr-2" size={18} /> Acasă
                </a>
                <a
                  href="/cats"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Cat className="mr-2" size={18} /> Pisici
                </a>
                <a
                  href="/dogs"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Dog className="mr-2" size={18} /> Câini
                </a>
                <a
                  href="/small-pets"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Rat className="mr-2" size={18} /> Animale Mici
                </a>
                <a
                  href="/services"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Scissors className="mr-2" size={18} /> Servicii
                </a>
                <a
                  href="/contact"
                  className="flex items-center text-black hover:bg-black hover:text-white px-3 py-2 rounded-md font-medium transition-colors"
                >
                  <Phone className="mr-2" size={18} /> Contact
                </a>
                <div className="flex space-x-4 pt-2 border-t border-gray-200 mt-2">
                  <a
                    href="/account"
                    className="text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
                  >
                    <User size={20} />
                  </a>
                  <a
                    href="/cart"
                    className="relative text-black hover:bg-black hover:text-white p-2 rounded-md transition-colors"
                  >
                    <ShoppingCart size={20} />
                    <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      3
                    </span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
