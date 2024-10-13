import express from 'express';
import userModel from '../models/userModel.js';
import dbContext from '../DAL/dbContext.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createNewPassword, authorization } from '../services/userService.js';

export const createTeacher = async (req: express.Request, res: express.Response) => {
    try {
        if(req.body.role != "teacher"){
            res.status(400).json({message:"role must be 'teacher' 🧑‍🏫",success:false}) 
            return;
        }
        const userToCreate = req.body;
        const newPassword = await createNewPassword(req.body.password);
        const newUserHashed = {...userToCreate, password: newPassword}
        console.log(newUserHashed);
        const newUser = await userModel.create(newUserHashed);
        res.status(201).json({id: newUser._id, data: newUserHashed, success: true});
    } catch (error) {
        res.status(500).json({data: "הגיע לכאצ' 🤯", success: false});
    }
}

export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        const users = await userModel.find();
        res.status(200).json({data: users, success: true});
    } catch (error) {
        res.status(500).json({data: error, success: false});
    }
}

export const removeGrade = async (req: express.Request, res: express.Response) => {
    try {
        if (authorization("teacher", req.body.user) == false) {
            res.status(400).json({error: "this route is only for teachers", success: false});
            return;
        }
        
        const studentId = req.body.studentId;
        const subject = req.body.subject;
        const student = await userModel.findById(studentId);
        if (!student) {
            res.status(400).json({error: "student not found", success: false});
            return;
        }
        await userModel.updateOne({ _id: studentId }, { $pull: { grades: { subject: subject } } });
        res.status(200).json({data: student, success: true});
    } catch (error) {
        res.status(500).json({data: error, success: false});
    }
}
export const editGrade = async (req: express.Request, res: express.Response) => {
    try {
        if (authorization("teacher", req.body.user) == false) {
            res.status(400).json({error: "this route is only for teachers", success: false});
            return;
        }
        const studentId = req.body.studentId;
        const subject = req.body.subject;
        const grade = req.body.grade;
        const student = await userModel.findById(studentId);
        if (!student) {
            res.status(400).json({error: "student not found", success: false});
            return;
        }
        await userModel.updateOne({ _id: studentId }, { $set: { grades: { subject: subject, grade: grade } } });
        res.status(200).json({data: student, success: true});
    } catch (error) {
        res.status(500).json({data: error, success: false});
    }
}