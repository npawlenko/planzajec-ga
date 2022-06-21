/**
 *
 */

const GA = require("geneticalgorithm");

function randomBetween(min, max) {
    return Math.floor(Math.random() * (max-min+1)) + min;
}

function pickRandom(arr) {
    const index = randomBetween(0, arr.length-1);
    return arr[index];
}

class PlanZajecGA {
    constructor(data) {
        this.data = data;

        let config = {
            mutationFunction: this.mutation,
            crossoverFunction: this.crossover,
            fitnessFunction: this.fitness,
            doesABeatBFunction: this.competition,
            population: this.generatePopulation(50),
            populationSize: 200
        }

        this.ga = GA(config);
    }


    generatePhenotype() {
        let phenotype = {
            day: pickRandom(this.data.days),
            time: pickRandom(this.data.times),
            subject: pickRandom(this.data.subjects),
            group: pickRandom(this.data.groups),
            teacher: pickRandom(this.data.teachers)
        };

        return phenotype;
    }

    generatePopulation(size) {
        let population = [];

        for(let i=0; i<size; i++) {
            population.push(this.generatePhenotype());
        }

        return population;
    }


    // Genethic algorithm functions
    mutation(oldPhenotype) {
        let resultPhenotype = {};
        // use oldPhenotype and some random
        // function to make a change to your
        // phenotype

        resultPhenotype = {
            day: pickRandom(this.data.days),
            time: pickRandom(this.data.times),
            teacher: pickRandom(this.data.teacher),
            subject: oldPhenotype.subject,
            group: oldPhenotype.group
        }

        return resultPhenotype;
    }

    crossover(phenotypeA, phenotypeB) {
        let result1 = {}, result2 = {};
        // use phenotypeA and B to create phenotype result 1 and 2


        result1 = {
            day: phenotypeA.day,
            time: phenotypeB.time,
            teacher: phenotypeA.teacher,
            subject: phenotypeA.subject,
            group: phenotypeA.group
        };

        result2 = {
            day: phenotypeB.day,
            time: phenotypeA.time,
            teacher: phenotypeB.teacher,
            subject: phenotypeB.subject,
            group: phenotypeB.group
        };

        return [result1, result2];
    }

    fitness(phenotype) {
        let fitness = 0;
        // use phenotype and possibly some other information
        // to determine the fitness number.  Higher is better, lower is worse.

        // czy przed i po elemencie nastepuja zajecia (+)


        // czy wystepuja kolizje (-)


        return fitness;
    }

    competition(phenotypeA, phenotypeB) {
        // im wyzszy fitness tym bardziej przystosowany
        return this.fitness(phenotypeA) >= this.fitness(phenotypeB)
    }
}

module.exports = PlanZajecGA;