import { NextFunction,Request,Response } from "express";
import Class, { IClass } from "../models/classModel";
import Student ,{ IStudent,IGrads } from "../models/studentsModel";
import Teacher ,{ITeacher} from "../models/teacherModel";
import { findUserByToken } from "../middleware/middeleWere";

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
export const getAllStudents = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const students : IStudent[] = await Student.find({teacher: req.body.teacherId});
        res.status(200).json(students);
    } catch (error) {
        next(error);
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
export const addGrade = async (req:Request,res:Response,next:NextFunction)=>{

    try {
        await findUserByToken(req,res,next);
        const teacher = req.body.user;
        if(!teacher){
            throw new Error("access denied🤐");
        };
        if(teacher.role !== "teacher"){
            throw new Error("access denied, you are not a teacher");
        }
        const student: IStudent | null = await Student.findById(req.body.studentId);
        if(!student){
            throw new Error("student does not exist");
        };
        student.grades.push(req.body);
        res.status(201).json({success: true});
    } catch (error) {
        next(error)        
    }

};
export const editGrade = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const newGrade = req.body.newGrade;
        await findUserByToken(req,res,next);
        const teacher = req.body.user;
        if(!teacher){
            throw new Error("access denied🤐");
        };
        if(teacher.role !== "teacher"){
            throw new Error("access denied, you are not a teacher");
        }
        const student: IStudent | null = await Student.findById(req.body.studentId);
        if(!student){
            throw new Error("student does not exist 🤷‍♀️");
        };
        const gradeIndex = student.grades.findIndex((grade) => grade._id.toString() === req.body._id.toString());
        if (gradeIndex === -1) {
            throw new Error("grade does not exist 🤷‍♀️");
        };
        student.grades[gradeIndex] = newGrade;
        res.status(201).json({success: true, messege: `grade updated successfully to ${newGrade}`});
    } catch (error) {
        next(error) 
    }
};