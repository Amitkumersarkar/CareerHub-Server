require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.5akcy0w.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const jobsCollections = client.db('careerHub').collection('jobs');
        const applicationsCollection = client.db('careerHub').collection('job_applications');

        //  get all jobs
        app.get('/jobs', async (req, res) => {
            const result = await jobsCollections.find().toArray();
            res.send(result);
        });

        // get job by id 
        app.get('/jobs/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await jobsCollections.findOne(query);
            res.send(result);
        });

        // job applications apis
        app.post('/job-applications', async (req, res) => {
            const application = req.body;
            const result = await applicationsCollection.insertOne(application);
            res.send(result);
        })

    } finally { }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('the careerHub server is running');
})



app.listen(port, () => {
    console.log(`the career code server running on port:${port}`)
})