import Address from "./LeftSide/Address";
import OrderHistory from "./RightSide/OrderHistory";
import UpdateProfile from "./UpdateProfile/UpdateProfile";

const UserProfile = () => {
  return (
    <>
      <div className="mt-10">
        <UpdateProfile />
      </div>
      <div className="mt-10 flex justify-between md:block">
        <Address />
        <OrderHistory />
      </div>
    </>
  );
};

export default UserProfile;
