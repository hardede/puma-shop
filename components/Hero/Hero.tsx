import Image from "next/image";
import { hero } from "../constants/blurDataUrl";
import HeroBtn from "../UI/HeroBtn";

const Hero = () => {
  return (
    <div className="my-[80px] relative">
      <div className="-z-10">
        <Image
          alt="puma-banner"
          src="/puma.webp"
          width={1700}
          height={570}
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          placeholder="blur"
          blurDataURL={hero}
          // priority
          // layout="fill"
          // sizes="(max-width: 767) 40vh,
          //           (min-width: 28em) 45vw,
          //           100vw"
        />
      </div>
      <div className="relative flex flex-col justify-center h-[500px] text-white px-[120px] items-start lg:h-[380px] mdd:px-10 md:h-[300px] sm:px-4 sm:h-[250px] xs:h-[200px]">
        <div className="text-6xl font-bold uppercase mb-2.5 xl:text-4xl md:text-2xl sm:text-xl">
          <h1>Sale</h1>
          <h1>maximum discount</h1>
        </div>
        <p className="text-xl font-bold uppercase mb-3 md:text-lg sm:text-base sm:text-black">
          +5% and free shipping on everything
        </p>
        <div className="flex sm:hidden">
          <HeroBtn link="/manPage" title="for Mans" />
          <HeroBtn link="/womanPage" title="for Woman" />
          <HeroBtn link="/manPage" title="for Children" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
