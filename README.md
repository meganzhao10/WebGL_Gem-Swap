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
* Bomb: when a cell is clicked with key 'B' held down, the gem in the cell disappears.
* Quake: when key 'Q' is held down, the window shakes violently. During the quake, in every frame, all gems stand a 0.1% chance of disappearing. There are a limited numbers of frames this feature can be used.
* Dramatic exit: when gems disappear, they quickly shrinke to zero size while rotating.
* Turn the tables: when key 'A' or 'D' is held down, the window rotates in counterclockwise or clockwise direction, respectively.
* Downshift: Gems always fall along the grid-aligned direction closest to the screen's downwards.
* Stretch goal: Add a user-controlled avatar (e.g. spaceship, Mario, side-view car, top-view car). Display objects as semi-transparent quads with animated textures. Use physics (forces, torques, acceleration, velocity, drag, etc.) to simulate the motion of objects. Use collision detection and response to make them interact plausibly. Make the 2D camera follow the avatar. Display a minimap. Show the number of lives remaining, or pickups gathered. Shoot projectiles. Display explosions. Display animated characters. Use particle systems to render exhaust plasma/smoke/fire. Display objects with rotating parts (wheel, rotor, turret, etc.). Move enemies with simple AI (visit checkpoints, chase down avatar, etc.)
* Potential Features: timer; put bomb somewhere by drag and drop; change shapes 


## Game Demo

![Alt text](img-demo/img1.png?raw=true "Title")
![Alt text](img-demo/img2.png?raw=true "Title")

