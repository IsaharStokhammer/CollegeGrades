import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from "./swagger.js"
dotenv.config();

import studentRouter from './routes/studentRout.js';
import connectDb from './DAL/dbContext.js';
import teacherRouter from './routes/teacherRout.js';
import cookieParser from 'cookie-parser';




const app: express.Application = express();
const port : number = Number (process.env.PORT) || 3000;

// Middleware
connectDb();
app.use(express.json());
app.use('/swagger',swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cookieParser());

//routs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
/**
 * @swagger
 * /home:
 *  get:
 *      summary: get hello world
 *      responses:
 *          200:
 *             description: hello world
 */
app.use('/home', (req : express.Request, res : express.Response) => {
    res.send({"name": "hello world"})
})


app.listen(port, () => {
    console.log(`server started at http://localhost:${port} 🍿🍿`);
})