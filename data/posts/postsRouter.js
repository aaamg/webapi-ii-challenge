const router = require('express').Router();

const db = require('../db.js')

//POST 1
router.post("/", (req, res) => {
    const { title, contents } = req.body;
    /*=== Check to see if the request has the proper things on it ===*/
    if (!title || !contents) {
      res.status(404).json({ message: "You suck! Please provide right stuff." });
    } else {
      db.insert(req.body)
        .then(response => {
            // send good response back
        res.status(200).json(`This is ${post1} and this is ${response}`)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
    }
  });
  //not working lol

//POST 2
router.post("/:id/comments", (req,res) => {
    const idPost = req.params.id;
    db.findCommentById(idPost)
    .then(comment =>{
        res.status(201).json('created')
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

//GET 3: When the client makes a GET request to /api/posts/:id/comments:
router.get('/:id/comments', (req, res) => {
    db.findPostComments(req.params.id)
    .then(post => {
         if(post){
              res.status(200).json(post)
         } else{
              res.status(404).json({ message: "The post with the specified ID does not exist." })
         }
    })
    .catch(error => {
         res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

//Delete 1:  When the client makes a DELETE request to /api/posts/:id:
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
    .then(post => {
        if(post){
            res.status(201).json(`post ${id} was removed`);
       } else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
       }
        
    })
    .catch(err => {
        res.status(500).json({ error: "The post could not be removed" });
    })
})

//Put 1: When the client makes a PUT request to /api/posts/:id:
router.put('/:id', (req, res) => {
    const id = req.params.id;
    db.update(id)
    .then(post => {
        if(post) {
            res.status(200).json(`post ${id} was updated`);
        } else if(!id) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        } else {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The post information could not be modified." })
    })
})

module.exports = router;



//POST 1
// router.post('/', (req, res) =>{
//     const post1 = req.body;
//     db.insert(post1)
//     .then(response => {
//        // res.status(500).json(`This is ${post1} and this is ${response}`)
//        if(!response.title || !response.contents ){
//         res.status(201).json(`This is ${post1} and this is ${response}`)
//        } else {
//         res.status(400).json({ message: "The post with the specified ID does not exist." })
//        }
//     })
//     .catch(err => {
//         res.status(500).json({ error: "There was an error while saving the post to the database" })
//     })
// })


//WHy didn't this work?
// router.get('/:id/comments', (req, res) => {
//     const postID = req.params.id;
//     db.findPostComments(postID)
//     .then(comment =>{
//         //res.status(200).json(`${postID} was found`)
//         if (!comment){
//             //res.status(200).json(`${postID} was found`)
//             res.status(404).json({ message: "The post with the specified ID does not exist." })
//         } else {
//             //res.status(404).json({ message: "The post with the specified ID does not exist." })
//             res.status(200).json(`${postID} was found`)
//         }
//     })
//     .catch(err => {
//         res.status(500).json({ error: "There was an error while saving the post to the database" })
//     })
// })  