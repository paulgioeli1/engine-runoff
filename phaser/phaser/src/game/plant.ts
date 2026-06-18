import { Scene } from 'phaser';

export type PlantType = 'red' | 'blue' | 'yellow'

// The rulebook: one place that says what each type is worth and what it looks like.
const PLANT_RULES: Record<PlantType, { clicks: number; color: number }> = {
    red:    { clicks: 1, color: 0xff0000 },
    blue:   { clicks: 2, color: 0x0000ff },
    yellow: { clicks: 3, color: 0xffff00 },
};

export class Plant {
    scene: Scene;
    circle: Phaser.GameObjects.Arc;
    type: PlantType;
    clicksLeft: number;
    col: number;
    row: number;

    constructor (scene: Scene, type: PlantType, col: number, row: number, cellSize: number) {
        this.scene = scene;
        this.type = type;
        this.col = col;
        this.row = row;

        // Look up this type's rule once. clicksLeft is now live, decrementing state.
        const rule = PLANT_RULES[type];
        this.clicksLeft = rule.clicks;

        // Cell -> pixel. +cellSize/2 puts the circle in the CENTER of the cell, not its corner.
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        const radius = cellSize * 0.35; // a bit smaller than the cell so it reads as "in" it

        this.circle = scene.add.circle(x, y, radius, rule.color);

        // Make THIS circle clickable. The hit area is the actual circle, not a square box.
        this.circle.setInteractive(
            new Phaser.Geom.Circle(radius, radius, radius),
            Phaser.Geom.Circle.Contains
        );
    }

    // A valid click landed (proximity already checked by the scene before calling this).
    // Returns true if this click killed the plant, so the scene knows to remove it.
    hit (): boolean {
        this.clicksLeft -= 1;
        if (this.clicksLeft <= 0) {
            this.destroy();
            return true;
        }
        return false;
    }

    destroy (): void {
        this.circle.destroy();
    }
}