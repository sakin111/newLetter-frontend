
import { Image } from "@/utils/Image";
import { Link } from "react-router";
import walletLogo from "@/assets/icons/wallet.png";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Link to="/" className="flex items-center space-x-2">
        <div className=" rounded-full">
          <Image src={walletLogo} alt="Logo" width={32} height={32} priority={true} />
        </div>
        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-700 to-sky-400  bg-clip-text text-transparent">
          Wallet
        </span>
      </Link>
    </div>
  )
}


