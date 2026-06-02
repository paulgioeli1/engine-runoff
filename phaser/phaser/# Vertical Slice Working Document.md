# Playable Prototype Working Document

The purpose of this doc is to outline all the features and inner workings around what I want for my playable prototype

## Prototype Summary

A single player should be able to plant 3 different plants

## Game Objects (in no particular order)

- Main menu Scene
- Game Scene
- End of Demo scene (I think, we'll see if we need that)


## Running list of questions:

How big should the game region be?
16x16 or 32x32 or 64x64?

I'm thinking we do a single region, maybe something like 100 x 100 square or something, of which maybe like 85% of it is playable?
I should come up with 4 different crops: 3 of which are easy to plant and occur at different rarities, and the last one that's super special (maybe a reward or something)?
I'm thinking one beast type, but maybe multiple them? Should the player be able to breed here?

No, what's the loop? Let me shrink the loop down.

1. Click  mechanics help generate the first few seeds that player's can plant.
    Click to fill out their initial inventory.
2. From there, players plant seeds. The further along the player is in the game, the greater access they have to better crops, the longer the crops take to grow.
    Plant a single seed of a single crop.
3. Player Harvests crops.
    Player can then harvest the crop (using what? maybe just their hands?)
4. Player uses crops to create items and/or to lure beasts from around the world. item creation is largely discovery based, but recipes could be found in the world.
    For now, single crop is used to lure / start taming beast. 
5. Player captures/tames beast.
    Beast requires 3 crop feedings to be tamed.
6. Beast comes back to farm.
    Some sort of autologic for the beastie to hang out "in a farm". Not really sure what that looks like
7. Player uses crops and beasts to solve Color Fountain puzzles - mini puzzles throughout the world that restores the worlds color.
    Should have a single fountain, with a single puzzle, solvable with a single beast.  I'm handwaving a lot here, what needs to happen for this to go right? Does the player control the beast?
8. Player continues that loop to unlock ALL the color in a region (between 3 and 9 fountains) + have the right monsters and the right crops to travel to puzzle area, and uses crops and beasts to solve the puzzle.
9. Player solves puzzle unlocks new area, with new crops, beasts, maybe an npc or two, etc.
10. Player goes back to step 2, in the new region.