import swaggerJSDoc from "swagger-jsdoc";

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
    definition: swaggerDefinition,
    apis: ['./src/routes/*.ts','./src/app.ts']
}

export const swaggerSpec = swaggerJSDoc(options);