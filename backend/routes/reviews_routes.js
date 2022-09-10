const express = require('express')

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
router.post('/', (req, res) => {
    //req.body (data to send to server)
    res.json( {mssg: `POST a new review`} )
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