"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentController_js_1 = require("../controllers/studentController.js");
const authMiddelewre_js_1 = require("../Middlewares/authMiddelewre.js");
const router = express_1.default.Router();
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
router.route("/register").post(studentController_js_1.createStudent);
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
router.route("/login").post(authMiddelewre_js_1.createToken);
/**
 * @swagger
 * /student/grades:
 *  get:
 *      summary: get student grades
 *      responses:
 *          200:
 *             description: A JSON array of all student grades
 */
router.route("/grades").get(authMiddelewre_js_1.findUserByToken, studentController_js_1.getGrades);
exports.default = router;
