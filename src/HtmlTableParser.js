const cheerio = require("cheerio");

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


    getTableElements(html) {
        const $ = cheerio.load(html);
        return $('table');
    },

    getTableRows(table) {
        const $ = cheerio.load(table);
        return $('tr');
    },

    parse: function (html) {
        return this.getTableElements(html)
            .map(this.parseTable.bind(this))
            .toArray();
    },

    parseTable: function (index, table) {
        const rows = this.getTableRows(table)
            .map(this.parseRow.bind(this))
            .filter((index, array) => array.length > 0);

        const date = this.parseDate(rows[0][0]);
        return this.parseMeals(rows.slice(1), date);
    },

    parseDate: function (dateString) {
        const dateAsString = dateString.split(" – ")[0].split(", ")[1];
        const timeOfDay = dateString.split(" – ")[1];
        const dayNumber = parseInt(dateAsString.split(" ")[0].replace(/\./, ""));
        const monthNumber = this.months.get(dateAsString.split(" ")[1]) - 1;
        const yearNumber = parseInt(dateAsString.split(" ")[2]);


        const date = new Date(yearNumber, monthNumber, dayNumber + 1);

        return {
            date: date,
            timeOfDay: timeOfDay.charAt(0)
        }
    },


    parseMeals: function (meals, date) {
        return meals.toArray().map(function (meal) {
            return {
                type: meal[0],
                name: meal[1].replace(/\s\s+/g, ' '),
                priceStudent: meal[2],
                priceStaff: meal[3],
                priceGuest: meal[4],
                date: date.date,
                timeOfDay: date.timeOfDay
            }
        });
    },

    parseRow: function (index, row) {
        const $ = cheerio.load(row);
        const headerCells = $("th");
        const defaultCells = $("td");

        return headerCells.length !== 0
            ? headerCells.map(this.parseCell).filter(this.stringNotEmpty)
            : defaultCells.map(this.parseCell).filter(this.stringNotEmpty);
    },

    parseCell: function (index, cell) {
        const $ = cheerio.load(cell);
        const s = $.text().trim().replace(/€/, "").trim();

        if (/[0-9],[0-9]/.test(s)) {
            return parseFloat(s.replace(",", "."));
        }

        return s;
    },

    stringNotEmpty: function (index, string) {
        return !!string
    }

};