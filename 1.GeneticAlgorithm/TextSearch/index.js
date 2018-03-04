var Utils = {
    randomInt : function(max) {
        return Math.floor(Math.random() * Math.floor(max));
    },

    randomInt2 : function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min)) + min;
    },

    randomFloat : function(min, max) {
        return Math.random() * (max - min) + min;
    },

    randomChar : function() {
        var c = this.randomInt2(64,122);
        
        if (c === 64) {
            c = 32;
        }

        return String.fromCharCode(c);
    }
}

function TextSearchGA(target) {
    this.mutationRate = 0.01; // 1% mutation
    this.totalPopulation = 400;
    this.generation = 0;

    this.target = target;
    this.population = [];
    this.matingPool = [];

    
    // Initial population
    for(let i = 0; i < this.totalPopulation; i++) {
        this.population[i] = new Dna(target.length);
    }


    this.DoSearch = function() {

        this.generation++;

        // Fitness calculation
        for(let i = 0; i < this.totalPopulation; i++) {
            this.population[i].calcFitness(this.target);
        }

        this.matingPool = [];

        for(let i = 0; i < this.totalPopulation; i++) {
            var n = Utils.randomInt(this.population[i].fitness * 100);

            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }

        for(let i = 0; i < this.totalPopulation; i++) {
            var a = Utils.randomInt(this.matingPool.length);
            var b = Utils.randomInt(this.matingPool.length);

            var partnerA = this.matingPool[a];
            var partnerB = this.matingPool[b];

            var child = partnerA.Crossover(partnerB);
            child.Mutate(this.mutationRate);

            this.population[i] = child;
        }

        var found = false;
        for(let i = 0; i < this.totalPopulation; i++) {
            var cur = this.population[i].genes.join("");
            if(cur == this.target){
                console.log("Found!");
                console.log("Generations: " + this.generation);
                console.log(cur);
                found = true;
            }
        }

        if(!found)
            this.DoSearch();

    }

}

function Dna(num) {
    
    this.fitness = 0;

    this.genes = [];

    for (let i = 0; i < num; i++) {
        this.genes[i] = Utils.randomChar();
    }

    this.calcFitness = function(target) {
        var score = 0;
        for (var i = 0; i < this.genes.length; i++) {
           if (this.genes[i] == target.charAt(i)) {
             score++;
           }
        }
        this.fitness = score / target.length;
    }

    this.Crossover = function(partner) {
        var child = new Dna(this.genes.length);
    
        var midpoint = Utils.randomInt(this.genes.length);
        
        
        for (var i = 0; i < this.genes.length; i++) {
          if (i > midpoint) {
            child.genes[i] = this.genes[i];
          } 
          else {
            child.genes[i] = partner.genes[i];
          }   
        }
        
        return child;
    }

    this.Mutate = function(mutationRate) {
        for (var i = 0; i < this.genes.length; i++) {
            if (Utils.randomFloat(1) < mutationRate) {
              this.genes[i] = Utils.randomChar();
            }
        }
    }
}

var textGA = new TextSearchGA("GeneticAlgorithm");

textGA.DoSearch();