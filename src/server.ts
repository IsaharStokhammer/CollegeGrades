import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import {swaggerSpec} from "./swagger.js"
dotenv.config();

// import teacherRouter from './routes/teacherRout';
import studentRouter from './routes/studentRout.js';
import connectDb from './DAL/dbContext.js';
import teacherRouter from './routes/teacherRout.js';
import cookieParser from 'cookie-parser';




const app: express.Application = express();
const port : number = Number (process.env.PORT) || 3000;

connectDb()

app.use(express.json());
app.use(cookieParser());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/student', studentRouter);
app.use('/teacher', teacherRouter);
app.use('/home', (req : express.Request, res : express.Response) => {
    res.send('Hello World!')
})


app.listen(port, () => {
    console.log(`server started at http://localhost:${port} 🍿🍿`);
})