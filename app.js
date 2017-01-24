var express = require("express");
var app = express();
var Meal = require('./models/').Meal;


function parseTable(index, table) {
    var filteredTable = table.children.filter(function (child) {
        return child.type === "tag";
    });
}

app.get('/', function (req, res) {
    Meal.create({
        name: 'Spaghetti',
        date: new Date(),
        time_of_day: 'noon',
        price_student: 1.2,
        price_staff: 2.0,
        price_guest: 3.0
    });
    res.send('Hallo');
});

app.listen(3000, function () {
    console.log("App listening on port 3000");
});