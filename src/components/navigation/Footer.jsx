import FacebookIcon from "../icons/FacebookIcon";
import YouTubeIcon from "../icons/YoutubeIcon";
import InstagramIcon from "../icons/InstagramIcon";
import { Button } from "../ui/button";

const Footer = () => {
  return (
    <footer className="shadow-lg px-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="h-10">
            <img src="/logo.svg" alt="logo" className="w-[20px]" />
          </div>
        </div>
        <div className="text-center text-xs md:text-sm lg:text-base">
          <p>
            © 2024 <strong>Pair Connect</strong>. All Rights Reserved.
          </p>
        </div>
        <div className="flex space-x-4">
          <Button variant="ghost" size="icon">
            <FacebookIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <YouTubeIcon />
          </Button>
          <Button variant="ghost" size="icon">
            <InstagramIcon />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
