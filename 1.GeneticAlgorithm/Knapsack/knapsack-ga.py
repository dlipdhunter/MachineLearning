import random
import string

class SampleData:
    weight          = 0
    survival_points = 0
    name            = ''

    def __init__(self, name, weight, points):
        self.name               = name
        self.weight             = weight
        self.survival_points    = points



class DNA:
    fitness = -1
    string  = ''
    
    def __init__(self, length):
        self.string = [str(random.choice(['0', '1'])) for _ in range(length)]

    def __str__(self):
        return ''.join(self.string) + '\nFitness: ' + str(self.fitness)

    def calc_fitness(self, data, max_weight, total_survival_points):
        total_weight = 0
        total_points = 0
        
        for idx, s in enumerate(self.string):
            total_weight += data[idx].weight * int(s)
            total_points += data[idx].survival_points * int(s)
        
        if total_weight > max_weight:
            self.fitness = 0
        else:
            w = total_weight / (max_weight * 1.0)
            sp = total_points / (total_survival_points * 1.0)
            self.fitness = (w + sp) / (2.0)                
        
        return
    
    def crossover(self, partner):
        mid = len(self.string) // 2

        new_string_part_1 = self.string[: mid]
        new_string_part_2 = self.string[mid: ]

        child           = DNA(len(self.string))
        child.string    = new_string_part_1 + new_string_part_2
        
        return child

    def mutation(self):
        self.string[random.randint(0, len(self.string) - 1)] = random.choice(['0', '1'])
        return


# Data 
sleeping_bag    = SampleData('sleeping bag', 15, 15)
rope            = SampleData('rope', 3, 7)
pocket_knife    = SampleData('pocket knife', 2, 10)
torch           = SampleData('torch', 5, 5)
bottle          = SampleData('bottle', 9, 8)
glucose         = SampleData('glucose', 20, 17)

data = [sleeping_bag, rope, pocket_knife, torch, bottle, glucose]

constraint_max_weight       = 30
constraint_max_generations  = 100
total_survival_points       = sum([s.survival_points for s in data])
population_size             = 5
generations                 = 0
eligible                    = int(population_size * 0.3)

# initialize population
population = [DNA(len(data)) for _ in range(population_size)]

stop = False

while not stop:

    generations += 1
    print('Generation: ' + str(generations))
    
    # fitness calculation
    for d in population:
        d.calc_fitness(data, constraint_max_weight, total_survival_points)

    new_population = sorted(population, key= lambda x: x.fitness, reverse= True)[:eligible]

    max_fit = new_population[0]
    
    if max_fit.fitness == 1.0 or generations > constraint_max_generations:
        stop = True
        print(max_fit)
        for idx, s in enumerate(max_fit.string):
            if int(s) == 1:
                print(data[idx].name + '\t' + str(data[idx].weight) + '\t' + str(data[idx].survival_points))
        
    for d in range(population_size):
        partnerA = new_population[random.randint(0, len(new_population) - 1)]
        partnerB = new_population[random.randint(0, len(new_population) - 1)]

        child = partnerA.crossover(partnerB)
        child.mutation()

        population[d] = child

