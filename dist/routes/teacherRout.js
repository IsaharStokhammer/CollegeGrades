"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddelewre_js_1 = require("../Middlewares/authMiddelewre.js");
const teacherController_js_1 = require("../controllers/teacherController.js");
const authMiddelewre_js_2 = require("../Middlewares/authMiddelewre.js");
const router = express_1.default.Router();
router.route("/register").get((req, res) => {
    res.send("get request");
});
/**
 * @swagger
 * /teacher/allUsers:
 *  get:
 *      summary: get all users
 *      responses:
 *          200:
 *             description: A JSON array of all users
 */
router.route("/allUsers").get(authMiddelewre_js_2.findUserByToken, teacherController_js_1.getAllUsers);
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
router.route("/register").post(teacherController_js_1.createTeacher);
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
router.route("/login").post(authMiddelewre_js_1.createToken);
router.route("/removeGrade").put(authMiddelewre_js_2.findUserByToken, teacherController_js_1.removeGrade);
router.route("/editGrade").put(authMiddelewre_js_2.findUserByToken, teacherController_js_1.editGrade);
exports.default = router;
