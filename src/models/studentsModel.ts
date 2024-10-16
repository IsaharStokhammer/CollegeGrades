import { kMaxLength } from "buffer";
import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IGrads extends Document{
  _id:Types.ObjectId,
  grade?: number,
  Comment?:string,
  studentId:Types.ObjectId,
}
const GradSchame = new Schema<IGrads>({
  grade:{
    type:Number,
    max:100
  },
  Comment:{
    type:String,
    required:true,
    maxlength:300
  },
  studentId:{
    type:Schema.Types.ObjectId,ref:"Students",
    required:[true,"studentId is required"]
  }
})
export interface IStudent extends Document{
  _id:Types.ObjectId;
  fullName:string,
  email?:string,
  password?:string,
  classId?:Types.ObjectId,
  role?:string,
  grades:Types.ObjectId[]
}
const StudentSchema = new Schema<IStudent>({
  fullName:{
    type:String,
    required :[true,"fullName  is required"],
    minlength :[3,"username most by"],
    maxlength:[30,"its bagger then 30 "],

},
  email:{
    type:String,
    required :[true,"user name is required"],
    unique:true,
    validate: {
      validator: (email: string) => validator.isEmail(email),
      message: "invalid email😕!"
    }
  },
  classId:{
    type:Schema.Types.ObjectId,ref:"Classes",
    required:[true,"classId is required"]
  },
  password:{
    type:String,
    required:true,
    minlength :[9,"password most be 9 chars"],
  },
  role:{
    type:String,
    default:"student"
  },
  grades:[GradSchame],
  

})
export default mongoose.model<IStudent>("Students",StudentSchema)
