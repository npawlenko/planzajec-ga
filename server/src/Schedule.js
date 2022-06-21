/**
 *
 */

const fs = require("fs");
const ejs = require("ejs");
const pdf = require("html-pdf");
const uuid = require("uuid");
const path = require("path");
const Day = require("../../client/src/utils/Day");

class Schedule {
    constructor(data, population) {
        this.population = population;
        this.data = data;
    }

    render() {
        const template = fs.readFileSync(path.resolve("./src/layout.ejs"), 'utf8');
        const html = ejs.render(template, {
            population: this.population,
            data: this.data,
            day: Day
        });

        const name = uuid.v1();
        const file = path.resolve("./tmp/"+ name +".pdf");
        pdf.create(html, {
                format: "Letter"
            })
            .toFile(file, (err, res) => {
                if(err)
                    console.log(err);

                return undefined;
            });

        return name;
    }
}

module.exports = Schedule;