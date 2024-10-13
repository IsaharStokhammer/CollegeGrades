"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    fullName: {
        type: String,
        required: [true, "please enter the full name"],
        unique: [true, "name is already exists"]
    },
    email: {
        type: String,
        required: [true, "please enter the email"],
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    grades: {
        type: [{
                subject: String,
                score: Number,
            }]
    },
    className: {
        type: String
    }
});
exports.default = mongoose_1.default.model("user", UserSchema);
