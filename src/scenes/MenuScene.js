import { CONSTANTS } from '../CONSTANTS';
import GameScene from './GameScene';

export default class MenuScene extends Phaser.Scene {
    constructor(){
        super({
            key: CONSTANTS.SCENES.MENU
        })
    }

    create() {

    }

    preload() {
        this.scene.remove(CONSTANTS.SCENES.CORRECT);
    }

    create() {
        this.add
            .image(0, 0, 'sky')
            .setOrigin(0)
            .setDepth(0);

        this.add
            .image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.3, 'title')
            .setScale(0.5)
            .setDepth(1);

        let three = this.add
                        .image(this.game.renderer.width * 0.25, this.game.renderer.height * 0.6, '123')
                        .setScale(0.2)
                        .setDepth(1)
                        .setInteractive();
        let six = this.add
                        .image(this.game.renderer.width * 0.5, this.game.renderer.height * 0.8, '456')
                        .setScale(0.2)
                        .setDepth(1)
                        .setInteractive();
        let nine = this.add
                        .image(this.game.renderer.width * 0.75, this.game.renderer.height * 0.6, '789')
                        .setScale(0.2)
                        .setDepth(1)
                        .setInteractive();

        this.sound.pauseOnBlur = false;
        this.sound.play("title_music", {
            loop: true
        })
        
        three.on("pointerover", () => {
            six.setTint(0xb3b3b3);
            nine.setTint(0xb3b3b3);
        });
        three.on("pointerout", () => {
            six.clearTint();
            nine.clearTint();
        });

        six.on("pointerover", () => {
            three.setTint(0xb3b3b3);
            nine.setTint(0xb3b3b3);
        });
        six.on("pointerout", () => {
            three.clearTint();
            nine.clearTint();
        });

        nine.on("pointerover", () => {
            three.setTint(0xb3b3b3);
            six.setTint(0xb3b3b3);
        });
        nine.on("pointerout", () => {
            three.clearTint();
            six.clearTint();
        });

        this.scene.add(CONSTANTS.SCENES.GAME, GameScene, false);

        three.on("pointerdown", () => {
            this.scene.start(CONSTANTS.SCENES.GAME, { number: 3 });
        });

        six.on("pointerdown", () => {
            this.scene.start(CONSTANTS.SCENES.GAME, { number: 6 });
        });

        nine.on("pointerdown", () => {
            this.scene.start(CONSTANTS.SCENES.GAME, { number: 9 });
        });
    }
}