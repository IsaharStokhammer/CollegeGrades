import { timeStamp } from "console";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document{
    _id:Types.ObjectId,
    title:string,
    teacher:Types.ObjectId
    students:Types.ObjectId[]

}
const ClassSchema = new Schema<IClass>({
    title:{
        type:String,
        required:[true,"title is required"],
        unique:true,
        minlength :[3,"username most by"],
        maxlength:[30,"its bagger then 30 "]

    },
    teacher:{
        type:Schema.Types.ObjectId,ref:"Teachers",
    
    },
    students:[{type:Schema.Types.ObjectId,ref:"Students"}]
})

export default mongoose.model<IClass>("Classes",ClassSchema)