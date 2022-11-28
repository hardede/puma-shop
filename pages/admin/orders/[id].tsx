import AdminOrderDetails from "../../../components/screens/admin/AdminOrderDetails";


const OrderDetailsScreen = () => {

  return (
    <AdminOrderDetails />
  );
};

OrderDetailsScreen.auth = { adminOnly: true };
export default OrderDetailsScreen;
