import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const productWomanSchema = new Schema(
  {
    slug: { type: String, required: true },
    imgProductPage: { type: Array, required: true },
    img: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    sizeSelection: { type: Array, required: true },
    atr: { type: String, required: true },
    alt: { type: String, required: true },
    blur: { type: mongoose.Schema.Types.Mixed },
    newPrice: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    newPriceString: { type: String, required: true },
    oldPriceString: { type: String, required: false },
    sale: { type: String, required: false },
    quantity: { type: Number, required: true, default: 0 },
    countInStock: { type: Number, required: true, default: 0 },
    size: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  }
);

const ProductWoman =
  models.ProductWoman || model("ProductWoman", productWomanSchema);
export default ProductWoman;
