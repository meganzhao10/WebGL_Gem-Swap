# Gem-Swap
A 2D web game inspired by *Bejeweled* with three game levels and additional features.

## How To Run
```
# Clone this repository
$ git clone https://github.com/meganzhao/Gem-Swap.git

# Go into the repository
$ cd Gem-Swap

# Go into the source folder
$ cd Src

# Open the URL of the game
$ open index.html
```
Link to the website hosted by github: https://meganzhao.github.io

## How To Play
Mouse click a cell and release over a neighboring cell to form a horizontal or vertical chain of 3 or more gems of the same shape and color. When chains are formed, gems disappear and gems above them fall in their places. Random gems fall in to places in the upmost rows. 

## Game Rule
When lines of 3, 4 and 5 gems are formed, the user scores 10, 20 and 50 points and gains more time accordingly. On the first level, once the user starts swapping any 2 gems, the game and the timer start. On each level, if the user is able to gain 500 points before the time runs out, the user reaches the next level. Otherwise, game overs. On the second level, the user has a limit of 15 swaps. Even if the user does an invalid move(the move does not form any line of 3 or more gems), it counts as one swap. On the third level, the whole grid rotates randomly. The user needs to reach 500 points within the time and swapping limit. 

## Additional Features
* Bomb: when a cell is clicked with key 'B' held down, the gem in the cell disappears.
* Quake: when key 'Q' is held down, the window shakes violently. During the quake, in every frame, all gems stand a 0.1% chance of disappearing. There are a limited numbers of frames this feature can be used.
* Dramatic exit: when gems disappear, they quickly shrinke to zero size while rotating.
* Turn the tables: when key 'A' or 'D' is held down, the window rotates in counterclockwise or clockwise direction, respectively.
* Downshift: Gems always fall along the grid-aligned direction closest to the screen's downwards.

## Potential Features: 
* Once a certain point is reached, the user is able to drag a bomb on the grid and gain points by making gems disappear (display explosion)
* Special gems that need 3 times to disappear (ex. on the first time the ice on top of the gem forms cracks; on the second time the ice breaks; on the third time gem is canceled in a regular way)
* Poison gems that when are cancels, the user loses points and time.
* Hint section where user gets hint where they can swap to gain point and time
* When mouse hover over, the gems become brighter
* Change the shape of the grid (not sure how it will work out yet)

## Game Demo

![Alt text](img-demo/level1.png?raw=true "Title")
![Alt text](img-demo/level2.png?raw=true "Title")
![Alt text](img-demo/level3.png?raw=true "Title")


