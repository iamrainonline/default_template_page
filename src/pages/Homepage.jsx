import React, { useState } from "react";

const Homepage = () => {
  const [activeTab, setActiveTab] = useState("cats");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Meniu vertical fix */}
      <aside className="fixed w-64 h-full bg-white border-r border-black">
        <div className="p-6 border-b border-black">
          <h1 className="text-2xl font-bold">PetStore</h1>
        </div>
        <nav className="py-4">
          {[
            { id: "cats", name: "Pisici", icon: "🐱" },
            { id: "dogs", name: "Câini", icon: "🐶" },
            { id: "animals", name: "Animale", icon: "🐾" },
            { id: "toys", name: "Jucării", icon: "🧸" },
          ].map((tab) => (
            <button
              key={tab.id}
              className={`w-full py-8 px-6 text-left flex items-center space-x-4 text-lg ${
                activeTab === tab.id
                  ? "bg-black text-white"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="text-3xl mr-4">{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Conținut principal */}
      <main className="flex-1 p-8 ml-64">
        <header className="mb-8">
          <div className="relative h-64 bg-black text-white rounded-lg overflow-hidden">
            <div className="absolute inset-0 p-12 flex flex-col justify-center">
              <h1 className="text-4xl font-bold mb-4">
                Bun venit la PetStore
                <span className="text-4xl ml-5">
                  {" "}
                  Sectiunea - {activeTab.toUpperCase()}
                </span>
              </h1>
              <p className="text-xl mb-6">
                Tot ce ai nevoie pentru animalul tău de companie
              </p>
              <button className="bg-white text-black px-8 py-3 rounded-md font-semibold w-48">
                Descoperă
              </button>
            </div>
          </div>
        </header>

        {activeTab === "cats" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Produse pentru Pisici</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: "Hrană Premium Pisici", price: 75, image: "🐱" },
                {
                  id: 2,
                  name: "Litieră Auto-curățare",
                  price: 350,
                  image: "📦",
                },
                { id: 3, name: "Pat Pisică Moale", price: 120, image: "🛏️" },
                { id: 4, name: "Zgardă Anti-purice", price: 65, image: "⭕" },
                { id: 5, name: "Jucărie Șoarece", price: 25, image: "🐭" },
                { id: 6, name: "Ascuțitor Gheare", price: 95, image: "🪚" },
              ].map((product) => (
                <div
                  key={product.id}
                  className="border border-black rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-lg mt-2">{product.price} lei</p>
                    <button className="w-full mt-4 py-2 bg-black text-white rounded-md">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "dogs" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Produse pentru Câini</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: "Hrană Premium Câini", price: 95, image: "🐶" },
                { id: 2, name: "Lesă Reglabilă", price: 85, image: "➰" },
                { id: 3, name: "Pat Câine XL", price: 190, image: "🛏️" },
                { id: 4, name: "Jucărie Cauciuc", price: 35, image: "🦴" },
                {
                  id: 5,
                  name: "Șampon Blană Strălucitoare",
                  price: 45,
                  image: "🧴",
                },
                { id: 6, name: "Zgardă GPS", price: 220, image: "📡" },
              ].map((product) => (
                <div
                  key={product.id}
                  className="border border-black rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-lg mt-2">{product.price} lei</p>
                    <button className="w-full mt-4 py-2 bg-black text-white rounded-md">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "animals" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">
              Produse pentru Alte Animale
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  id: 1,
                  name: "Cușcă Hamster Deluxe",
                  price: 150,
                  image: "🐹",
                },
                { id: 2, name: "Acvariu Complet 50L", price: 450, image: "🐠" },
                { id: 3, name: "Hrană Papagali", price: 35, image: "🦜" },
                { id: 4, name: "Substrat Iepuri", price: 40, image: "🐰" },
                { id: 5, name: "Vitamines Reptile", price: 65, image: "🦎" },
                {
                  id: 6,
                  name: "Cușcă Transport Universal",
                  price: 120,
                  image: "📦",
                },
              ].map((product) => (
                <div
                  key={product.id}
                  className="border border-black rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-lg mt-2">{product.price} lei</p>
                    <button className="w-full mt-4 py-2 bg-black text-white rounded-md">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {activeTab === "toys" && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Jucării pentru Animale</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 1, name: "Minge Interactivă", price: 45, image: "🏀" },
                { id: 2, name: "Jucărie Pluș", price: 30, image: "🧸" },
                { id: 3, name: "Tuneluri de Joacă", price: 85, image: "🕳️" },
                { id: 4, name: "Frisbee Câini", price: 25, image: "🥏" },
                { id: 5, name: "Set Jucării Pisici", price: 70, image: "🧶" },
                { id: 6, name: "Jucărie Inteligență", price: 95, image: "🧩" },
              ].map((product) => (
                <div
                  key={product.id}
                  className="border border-black rounded-lg overflow-hidden"
                >
                  <div className="h-48 bg-gray-100 flex items-center justify-center">
                    <span className="text-6xl">{product.image}</span>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-lg mt-2">{product.price} lei</p>
                    <button className="w-full mt-4 py-2 bg-black text-white rounded-md">
                      Adaugă în coș
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default Homepage;
