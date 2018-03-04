function TextSearchGA(target) {

    this.mutationRate = 0.05; // 5% mutation
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