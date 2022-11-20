import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [
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
    totalPriceOld: { type: String, required: true },
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
