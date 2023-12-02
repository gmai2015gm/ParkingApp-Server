const express = require('express')
const User = require('../models/user')
const Rating = require('../models/rating')
const ParkingLot = require('../models/parkingLot')
const authenticateUser = require('../middleware/authenticateUser')
const router = express.Router()

async function calculateLotStates(lot)
{
  console.log("Calculating lot stats...")

  //Grab all our ratings
  const ratings = await Rating.find({parkingLot:lot.id})

  //Calculate each average
  let avgCleanliness = 0
  let avgSafety = 0
  let avgAvailability = 0

  ratings.forEach(rating => {
    avgCleanliness += rating.cleanliness
    avgSafety += rating.safety
    avgAvailability += rating.availability
  });

  avgCleanliness = avgCleanliness / ratings.length //7.3333
  avgSafety = avgSafety / ratings.length //8.6666
  avgAvailability = avgAvailability / ratings.length //1.3333

  //Set the average and save the lot
  console.log("Averages calculated.")
  console.log("Updateing lot....")

  lot.avgCleanliness = avgCleanliness
  lot.avgSafety = avgSafety
  lot.avgAvailability = avgAvailability

  const s = await lot.save()

  console.log("Lot Updated.")
}

router.post(`/ratings/add`, async (req, res)=>{
    /**
      * Example of request body
      * {
      *     "username":"check123",
      *     "parkingLot":"656570fa7cc587a01cc864f8"
      *     "cleanliness":8
      *     "safety":9
      *     "availability":1
      *     "notes": "This is a nice lot but everyone knows it so it's always full"
      * }
      */

    console.log("Add rating Request Received.")

    try 
    {
      console.log("Finding user and lot...")

      //get the lot and the user
      const lot = await ParkingLot.findById(req.body.parkingLot).populate("ratings")
      const user = await User.find({username:req.body.username})

      //If they both exist, send the appropriate response
      if (lot && user)
      {
        console.log("User and lot found.")
        console.log("Saving rating...")

        const rating = new Rating(req.body)

        //Manually do our timestamp
        const timeAlloted = Date.now()
        const timestamp = new Date(timeAlloted)

        console.log(timestamp)
        
        const formattedDate = timestamp.toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        });
      
        const formattedTime = timestamp.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric',
          hour12: true,
        });
      
        const formattedDateTime = `${formattedDate} ${formattedTime}`;


        rating.timestamp = timestamp
        const i = await rating.save()
        res.send({success:1})

        console.log("Rating saved.")

        calculateLotStates(lot)
      }
      else
      {
        console.log("Could not add rating. Lot doesn't exist.")
        res.send({success:0,message:"Either the lot or the user does not exist."})
      }
    } 
    catch (err) 
    {
      console.log("Sent to user: " + {success:0,message:"Unable to add rating.", error:err})
      res.send({success:0,message:"Unable to add rating.", error:err})
    }

    
});

router.delete(`/ratings/delete`, async (req, res)=>{
    /**
     * DO WE NEED THIS?
     * -Maybe they should have to be authenticated before they delete it.
     *  So like you can delete your own ratings but not someone elses.
     *  (Disclaimer: I'm not doing an in app admin)
     * 
      * Example of request body
      * {
      *     "requestorID": "1234567890"
      *     "ratingID": "3456789012"
      * }
      */

    try 
    {
      //Grab the rating and the requestor
      const rating = await Rating.findById(req.body.ratingID)
      const requestor = await User.findById(req.body.requestorID)

      //If the rating doesn't exist, let the user know.
      if(!rating)
        return res.send({success:0,message:"Rating doesn't exist"})
      
      //Make sure that the user that is trying to delete the rating
      //is the one who made it.
      if(rating.username === requestor.username)
      {
        //Delete it, check out the acknoledgement and ship out the appropriate response.
        const d = await Rating.deleteOne({id:rating.id})

        if(d && d.acknowledged && deletedCount >= 1)
          res.send({success:1})
        else 
          res.send({success:0, message:"Cannot delete."})
      }
      else
        res.send({success:0,message:"You cannot delete this rating."})
    }
    catch (err)
    {
      res.send({success:0,message:"Cannot delete rating.", error:err})
    }
});

router.get(`/ratings/get/:ratingID`, async (req, res)=>{
    /**
      * Query includes
      * ratingID = Object ID of the rating
      * 
      * Returns Individual Rating
      */
    try
    {
      //Find the one at the ID. 
      const rating = await Rating.findById(req.params.ratingID)
      res.send({success:1,rating:rating})
    } 
    catch (err) 
    {
      res.send({success:0,message:"Could not find rating...", error:err})
    }
});

router.get(`/ratings/getAll/:lotID`, async (req, res) => {
    /**
      * Params includes
      * lotID = Object ID of the the parking lot that we're grabbing ratings for
      * 
      * Returns array of Ratings objects
      */

    try 
    {
      //Find all of them with the given lot
      const allRatings = await Rating.find({parkingLot:req.params.lotID})
      res.send({success:1,ratings:allRatings})
    }
    catch (err) 
    {
      res.send({success:0,message:"Something went wrong", error:err})
    }

    
})

module.exports = router