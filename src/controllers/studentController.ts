import { NextFunction,Request,Response } from "express";
import Class, { IClass } from "../models/classModel";
import Student ,{ IStudent,IGrads } from "../models/studentsModel";
import Teacher ,{ITeacher} from "../models/teacherModel";
import bcrypt from "bcrypt";

export const createStudent = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
        const student: IStudent = await Student.create(req.body);
        res.status(201).json({newStudentId: student._id});
    } catch (error) {
        next(error)        
    }
};


export const getAllGradesOfStudent = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const teacher = await Teacher.findById(req.body.teacherId);
        if(!teacher){
            throw new Error("access denied🤐");
        }
        const student: IStudent | null = await Student.findById(req.params.studentId).populate("grades");
        if(!student){
            throw new Error("student does not exist");
        }
        res.status(200).json(student);
    } catch (error) {
        next(error)        
    }
}