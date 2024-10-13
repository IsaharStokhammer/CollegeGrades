"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGrades = exports.createStudent = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const userService_js_1 = require("../services/userService.js");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.role != "teacher") {
            res.status(400).json({ message: "role must be 'student' 🧑‍🎓", success: false });
            return;
        }
        const userToCreate = req.body;
        const newPassword = yield (0, userService_js_1.createNewPassword)(req.body.password);
        console.log(newPassword);
        const newUserHashed = Object.assign(Object.assign({}, userToCreate), { password: newPassword });
        const newUser = yield userModel_js_1.default.create(newUserHashed);
        res.status(201).json({ id: newUser._id, data: newUserHashed, success: true });
    }
    catch (error) {
        res.status(500).json({ err: error, success: false });
    }
});
exports.createStudent = createStudent;
const getGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const studentId = req.body.user.id;
        const student = yield userModel_js_1.default.findById(studentId);
        if ((0, userService_js_1.authorization)("student", student) == false) {
            res.status(400).json({ error: "this route is only for students", success: false });
            return;
        }
        if (!student) {
            res.status(400).json({ error: "student not found", success: false });
            return;
        }
        const grades = student.grades;
        res.status(200).json({ data: grades, success: true });
    }
    catch (error) {
        res.status(500).json({ data: "שורה 37 בקונטרולר סטודנטים", success: false });
    }
});
exports.getGrades = getGrades;
