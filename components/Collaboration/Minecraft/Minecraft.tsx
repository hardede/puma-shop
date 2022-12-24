import Image from "next/image";
import React from "react";
import { CollabMinecraft } from "../../constants/blurDataUrl";
import HeroBtn from "../../UI/HeroBtn";

const Minecraft = () => {
  return (
    <div className="relative">
      <div className="-z-10">
        <Image
          alt="1"
          src="/puma_x_minecraft.webp"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          quality={100}
          placeholder="blur"
          blurDataURL={CollabMinecraft}
        />
      </div>
      <div className="relative flex flex-col justify-center h-[560px] text-white px-[120px] items-start lg:h-[380px] mdd:px-10 md:h-[300px] sm:px-4 sm:h-[250px] xs:h-[200px]">
        <div className="text-6xl font-bold uppercase mb-2.5 xl:text-4xl md:text-2xl sm:text-xl">
          <h1>puma x minecraft</h1>
        </div>
        <p className="text-xl font-bold uppercase mb-3 md:text-lg sm:text-base">
          in the style of your favorite game
        </p>
        <div className="flex">
          <HeroBtn link="/manPage" title="Buy" />
        </div>
      </div>
    </div>
  );
};

export default Minecraft;
