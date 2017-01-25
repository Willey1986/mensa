'use strict';

var later = require('later');
var request = require('request');
var parser = require('./HtmlTableParser');
var Meal = require('./models/').Meal;

module.exports = {
    every10Seconds: later.parse.recur().every(10).second(),
    everyDayAt8: later.parse.recur().on('08:00:00').time(),

    timeOfDayMap: {
        'Mittagsmensa': 'noon',
        'Abendmensa': 'evening'
    },

    init: function () {
        console.log('== Initializing Schedules ==');
        later.setInterval(this.refreshMeals.bind(this), this.every10Seconds)
    },

    refreshMeals: function () {
        request('http://www.stw-on.de/braunschweig/essen/menus/mensa-1', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var result = parser.parse(body);

                var timeOfDay = this.timeOfDayMap[result[0].date.timeOfDay];
                var date = new Date(result[0].date.date);

                result[0].meals.forEach(function (meal) {
                    Meal.create({
                        name: meal.name,
                        date: date,
                        time_of_day: timeOfDay,
                        price_student: 0.0,
                        price_staff: 0.0,
                        price_guest: 0.0
                    });
                });
            }
        }.bind(this))

    }
};
