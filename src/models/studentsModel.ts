import { kMaxLength } from "buffer";
import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface IGrads extends Document{
  _id:Types.ObjectId,
  grade?: number,
  Comment?:string 
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
  }
})
export interface IStudent extends Document{
  _id:Types.ObjectId;
  fullName:string,
  email?:string,
  password?:string,
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
      message: "is not a valid email!"
    }
  },
  password:{
    type:String,
    required:true,
    minlength :[9,"username most be 9 "],
    maxlength:[9,"its bagger then 9"],
  },
  grades:[GradSchame]

})
export default mongoose.model<IStudent>("Students",StudentSchema)
