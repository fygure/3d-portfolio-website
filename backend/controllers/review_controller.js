//This file keeps the reviews_routes.js file less bloated and clean
//Need to import model because we need it to interact with database
const Review = require('../models/review_model')
const mongoose = require('mongoose')

//Get all reviews (GET)
const getReviews = async (req, res) => {
    // {} finds all of them, ex {score: 15} would return all reviews with that score
    // sorts in descending order (newest at top)
    const reviews = await Review.find({}).sort({createdAt: -1}) 

    res.status(200).json(reviews)
}

//Get single review by id (GET)
const getReview = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'No such review'} )
    }


    const review = await Review.findById(id)

    //catches if not found
    if(!review) {
        return res.status(404).json({error: "No such review"})
    }

    //if success
    res.status(200).json(review)
}

//Create new review (POST)
const postReview = async (req, res) => {
    //define body from review_model.js (title and score)
    const {title, score} = req.body

    // add doc to db
    try {
        //attempts to add new review
        const review = await Review.create( {title, score} )
        res.status(200).json(review) //sends that everything works and the json object back
        
    } catch(error) {
        res.status(400).json( {error: error.message} )

    }
}

//Delete a review (DELETE)
const deleteReview = async (req, res) => {
    //grab id route
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'No such review'} )
    }

    const review = await Review.findOneAndDelete( {_id: id} ) //_id for mongodb

    //check if there is review to delete
    if (!review) {
        return res.status(400).json( {error: 'No such review'} )
    }

    //success
    res.status(200).json(review)
}

//Update a review (PATCH/PUT)
const updateReview = async (req, res) => {

    //gets id
    const { id } = req.params

    //checks id valid
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'No such review'} )
    }

    const review = await Review.findOneAndUpdate( {_id: id}, {
        //updates here
        ...req.body
    } )


    if (!review) {
        return res.status(400).json( {error: 'No such review'} )
    }

    //success
    res.status(200).json(review)

}



//Exports functions
module.exports = {
    getReview,
    getReviews,
    postReview,
    deleteReview,
    updateReview
}