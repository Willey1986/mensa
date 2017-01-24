var cheerio = require("cheerio");

module.exports = {

    months: {
        "januar": 1,
        "februar": 2,
        "april": 4,
        "mai": 5,
        "juni": 6,
        "juli": 7,
        "august": 8,
        "september": 9,
        "oktober": 10,
        "november": 11,
        "dezember": 12,

        get: function (monthString) {
            if (monthString.toLowerCase() === "märz") {
                return 3;
            }
            return this[monthString.toLowerCase()];
        }

    },

    parse: function (html) {
        var $ = cheerio.load(html);
        var tables = $("table");

        var result = tables.map(this.parseTable.bind(this)).toArray();
        return result;
    },

    parseTable: function (index, table) {
        var $ = cheerio.load(table);
        var rows = $("tr").map(this.parseRow.bind(this)).filter(function (index, array) {
            return array.length > 0;
        });

        return {
            date: this.parseDate(rows[0][0]),
            meals: this.parseMeals(rows.slice(1))
        };
    },

    parseDate: function (dateString) {
        var dateAsString = dateString.split(" – ")[0].split(", ")[1];
        var timeOfDay = dateString.split(" – ")[1];
        var dayNumber = dateAsString.split(" ")[0].replace(/\./, "");
        var monthNumber = this.months.get(dateAsString.split(" ")[1]);
        var yearNumber = dateAsString.split(" ")[2];

        var date = new Date(yearNumber, monthNumber, dayNumber);

        return {
            date: date,
            timeOfDay: timeOfDay
        }
    },

    parseMeals: function (meals) {
        return meals.toArray().map(function (meal) {
            return {
                type: meal[0],
                name: meal[1],
                priceStudent: meal[2],
                priceStaff: meal[3],
                priceGuest: meal[4]
            }
        });
    },

    parseRow: function (index, row) {
        var $ = cheerio.load(row);
        var headerCells = $("th");
        var defaultCells = $("td");

        return headerCells.length !== 0
            ? headerCells.map(this.parseCell).filter(this.stringNotEmpty)
            : defaultCells.map(this.parseCell).filter(this.stringNotEmpty);
    },

    parseCell: function (index, cell) {
        var $ = cheerio.load(cell);
        return $.text();
    },

    stringNotEmpty: function (index, string) {
        return !!string.trim()
    }

};