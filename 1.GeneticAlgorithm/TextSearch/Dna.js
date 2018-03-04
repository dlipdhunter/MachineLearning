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