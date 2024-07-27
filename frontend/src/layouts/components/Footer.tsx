import { Link } from "react-router-dom";
import Logo from "../../components/Logo";

const Footer = () => {
  return (
    <div className="bg-totysseyOrange py-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <Logo colorScheme="white" className="h-[60px]" />

        {/* Links */}
        <span className="text-white font-bold flex gap-4">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
