import mongoose from "mongoose";

export const imgSchema = new mongoose.Schema(
  {
    productImg: { type: String, require: true },
  },
  { _id: false }
);

export const sizeSchema = new mongoose.Schema(
  {
    sizeEur: { type: Number, require: true },
    sizeUK: { type: Number, require: true },
    sizeCountInStock: { type: Number, require: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
      {
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
    ],
    shippingAddress: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      email: { type: String, required: true },
      city: { type: String, required: true },
      phone: { type: String, required: true },
    },
    totalPrice: { type: String, required: true },
    totalQuantity: { type: Number, required: true },
    totalValueString: { type: String, required: true },
    discount: { type: Number, required: true },
    discountString: { type: String, required: true },
    activeCard: { type: Boolean, required: true },
    discountByCardString: { type: String, required: true },
    totalPriceWithCard: { type: Number, required: true },
    totalPriceWithCardString: { type: String, required: true },
    paidAt: { type: String, required: true },
    deliveredAt: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;
