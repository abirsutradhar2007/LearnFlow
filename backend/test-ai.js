import dotenv from "dotenv";
import { generateLearningMaterials } from "./src/services/ai.service.js";
dotenv.config();



const testAI = async () => {
    try {
        const transcript = `
        HTTP is a protocol used for communication between clients and servers.
        A client sends an HTTP request to a server.
        The server processes the request and sends back an HTTP response.
        Express.js is a Node.js framework that simplifies building web servers
        and APIs. Middleware functions can process requests before they reach
        the final route handler.
        `;

        const materials = await generateLearningMaterials(transcript);

        console.log(
            JSON.stringify(materials, null, 2)
        );
    } catch (error) {
        console.error("Test failed:", error.message);
    }
};

testAI();