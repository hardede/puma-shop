import mongoose, { model, models, Schema } from "mongoose";

export const imgSchema = new Schema(
  {
    productImg: { type: String, require: true },
  },
  { _id: false }
);

export const sizeSchema = new Schema(
  {
    sizeEur: { type: Number, require: true },
    sizeUK: { type: Number, require: true },
    sizeCountInStock: { type: Number, require: true },
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    productFor: { type: String, required: true },
    slug: { type: String, required: true },
    imgProductPage: [imgSchema],
    img: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    sizeSelection: [sizeSchema],
    atr: { type: String, required: true },
    alt: { type: String, required: true },
    blur: { type: mongoose.Schema.Types.Mixed },
    price: { type: Number, required: true },
    sale: { type: Number, required: true },
    quantity: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    size: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Product = models.Product || model("Product", productSchema);
export default Product;
