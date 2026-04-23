import mongoose from "mongoose";

const paymentPurchaseSchema = new mongoose.Schema(
  {
    razorpayOrderId: {
      type: String,
      required: true,
      trim: true,
    },
    razorpayPaymentId: {
      type: String,
      required: true,
      trim: true,
    },
    razorpaySignature: {
      type: String,
      required: true,
      trim: true,
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "cd_sankalp_course_detail_pages",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    mobile_no: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },

    invoice_no: {
      type: String,
      default: "",
      trim: true,
    },
    product_price: {
      type: Number,
      default: 0,
    },
    gst_amount: {
      type: Number,
      default: 0,
    },
    convenience_fee: {
      type: Number,
      default: 0,
    },
    total_amount: {
      type: Number,
      default: 0,
    },
    payment_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentPurchase = mongoose.model(
  "payment_purchases",
  paymentPurchaseSchema
);

export default PaymentPurchase;