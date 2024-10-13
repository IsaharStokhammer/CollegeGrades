import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import studentModel from "../models/studentsModel";
import teacherModel from "../models/teacherModel";


dotenv.config();

const SECRET_KEY: string = process.env.SECRET_KEY || "your_secret_key_here";

export const createToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  const name = req.body.fullName;
  const password:string = req.body.password;


  if (!name) {
    res.status(400).json({ error: "User ID is required to create a token." });
    return;
  }
  const user = await studentModel.findOne({fullName :name})|| await teacherModel.findOne({fullName :name});
  console.log(user)
  if(!user){
    res.status(402).json({error:"user not found"})
    return
  }
  if(!user.password){
    res.status(402).json({error:"something went wrong"});
    return
  }

  if(!await bcrypt.compare(password , user.password as string)){
    res.status(401).json({error:"invalid password", success:false, "הסיסמא שהבאת:":password, "הסיסמא הנכונה:":user.password});
    return
  }
  const userId = user._id;
  if (!userId) {  
    res.status(400).json({ error: "we could not find userId" });
    return;
  }

  const token = jwt.sign({ id: userId }, SECRET_KEY, { expiresIn: "1h" });
  
  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  

  res.status(200).json({ message: "Token created and set in cookie." ,token:token});
  
  next(); 
};



export const findUserByToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  
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
      const decoded = jwt.verify(token, SECRET_KEY) as { id: string };

      const user = await studentModel.findById(decoded.id)||await teacherModel.findById(decoded.id)
      if (!user) {
        res.status(404).json({ error: "User not found.", success: false });
      
        return;
      }

      req.body.user = user;
      next();
      
    } catch (error) {
      res.status(401).json({ error: "Invalid token.", success: false });
      return;
    }
};
