import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'

dotenv.config(); 

const SECRET_KEY: string = process.env.SECRET_KEY || "your_secret_key_here";


export const createToken = async (req: Request, res: Response): Promise<void> => {
  const id = req.body.id;
  const password = req.body.password;
  console.log(password);
  if (!id || !password) {
    res.status(400).json({ error: "User ID and password are required to create a token." , success: false});
    return;
  }
  const user = await userModel.findOne({_id : id});
  if (!user) {
    res.status(404).json({ error: "User not found." , success: false});
    return;
  }
  if (!await bcrypt.compare(password, user.password)) {
    res.status(401).json({ error: "Invalid password." , success: false});
    return;
  }
  const token = jwt.sign({ id }, SECRET_KEY, { expiresIn: "1h" });
  

  res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
  req.body.token = token;
  res.status(200).json({ message: "Token created and set in cookie." , Token: token, success: true});
  
  return;
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

    const user = await userModel.findById(decoded.id);
    if (!user) {
      res.status(404).json({ error: "User not found.", success: false });
    
      return;
    }

    req.body.user = user;
    console.log(user);
    next();
    
  } catch (error) {
    res.status(401).json({ error: "Invalid token.", success: false });
    return;
  }
};















