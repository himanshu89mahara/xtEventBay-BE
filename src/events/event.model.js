import mongoose, { Schema } from "mongoose";
import { dateIsLessThan } from "../utils/mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  oracleId: {
    type: String,
    required: [true, "Oracle Id is required"],
  },
  careerStage: {
    type: String,
    required: [true, "Career Stage is required"],
  },
  photo: {
    type: String,
    required: false,
  },
});

export const eventSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start Date is required"],
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  frequency: {
    type: String,
    enum: {
      values: ["Weekly", "Fortnightly", "Monthly", "Quaterly"],
      message: "{VALUE} is not supported",
    },
    required: true,
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required."],
  },
  isNominationAllow: {
    type: Boolean,
    required: true,
    default: true,
  },
  nominationStartDate: {
    type: Date,
  },
  nominationEndDate: {
    type: Date,
  },
  presenters: [userSchema],
  image: String,
  youtubeURL: String,
  pid: Number,
  description: String,
  teamMembers: {
    type: [userSchema],
    validate: {
      validator: (v) => {
        if (v && v.length) {
          return true;
        } else {
          return false;
        }
      },
      message: "Atleast one Team member is required.1",
    },
  },
  createdBy: {
    type: userSchema,
    validate: {
      validator: (v) => {
        if (typeof v == "object" && Object.keys(v).length > 0) {
          return true;
        } else {
          return false;
        }
      },
      message: "Creator is required",
    },
  },
  isApproved: {
    type: Boolean,
    required: [false, "Approved Status is reqiuired"],
    default:false
  },
  interested: [userSchema],
  status: {
    type: String,
    enum: {
      values: ["Cancelled", "Active", "Rejected"],
      message: "{VALUE} is not supported",
    },
    required: [true, "Status is required"],
    default:"Active"
  },
  comment: {
    type: String,
    required: false,
    length: 300,
  },
});

eventSchema.pre(['validate', 'update','updateOne'], function (next) {
  if (this.endDate) {
    eventSchema.path("startDate").validators.pop();
    eventSchema.path("startDate").validators.push({
      validator: dateIsLessThan(this.endDate),
      message: "Start Date should be less than end Date",
    });
  }

  if (this.isNominationAllow) {
    eventSchema.path("nominationStartDate").validators = [
      {
        validator: (v) => {
          if (!v) {
            return false;
          } else {
            return true;
          }
        },
        message: "Nomination Start date should be required",
      },

      {
        validator: dateIsLessThan(this.nominationEndDate),
        message: "Start Date should be less than end Date",
      },
    ];
  }
 
  
  eventSchema.path("comment").validators.pop();
  eventSchema.path("comment").validate((v) => {
    if (this.status !== "Active") {
      return v && v.trim().length > 0;
    } else {
      return true;
    }
  }, "Comment is required");
  next();
});

const EventModel = mongoose.model("Event", eventSchema);
export default EventModel;
