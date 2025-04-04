import React from "react";

import photo from "../assets/illustration.png";

const Whyus = () => {
  const items = [
    {
      id: 1,
      title: "Educational Purpose",
      description:
        "This content is tailored to provide educational insights and valuable information. It aims to enhance learning, promote knowledge sharing, and foster intellectual growth among individuals.",
    },
    {
      id: 2,
      title: "Comprehensive Analysis",
      description:
        "Delve into an in-depth analysis of key concepts and ideas, ensuring clarity and a well-rounded understanding. This approach is designed to empower readers with actionable knowledge.",
    },
    {
      id: 3,
      title: "Innovative Solutions",
      description:
        "Explore innovative and creative approaches to address challenges effectively. This section highlights the importance of critical thinking and problem-solving strategies.",
    },
    {
      id: 4,
      title: "Collaborative Growth",
      description:
        "Collaboration and teamwork are pivotal to success. This section emphasizes the value of shared efforts, mutual learning, and collective achievements in a professional environment.",
    },
  ];

  return (
    <section
      id="whyus"
      className="bg-primary w-full px-2 py-10 flex flex-row justify-between  items-center overflow-hidden"
    >
      <div className=" bg-secondary/70 w-full z-12">
        <h1 className=" text-5xl text-center text-textprimary mb-10">
          Why Use it
        </h1>
        <div className="items flex flex-row justify-between  items-center">
          <ul>
            {items.map((item, index) => (
              <li key={item.id} style={{ marginLeft: `${index * 100}px` }}>
                <div className="item flex flex-row justify-between max-w-full sm:max-w-[600px] mx-auto my-4 gap-4 ">
                  <span className="badge text-black bg-amber-300 px-3 py-2 rounded-full self-start">
                    {item.id}
                  </span>
                  <div className="info">
                    <h2 className="text-textprimary">{item.title}</h2>
                    <p className="text-textsecondary">{item.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="profile w-2/5 flex items-center justify-center relative">
            <img
              src={photo}
              alt="Profile"
              className="rounded-2xl overflow-hidden mr-20 object-cover z-1 md:block hidden"
            />
            <div className="glow absolute"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Whyus;
