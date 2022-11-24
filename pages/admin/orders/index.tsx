import React from "react";
import AdminOrder from "../../../components/screens/admin/AdminOrder";

const AdminOrderScreen = () => {
  return <AdminOrder />;
};

AdminOrderScreen.auth = { adminOnly: true };
export default AdminOrderScreen;
