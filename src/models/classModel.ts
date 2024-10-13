import { timeStamp } from "console";
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IClass extends Document{
    _id:Types.ObjectId,
    className:string,
    teacher:Types.ObjectId
    students:Types.ObjectId[]

}
const ClassSchema = new Schema<IClass>({
    className:{
        type:String,
        required:[true,"className is required"],
        unique:true,
        minlength :[3,"className most by more then 3"],
        maxlength:[30,"className most by less then 30"],

    },
    teacher:{
        type:Schema.Types.ObjectId,ref:"Teachers",
    
    },
    students:[{type:Schema.Types.ObjectId,ref:"Students"}]
})

export default mongoose.model<IClass>("Classes",ClassSchema)