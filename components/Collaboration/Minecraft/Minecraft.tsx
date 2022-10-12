import Image from "next/image";
import React from "react";
import { CollabMinecraft } from "../../constants/blurDataUrl";
import HeroBtn from "../../UI/HeroBtn";

const Minecraft = () => {
  return (
    <div className="">
      <div className="absolute -z-10">
        <Image
          alt="1"
          src="/puma_x_minecraft.webp"
          width={1700}
          height={570}
          objectFit="cover"
          quality={100}
          placeholder="blur"
          blurDataURL={CollabMinecraft}
        />
      </div>
      <div className="flex flex-col justify-center h-[560px] text-white px-[120px] items-start">
        <div className="text-6xl font-bold uppercase mb-2.5">
          <h1>puma x minecraft</h1>
        </div>
        <p className="text-xl font-bold uppercase mb-3">
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
