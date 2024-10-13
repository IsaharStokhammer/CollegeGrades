"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middeleWere_1 = require("../middleware/middeleWere");
// import {
// } from "../controllers/postController";
const teacherRouter = (0, express_1.Router)();
teacherRouter.post("/createTeacher");
teacherRouter.post("/loginTeacher", middeleWere_1.createToken);
teacherRouter.put("/addGrade");
teacherRouter.get("/getAllStudents");
teacherRouter.post("/editGrade");
exports.default = teacherRouter;
