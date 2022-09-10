const express = require('express')
const Review = require('../models/review_model')

//Router because express app is in server.js
const router = express.Router()

//GET all reviews ('/' = starting from route at line 97 of server.js: '/api/reviews/')
router.get('/', (req, res) => {
    res.json( {mssg: `GET all reviews`} )
})

//GET single review
router.get('/:id', (req, res) => {
    res.json( {mssg: `GET a single review`} )
})


//POST a new review
//added 'async' because Review.create() is an async function . . add 'await' before it
//BLOATED FUNCTION => PUT OTHERS INTO A CONTROLLER FOLDER in backend
router.post('/', async (req, res) => {
    //req.body (data to send to server)
    //define body from review_model.js (title and score)
    const {title, score} = req.body

    try {
        //attempts to add new review
        const review = await Review.create( {title, score} )
        res.status(200).json(review) //sends that everything works and the json object back
        
    } catch(error) {
        res.status(400).json( {error: error.message} )

    }
})

//DELETE a review
router.delete('/:id', (req, res) => {
    res.json( {mssg: `DELETE a review`} )
})

//UPDATE a review
router.patch('/:id', (req, res) => {
    res.json( {mssg: `UPDATE a review`} )
})




module.exports = router