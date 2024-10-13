import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:[true,"please enter the full name"],
            unique:[true,"name is already exists"]

        },
        email:{
            type:String,
            required: [true, "please enter the email"],         
            
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
                score: Number,
            }]
        },
        className:{
            type: String
        }

}

)
export default mongoose.model("user",UserSchema);
















