const apiRouter = require('express').Router()
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var daysRouter = require('./days')

apiRouter.get('/:options', function(req, res, next) {
  var options = req.params.options

  if (options === 'hotels') {
    Hotel.findAll()
    .then(function(hotels) {
      res.send(hotels)
    })
  } else if (options === 'restaurants') {
    Restaurant.findAll()
    .then(function(restaurants) {
      res.send(restaurants)
    })
  } else if (options === 'activities') {
     Activity.findAll()
    .then(function(activities) {
      res.send(activities)
    })
  } else {
    throw new Error('Can\'t find options')
  }
})

apiRouter.use('/days', daysRouter)

module.exports = apiRouter
