const postsRouter = require('./data/posts/postsRouter.js')


const express = require('express');

const db = require('./data/db');

const server = express();
server.use(express.json())
server.use('/api/posts', postsRouter)

const port = 5000;

server.get('/', (req, res) => {
    res.send('Hello Node 23');
})

server.listen(port, () => {
    console.log(`server is listening on port ${port}`)
});

