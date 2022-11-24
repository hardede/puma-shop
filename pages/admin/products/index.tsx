import AdminProducts from "../../../components/screens/admin/AdminProducts";

const AdminProductsScreen = () => {
  return <AdminProducts />;
};

AdminProductsScreen.auth = { adminOnly: true };
export default AdminProductsScreen;
