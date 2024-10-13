import express from 'express';
import userModel from '../models/userModel.js';
import dbContext from '../DAL/dbContext.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { authorization, createNewPassword } from '../services/userService.js';

export const createStudent = async (req: express.Request, res: express.Response) => {
    try {
        if(req.body.role != "teacher"){
            res.status(400).json({message:"role must be 'student' 🧑‍🎓",success:false}) 
            return;
        }
        const userToCreate = req.body;
        const newPassword = await createNewPassword(req.body.password);
        console.log(newPassword);
        const newUserHashed = {...userToCreate, password: newPassword}
        const newUser = await userModel.create(newUserHashed);
        res.status(201).json({id: newUser._id, data: newUserHashed, success: true});
    } catch (error) {
        res.status(500).json({err: error, success: false});
    }
}


export const getGrades = async (req: express.Request, res: express.Response) => {
    try {
        const studentId = req.body.user.id;
        const student = await userModel.findById(studentId);
        if (authorization("student", student) == false) {
            res.status(400).json({error: "this route is only for students", success: false});
            return;
        }
        if (!student) { 
            res.status(400).json({error: "student not found", success: false});
            return;
        }
        const grades = student.grades;
        res.status(200).json({data: grades, success: true});        
    } catch (error) {
        res.status(500).json({data:"שורה 37 בקונטרולר סטודנטים", success: false});
    }
}