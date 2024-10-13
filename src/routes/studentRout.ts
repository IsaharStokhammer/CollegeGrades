import express, { Router } from 'express';
import { createStudent, getGrades } from '../controllers/studentController.js';
import { createToken, findUserByToken } from '../Middlewares/authMiddelewre.js';
import { get } from 'mongoose';

const router: Router = express.Router();

/**
 * @swagger
 * /student/register:
 *  post:
 *      summary: create new student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          passportId:
 *                              type: number
 *                          password:
 *                              type: string 
 *                          role:
 *                              type: string
 *                      example: { fullName: "yossi", passportId: 123456789, password: "yossi123" , role: "student"}
 *      responses:
 *          201:
 *              description: new student created
 * 
 */
router.route("/register").post(createStudent);
/**
 * @swagger
 * /student/login:
 *  post:
 *      summary: login student
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: מחובר בהצלחה 
 */
router.route("/login").post(createToken);
/**
 * @swagger
 * /student/grades:
 *  get:
 *      summary: get student grades
 *      responses:
 *          200:
 *             description: A JSON array of all student grades
 */
router.route("/grades").get(findUserByToken,getGrades);
export default router