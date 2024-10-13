import { Router } from "express";
import {createToken}from "../middleware/middeleWere"
import {createTeacher} from "../controllers/teacherController";
import { createStudent } from "../controllers/studentController";

const teacherRouter = Router();
/**
 * @swagger
 * /api/users:
 *   post:  
 *     summary: Create a new student
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
  
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 *  
 */
teacherRouter.post("/register",createStudent);
teacherRouter.post("/login",createToken);
teacherRouter.put("/addGrade", );
teacherRouter.get("/getAllStudents", );
teacherRouter.post("/editGrade", );


export default teacherRouter;
