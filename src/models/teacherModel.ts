import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document{
    _id:Types.ObjectId,
    fullName :string,
    email:string ,
    password:string,
    className :string
}

const TeacherSchema= new Schema<ITeacher>({
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
      password:{
        type:String,
        required:true,
        minlength :[9,"password most be 9 chars"]
      },
      className:{
        type:String,
        required:true,
        minlength :[2,"className most be more then 2 chars"],
        maxlength:[15,"className most be less then 15 chars"],
      }

})
export default mongoose.model<ITeacher>("Teachers",TeacherSchema)