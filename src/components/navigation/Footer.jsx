import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="px-6 shadow-lg bg-card mt-7">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10">
            <img
              src="/logo.svg"
              alt="logo"
              className="w-[20px] mt-[5px] sm:mt-[8px]"
            />
          </div>
        </div>
        <div className="block text-xs text-center md:text-sm lg:text-base">
          <p>
            © 2024 <strong>Pair Connect</strong>. <br className="sm:hidden" />{" "}
            All Rights Reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook size={24} className="hover:text-primary" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram size={24} className="hover:text-primary" />
          </a>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube size={24} className="hover:text-primary" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer
