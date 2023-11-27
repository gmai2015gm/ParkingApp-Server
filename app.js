/**
 * The Questions:
 * --Do we need sessions? I don't know. Mostly because IDK 
 *   how we would do that in-app. - G
 */

/**
 * JSON DICTIONARY (Proposed)
 * 
 * Object: Rating
 * -User who rated the lot
 * -Who's parking lot [String/Business in DB?]
 * -cleanliness [Scale of one to ten (1="A constant state of disrepair" && 10="Absolutely Perfect")]
 * -safety/"do people tend to drive like crazy people" [Scale of one to ten (1="Leave ASAP." && 10="Very safe")]
 * -current availibility (How are we quantifying this?) [Scale of one to ten (]
 * -Timestamp [datetime]
 * -Notes [String (2000 chars?)]
 * 
 * Object: User
 * -userName [string]
 * -email [string]
 * -password [hashed string]
 * 
 * Object: Parking lot
 * -Business
 * -Latitude (Approx)
 * -Longitude (Approx)
 * -(virtual) ratingsArray
 * -Average cleanliness rating [Double] 
 * -Average availibility rating [Double]
 * 
 * Pending investigation
 * -Num of spots
 * -Type of spots
 * -Paid?
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

//Express Configuration and Setup
app.use(express.urlencoded({extended:true})); 

//Mongoose Setup
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
