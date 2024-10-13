"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_js_1 = require("./swagger.js");
dotenv_1.default.config();
const studentRout_js_1 = __importDefault(require("./routes/studentRout.js"));
const dbContext_js_1 = __importDefault(require("./DAL/dbContext.js"));
const teacherRout_js_1 = __importDefault(require("./routes/teacherRout.js"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
// Middleware
(0, dbContext_js_1.default)();
app.use(express_1.default.json());
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.swaggerSpec));
app.use((0, cookie_parser_1.default)());
//routs
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_js_1.swaggerSpec));
app.use('/student', studentRout_js_1.default);
app.use('/teacher', teacherRout_js_1.default);
/**
 * @swagger
 * /home:
 *  get:
 *      summary: get hello world
 *      responses:
 *          200:
 *             description: hello world
 */
app.use('/home', (req, res) => {
    res.send({ "name": "hello world" });
});
app.listen(port, () => {
    console.log(`server started at http://localhost:${port} 🍿🍿`);
});
