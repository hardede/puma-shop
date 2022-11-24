import AdminUsers from "../../../components/screens/admin/AdminUsers";

const AdminUsersScreen = () => {
  return <AdminUsers />;
};

AdminUsersScreen.auth = { adminOnly: true };
export default AdminUsersScreen;
