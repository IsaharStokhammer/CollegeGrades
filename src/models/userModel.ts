import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        fullName:{
            type:String,
            required:[true,"please enter the full name"]

        },
        email:{
            type:String,
            required:[true,"please enter the email"]
            
        },
        password: {
            type : String,
            required: true            
        },
        role:{
            type:String,
            required: true
        },
        
}

)
export default mongoose.model("user",UserSchema);
















