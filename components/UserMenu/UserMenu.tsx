import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { GrClose } from "react-icons/gr";
import { userLinks } from "../constants/userLinks";

interface UserMenuProps {
  onClose: () => void;
}

interface Links {
  id: string,
  link: string,
  href: string
}

const UserMenu: FC<UserMenuProps> = ({ onClose }) => {
  const { status, data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;

  return (
    <div onClick={onClose}>
      <div
        className="absolute w-[290px] h-[440px] top-0 right-0 bg-white py-[30px] px-6 z-50 text-black"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center uppercase text-sm font-bold ">
              <p className="pr-4">quick links</p>
              <GrClose
                className="text-2xl opacity-100 hover:opacity-50"
                onClick={onClose}
              />
            </div>
            <div className="mb-[30px]">
              {status === "loading"
                ? "Loading"
                : session?.user && session.user.email}
            </div>
            <div>
              {userLinks.map((links: Links) => (
                <Link key={links.id} href={links.href}>
                  <a className=" after:block after:w-full after:h-0.5 after:bg-[#d2a1a1] after:mt-1">
                    <div className="mt-2 hover:bg-slate-300 hover:bg-opacity-50">
                      {links.link}
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
          <div className="">
            {status === "loading" ? (
              "Loading"
            ) : session?.user ? (
              <div>
                <Link href="/">
                  <div
                    className="bg-[rgba(138,115,80)] text-white text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer"
                    onClick={() => signOut()}
                  >
                    Log out
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link href={`/authorization?redirect=${redirect || "/"}`}>
                  <div className="bg-[rgba(138,115,80)] text-white text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer">
                    Log in
                  </div>
                </Link>
                <p className="mt-3 mb-1">Don&apos;t have an account?</p>
                <Link href={`/authorization?redirect=${redirect || "/"}`}>
                  <div className="bg-[#787674] text-white text-center py-2 hover:opacity-70 transition duration-500 uppercase cursor-pointer">
                    registration
                  </div>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMenu;
