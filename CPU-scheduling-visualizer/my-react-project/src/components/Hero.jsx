import React from "react";

const Hero = () => {
  return (
    <section id="home" className="w-full bg-primary min-h-[100vh] relative">
      <div className="header z-8 text-white absolute top-[30%] left-4 md:left-20 space-y-4">
        <h1 className="text-4xl md:text-7xl text-center md:text-left">
          Welcome to <br />
          <span className="brand text-amber-300 tracking-widest">
            CoreScheduler
          </span>
        </h1>
        <p className="text-md md:text-xl tracking-wide text-center md:text-left">
          A simplified CPU scheduling Algorithm visualizer
        </p>
        <a
          href="#about"
          className="block button-73 bg-secondary ml-2 rounded mt-4  text-center "
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;
