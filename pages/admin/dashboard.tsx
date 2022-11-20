import React from "react";
import AdminDashboard from "../../components/screens/admin/AdminDashboard";

const Admin = () => {
  return <AdminDashboard />;
};


Admin.auth = { adminOnly: true };
export default Admin;
