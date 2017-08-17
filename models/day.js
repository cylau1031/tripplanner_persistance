var Sequelize = require('sequelize');
var db = require('./_db');
var Hotel = require('./hotel');
var Restaurant = require('./restaurant');
var Activity = require('./activity');

var Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER
  }
}, {
  defaultScope: {
    include: [Hotel, Restaurant, Activity]
  },
  hooks: {
    afterDestroy: function(dayInstance) {
      console.log('HELLO')
      return Day.findAll({
        where: {
          number: {
            $gt: dayInstance.number
          }
        }
      })
        .then(function(allDays) {
          allDays.forEach(function(day) {
            console.log('before', day)
            day.update({
              number: this.number - 1
            })
            .then((updatedDay) => {
              console.log('after', updatedDay)
            })
          })
        })
        .catch(console.error)
        }
      }
})


module.exports = Day
