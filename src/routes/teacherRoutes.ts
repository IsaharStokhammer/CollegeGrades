import { Router } from "express";
import {createToken}from "../middleware/middeleWere"
import {
createTeacher
  
} from "../controllers/teacherController";

const teacherRouter = Router();
/**
 * @swagger
 * /api/users:
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
  
 *     responses:    
 *       201:               
 *         description: A JSON of the created user
 *  
 */
teacherRouter.post("/register",createTeacher);
teacherRouter.post("/loginTeacher",createToken );
teacherRouter.put("/addGrade", );
teacherRouter.get("/getAllStudents", );
teacherRouter.post("/editGrade", );


export default teacherRouter;
