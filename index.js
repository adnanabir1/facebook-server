// Import
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// MiddleWare
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mudgl1n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connecting the client to the server
    await client.connect();

    const postsCollection = client.db("facebook").collection("posts");

    // POST APIS
    app.post("/post", async (req, res) => {
      const postData = req.body;
      const result = await postsCollection.insertOne(postData);
      res.send(result);
    });

    // GET APIS
    app.get("/posts", async (req, res) => {
      const result = await postsCollection.find().toArray();
      res.send(result);
    });
    // DELETE APIS
    app.delete("/posts/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const result = await postsCollection.deleteOne(filter);
      res.send(result);
    });

    // UPDATE APIS
    app.patch("/posts/:id", async (req, res) => {
      const _id = req.params.id;
      console.log(_id, req.body);
      const { id, title, url, timestamp } = req.body;
      const filter = { _id: new ObjectId(_id) };
      const updateData = {
        $set: {
          id,
          title,
          url,
          timestamp,
        },
      };
      const result = await postsCollection.updateOne(filter, updateData);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("SERVER IS WORKING");
});

// Initializing Server
app.listen(port, () => {
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
