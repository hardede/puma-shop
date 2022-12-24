import Link from "next/link";
import { FC } from "react";

interface HeroBtnProps {
  link: string;
  title: string;
}

const HeroBtn: FC<HeroBtnProps> = ({ link, title }) => {
  return (
    <Link href={link}>
      <a className="uppercase bg-white py-2.5 font-semibold text-sm text-black border-black border w-[190px] flex justify-center mr-4 last:mr-0 hover:bg-slate-300 transition-all ease-in-out duration-300 xl:w-[150px] xl:py-1.5 md:w-[120px] md:py-1 md:font-normal">
        {title}
      </a>
    </Link>
  );
};

export default HeroBtn;
