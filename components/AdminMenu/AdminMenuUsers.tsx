import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchAdminUsers,
  selectAdminUsers,
  selectAdminUsersError,
  selectAdminUsersIsLoading,
} from "../../store/reducers/Admin/AdminUserSlice";
import { IUser } from "../../types/IUser";
import { getError } from "../../utils/error";

interface AdminIUser extends IUser {
  _id: string;
}

const AdminMenuUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectAdminUsers);
  const isLoading = useAppSelector(selectAdminUsersIsLoading);
  const error = useAppSelector(selectAdminUsersError);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, [dispatch]);

  const deleteHandler = async (userId: string) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    try {
      await axios.delete(`/api/admin/users/${userId}`);
      toast.success("User deleted successfully");
      router.reload();
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="mb-4 text-xl">Users</h1>
      {isLoading ? (
        <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
          Loading...
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-2 text-left uppercase">id</th>
                <th className="p-2 text-left uppercase">firstName</th>
                <th className="p-2 text-left uppercase">lastName</th>
                <th className="p-2 text-left uppercase">email</th>
                <th className="p-2 text-left uppercase">city</th>
                <th className="p-2 text-left uppercase">phone</th>
                <th className="p-2 text-left uppercase">admin</th>
                <th className="p-2 text-left uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user: AdminIUser) => (
                <tr key={user._id} className="border-b">
                  <td className="p-2">{user._id.substring(20, 24)}</td>
                  <td className="p-2">{user.firstName}</td>
                  <td className="p-2">{user.lastName}</td>
                  <td className="p-2 max-w-[130px] truncate hover:text-clip hover:overflow-visible hover:whitespace-normal hover:break-words">
                    {user.email}
                  </td>
                  <td className="p-2 max-w-[120px] truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
                    {user.city}
                  </td>
                  <td className="p-2 max-w-[120px] truncate hover:text-clip hover:overflow-visible hover:whitespace-normal">
                    {user.phone}
                  </td>
                  <td className="p-2">{user.isAdmin ? "YES" : "NO"}</td>
                  <td className="p-2">
                    <Link href={`/admin/users/${user._id}`} passHref>
                      <a type="button" className="default-button">
                        Edit
                      </a>
                    </Link>
                    &nbsp;
                    <button
                      type="button"
                      className="default-button"
                      onClick={() => deleteHandler(user._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminMenuUsers;
