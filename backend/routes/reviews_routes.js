const express = require('express')
const { postReview,
        getReview,
        getReviews,
        deleteReview,
        updateReview
    } = require('../controllers/review_controller')

//Router because express app is in server.js
const router = express.Router()

//GET all reviews ('/' = starting from route at line 97 of server.js: '/api/reviews/')
router.get('/', getReviews)

//GET single review
router.get('/:id', getReview)

//POST a new review
//BLOATED FUNCTION => MOVED INTO A CONTROLLERS FOLDER in backend
router.post('/', postReview) //calls the defined function

//DELETE a review
router.delete('/:id', deleteReview)

//UPDATE a review
router.patch('/:id', updateReview)

module.exports = router