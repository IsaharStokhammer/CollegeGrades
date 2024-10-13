import { Router } from "express";
import {createToken, findUserByToken}from "../middleware/middeleWere"
import {
createTeacher,
addGrade,
getAllStudents,
getAllStudentsGrades, 
editGrade
} from "../controllers/teacherController";

const teacherRouter = Router();
/**
 * @swagger
 * /teacher/register:
 *   post:  
 *     summary: Create a new teacher
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
 *                        className:
 *                          type: string
 *                          description: The email of the user
 *                      example: { fullName: "testingTeacher", email: "testingTeacher@me.com", password: "123456789", className: "class100" }  
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 *  
 */
teacherRouter.post("/register",createTeacher);
/**
 * @swagger
 * /teacher/loginTeacher:
 *   post:  
 *     summary: Create a new teacher
 *     requestBody:
 *                required: true
 *                content:                          
 *                  application/json:
 *                    schema:   
 *                      type: object    
 *                      properties:
 *                        email:
 *                          type: string
 *                          description: The email of the teacher
 *                        password:
 *                          type: string
 *                          description: The email of the user

 *                      example: { email: "100@gmail.com", password: "123456789"}
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 */
teacherRouter.post("/loginTeacher",createToken );
/**
 * @swagger
 * /teacher/addGrade:
 *   put:  
 *     summary: Create a new teacher
 *     requestBody:
 *                required: true
 *                content:                          
 *                  application/json:
 *                    schema:   
 *                      type: object    
 *                      properties:
 *                        studentId:
 *                          type: string
 *                          description: id of the student
 *                        grade:
 *                          type: string
 *                          description: the grade 
 *                        comment:
 *                          type: string
 *                          description: ההערות של המורה 
 *                      example: { studentId: "670bb458dad2eb26ab4163c2", grade: "5", comment: "good" }
 *     responses:    
 *       201:               
 *         description: success
 */
teacherRouter.put("/addGrade", addGrade);
/**
 * @swagger
 * /teacher/getAllStudents:
 *   get:  
 *     summary: Get All Students of a teacher
 *     requestBody:
 *                required: true
 *                content:                          
 *                  application/json:
 *                    schema:   
 *                      type: object    
 *                      properties:
 *                        teacherId:
 *                          type: string
 *                          description: id of the student
 *                      example: { teacherId: "670bb458dad2eb26ab4163c2" }
 *     responses:    
 *       201:               
 *         description: success
 */
teacherRouter.get("/getAllStudents", getAllStudents);
teacherRouter.put("/editGrade", editGrade);


export default teacherRouter;
