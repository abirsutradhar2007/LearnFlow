import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/db.js";
import dns from "dns"

dns.setServers(["8.8.8.8", "1.1.1.1"])

dotenv.config();

const port = Number(process.env.PORT) || 3000;

try {
  await connectDB();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
} catch (error) {
  console.error("Failed to start server because MongoDB could not be connected:", error);
  process.exit(1);
}