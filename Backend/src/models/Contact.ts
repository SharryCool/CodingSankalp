import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },

    // Mobile with Country Code selector
    mobile: {
      type:String,
      required:true
    },

    message: { type: String, required: true, trim: true },

  },
  { timestamps: true }
);



const Contact = mongoose.models.Contact || mongoose.model("cd_sankalp_details", contactSchema);
export default Contact;
