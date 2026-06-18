import { Scene } from 'phaser';

export class FarmPrototype extends Scene{
    // put ya variables here
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Rectangle;
    plants: Phaser.GameObjects.Arc[];
    clickCounter: number;
    plantCount: number;


    // Then put some constructor here
    constructor ()
    {
        super('FarmPrototype');
    }

    create ()
    {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x78dde8);

    }
}