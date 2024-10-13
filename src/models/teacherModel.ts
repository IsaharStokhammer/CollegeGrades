import mongoose, { Schema, Document, Types } from "mongoose";
import validator from "validator";

export interface ITeacher extends Document{
    _id:Types.ObjectId,
    fullName :string,
    email:string ,
    password:string,
    className :string
    // classId : Types.ObjectId
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
          message: "is not a valid email!"
        }
      },
      password:{
        type:String,
        required:true,
        minlength :[9,"username most be 9 "],
        maxlength:[9,"its bagger then 9"],
      },
      className:{
        type:String,
        required:true,
        minlength :[2,"username most be 9 "],
        maxlength:[15,"its bagger then 9"]
      }
    //   classId:{type:Schema.Types.ObjectId,ref:"Classes"}

})
export default mongoose.model<ITeacher>("Teachers",TeacherSchema)