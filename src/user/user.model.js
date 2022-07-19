import mongoose, { Schema } from "mongoose";
import { findEmployee } from "../utils/employee";

const validateEmail = (email) => {
  return true;
};

const userSchema = new Schema({
  email: {
    type: String,
    validate: [
      {
        validator: (v) => {
          return v.trim().length > 0;
        },
        message: "Email is required",
      },
      {
        validator: (v) => {
          return /@publicissapient\.com$/.test(v);
        },
        message: (props) => "Email is not publicis sapient email.",
      },
      {
        validator: async (v) => {
          try {
            const user = await findEmployee(v);
            return Promise.resolve(true);
          } catch (err) {
            return Promise.resolve(false);
          }
        },

        message: (props) => "Email is not found email.",
      },
    ],
  },
  otp: {
    type: String,
    required: false,
  },
  verifyKey: {
    type: String,
    required: false,
  },
  oracleId: {
    type: Number,
    required: false,
  },
  carrerStage: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);
export const generateObjectId = () => {
  const ObjectId = new mongoose.Types.ObjectId();
  return ObjectId.toString();
};
export default UserModel;
