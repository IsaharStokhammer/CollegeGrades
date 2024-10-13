import { NextFunction,Request,Response } from "express";
import Class, { IClass } from "../models/classModel";
import Student ,{ IStudent,IGrads } from "../models/studentsModel";
import Teacher ,{ITeacher} from "../models/teacherModel";

export const createTeacher = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const teacher: ITeacher = await Teacher.create(req.body);
        const classname : string = teacher.className;
        const teacherId = teacher._id;
        const newClass :IClass = await Class.create({
            className: classname,
            teacher:teacherId
        });
        res.status(201).json({classId: newClass._id})
    } catch (error) {
        next(error)        
    }
};

export const getAllStudentsGrades = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const students : IStudent[] = await Student.find({teacher: req.body.teacherId}).populate("grades");
        res.status(200).json(students);
    } catch (error) {
        next(error);
    }
};

export const getAverageGrade = async (req:Request,res:Response,next:NextFunction)=>{

}