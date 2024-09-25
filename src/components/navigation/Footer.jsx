import FacebookIcon from "../icons/FacebookIcon";
import { Button } from "../ui/button";


const Footer = () => {
    const isDarkMode = false;

    return (
        <footer className="shadow-lg px-6 py-4">
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <div className="h-10">
                        <img src='/logo.svg' alt='logo' className='w-[40px]' />
                    </div>
                </div>
                <div className="text-center text-sm md:text-base">
                    <p>© 2023 <strong>Lorem Ipsum</strong>. All Rights Reserved.</p>
                </div>
                <div className="flex space-x-4 ">

                    <Button variant="ghost" size="icon"><FacebookIcon /></Button>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
