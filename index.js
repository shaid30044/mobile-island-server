require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2mr4msx.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });

    const mobileCollection = client.db("mobileDB").collection("mobiles");
    const userCollection = client.db("mobileDB").collection("users");

    //   mobile apis

    app.get("/mobiles", async (req, res) => {
      const cursor = mobileCollection.find();
      const result = await cursor.toArray();

      res.send(result);
    });

    // user apis

    app.post("/users", async (req, res) => {
      const user = req.body;
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);

      if (existingUser) {
        return res.send({
          message: "This user already exist.",
          insertedId: null,
        });
      }

      const result = await userCollection.insertOne(user);

      res.send(result);
    });

    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Mobile Island Server is running");
});

app.listen(port, () => {
  console.log(`Mobile Island Server is running on Port ${port}`);
});
