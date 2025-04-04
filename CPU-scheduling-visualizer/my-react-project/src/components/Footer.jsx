import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-primary text-textprimary py-6">
      <div className=" text-center">
        <p className="text-sm sm:text-base md:text-lg">&copy; {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
        <div className="social-icons mt-4">
          <a href="#" className="mx-2 text-textsecondary hover:text-textprimary text-sm sm:text-base md:text-lg">Facebook</a>
          <a href="#" className="mx-2 text-textsecondary hover:text-textprimary text-sm sm:text-base md:text-lg">Twitter</a>
          <a href="#" className="mx-2 text-textsecondary hover:text-textprimary text-sm sm:text-base md:text-lg">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
