import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
import SizeSelectInput from "./SizeSelectInput/SizeSelectInput";

const AdminMenuProductEdit = () => {
  const { query } = useRouter();
  const router = useRouter();
  const productId = query.id;
  const dispatch = useAppDispatch();
  const productsEdit = useAppSelector(selectEdit);
  const isLoading = useAppSelector(selectEditIsLoading);
  const error = useAppSelector(selectEditError);
  const [sizeCount, setSizeCount] = useState([]);
  const [showSizes, setShowSizes] = useState(false);
  console.log(
    "🚀 ~ file: AdminMenuProductEdit.tsx:27 ~ AdminMenuProductEdit ~ sizeCount",
    sizeCount
  );

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

  // const uploadHandler = async (e: any, imageField: any = "image") => {
  //   const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;
  //   try {
  //     dispatch({ type: "UPLOAD_REQUEST" });
  //     const {
  //       data: { signature, timestamp },
  //     } = await axios("/api/admin/cloudinary-sign");

  //     const file = e.target.files[0];
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     formData.append("signature", signature);
  //     formData.append("timestamp", timestamp);
  //     formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  //     const { data } = await axios.post(url, formData);
  //     dispatch({ type: "UPLOAD_SUCCESS" });
  //     setValue(imageField, data.secure_url);
  //     toast.success("File uploaded successfully");
  //   } catch (err) {
  //     dispatch({ type: "UPLOAD_FAIL", payload: getError(err) });
  //     toast.error(getError(err));
  //   }
  // };

  const submitHandler = async ({
    productFor,
    model,
    slug,
    price,
    sale,
    img,
    sizeSelection,
  }: any) => {
    console.log(
      "🚀 ~ file: AdminMenuProductEdit.tsx:91 ~ AdminMenuProductEdit ~ sizeSelection",
      sizeSelection
    );
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
          <div className="grid grid-cols-2">
            <div className="mb-4 flex flex-col">
              <label
                htmlFor="productFor"
                className="uppercase text-sm mb-1 text-[#777]"
              >
                product for:
              </label>
              <select
                {...register("productFor")}
                className="appearance-none w-[300px] px-4 py-2.5 border-2 focus:border-black outline-none mr-20"
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
                Price:
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
            {/* <div className="mb-4">
              <label htmlFor="imageFile">Upload image</label>
              <input
                type="file"
                className="w-full"
                id="imageFile"
                onChange={uploadHandler}
              />

              {loadingUpload && <div>Uploading....</div>}
            </div> */}
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
