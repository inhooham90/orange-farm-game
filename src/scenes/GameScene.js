import { CONSTANTS } from '../CONSTANTS';
import CorrectScene from './CorrectScene';

export default class GameScene extends Phaser.Scene {
    constructor(){
        super({
            key: CONSTANTS.SCENES.GAME
        })
    }

    init(data) {
        this.data = data;
    }

    create() {

    }

    preload() {
        
    }

    create() {
        this.add.image(0, 0, 'sky').setOrigin(0);
        this.goal = Phaser.Math.Between(this.data.number-2, this.data.number);
        this.add.text(20, this.game.renderer.height - 80, `Let's pack ${this.goal} oranges!\n `, { fontSize: "32px" });
        this.count = 0;
        for(let i = 0; i < this.data.number; i++) {
            let xx = Phaser.Math.Between(this.game.renderer.width * 0.1, this.game.renderer.width * 0.8);
            let yy = Phaser.Math.Between(this.game.renderer.height * 0.1, this.game.renderer.height * 0.8);
            let orange = this.add.image(xx, yy, "orange").setScale(0.4);
            orange.setInteractive();
        }
        let bag = this.add.image(this.game.renderer.width - 50, this.game.renderer.height - 50, 'bag').setScale(0.3);
        bag.setInteractive();

        this.input.on("pointerdown", this.startDrag, this);

        bag.on("pointerover", () => {
            bag.setTint(0xb3b3b3);
        });

        bag.on("pointerout", () => {
            bag.clearTint();
        });

    }

    checkBag() {
        if(this.goal === this.count) {
            this.scene.add(CONSTANTS.SCENES.CORRECT, CorrectScene, false);
            this.scene.start(CONSTANTS.SCENES.CORRECT, this.goal);
        } else {
            this.sound.play("try");
            this.add.text(this.game.renderer.width * 0.1, this.game.renderer.height * 0.4, `You packed ${this.count} oranges! \nLet's try again!`, { fontSize: "32px" });
            let again = this.add
                        .image(this.game.renderer.width * 0.85, this.game.renderer.height * 0.45, 'again')
                        .setScale(2)
                        .setInteractive();
            again.on('pointerdown', () => {
                this.scene.restart();
            });
        }
    }

    startDrag(pointer, targets) {
        if(pointer.x > this.game.renderer.width - 99 && pointer.y > this.game.renderer.height - 99){
            return this.checkBag();
        }
        this.selected = targets[0];
        this.input.off('pointerdown', this.startDrag, this);
        this.input.on('pointermove', this.doDrag, this);
        this.input.on('pointerup', this.endDrag, this);
    }

    doDrag(pointer) {
        if(this.selected) {
            this.selected.setTint(0xed826d);
            this.selected.x = pointer.x;
            this.selected.y = pointer.y;
        }
    }

    endDrag(pointer, targets) {
        this.input.off('pointerup', this.endDrag, this);
        this.input.off('pointermove', this.doDrag, this);
        this.input.on('pointerdown', this.startDrag, this);
        if(this.selected) this.selected.clearTint();
        if(this.selected.x > this.game.renderer.width - 100 && this.selected.y > this.game.renderer.height - 100) {
            this.selected.destroy();
            this.count++;
            this.sound.play("put");
        }
    }
}