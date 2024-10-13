import { NextFunction,Request,Response } from "express";
import Class, { IClass } from "../models/classModel";
import Student ,{ IStudent,IGrads } from "../models/studentsModel";
import Teacher ,{ITeacher} from "../models/teacherModel";

export const createTeacher = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const teacher:ITeacher = await Teacher.create(req.body);
        const classname = teacher.className;
        const teacherId = teacher._id;
        const clas:IClass = await Class.create({
            classNane: classname,
            teacher:teacherId
        });
        res.status(201).json({idOfClass:clas._id})
    } catch (error) {
        
    }
}