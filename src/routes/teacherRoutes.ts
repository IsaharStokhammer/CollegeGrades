import { Router } from "express";
import {createToken, findUserByToken}from "../middleware/middeleWere"
import {
createTeacher,
addGrade, 
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
 *                        username:
 *                          type: string
 *                          description: The name of the user
 *                        email:
 *                          type: string
 *                          description: The email of the user  
 *                        password:
 *                          type: string
 *                          description: The email of the user  
 *                      example: { username: "teacher1", email: "teacher1@me.com", password: "123456789" }
  
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
 *                        username:
 *                          type: string
 *                          description: The name of the user
 *                        password:
 *                          type: string
 *                          description: The email of the user  
 *                      example: { username: "teacher1", password: "123456789" }
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 */
teacherRouter.post("/loginTeacher",createToken );
/**
 * @swagger
 * /teacher/addGrade:
 *   post:  
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
teacherRouter.get("/getAllStudents", );
teacherRouter.post("/editGrade", );


export default teacherRouter;
