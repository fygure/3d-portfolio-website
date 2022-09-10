const express = require('express')

const router = express.Router()

//GET all reviews
router.get('/', (req, res) => {
    res.json( {mssg: `GET all reviews`} )
})

//GET single review
router.get('/:id', (req, res) => {
    res.json( {mssg: `GET a single review`} )
})