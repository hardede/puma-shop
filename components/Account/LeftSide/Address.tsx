import { useAppSelector } from "../../../hooks/redux";
import { selectUserState } from "../../../store/reducers/AuthSlice";

const Address = () => {
  const userState = useAppSelector(selectUserState);
  return (
    <div>
      <h5 className="after:mt-3 after:block after:bg-[#d2a1a1] after:w-[520px] after:h-0.5 text-xl">
        Address
      </h5>
      <p className="mt-5 font-medium">
        {userState.city
          ? userState.city
          : "The list of addresses is still empty"}
      </p>
    </div>
  );
};

export default Address;
