var express = require("express");
var app = express();
var Schedules = require('./src/schedules');

function parseTable(index, table) {
    var filteredTable = table.children.filter(function (child) {
        return child.type === "tag";
    });
}

app.get('/', function (req, res) {
    res.send('Hallo');
});

app.listen(3000, function () {
    Schedules.init();
    console.log("App listening on port 3000");
});