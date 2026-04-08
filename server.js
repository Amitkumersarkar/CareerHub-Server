const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());


// routes
app.get('/', (req, res) => {
    res.send('jobs are not available');
})

app.listen(port, () => {
    console.log(`the career code server running on port:${port}`)
})