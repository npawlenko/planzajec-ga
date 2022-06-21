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
    constructor(data) { //TODO: sort time
        this.data = data;

        let config = {
            mutationFunction: this.mutation,
            crossoverFunction: this.crossover,
            fitnessFunction: this.fitness,
            doesABeatBFunction: this.competition,
            population: [ this.generatePhenotype() ],
            populationSize: 500
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

        const population = this.ga.population();

        // czy przed i po elemencie nastepuja zajecia (+)
        const times = this.data.times;

        const time = phenotype.time;
        const index = times.indexOf(time);
        const day = phenotype.day;

        //godzina-1, godzina+1
        const neighbours = population.find(
            comparedElement =>
                comparedElement.day === day
                && Math.abs(index-times.indexOf(comparedElement.time)) === 1
        );

        if(neighbours.length > 2)
            fitness += 2/neighbours.length;
        else
            fitness += neighbours.length;



        // czy wystepuja kolizje (-)
        const collisions = population.find(
            comparedElement =>
                comparedElement.day === day
                && index === times.indexOf(comparedElement.time)
        );
        fitness -= collisions.length-1;


        return fitness;
    }

    competition(phenotypeA, phenotypeB) {
        // im wyzszy fitness tym bardziej przystosowany
        return this.fitness(phenotypeA) >= this.fitness(phenotypeB)
    }




    evolve() {
        for(let loop=1 ; loop<=1000 && !finished; i++) {
            this.ga.evolve(); //ewolucja
            if(loop % 50 == 0) { // kazde 50 iteracji
                console.log("Completed " + loop + " evolutions : ");
                console.log(this.ga.best());
            }
        }
    }
}

module.exports = PlanZajecGA;