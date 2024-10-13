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
exports.editGrade = exports.removeGrade = exports.getAllUsers = exports.createTeacher = void 0;
const userModel_js_1 = __importDefault(require("../models/userModel.js"));
const userService_js_1 = require("../services/userService.js");
const createTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.body.role != "teacher") {
            res.status(400).json({ message: "role must be 'teacher' 🧑‍🏫", success: false });
            return;
        }
        const userToCreate = req.body;
        const newPassword = yield (0, userService_js_1.createNewPassword)(req.body.password);
        const newUserHashed = Object.assign(Object.assign({}, userToCreate), { password: newPassword });
        console.log(newUserHashed);
        const newUser = yield userModel_js_1.default.create(newUserHashed);
        res.status(201).json({ id: newUser._id, data: newUserHashed, success: true });
    }
    catch (error) {
        res.status(500).json({ data: "הגיע לכאצ' 🤯", success: false });
    }
});
exports.createTeacher = createTeacher;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield userModel_js_1.default.find();
        res.status(200).json({ data: users, success: true });
    }
    catch (error) {
        res.status(500).json({ data: error, success: false });
    }
});
exports.getAllUsers = getAllUsers;
const removeGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, userService_js_1.authorization)("teacher", req.body.user) == false) {
            res.status(400).json({ error: "this route is only for teachers", success: false });
            return;
        }
        const studentId = req.body.studentId;
        const subject = req.body.subject;
        const student = yield userModel_js_1.default.findById(studentId);
        if (!student) {
            res.status(400).json({ error: "student not found", success: false });
            return;
        }
        yield userModel_js_1.default.updateOne({ _id: studentId }, { $pull: { grades: { subject: subject } } });
        res.status(200).json({ data: student, success: true });
    }
    catch (error) {
        res.status(500).json({ data: error, success: false });
    }
});
exports.removeGrade = removeGrade;
const editGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((0, userService_js_1.authorization)("teacher", req.body.user) == false) {
            res.status(400).json({ error: "this route is only for teachers", success: false });
            return;
        }
        const studentId = req.body.studentId;
        const subject = req.body.subject;
        const grade = req.body.grade;
        const student = yield userModel_js_1.default.findById(studentId);
        if (!student) {
            res.status(400).json({ error: "student not found", success: false });
            return;
        }
        yield userModel_js_1.default.updateOne({ _id: studentId }, { $set: { grades: { subject: subject, grade: grade } } });
        res.status(200).json({ data: student, success: true });
    }
    catch (error) {
        res.status(500).json({ data: error, success: false });
    }
});
exports.editGrade = editGrade;
