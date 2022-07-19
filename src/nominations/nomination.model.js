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
const attachmentSchema = new Schema({
    filename:String

})

const nominationSchema = new Schema({
    user:userSchema,
    eventId:{
        type:String,
        required:true
    },
    synopsis:{
        type:String,
        required:true
    },
    attachments:[attachmentSchema],
    duration:Number,
    isApproved:{
        type:Boolean,
        required:true
    },
    status:{
        type:String,
        enum:["Active","Rejected","Withdraw"],
        required:true
    },
    statusCommnet:{
        type:String,
        length:300
    }

});

export default NominationModel = mongoose.model("Nomination", nominationSchema);