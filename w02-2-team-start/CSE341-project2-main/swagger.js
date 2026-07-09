const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "My Project API",
    description: "Documentation for my CSE341 project2",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger-output.json";
const routes = ["./routes/index.js"]; 

swaggerAutogen(outputFile, routes, doc);
