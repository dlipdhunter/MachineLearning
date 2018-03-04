# Genetic Algorithm

A genetic algorithm performs the following steps to achieve the result through N number of evolutions.

step #1: The population
Create an empty population and fill it with DNA encoded objects. Picking the random ones at start.

step #2: Selection
1. Create an empty mating pool.
2. For every member of the population, evaluate its fitness based on some criteria / function, and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

step #3: Reproduction
Create a new empty population and fill it by executing the following steps:

1. Pick two "parent" objects from the mating pool.
2. Crossover -- create a "child" object by mating these two parents.
3. Mutation -- mutate the child's DNA based on a given probability. This value plays a big role in efficiency of the algorithm. When mutation value is 100%, it produces the effect of complete randomness and could cause the algorithm less efficient. Having mutation value 0% could cause the algorithm not to evolve and making it worse to get the result. So the more minimal the variation/ mutation value the better the chances of getting the result.
4. Add the child object to the new population.
5. Replace the old population with the new population.

Do steps 2 and 3 until a termination condition is met or result is found.

