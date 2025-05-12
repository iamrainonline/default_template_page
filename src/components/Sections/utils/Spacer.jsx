import React from "react";

const Spacer = () => {
  return (
    <div className="relative w-full bg-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
      </div>

      {/* Top fade */}
      <div className="h-8 bg-gradient-to-b from-black to-transparent opacity-40"></div>

      {/* Spacer content */}
      <div className="container mx-auto px-6 py-12 md:py-16 flex justify-center">
        <div className="relative w-full max-w-5xl flex items-center">
          {/* Left line */}
          <div className="flex-grow h-px bg-gradient-to-r from-transparent via-gray-800 to-gray-700"></div>

          {/* Center element - 3D CUBE SPINNER */}
          <div className="relative mx-4 md:mx-6">
            {/* 3D Spinner Container */}
            <div className="spinner">
              <div className="bg-gray-900/80 border-green-400/30"></div>
              <div className="bg-gray-900/80 border-green-400/30"></div>
              <div className="bg-gray-900/80 border-green-400/30"></div>
              <div className="bg-gray-900/80 border-green-400/30"></div>
              <div className="bg-gray-900/80 border-green-400/30"></div>
              <div className="bg-gray-900/80 border-green-400/30"></div>
            </div>

            {/* Small glow effect */}
            <div className="absolute inset-0 scale-150 bg-green-400/10 rounded-full filter blur-md"></div>
          </div>

          {/* Right line */}
          <div className="flex-grow h-px bg-gradient-to-l from-transparent via-gray-800 to-gray-700"></div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="h-8 bg-gradient-to-t from-black to-transparent opacity-40"></div>

      {/* CSS for Spinner */}
      <style jsx>{`
        .spinner {
          width: 44px;
          height: 44px;
          animation: spinner-y0fdc1 2s infinite ease;
          transform-style: preserve-3d;
        }

        .spinner > div {
          height: 100%;
          position: absolute;
          width: 100%;
          border: 2px solid #4ade80;
          border-opacity: 0.3;
        }

        .spinner div:nth-of-type(1) {
          transform: translateZ(-22px) rotateY(180deg);
        }

        .spinner div:nth-of-type(2) {
          transform: rotateY(-270deg) translateX(50%);
          transform-origin: top right;
        }

        .spinner div:nth-of-type(3) {
          transform: rotateY(270deg) translateX(-50%);
          transform-origin: center left;
        }

        .spinner div:nth-of-type(4) {
          transform: rotateX(90deg) translateY(-50%);
          transform-origin: top center;
        }

        .spinner div:nth-of-type(5) {
          transform: rotateX(-90deg) translateY(50%);
          transform-origin: bottom center;
        }

        .spinner div:nth-of-type(6) {
          transform: translateZ(22px);
        }

        @keyframes spinner-y0fdc1 {
          0% {
            transform: rotate(45deg) rotateX(-25deg) rotateY(25deg);
          }
          50% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(25deg);
          }
          100% {
            transform: rotate(45deg) rotateX(-385deg) rotateY(385deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Spacer;
