import React from 'react'
import AdminProductEdit from '../../../components/screens/admin/AdminProductEdit';

const AdminProductEditScreen = () => {
  return <AdminProductEdit />;
};

AdminProductEditScreen.auth = { adminOnly: true };
export default AdminProductEditScreen;