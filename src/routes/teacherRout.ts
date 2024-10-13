import express, { Router } from 'express';
import { createToken } from '../Middlewares/authMiddelewre.js';
import { createTeacher, editGrade, getAllUsers, removeGrade } from '../controllers/teacherController.js';
import { findUserByToken } from '../Middlewares/authMiddelewre.js';

const router: Router = express.Router();

router.route("/register").get((req, res) => {
    res.send("get request");
})
/**
 * @swagger
 * /teacher/allUsers:
 *  get:
 *      summary: get all users
 *      responses:
 *          200:
 *             description: A JSON array of all users
 */
router.route("/allUsers").get(findUserByToken, getAllUsers);
/**
 * @swagger
 * /teacher/register:
 *  post:
 *      summary: create new teacher
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fullName:
 *                              type: string
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          201:
 *              description: created
 */
router.route("/register").post(createTeacher);
/**
 * @swagger
 * /teacher/login:
 *  post:
 *      summary: login teacher
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
 *              description: log in 
 */
router.route("/login").post(createToken);
router.route("/removeGrade").put(findUserByToken, removeGrade);
router.route("/editGrade").put(findUserByToken, editGrade);
export default router