import express from "express";
import cors from "cors";
import fs from "node:fs";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/txt", (req, res) => {
  const data = fs.readFileSync("./index.txt");
  res.send(data.toString());
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});