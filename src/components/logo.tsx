import PolaroidLogo from "@/assets/polaroid-logo.png";
import { Link } from "react-router-dom";

const Logo = ({ icon }: { icon?: boolean }) => {
  return (
    <Link to={"/"} className="flex items-center justify-center gap-2">
      <div className="flex h-6 w-6 items-center justify-center md:h-8 md:w-8">
        <img src={PolaroidLogo} alt="" />
      </div>
      {icon ? null : (
        <h1 className="text-base font-bold md:text-2xl">Polaroid</h1>
      )}
    </Link>
  );
};

export default Logo;
