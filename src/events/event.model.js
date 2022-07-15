import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  oracleId: {
    type: String,
    required: true,
  },
  careerStage: {
    type: String,
    required: true,
  },
});

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  isRecurring: {
    type: Boolean,
    required: true,
  },
  frequency: {
    type: String,
    enum: ["Weekly", "Fortnightly", "Monthly", "Quaterly"],
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isNominationAllow: {
    type: Boolean,
    required: true,
  },
  nominationStartDate: {
    type: Date,
    required: true,
  },
  nominationEndDate: {
    type: Date,
    required: true,
  },
  presenters: [userSchema],
  image: String,
  youtubeURL: String,
  pid: Number,
  description: Text,
  teamMembers: [userSchema],
  isApproved: {
    type: Boolean,
    required: true,
  },
  interested:[userSchema],
  status: {
    type: String,
    enum: ["Cancelled", "Active", "Rejected"],
    required: true,
  },
  statusComment: {
    type: String,
    required: true,
    length: 300,
  }
});

export default EventModel = mongoose.model("Event",eventSchema);
