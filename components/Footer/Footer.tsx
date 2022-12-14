import Link from "next/link";
import { FC } from "react";
import { SiPuma } from "react-icons/si";
import { socialsData } from "../constants/social";
import { FooterCol1, FooterCol2, FooterCol3 } from "./FooterCol/FooterCol1";

const Footer: FC = () => {
  return (
    <footer className="bg-[#181818] mt-20">
      <div className="px-10 py-[90px]">
        <Link href="/">
          <a>
            <SiPuma className="w-10 h-10 fill-white" />
          </a>
        </Link>
        <div className="grid grid-cols-5 gap-5 text-white mt-8 mdd:grid-cols-2 xs:grid-cols-1">
          <FooterCol1 />
          <FooterCol2 />
          <FooterCol3 />
          <div className=" text-white flex justify-end mr-20 items-center col-span-2 mdd:col-span-1 mdd:mr-0 mdd:justify-start">
            {socialsData.map(social => (
              <Link href={social.href} key={social.id}>
                <a className="w-10 h-10 p-0.5 mr-5 block bg-red-500 rounded-full opacity-70 hover:opacity-100 text-white hover:translate-y-1 hover:translate-x-1">
                  {social.imgUrl}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="before:w-full before:h-0.5 before:block before:bg-[#2e2e2e] text-center">
        <p className="text-[#35352b] py-10 text-lg">
          All Rights Reserved © PUMA, 2022
        </p>
      </div>
    </footer>
  );
};

export default Footer;
