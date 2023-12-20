require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Mobile Island Server is running");
});

app.listen(port, () => {
  console.log(`Mobile Island Server is running on Port ${port}`);
});
