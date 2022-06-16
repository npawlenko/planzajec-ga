/**
 * Phenotype consist
 */
const GA = require("geneticalgorithm");
const phenotypeSize = 24;
/**
 * Phenotype consists of:
 * subject, group, teacher, room, day, time
 */
class PlanZajecGA {
    constructor(data) {
        let config = {
            mutationFunction: this.mutation,
            crossoverFunction: this.crossover,
            fitnessFunction: this.fitness,
            doesABeatBFunction: this.competition,
            population: [ this.generatePhenotype(data) ],
            populationSize: phenotypeSize * 10
        }

        this.ga = GA(config);
    }


    generatePhenotype(data) {

        //to nie jest fenotyp tylko wszystkie dane otrzymane !!
        const days = [
            "mon",
            "tue",
            "wed",
            "thi",
            "fri",
            "sat",
            "sun"
        ];

        const dayStart = days.indexOf(data["dayStart"]);
        const dayEnd = days.indexOf(data["dayStart"]);
        let workingDays;

        if(dayStart > dayEnd) {
            workingDays = days.slice(dayEnd, days.length-1); // dayEnd-Sun
            workingDays = workingDays.concat(days.slice(0, dayStart)); // Mon-dayStart
        }
        else
            workingDays = days.splice(dayStart, dayEnd); // dayStart-dayEnd

        data = {
            groups: data["groups"],
            subjects: data["subjects"],
            teachers: data["teachers"],
            day: workingDays,
            time: data["time"]
        };

        return data;
    }


    // Genethic algorithm functions

    mutation(oldPhenotype) {
        let resultPhenotype = {};
        // use oldPhenotype and some random
        // function to make a change to your
        // phenotype

        // jakas mutacja

        return resultPhenotype;
    }

    crossover(phenotypeA, phenotypeB) {
        let result1 = {}, result2 = {};

        // zmieniamy przedmioty np

        // use phenoTypeA and B to create phenotype result 1 and 2


        return [result1, result2];
    }

    fitness(phenotype) {
        let fitness = 0;

        // liczba luk w planie, moze kolizji

        // use phenotype and possibly some other information
        // to determine the fitness number.  Higher is better, lower is worse.


        return fitness;
    }

    competition(phenotypeA, phenotypeB) {
        return this.fitness(phenotypeA) >= this.fitness(phenotypeB)
    }
}

module.exports = PlanZajecGA;