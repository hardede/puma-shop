import mongoose from 'mongoose'
const { Schema, model, models } = mongoose;

const productSchema = new Schema(
  {
    productFor: { type: String, required: true },
    slug: { type: String, required: true },
    imgProductPage: { type: Array, required: true },
    img: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    sizeSelection: { type: Array, required: true },
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

const Product =
  models.Product || model("Product", productSchema);
export default Product;
