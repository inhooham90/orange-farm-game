import { CONSTANTS } from '../CONSTANTS';
import MenuScene from './MenuScene';

export default class LoadScene extends Phaser.Scene {
    constructor(){
        super({
            key: CONSTANTS.SCENES.LOAD
        })
    }

    preload () {
        this.load.image("sky", "assets/sky.png");
        this.load.image("bag", "assets/bag.png");
        this.load.image("orange", "assets/orange.png");
        this.load.image("title", "assets/title.png");
        this.load.image("123", "assets/123.png");
        this.load.image("456", "assets/456.png");
        this.load.image("789", "assets/789.png");
        this.load.image("again", "assets/back.png");
        this.load.audio("title_music", "assets/natural.mp3");
        this.load.audio("correct", "assets/correct.mp3");
        this.load.audio("put", "assets/put.mp3");
        this.load.audio("try", "assets/try.mp3");

        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xfcba03
            }
        });

        this.load.on("progress", percent => {
            loadingBar.fillRect(
                0, this.game.renderer.height / 2, 
                this.game.renderer.width * percent, 
                50
            );
        });

        this.load.on("complete", () => {
            this.scene.add(CONSTANTS.SCENES.MENU, MenuScene, false);
            this.scene.start(CONSTANTS.SCENES.MENU);
        });
    }


    create() {
        
    }
}