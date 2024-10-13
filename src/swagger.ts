import swaggerJSDoc from "swagger-jsdoc";
import { serve } from "swagger-ui-express";

const swaggerDefinition ={
    openapi: "3.0.0",
    info: {
        title: "College API",
        version: "1.0.0",
        description: "College API requests"
    },
    servers: [
        {
            url: "http://localhost:3000"
        }
    ]
}

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js", "./server.js", ]
}

export const swaggerSpec = swaggerJSDoc(options);