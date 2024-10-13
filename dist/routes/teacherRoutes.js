"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middeleWere_1 = require("../middleware/middeleWere");
const teacherController_1 = require("../controllers/teacherController");
const teacherRouter = (0, express_1.Router)();
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
teacherRouter.post("/register", teacherController_1.createTeacher);
teacherRouter.post("/loginTeacher", middeleWere_1.createToken);
teacherRouter.put("/addGrade");
teacherRouter.get("/getAllStudents");
teacherRouter.post("/editGrade");
exports.default = teacherRouter;
