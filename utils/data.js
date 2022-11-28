import bcrypt from "bcryptjs";
import {
  blurData1,
  blurData2,
  blurData3,
} from "../components/constants/blurDataUrl";

const data = {
  users: [
    {
      firstName: "hardede",
      lastName: "hardede1",
      email: "admin@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: true,
    },
    {
      firstName: "hardede",
      lastName: "hardede1",
      email: "dimakostyuk50@gmail.com",
      password: bcrypt.hashSync("123456"),
      isAdmin: false,
    },
  ],

  sneakers: [
    {
      productFor: "man",
      slug: "sneakers-voyage-nitro-gore-tex-men-s-running-shoes",
      imgProductPage: [
        { productImg: "/sneakers/voyage_nitro.webp" },
        { productImg: "/sneakers/voyage_nitro1.webp" },
        { productImg: "/sneakers/voyage_nitro2.webp" },
        { productImg: "/sneakers/voyage_nitro3.webp" },
      ],
      img: "/sneakers/voyage_nitro.webp",
      model: "Sneakers Voyage Nitro Gore-tex Men's Running Shoes",
      color: "Parasailing-CASTLEROCK-Puma Black",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 0,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195167_01",
      alt: "Sneakers Voyage Nitro Gore-tex Men's Running Shoes",
      blur: { blurData1 },
      price: 3090,
      sale: 0,
    },
    {
      productFor: "man",
      slug: "sneakers-voyage-nitro-gore-tex-men-s-running-shoes-black",
      imgProductPage: [
        { productImg: "/sneakers/voyage_nitro_black.webp" },
        { productImg: "/sneakers/voyage_nitro_black1.webp" },
        { productImg: "/sneakers/voyage_nitro_black2.webp" },
        { productImg: "/sneakers/voyage_nitro_black3.webp" },
        { productImg: "/sneakers/voyage_nitro_black4.webp" },
        { productImg: "/sneakers/voyage_nitro_black5.webp" },
      ],
      img: "/sneakers/voyage_nitro_black.webp",
      model: "Sneakers Voyage Nitro Gore-tex Men's Running Shoes",
      color: "Puma Black-Metallic Silver",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 0,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195167_02",
      alt: "Sneakers Voyage Nitro Gore-tex Men's Running Shoes",
      blur: { blurData2 },
      price: 7190,
      sale: 54,
    },
    {
      productFor: "man",
      slug: "sneakers-deviate-nitro-wtr-men-s-running-shoes",
      imgProductPage: [
        { productImg: "/sneakers/deviat_nitro.webp" },
        { productImg: "/sneakers/voyage_nitro_black1.webp" },
        { productImg: "/sneakers/voyage_nitro_black2.webp" },
        { productImg: "/sneakers/voyage_nitro_black3.webp" },
        { productImg: "/sneakers/voyage_nitro_black4.webp" },
        { productImg: "/sneakers/voyage_nitro_black5.webp" },
      ],
      img: "/sneakers/deviat_nitro.webp",
      model: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      color: "Puma Black",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195572_01",
      alt: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      blur: { blurData3 },
      price: 7690,
      sale: 53,
    },
    {
      productFor: "man",
      slug: "sneakers-deviate-nitro-wtr-men-s-running-shoes1",
      imgProductPage: [
        { productImg: "/sneakers/deviat_nitro.webp" },
        { productImg: "/sneakers/voyage_nitro_black1.webp" },
        { productImg: "/sneakers/voyage_nitro_black2.webp" },
        { productImg: "/sneakers/voyage_nitro_black3.webp" },
        { productImg: "/sneakers/voyage_nitro_black4.webp" },
        { productImg: "/sneakers/voyage_nitro_black5.webp" },
      ],
      img: "/sneakers/deviat_nitro.webp",
      model: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      color: "Puma Black",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195572_01",
      alt: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      blur: { blurData3 },
      price: 7690,
      sale: 53,
    },
    {
      productFor: "man",
      slug: "sneakers-twitch-runner-running-shoes",
      imgProductPage: [
        { productImg: "/sneakers/deviat_nitro.webp" },
        { productImg: "/sneakers/voyage_nitro_black1.webp" },
        { productImg: "/sneakers/voyage_nitro_black2.webp" },
        { productImg: "/sneakers/voyage_nitro_black3.webp" },
        { productImg: "/sneakers/voyage_nitro_black4.webp" },
        { productImg: "/sneakers/voyage_nitro_black5.webp" },
      ],
      img: "/sneakers/twitch_nitro.webp",
      model: "Sneakers Twitch Runner Running Shoes",
      color: "Peacoat Puma White",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195572_01",
      alt: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      blur: { blurData3 },
      price: 7690,
      sale: 53,
    },
    {
      productFor: "man",
      slug: "sneakers-twitch-runner-running-shoes",
      imgProductPage: [
        { productImg: "/sneakers/deviat_nitro.webp" },
        { productImg: "/sneakers/voyage_nitro_black1.webp" },
        { productImg: "/sneakers/voyage_nitro_black2.webp" },
        { productImg: "/sneakers/voyage_nitro_black3.webp" },
        { productImg: "/sneakers/voyage_nitro_black4.webp" },
        { productImg: "/sneakers/voyage_nitro_black5.webp" },
      ],
      img: "/sneakers/twitch_nitro.webp",
      model: "Sneakers Twitch Runner Running Shoes",
      color: "Peacoat-Puma White",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "195572_01",
      alt: "Sneakers Deviate Nitro Wtr Men's Running Shoes",
      blur: { blurData3 },
      price: 7690,
      sale: 53,
    },
    {
      productFor: "woman",
      slug: "sneakers-pwrframe_op-1-trail",
      imgProductPage: [
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers1.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers2.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers3.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers4.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers5.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers6.webp",
        },
        {
          productImg:
            "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers7.webp",
        },
      ],
      img: "/sneakersWoman/pwrframe_op-1/pwrframe_op-1_trail_sneakers.webp",
      model: "Sneakers Pwrframe Op-1 Trail",
      color: "Gray Violet-Puma Black",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 0,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "386378_01",
      alt: "pwrframe_op-1_trail_sneakers",
      blur: { blurData1 },
      price: 5690,
      sale: 0,
    },
    {
      productFor: "woman",
      slug: "sneakers-slipstream-mid",
      imgProductPage: [
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid1.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid2.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid3.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid4.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid5.webp" },
        { productImg: "/sneakersWoman/slipstream_mid/slipstream_mid6.webp" },
      ],
      img: "/sneakersWoman/slipstream_mid/slipstream_mid.webp",
      model: "Sneakers SLIPSTREAM MID",
      color: "Puma White-Glacier Gray",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 0,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "386565_02",
      alt: "slipstream_mid",
      blur: { blurData2 },
      price: 4590,
      sale: 0,
    },
    {
      productFor: "woman",
      slug: "sneakers-orkid-retro-grade",
      imgProductPage: [
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade.webp" },
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade1.webp" },
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade2.webp" },
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade3.webp" },
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade4.webp" },
        { productImg: "/sneakersWoman/orkid_retro/orkid_retro_grade5.webp" },
      ],
      img: "/sneakersWoman/orkid_retro/orkid_retro_grade.webp",
      model: "Sneakers Orkid Retro Grade Woman",
      color: "Vaporous Gray-Burnt Red",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "387465_01",
      alt: "sneakers-orkid_retro_grade",
      blur: { blurData3 },
      price: 9690,
      sale: 55,
    },
    {
      productFor: "woman",
      slug: "sneakers-carina-lift-mono",
      imgProductPage: [
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono1.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono2.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono3.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono4.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono5.webp" },
        { productImg: "/sneakersWoman/carina_lift/carina_lift_mono6.webp" },
      ],
      img: "/sneakersWoman/carina_lift/carina_lift_mono.webp",
      model: "Sneakers Carina Lift Mono Woman",
      color: "Puma Black-Puma White",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "386405_01",
      alt: "carina_lift_mono",
      blur: { blurData3 },
      price: 2890,
      sale: 0,
    },
    {
      productFor: "woman",
      slug: "sneakers-puma-palomo-nitefox",
      imgProductPage: [
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox.webp" },
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox1.webp" },
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox2.webp" },
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox3.webp" },
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox4.webp" },
        { productImg: "/sneakersWoman/puma_palomo/puma_palomo_nitefox5.webp" },
      ],
      img: "/sneakersWoman/puma_palomo/puma_palomo_nitefox.webp",
      model: "Puma X Palomo Nitefox Loafers",
      color: "Puma Black",
      sizeSelection: [
        {
          sizeEur: 39,
          sizeUK: 6,
          sizeCountInStock: 6,
        },
        {
          sizeEur: 40,
          sizeUK: 6.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 41,
          sizeUK: 7.5,
          sizeCountInStock: 2,
        },
        {
          sizeEur: 42,
          sizeUK: 8,
          sizeCountInStock: 5,
        },
        {
          sizeEur: 43,
          sizeUK: 9,
          sizeCountInStock: 1,
        },
        {
          sizeEur: 44,
          sizeUK: 9,
          sizeCountInStock: 9,
        },
      ],
      atr: "388441_01",
      alt: "puma_palomo_nitefox",
      blur: { blurData3 },
      price: 22990,
      sale: 0,
    },
  ],
};

export default data;
