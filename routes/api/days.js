const daysRouter = require('express').Router()
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var Day = require('../../models').Day;

//gets all days
daysRouter.get('/all', function(req, res, next) {
  Day.findAll()
    .then(function(days){
      res.send(days)
    })
})

//get specific day
daysRouter.get('/:id', function(req, res, next){
  Day.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function(day) {
      res.send(day)
    })

})

//create a new day
daysRouter.post('/', function(req, res, next){
  console.log("got into route")
  Day.create(req.body)
    .then(function(day) {
      console.log("created the day")
      res.send(day)
    })
})

//get attractions on given day
daysRouter.get('/:id/:options', function(req, res, next){

  Day.findOne({
    where: {
      number: req.params.id
    }
  })
  .then(function(day) {

    if (req.params.options === "hotel") {
      // get the hotel for this day
      res.send(day.hotel);
    }

    else if (req.params.options === "restaurant") {
      // add restaurant to day_restaurant table
      res.send(day.restaurants);
    }

    else if (req.params.options === "activity") {
      // add restaurant to day_restaurant table
      res.send(day.activities);
    }

    else {
      throw new Error("wrong type of item")
    }
  });
  //next()
})

//adds attractions to specific day
daysRouter.put('/:id', function(req, res, next){

  //check type of attraction
  Day.findOne({
    where: {
      number: req.params.id
    }
  })
  .then(function(day) {
    if (req.body.attractionType === "hotel") {
      // add hotelId to Day
      Hotel.findOne({
        where: {
          id: parseInt(req.body.attractionId)
        }
      })
      .then(function(hotel) {
        day.setHotel(hotel)
      })
      .catch(console.log)
    }

    else if (req.body.attractionType === "restaurant") {
      // add restaurant to day_restaurant table
      Restaurant.findOne({
        where: {
          id: parseInt(req.body.attractionId)
        }
      })
      .then(function(restaurant) {
        day.setRestaurants(restaurant);
      })
    }

    else if (req.body.attractionType === "activity") {
      // add restaurant to day_restaurant table
      Activity.findOne({
        where: {
          id: parseInt(req.body.attractionId)
        }
      })
      .then(function(activity) {
        day.setActivities(activity);
      })
    }

    else {
      throw new Error("wrong event type")
    }

  })
})

//deletes attractions from specific day
daysRouter.delete('/:id/:options', function(req, res, next){
  Day.findOne({
    where: {
      number: parseInt(req.params.id)
    }
  })
  .then(function(day) {
    if (req.params.options === "hotel") {
      // remove hotel from day
      day.setHotel(null);
    }

    else if (req.params.options === "restaurant") {
      // add restaurant to day_restaurant table
      day.removeRestaurant(parseInt(req.body.attractionId));
    }

    else if (req.params.options === "activity") {
      // add restaurant to day_restaurant table
      day.removeActivity(parseInt(req.body.attractionId));
    }

    else {
      throw new Error("wrong event type")
    }

    res.end();
  })
})

// delete one specific day
daysRouter.delete('/:id', function(req, res, next){
  console.log("got into delete function")
  Day.destroy({
    where: {
      number: req.params.id
    }
  })
  .then(function() {
    res.end()
  })
})

module.exports = daysRouter
