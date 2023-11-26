/**
 * The Questions:
 * --Do we need sessions? I think not. Mostly because IDK 
 *   how we would do that in-app.
 * 
 * --What all are we storing in the thing? Users, Parking Lots, 
 *   and ratings (With references for each user and PL)
 * 
 * --What are our ratings....? Is it out of ten? Is it an enum?
 * 
 * --Do we need to store the businesses or just the parking lot themselves?
 * 
 */

/**
 * JSON DICTIONARY (Proposed)
 * 
 * Object: Rating
 * -Who's parking lot [String/Business in DB?]
 * -cleanliness/"will this lot mess up your car" [Scale of one to ten (1="A constant state of disrepair" && 10="Absolutely Perfect")]
 * -safety/"do people tend to drive like crazy people" [Scale of one to ten (1="Very safe" && 10="Leave ASAP.")]
 * -general availibility (How are we quantifying this?)
 * -current availibility (How are we quantifying this?)
 * -Timestamp [datetime]
 * 
 * Object: User
 * -UserName [string]
 * -password [hashed string]
 * 
 * Object: Parking lot
 * -Business
 * -Latitude (Approx)
 * -Longitude (Approx)
 * -(virtual) ratingsArray
 * -Average cleanliness rating [Double]
 * -current availibility (Varies on how we quantify, But we would have an alg in place
 *                        that could take an average based on the timestamp of the rating.
 *                        Like if they fall into a certain timeframe of the query time it 
 *                        recalculates this value.)
 * -Average availibility rating
 */

const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()

const session = require('express-session')
const MongoStore = require('connect-mongo')
const userRouter = require('./routers/user')


app.listen(process.env.PORT)
console.log("Starting server on Port 3000")

/* Express Configuration and Setup */
app.use(express.urlencoded({extended:true})); 

/* Mongoose 6.10.0 Config and Setup */
const mongoURL = process.env.MONGO_URL
mongoose.connect(mongoURL,{ useNewUrlParser: true, useUnifiedTopology: true},(err)=>{
    if(err)
        console.log("Could not connect to database",err)
    else
        console.log("Connected to DB..")
})

//We want sessions so we use this piece of code
app.use(session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: mongoURL
    })
}))

app.use(userRouter)

/* Basic 404 response*/
app.get('/*',(req,res)=>{
    res.status(404)
    res.type('txt')
    res.write("Oops, this page does not exist")
    res.send()
})
