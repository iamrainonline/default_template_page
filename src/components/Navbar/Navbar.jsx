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
      {/* Glasmorphism container */}
      <div className="backdrop-blur-md bg-white/30 shadow-lg rounded-b-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and brand name */}
            <div className="flex items-center space-x-2">
              <div className="text-3xl">🐾</div>
              <div className="font-bold text-xl text-black">PetParadise</div>
            </div>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-8">
              <a
                href="/"
                className="flex items-center text-black hover:text-gray-600 font-medium"
              >
                <Home className="mr-1" /> Acasă
              </a>
              <div className="relative group">
                <a
                  href="/cats"
                  className="flex items-center text-black hover:text-gray-600 font-medium"
                >
                  <Cat className="mr-1" /> Pisici
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-lg hidden group-hover:block p-2">
                  <a
                    href="/cats/food"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Hrană
                  </a>
                  <a
                    href="/cats/toys"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Jucării
                  </a>
                  <a
                    href="/cats/accessories"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Accesorii
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a
                  href="/dogs"
                  className="flex items-center text-black hover:text-gray-600 font-medium"
                >
                  <Dog className="mr-1" /> Câini
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-lg hidden group-hover:block p-2">
                  <a
                    href="/dogs/food"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Hrană
                  </a>
                  <a
                    href="/dogs/toys"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Jucării
                  </a>
                  <a
                    href="/dogs/accessories"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Accesorii
                  </a>
                </div>
              </div>
              <div className="relative group">
                <a
                  href="/small-pets"
                  className="flex items-center text-black hover:text-gray-600 font-medium"
                >
                  <Rat className="mr-1" /> Animale Mici
                </a>
                <div className="absolute left-0 mt-2 w-48 bg-white/80 backdrop-blur-md rounded-md shadow-lg hidden group-hover:block p-2">
                  <a
                    href="/small-pets/rodents"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Rozătoare
                  </a>
                  <a
                    href="/small-pets/birds"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Păsări
                  </a>
                  <a
                    href="/small-pets/fish"
                    className="block px-4 py-2 hover:bg-gray-100 rounded-md"
                  >
                    Pești
                  </a>
                </div>
              </div>
              <a
                href="/services"
                className="flex items-center text-black hover:text-gray-600 font-medium"
              >
                <Scissors className="mr-1" /> Servicii
              </a>
              <a
                href="/contact"
                className="flex items-center text-black hover:text-gray-600 font-medium"
              >
                <Phone className="mr-1" /> Contact
              </a>
            </div>

            {/* User account and cart */}
            <div className="hidden md:flex items-center space-x-4">
              <a href="/account" className="text-black hover:text-gray-600">
                <User className="text-xl" />
              </a>
              <a
                href="/cart"
                className="relative text-black hover:text-gray-600"
              >
                <ShoppingCart className="text-xl" />
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  3
                </span>
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-black focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="text-2xl" />
                ) : (
                  <Menu className="text-2xl" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden pb-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="/"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Home className="mr-2" /> Acasă
                </a>
                <a
                  href="/cats"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Cat className="mr-2" /> Pisici
                </a>
                <a
                  href="/dogs"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Dog className="mr-2" /> Câini
                </a>
                <a
                  href="/small-pets"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Rat className="mr-2" /> Animale Mici
                </a>
                <a
                  href="/services"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Scissors className="mr-2" /> Servicii
                </a>
                <a
                  href="/contact"
                  className="flex items-center text-black hover:text-gray-600 font-medium py-2"
                >
                  <Phone className="mr-2" /> Contact
                </a>
                <div className="flex space-x-6 pt-2">
                  <a href="/account" className="text-black hover:text-gray-600">
                    <User className="text-xl" />
                  </a>
                  <a
                    href="/cart"
                    className="relative text-black hover:text-gray-600"
                  >
                    <ShoppingCart className="text-xl" />
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
