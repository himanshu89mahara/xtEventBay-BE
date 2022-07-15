import mongoose, { Schema } from "mongoose";

const userSchema =  new Schema({
    email:{
        type:String,
        required: true
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

export default UserModel = mongoose.model('User',userSchema);

