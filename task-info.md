Tech Puzzle: Let it snow!
 
There are some snowflakes in the air, presented by an H x W grid — H rows and W columns, like:
 
```
...*..*..
....*....
..*...*..
...*.....
.........
```
(can be conveniently modeled as an array of strings)
 
The * symbol represents a snowflake, and the . symbol represents empty air. The bottom row of air is immediately adjacent to the ground. Snowflakes are falling straight down with the same constant velocity each, until the lowest snowflake in a column reaches the bottom row and stops there. Then, all the snowflakes in the same column fall until they stack up on top of each other. For the example above, the following will be the final state:
 
```
.........
.........
.........
...*..*..
..***.*..
```
Given an initial snowflakes-in-the-air H x W array, return it in its final state, where no more snowflakes movement is happening.