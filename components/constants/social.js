import { v4 as uuidv4 } from "uuid";
import {AiOutlineInstagram} from 'react-icons/ai'
import { FaFacebookF } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";


export const socialsData = [
  {
    id: uuidv4(),
    name: "Instagram",
    imgUrl: <AiOutlineInstagram />,
    imgAlt: "Instagram",
    href: "https://www.instagram.com/",
  },
  {
    id: uuidv4(),
    name: "Facebook",
    imgUrl: <FaFacebookF />,
    imgAlt: "Facebook",
    href: "https://www.facebook.com/watch",
  },
  {
    id: uuidv4(),
    name: "Twitter",
    imgUrl: <BsTwitter />,
    imgAlt: "Twitter",
    href: "https://www.facebook.com/watch",
  },
];
