import Phaser from '../lib/phaser.js';
import { SCENE_KEYS } from '../common/scene-keys.js';
import { ASSET_KEYS } from '../common/assets.js';

  const textConfig = {
    fontSize: '40px',
    color: '#043D8C',
    stroke: '#ffffff',
    strokeThickness: 6
  }

export class GameScene extends Phaser.Scene {
  #cursorKeys;
  #player;
  #playerSpeed;
  #fallingObjectFrames;
  #fallingObjects;
  #fallingObjectSpeed;
  #score;
  #scoreTextGameObject;
  #misses;
  #maxMisses;
  #isGameOver;
  #timerEvent;
  #livesRemaining;
  #livesRemainingTextGamObject;

  constructor() {
    super({
      key: SCENE_KEYS.GAME_SCENE,
    });
  }

  init(){
    this.#playerSpeed = 500;
    this.#fallingObjectSpeed = 200;
    this.#score = 0;
    this.#misses = 0;
    this.#maxMisses = 3;
    this.#isGameOver = false;
    this.#livesRemaining = this.#maxMisses;
  }
  /**
   * @public
   * Tied to the Phaser Scene lifecycle. Will run one time after the PRELOAD
   * logic is finished. Runs each time the Phaser Scene restarts.
   * @returns {void}
   */
  create() {
    const {width, height} = this.scale;
    // add game background
    this.add.image(this.scale.width / 2, this.scale.height / 2, ASSET_KEYS.BACKGROUND);

    this.#player = this.add.image(width/2, height, ASSET_KEYS.JAR).setDepth(1);

    // this.add.image(width/2, height/2, ASSET_KEYS.OBJECTS, "button3.png").setScale(1.1, 1.1);
  

    this.#cursorKeys = this.input.keyboard.createCursorKeys();

    this.#fallingObjects = [];
    this.#fallingObjectFrames = Object.keys(this.textures.get(ASSET_KEYS.OBJECTS).frames).filter((name) => name !== '__BASE');

    this.#timerEvent = this.time.addEvent({
      delay: 1000,
      callback: this.#spawnFallingObject,
      callbackScope: this,
      loop: true,
    });

    const scoreTextPrefix = this.add.text(10,10,'Score:', textConfig)
    this.#scoreTextGameObject = this.add.text(
      scoreTextPrefix.x + scoreTextPrefix.width,
      scoreTextPrefix.y,
      `${this.#score}`,
      textConfig);

    const livesTextPrefix = this.add.text(10, 60, 'Lives:', textConfig)
    this.#livesRemainingTextGamObject = this.add.text(
      livesTextPrefix.x + livesTextPrefix.width,
      livesTextPrefix.y,
      `${this.#maxMisses - this.#misses}`,
      textConfig,
    );  
  

    console.log(this.#player.getBounds());

    this.#spawnFallingObject();
  }

  update(time, delta){
    if (this.#isGameOver){
      return;
    }

    const moveStep = this.#playerSpeed * (delta / 1000)

    if (this.#cursorKeys.left.isDown){
      this.#player.x -= moveStep;
    } else if (this.#cursorKeys.right.isDown) {
      this.#player.x += moveStep;
    }

    if (this.#player.x - this.#player.displayWidth / 2 < 0){
      this.#player.x = this.#player.displayWidth / 2;
    } else if (this.#player.x + this.#player.displayWidth / 2  > this.scale.width){
      this.#player.x = this.scale.width - this.#player.displayWidth / 2;
    }

    for(let i = this.#fallingObjects.length - 1; i >=0; i--) {
      const obj = this.#fallingObjects[i];
      obj.y += this.#fallingObjectSpeed * (delta / 1000);

      const overlapPoints = Phaser.Geom.Intersects.GetRectangleToRectangle(
        this.#player.getBounds(),
        obj.getBounds()
      );

      // console.log(overlapPoints);

      if(overlapPoints.length > 0){
        obj.destroy();
        this.#fallingObjects.splice(i,1);
        this.#score += 10;
        this.#scoreTextGameObject.setText(`${this.#score}`)
      }

      if(obj.y > this.scale.height + 50){
        // this.#fallingObjects.pop(obj);
        obj.destroy();
        this.#fallingObjects.splice(i,1);
        this.#misses += 1;
        this.#livesRemaining -=1;
        this.#livesRemainingTextGamObject.setText(`${this.#livesRemaining}`)
      }
    }
    
    if(this.#misses >= this.#maxMisses){
      this.#handleGameOver();
    }
  }

  #spawnFallingObject(){
    const randomFrame = Phaser.Utils.Array.GetRandom(this.#fallingObjectFrames);
    const obj = this.add
      .image(Phaser.Math.RND.between(50, this.scale.width-50), 0, ASSET_KEYS.OBJECTS, randomFrame)
      .setScale(0.75);
    this.#fallingObjects.push(obj);

    // console.log(this.#fallingObjects.length);
  }

  #handleGameOver() {
    this.#isGameOver = true;
    this.#timerEvent.remove();
    this.add.text(this.scale.width/2, 
      this.scale.height/2, 
      'Game Over', 
      textConfig).setOrigin(0.5);
    this.input.once(Phaser.Input.Events.POINTER_DOWN, () => {
      this.scene.restart();
    })
  }
}
