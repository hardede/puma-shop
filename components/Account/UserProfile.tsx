import Password from "./RightSide/Password";
import PersonInfo from "./LeftSide/PersonInfo";
import Address from "./LeftSide/Address";
import OrderHistory from "./RightSide/OrderHistory";

const UserProfile = () => {
  return (
    <>
      <div className="mt-10 flex justify-between">
        <PersonInfo />
        <Password />
      </div>
      <div className="mt-10 flex justify-between">
        <Address />
        <OrderHistory />
      </div>
    </>
  );
};

export default UserProfile;
