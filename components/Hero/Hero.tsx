import Image from "next/image";
import { hero } from "../constants/blurDataUrl";
import HeroBtn from "../UI/HeroBtn";

const Hero = () => {
  return (
    <div className="my-[80px]">
      <div className="absolute -z-10">
        <Image
          alt="puma-banner"
          src="/puma.webp"
          width={1700}
          height={570}
          objectFit="cover"
          quality={100}
          placeholder="blur"
          blurDataURL={hero}
        />
      </div>
      <div className="flex flex-col justify-center h-[560px] text-white px-[120px] items-start">
        <div className="text-6xl font-bold uppercase mb-2.5">
          <h1>Sale</h1>
          <h1>maximum discount</h1>
        </div>
        <p className="text-xl font-bold uppercase mb-3">
          +5% and free shipping on everything
        </p>
        <div className="flex">
          <HeroBtn link="/manPage" title="for Mans" />
          <HeroBtn link="/womanPage" title="for Woman" />
          <HeroBtn link="/manPage" title="for Children" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
