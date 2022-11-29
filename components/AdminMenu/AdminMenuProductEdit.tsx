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
import { ProductPage } from "../../types/product/productPage";
import { getError } from "../../utils/error";

const AdminMenuProductEdit = () => {
  const { query } = useRouter();
  const router = useRouter();
  const productId = query.id;
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
  } = useForm<ProductPage>();

  useEffect(() => {
    setValue("model", productsEdit.model);
    setValue("slug", productsEdit.slug);
    setValue("price", productsEdit.price);
    setValue("sale", productsEdit.sale);
    setValue("img", productsEdit.img);
  }, [
    productsEdit.img,
    productsEdit.model,
    productsEdit.price,
    productsEdit.sale,
    productsEdit.slug,
    setValue,
  ]);

  const submitHandler = async ({ model, slug, price, sale, img }: any) => {
    try {
      await axios.put(`/api/admin/products/${productId}`, {
        model,
        slug,
        price,
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
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
          <div className="grid grid-cols-2">
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="model"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                Model:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                id="model"
                autoFocus
                {...register("model", {
                  required: "Please enter model",
                })}
              />
              {errors?.model && (
                <div className="text-red-500">
                  {errors?.model?.message || "Error!"}
                </div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="slug"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                Slug:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                id="slug"
                {...register("slug", {
                  required: "Please enter slug",
                })}
              />
              {errors.slug && (
                <div className="text-red-500">{errors.slug.message}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="newPrice"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                New Price:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                id="price"
                {...register("price", {
                  required: "Please enter newPrice",
                })}
              />
              {errors.price && (
                <div className="text-red-500">{errors.price.message}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="sale"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                sale:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                id="sale"
                {...register("sale", {
                  required: "Please enter sale",
                })}
              />
              {errors.sale && (
                <div className="text-red-500">{errors.sale.message}</div>
              )}
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="img"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                image:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
                id="img"
                {...register("img", {
                  required: "Please enter img",
                })}
              />
              {errors.img && (
                <div className="text-red-500">{errors.img.message}</div>
              )}
            </div>
          </div>
          <div className="flex">
            <input
              type="submit"
              value={isLoading ? "Loading" : "Update Product"}
              className="w-[140px] h-[40px] mr-5 text-white bg-green-500 border-white border-2 hover:text-black hover:border-black hover:bg-opacity-50 transition-all duration-500 cursor-pointer"
            />
            <div className="mb-4 w-[140px] py-1.5 text-center text-white bg-orange-500 border-white border-2 hover:text-black hover:border-black hover:bg-opacity-50 transition-all duration-500">
              <Link href={`/admin/products`}>Back</Link>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AdminMenuProductEdit;
