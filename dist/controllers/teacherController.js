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
exports.createTeacher = void 0;
const classModel_1 = __importDefault(require("../models/classModel"));
const teacherModel_1 = __importDefault(require("../models/teacherModel"));
const createTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacher = yield teacherModel_1.default.create(req.body);
        const classname = teacher.className;
        const teacherId = teacher._id;
        const clas = yield classModel_1.default.create({ classNane: classname, teacher: teacherId });
        res.status(201).json({ idOfClass: clas._id });
    }
    catch (error) {
    }
});
exports.createTeacher = createTeacher;
