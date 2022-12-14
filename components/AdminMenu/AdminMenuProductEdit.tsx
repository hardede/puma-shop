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
    setValue("productFor", productsEdit.productFor);
    setValue("model", productsEdit.model);
    setValue("slug", productsEdit.slug);
    setValue("price", productsEdit.price);
    setValue("sale", productsEdit.sale);
    setValue("sizeSelection", productsEdit.sizeSelection);
    setValue("img", productsEdit.img);
  }, [
    productsEdit.model,
    productsEdit.slug,
    productsEdit.price,
    productsEdit.sale,
    productsEdit.img,
    setValue,
    productsEdit.productFor,
    productsEdit.sizeSelection,
  ]);

  const submitHandler = async ({
    productFor,
    model,
    slug,
    price,
    sale,
    img,
    sizeSelection,
  }: any) => {
    try {
      await axios.put(`/api/admin/products/${productId}`, {
        productFor,
        model,
        slug,
        price,
        sale,
        img,
        sizeSelection,
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
        <div className="block border-4 border-red-500 rounded-full border-dashed w-28 h-28 mx-auto mt-20 text-center pt-10 text-red-500 animate-rotateLoader">
          Loading...
        </div>
      ) : error ? (
        <div className="alert-error">{error}</div>
      ) : (
        <form
          className="mx-auto max-w-screen-md"
          onSubmit={handleSubmit(submitHandler)}
        >
          <h1 className="mb-4 text-xl">{`Edit Product ${productId}`}</h1>
          <div className="grid grid-cols-2 md:grid-cols-1">
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="productFor"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                product for:
              </label>
              <select
                {...register("productFor")}
                className="appearance-none w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
              >
                {["man", "woman"].map(value => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="model"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                Model:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
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
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
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
                Price:
              </label>
              <input
                type="text"
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
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
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
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
                className="placeholder:uppercase w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20 md:w-full"
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
