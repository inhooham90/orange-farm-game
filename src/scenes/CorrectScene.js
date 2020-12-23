import { CONSTANTS } from '../CONSTANTS';
import MenuScene from './MenuScene';

export default class CorrectScene extends Phaser.Scene {
    constructor(){
        super({
            key: CONSTANTS.SCENES.CORRECT
        })
    }

    init(goal) {
        this.goal = goal;
    }

    preload () {
    
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
        let again = this.add
                        .image(this.game.renderer.width - 80, this.game.renderer.height - 60, 'again')
                        .setScale(2)
                        .setInteractive();
        this.add.text(20, this.game.renderer.height - 100, `You packed ${this.goal} oranges! \nGreat job! Play again!`, { fontSize: "32px" });

        this.sound.play("correct");

        again.on('pointerdown', () => {
            this.sound.stopAll();
            this.scene.remove(CONSTANTS.SCENES.MENU);
            this.scene.remove(CONSTANTS.SCENES.GAME);
            this.scene.add(CONSTANTS.SCENES.MENU, MenuScene, true);
        });
        // againText.on('pointerdown', () => this.scene.restart());
    }
}