// require('dotenv').config()
//entry file for backend application
//register express app
//*need node installed on pc before npm can be used*
//1. create package.json file
// $ npm init -y

//2. install express package
// $ npm install express

//3. create express object
// const express = require('express')

//4. start up express app
// const app = express()

//5. listen to port for requests
// app.listen(process.env.PORT, () => {
//     console.log(`Listening on port ${process.env.PORT}`)
// })

// $ node server.js (to test)

//6. have nodemon package installed globally
// $ npm install -g nodemon

//7. invoke nodemon
// $ nodemon server.js

//8. go to package.json file to create a new script
// under "start", add -> "dev": "nodemon server.js" script
// now can run $ "npm run dev" to run the script 

//9. Setup route handler to react to requests
// request object has info about request and response object to send info back to the browser or client
// routes

// app.get('/', (request, response) => {
//     response.json({mssg: 'Welcome to the app'})

// })

//Using 4000 port is ok but we want to store that number into an environment variable
//10. Create .env file in backend folder
//store the environment variables - the port number

//11. to access the environment variables, we need a dotenv node package
// $ npm install dotenv
// stores environment variables in "process.env" object
// require dotenv it at the top and invoke
// replace 4000 in listening port to process.env.PORT

//run $npm run dev
//to test
//now we need to create the other type of requests
//use insomnia or postman to test the routes

//12. register some middleware - any code that executes between us getting request on server and sending a response
// go to line 20 and create global variable that will fire for every request that comes in : app.use() 

//13.middleware
//'next' MUST be invoked to move onto the next lines
// log requests in console - (path and method)

//14. go to mongodb atlas, get the connect link (copy)
//go to .env file and create MONGO_URI=(connection link just copied) var
//change password

//15. install mongoose package to help with working with database
//$npm install mongoose
//used to connect to database inside this file
//16. require mongoose at the top
//add process.env.MONGO_URI as the link to mongoose.connect(process.env.MONGO_URI)

//==========================================================================================//
require('dotenv').config()

//required imports
const express = require('express')
const mongoose = require('mongoose')
//example: const workoutRoute = require('./routes/workouts')

// express app
const app = express()

// middleware

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
//example: app.use('/api/workouts', workoutRoutes)

// connect to database
mongoose.connect(process.env.MONGO_URI)
    .then( () => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log(`connected to database and listening on port ${process.env.PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })


// listen for requests
// app.listen(process.env.PORT, () => {
//     console.log(`Listening on port ${process.env.PORT}`)
// })