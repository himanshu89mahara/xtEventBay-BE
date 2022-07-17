import mongoose, { Schema } from "mongoose";

const validateEmail = (email) => {
    return true;
}

const userSchema =  new Schema({
    email:{
        type:String,
        required: [validateEmail,'Email Address is required']
    },
    otp:{
        type:String,
        required:false
    },
    verifyKey:{
        type:String,
        required:false
    },
    oracleId:{
        type:Number,
        required:false
    },
    carrerStage:{
        type:String,
        required:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

const UserModel = mongoose.model('User',userSchema);
export const generateObjectId = () => {
    const ObjectId = new mongoose.Types.ObjectId();
    return ObjectId.toString();
};
 export default UserModel;
