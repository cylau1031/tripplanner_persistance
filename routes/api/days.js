const daysRouter = require('express').Router()
var Hotel = require('../../models').Hotel;
var Restaurant = require('../../models').Restaurant;
var Activity = require('../../models').Activity;
var Day = require('../../models').Day;

// daysRouter.param('id', function(req, res, next, id) {
//   console.log('hello')
//   Day.findOne({
//     where: {
//       id: id
//     }
//   })
//     .then(function(day) {
//       if(day) {
//         console.log('found')
//       } else {
//         console.log('what')
//       }
//       // console.log(day)
//       // req.day = day
//       next()
//     })

// })

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

//delete one specific day
daysRouter.delete('/:id', function(req, res, next){
  console.log('delete day')
  // Day.destroy({
  //   where: {
  //     id: req.day.id
  //   }
  // })
  //   .then(function() {
  //     res.end()
  //   })
})

//create a new day
daysRouter.post('/', function(req, res, next){
  Day.create(req.body)
    .then(function(day) {
      res.send(day)
    })
})

//get attractions on given day
daysRouter.get('/:id/:options', function(req, res, next){
  next()
})

//adds attractions to specific day
daysRouter.put('/:id', function(req, res, next){
  // if(req.body.type === 'restaurant') {
    //check type of attraction
    //get join table day_attraction
    //update
    //send something back
})
module.exports = daysRouter
