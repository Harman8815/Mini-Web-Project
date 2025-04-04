import React from "react";
import profileImage from "../assets/profile1.jpg";
import profilebg from "../assets/bg-profile.png";

const About = () => {
  return (
    <section
      id="about"
      className="bg-primary px-4 py-10 w-full flex justify-center items-center"
    >
      <div className="bg-secondary rounded-4xl px-6 py-12 w-[90%] shadow-tint">
        <h2 className="text-4xl text-center mb-8 md:text-5xl">About Me</h2>
        <div className="item flex flex-col md:flex-row justify-between">
          <div className="info w-full md:w-3/5 mt-4">
            <p className="mb-4 text-sm md:text-base">
              Hi, I'm <strong>Harman Deep Singh</strong> 👋, a final-year
              Computer Science student at RGPV. I specialize in web development
              using the MERN stack (MongoDB, Express, React, Node.js) 💻 and
              have a strong background in Java and DSA 🔧.
            </p>

            <p className="mb-4 text-sm md:text-base">
              I'm passionate about continuous learning 📚 and aim to contribute
              to the tech community through impactful projects 🌱. I’m always
              open to new opportunities where I can expand my skills and make a
              positive impact 🚀.
            </p>

            <p className="mb-4 text-sm md:text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta,
              laborum molestiae. Ab vel enim sequi sed ratione, perspiciatis
              iusto ipsam, consequatur eos nisi voluptate nemo eum excepturi et.
              Nihil magni minima quod? 🤔
            </p>
          </div>
          <div className="profile w-full md:w-2/5 flex items-center justify-center mb-12 relative">
            <img
              src={profileImage}
              alt="Profile"
              className="z-10 rounded-sm overflow-hidden lg:ml-3 lg:mb-1 w-[213px] h-[207px] object-cover"
            />
            <img
              src={profilebg}
              alt="Profile Background"
              className="absolute rounded-2xl overflow-hidden w-[500px] h-[500px] object-cover hidden md:block"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
