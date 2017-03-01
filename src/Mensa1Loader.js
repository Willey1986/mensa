let parser = require('./HtmlTableParser');
let rq = require('request-promise');

module.exports = {

    urlCurrentWeek: 'http://www.stw-on.de/braunschweig/essen/menus/mensa-1',
    urlNextWeek: 'http://www.stw-on.de/braunschweig/essen/menus/mensa-1-kommende-woche',

    load: function (callback) {

        var result;

        rq(this.urlCurrentWeek)
            .then(function (htmlString) {
                result = parser.parse(htmlString);
                callback(result);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
};