const router = require('express').Router();

const db = require('../db.js')

//POST 1
router.post('/', (req, res) =>{
    const post1 = req.body;
    db.insert(post1)
    .then(response => {
       // res.status(500).json(`This is ${post1} and this is ${response}`)
       if(!response.title || !response.contents ){
        res.status(201).json(`This is ${post1} and this is ${response}`)
       } else {
        res.status(400).json({ message: "The post with the specified ID does not exist." })
       }
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
})

//GET 1: When the client makes a GET request to /api/posts:
router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
})

//GET 2: When the client makes a GET request to /api/posts/:id:
router.get('/:id', (req, res) => {
    const postID = req.params.id;
    db.findById(postID)
    .then(posts => {
        //console.log("posts", posts)
        if (posts) {
            res.status(200).json(`The post number ${postID} was found`)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
})

module.exports = router;