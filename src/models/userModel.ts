import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:[true,"please enter the full name"],
            unique:[true,"name is already exists"]

        },
        passportId:{
            type:Number,
            required:true,
            length:[9,"please enter 9 numbers"]
            
        }
        ,role:{
            type:String,
            required: true


        },
        password: {
            type : String,
            required: true            
        },
        grades:{
            type: [{
                subject: String,
                score: Number
            }]
    }
}

)
export default mongoose.model("user",UserSchema);
















