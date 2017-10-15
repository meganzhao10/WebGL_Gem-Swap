# Gem-Swap
A 2D web game inspired by *Bejeweled* with some additional features.

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

## How To Play
Mouse click a cell and release over a neighboring cell to form a horizontal or vertical chain of three or more gems of the same shape and color.
When chains are formed, gems disappear and gems above them fall in their places. Random gems fall in to places in the upmost rows.

## Features
* Bomb - when a cell is clicked with key 'B' held down, the gem in the cell disappears.
* Quake - when key 'Q' is held down, the window shakes violently. During the quake, in every frame, all gems stand a 0.1% chance of disappearing. There are a limited numbers of frames this feature can be used.
* Dramatic exit - when gems disappear, they quickly shrinke to zero size while rotating.
* Turn the tables - when key 'A' or 'D' is held down, the window rotates in counterclockwise or clockwise direction, respectively.
* Downshift - Gems always fall along the grid-aligned direction closest to the screen's downwards.


## Game Demo

* Game page.
![Alt text](img-demo/img1.png?raw=true "Title")
![Alt text](img-demo/img2.png?raw=true "Title")

