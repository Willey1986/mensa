var express = require("express");
var app = express();
var Schedules = require('./src/schedules');
var Meal = require('./src/models').Meal;
var mensa1Loader = require('./src/Mensa1Loader');

function parseTable(index, table) {
    var filteredTable = table.children.filter(function (child) {
        return child.type === "tag";
    });
}

app.get('/status', function (req, res) {
    res.send(200);
});

app.get('/mensa1', function (req, res) {
    mensa1Loader.load(function (result) {
        result.forEach(function (meal) {
            Meal.create({
                type: meal.type,
                name: meal.name,
                date: meal.date,
                time_of_day: meal.timeOfDay,
                price_student: meal.priceStudent,
                price_staff: meal.priceStaff,
                price_guest: meal.priceGuest
            })
        });
        res.send(result);
    });
});

app.get('/', function (req, res) {
    res.send('Hallo');
});

app.listen(3000, function () {
    // Schedules.init();
    console.log("App listening on port 3000");
});