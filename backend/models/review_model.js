// Define how the review documents should look

// 1. require mongoose
const mongoose = require('mongoose')

// 2. create new schema (defines structure)
const Schema = mongoose.Schema

const reviewSchema = new Schema({
    //1st argument (describes the look of object)
    //define schema here
    title: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
}, { timestamps: true })


// 3. create model based on schema
// applies the schema to a model
// used to import in other files later
// example: Review.find() 
// example: Review.add()

module.exports = mongoose.model('Review', reviewSchema)