require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5akcy0w.mongodb.net/?appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        // jobs related apis
        const jobsCollections = client.db('careerHub').collection('jobs');
        app.get('/jobs', async (req, res) => {
            const cursor = jobsCollections.find();
            const result = await cursor.toArray();
            res.send(result);
        })

    } finally {

    }
}
run().catch(console.dir);

// routes
app.get('/', (req, res) => {
    res.send('jobs are not available');
})

app.listen(port, () => {
    console.log(`the career code server running on port:${port}`)
})