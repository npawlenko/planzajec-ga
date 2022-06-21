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

function chanceOf(chance) {
    return Math.random() < chance;
}

function cloneJSON( item ) {
    return JSON.parse ( JSON.stringify ( item ) )
}



class PlanZajecGA {
    constructor(data) {
        this.data = data;

        let config = {
            mutationFunction: this.mutation,
            crossoverFunction: this.crossover,
            fitnessFunction: this.fitness,
            population: [ this.generatePhenotype() ],
            populationSize: data.groups.length * data.subjects.length,
            data: data
        }

        this.ga = GA(config);

        this.fitness.bind(this.ga);
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
        let resultPhenotype = cloneJSON(oldPhenotype);
        // use oldPhenotype and some random
        // function to make a change to your
        // phenotype

        if(chanceOf(0.3)) {
            resultPhenotype = {
                day: pickRandom(this.data.days),
                time: pickRandom(this.data.times),
                teacher: pickRandom(this.data.teachers),
                subject: pickRandom(this.data.subjects),
                group: pickRandom(this.data.groups)
            }
        }

        return resultPhenotype;
    }

    crossover(phenotypeA, phenotypeB) {
        let result1 = cloneJSON(phenotypeA), result2 = cloneJSON(phenotypeB);
        // use phenotypeA and B to create phenotype result 1 and 2

        if(chanceOf(0.9)) {
            result1 = {
                day: phenotypeA.day,
                time: phenotypeB.time,
                teacher: phenotypeA.teacher,
                subject: phenotypeB.subject,
                group: phenotypeB.group
            };

            result2 = {
                day: phenotypeB.day,
                time: phenotypeA.time,
                teacher: phenotypeB.teacher,
                subject: phenotypeA.subject,
                group: phenotypeA.group
            };
        }


        return [result1, result2];
    }

    fitness(phenotype) {
        let fitness = 0;
        // use phenotype and possibly some other information
        // to determine the fitness number.  Higher is better, lower is worse.
        const pop = this.population;

        // czy przed i po elemencie nastepuja zajecia (+)
        const times = this.data.times;

        const time = phenotype.time;
        const index = times.indexOf(time);
        const day = phenotype.day;
        const group = phenotype.group;

        //godzina-1, godzina+1
        const neighbours = pop.filter(
            comparedElement =>
                comparedElement.group === group
                && comparedElement.day === day
                && Math.abs(index-times.indexOf(comparedElement.time)) === 1
        );

        if(neighbours === undefined)
            fitness -= 2;
        else if(neighbours.length > 2)
            fitness += 2/neighbours.length;
        else
            fitness += neighbours.length;



        // czy wystepuja kolizje (-)
        const collisions = pop.filter(
            comparedElement =>
                comparedElement.group === group
                && comparedElement.day === day
                && index === times.indexOf(comparedElement.time)
        );
        if(collisions === undefined)
            fitness += 2;
        else
            fitness -= collisions.length-1;

        return fitness;
    }



    evolve() {
        for(let loop=1 ; loop<=1000; loop++) {
            this.ga.evolve(); //ewolucja
        }
    }
}

module.exports = PlanZajecGA;