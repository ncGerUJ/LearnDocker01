import express from "express";
import { createClient } from "redis";

const app = express();

const redisHost = process.env.REDIS_HOST || "";
const redisClient = createClient({ url: `redis://${redisHost}:6379` });

redisClient.on("error", (err) => console.error("Redis Error:", err));

await redisClient.connect();

app.get("/", async (req, res) => {
  const count = await redisClient.incr("visits");
  res.send(`Hello from Node + Redis! <br>Visit count: ${count}`);
});

app.listen(3000, () => console.log("Server running on port 3000"));