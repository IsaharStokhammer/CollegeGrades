import { Router } from "express";
import {createToken}from "../middleware/middeleWere"
import {createTeacher} from "../controllers/teacherController";
import { createStudent ,getAllGradesOfStudent} from "../controllers/studentController";
import { errorHandler } from "../middleware/errorHandler";

const studentRouter = Router();
/**
 * @swagger
 * /student/register:
 *   post:  
 *     summary: Create a new student
 *     requestBody:
 *                required: true
 *                content:                          
 *                  application/json:
 *                    schema:   
 *                      type: object    
 *                      properties:
 *                        fullName:
 *                          type: string
 *                          description: The name of the user
 *                        email:
 *                          type: string
 *                          description: The email of the user  
 *                        password:
 *                          type: string
 *                          description: The email of the user  
 *                        classId:
 *                          type: string
 *                          description: The email of the user
 *                      example: { fullName: "yossi", email: "yossi@me.com", password: "123456789", classId: "670bb22216032258de40281b" }
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 *  
 */
studentRouter.post("/register",createStudent, errorHandler);
/**
 * @swagger
 * /student/login:
 *   post:  
 *     summary: Create a new student
 *     requestBody:
 *                required: true
 *                content:                          
 *                  application/json:
 *                    schema:   
 *                      type: object    
 *                      properties:
 *                        email:
 *                          type: string
 *                          description: The email of the user 
 *                        password:
 *                          type: string
 *                          description: The password of the user
 *                      example: { email: "3@gmail.com", password: "123456789", id: "670bb458dad2eb26ab4163c2" }
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 *  
 */
studentRouter.post("/login",createToken, errorHandler);

studentRouter.get("/getGrades", getAllGradesOfStudent, errorHandler);

export default studentRouter;
