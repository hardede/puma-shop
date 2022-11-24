import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  fetchData123,
  selectEdit,
  selectEditError,
  selectEditIsLoading,
} from "../../store/reducers/Admin/AdminEditSlice";
import { getError } from "../../utils/error";

const AdminMenuProductEdit = () => {
  const { query } = useRouter();
  const router = useRouter();
  const productId = query.id;
  console.log(
    "🚀 ~ file: AdminMenuProductEdit.tsx ~ line 10 ~ AdminMenuProductEdit ~ productId",
    productId
  );
  const dispatch = useAppDispatch();
  const productsEdit = useAppSelector(selectEdit);
  const isLoading = useAppSelector(selectEditIsLoading);
  const error = useAppSelector(selectEditError);

  useEffect(() => {
    dispatch(fetchData123(productId));
  }, [dispatch, productId]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const submitHandler = async ({
    model,
    slug,
    newPrice,
    newPriceString,
    oldPrice,
    oldPriceString,
    sale,
    img,
  }: any) => {
    try {
      await axios.put(`/api/admin/products/${productId}`, {
        model,
        slug,
        newPrice,
        newPriceString,
        oldPrice,
        oldPriceString,
        sale,
        img,
      });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  return (
    <div className="md:col-span-3">
      {isLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <div></div>
        // <form
        //   className="mx-auto max-w-screen-md"
        //   onSubmit={handleSubmit(submitHandler)}
        // >
        //   <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
        //   <div className="mb-4">
        //     <label htmlFor="model">Model</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="model"
        //       autoFocus
        //       {...register("model", {
        //         required: "Please enter model",
        //       })}
        //     />
        //     {errors?.model && (
        //       <div className="text-red-500">
        //         {errors?.model?.message || "Error!"}
        //       </div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="slug">Slug</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="slug"
        //       {...register("slug", {
        //         required: "Please enter slug",
        //       })}
        //     />
        //     {errors.slug && (
        //       <div className="text-red-500">{errors.slug.message}</div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="newPrice">New Price</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="newPrice"
        //       {...register("newPrice", {
        //         required: "Please enter newPrice",
        //       })}
        //     />
        //     {errors.newPrice && (
        //       <div className="text-red-500">{errors.newPrice.message}</div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="newPriceString">new Price String</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="newPriceString"
        //       {...register("newPriceString", {
        //         required: "Please enter newPriceString",
        //       })}
        //     />
        //     {errors.newPriceString && (
        //       <div className="text-red-500">
        //         {errors.newPriceString.message}
        //       </div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="oldPrice">old Price</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="oldPrice"
        //       {...register("oldPrice", {
        //         required: "Please enter oldPrice",
        //       })}
        //     />
        //     {errors.oldPrice && (
        //       <div className="text-red-500">{errors.oldPrice.message}</div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="oldPriceString">old Price String</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="oldPriceString"
        //       {...register("oldPriceString", {
        //         required: "Please enter oldPriceString",
        //       })}
        //     />
        //     {errors.oldPriceString && (
        //       <div className="text-red-500">
        //         {errors.oldPriceString.message}
        //       </div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="sale">sale</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="sale"
        //       {...register("sale", {
        //         required: "Please enter sale",
        //       })}
        //     />
        //     {errors.sale && (
        //       <div className="text-red-500">{errors.sale.message}</div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <label htmlFor="img">Image</label>
        //     <input
        //       type="text"
        //       className="w-full"
        //       id="img"
        //       {...register("img", {
        //         required: "Please enter img",
        //       })}
        //     />
        //     {errors.img && (
        //       <div className="text-red-500">{errors.img.message}</div>
        //     )}
        //   </div>
        //   <div className="mb-4">
        //     <button disabled={isLoading} className="primary-button">
        //       {isLoading ? "Loading" : "Update"}
        //     </button>
        //   </div>
        //   <div className="mb-4">
        //     <Link href={`/admin/products`}>Back</Link>
        //   </div>
        // </form>
      )}
    </div>
  );
};

export default AdminMenuProductEdit;
