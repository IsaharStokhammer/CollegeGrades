"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByToken = exports.createToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentsModel_1 = __importDefault(require("../models/studentsModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
dotenv_1.default.config();
const SECRET_KEY = process.env.SECRET_KEY || "your_secret_key_here";
const createToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    const password = req.body.password;
    if (!id) {
        res.status(400).json({ error: "User ID is required to create a token." });
        return;
    }
    const findUser = (yield studentsModel_1.default.findOne({ _id: id })) || (yield teacherModel_1.default.findOne({ _id: id }));
    console.log(findUser);
    if (!findUser) {
        res.status(402).json({ error: "user not find" });
        return;
    }
    // if(!await bcrypt.compare(password , findUser.password)){
    //   res.status(401).json({error:"invalid password"})
    // }
    const token = jsonwebtoken_1.default.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    req.body.token = token;
    res.status(200).json({ message: "Token created and set in cookie.", token: token });
    next();
});
exports.createToken = createToken;
const findUserByToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.cookies) {
        res.status(401).json({ error: "No cookies found.", success: false });
        return;
    }
    const token = req.cookies.token;
    if (!token) {
        res.status(401).json({ error: "No token provided.", success: false });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, SECRET_KEY);
        const user = (yield studentsModel_1.default.findById(decoded.id)) || (yield teacherModel_1.default.findById(decoded.id));
        if (!user) {
            res.status(404).json({ error: "User not found.", success: false });
            return;
        }
        req.body.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token.", success: false });
        return;
    }
});
exports.findUserByToken = findUserByToken;
