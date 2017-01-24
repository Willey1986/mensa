var should = require("should");
var htmlTableParser = require("../src/HtmlTableParser");
var fs = require("fs");

describe("HtmlTableParser", function () {

    beforeEach(function () {
        var fileToRead = "test/resources/speiseplan_mensa_1.html";
        this.html = fs.readFileSync(fileToRead, "utf8");
        this.parser = htmlTableParser;
    });

    describe("#parse", function () {

        it("should convert html table to an array of objects", function () {
            // var tableAsObject = htmlTableParser.parse("<table><tr><th>Vorname</th><th>Nachname</th><th>Blaa</th></tr><tr><td>Willem</td><td>Almstedt</td><td>Blubb</td></tr><tr><td>Ida</td><td>Bruns</td><td>Bumms</td></tr></table>");
            var tableAsObject = htmlTableParser.parse(this.html);
            tableAsObject.should.be.an.Array().and.has.size(2);
        })
    })
})