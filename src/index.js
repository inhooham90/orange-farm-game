
import Phaser from 'phaser';

import LoadScene from './scenes/LoadScene';

const config = {
  type: Phaser.AUTO,
  // change back to 800
  width: 600,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      // gravity: { y: 400 },
      debug: true
    }
  },
  scene: [
    LoadScene
  ]
};

new Phaser.Game(config);

// function preload () {
//   this.load.image('sky', 'assets/sky.png');
//   this.load.image('orange', 'assets/bird.png');
// }

// let orange = null;

// function create () {
//   let { width, height } = config;
//   this.add.image(0, 0, 'sky').setOrigin(0,0);
//   for(let i = 0; i < 5; i++) {
//     let xx = Phaser.Math.Between()
//   }

// }

// function update(time, delta) {
//   // delta is the time (in ms) spent on each frame.

// }