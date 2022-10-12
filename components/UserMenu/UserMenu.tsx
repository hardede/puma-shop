import Link from "next/link";
import { FC } from "react";
import { GrClose } from "react-icons/gr";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  logout,
  selectIsAuth,
  selectUserState
} from "../../store/reducers/AuthSlice";
import { userLinksTypes } from "../../types/userLinksTypes";
import { userLinks } from "../constants/userLinks";

interface UserMenuProps {
  onClose: () => void;
}

const UserMenu: FC<UserMenuProps> = ({ onClose }) => {
  const userState = useAppSelector(selectUserState);
  const isAuth = useAppSelector(selectIsAuth);
  const dispatch = useAppDispatch();

  console.log("🚀 ~ file: UserMenu.tsx ~ line 15 ~ userState", userState);

  return (
    <div
      className="fixed left-0 top-0 w-full h-full bg-[#00000088] z-50 "
      onClick={onClose}
    >
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
              {isAuth && <div>{userState.email}</div>}
            </div>
            <div>
              {userLinks.map((links: userLinksTypes) => (
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
            {isAuth ? (
              <div>
                <Link href="/">
                  <div
                    className="bg-[rgba(138,115,80)] text-white text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer"
                    onClick={() => dispatch(logout())}
                  >
                    Log out
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <Link href="/authorization">
                  <div className="bg-[rgba(138,115,80)] text-white text-center py-3 hover:opacity-70 transition duration-500 cursor-pointer">
                    Log in
                  </div>
                </Link>
                <p className="mt-3 mb-1">Don&apos;t have an account?</p>
                <Link href="/authorization">
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
