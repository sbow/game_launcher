import 'phaser';
import { MenuScene } from './scenes/MenuScene';
import { RobotEqScene } from './scenes/RobotEqScene';
import { MultChoiceScene } from './scenes/MultChoiceScene';
import { AsteroidsScene } from './scenes/AsteroidsScene';

//https://docs.phaser.io/api-documentation/typedef/types-core
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MenuScene, RobotEqScene, MultChoiceScene, AsteroidsScene],
    backgroundColor: '#000000',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    audio: {
        disableWebAudio: false,
        noAudio: false
    },
};

// Create game instance
const game = new Phaser.Game(config);