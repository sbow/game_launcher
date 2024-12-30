import { ControlPanel } from '../widgets/ControlPanel'

export class RobotEqScene extends Phaser.Scene {
    // Declare class properties with proper types
    private controlPanel?: ControlPanel;
    private analyser!: AnalyserNode;
    private dataArray!: Uint8Array;
    private bufferLength!: number;
    private graphics!: Phaser.GameObjects.Graphics;
    private shader!: Phaser.GameObjects.Shader;

    constructor() {
        super({ key: 'RobotEqScene' });
    }

    preload() {
        //this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
        this.load.video('robot', 'assets/video/robot-dance.webm');
        this.load.audio('tune', 'assets/audio/aquakitty-kittyrock.m4a');
        this.load.glsl('bundle', 'assets/shaders/bundle4.glsl.js');
        this.load.image('home', 'assets/sprites/home_128x128.png');
    }

    create() {
        const text = this.add.text(10, 10, 'Click to start', { 
            fontFamily: 'Courier',
            fontSize: '16px',
            color: '#00ff00'
        });

        // Type assertion for sound manager to access Web Audio API
        const soundManager = this.sound as Phaser.Sound.WebAudioSoundManager;
        
        // Create audio analyzer
        const analyser = soundManager.context.createAnalyser();
        soundManager.masterVolumeNode.connect(analyser);
        analyser.connect(soundManager.context.destination);
        analyser.smoothingTimeConstant = 1;

        this.bufferLength = analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);
        this.analyser = analyser;

        this.input.once('pointerdown', () => {
            text.destroy();

            this.sound.play('tune', { loop: true });
            this.add.shader('GridBack', 512, 300, 1024, 600);
            this.graphics = this.add.graphics();
            this.add.video(512, 300, 'robot').play(true);
        });

        // Add home button
        this.controlPanel = new ControlPanel({
            scene: this,
            x: this.cameras.main.width,
            y: 0,
            width: 128,
            height: 128,
            padding: 20,
            buttonSpacing: 10,
            backgroundColor: 0x333333,
            backgroundAlpha: 0.8
        });
        
        this.controlPanel.addControl('home', () => {
            this.scene.start('MenuScene');
        }, 0.5);

        // Crerate shader
        this.shader = this.add.shader('GridBack', 512, 300, 1024, 600);
        this.graphics = this.add.graphics();

        // Setup events for loss of browser focus - prevent tearing shader
        this.game.events.on('hidden', () => this.onGameHidden());
        this.game.events.on('visible', () => this.onGameVisible());
        window.addEventListener('blur', () => this.onGameHidden());
        window.addEventListener('focus', () => this.onGameVisible());
    }

    private onGameHidden() {
        if (this.shader) {
            this.shader.setActive(false);
            this.shader.setVisible(false);
        }
    }

    private onGameVisible() {
        if (this.shader) {
            this.shader.setActive(true);
            this.shader.setVisible(true);
        }
    }

    update() {
        if (!this.graphics) {
            return;
        }

        this.analyser.getByteTimeDomainData(this.dataArray);

        this.graphics.clear();
        this.graphics.lineStyle(2, 0x00ff00);
        this.graphics.beginPath();

        const sliceWidth = 1024 / this.bufferLength;
        let x = 0;

        for (let i = 0; i < this.bufferLength; i++) {
            const v = this.dataArray[i] / 128;
            const y = v * 300;

            if (i === 0) {
                this.graphics.moveTo(x, y);
            } else {
                this.graphics.lineTo(x, y);
            }

            x += sliceWidth;
        }

        this.graphics.lineTo(1024, 300);
        this.graphics.stroke();

        // Add home button
        this.controlPanel = new ControlPanel({
            scene: this,
            x: this.cameras.main.width,
            y: 0,
            width: 128,
            height: 128,
            padding: 20,
            buttonSpacing: 10,
            backgroundColor: 0x333333,
            backgroundAlpha: 0.8
        });
        
        this.controlPanel.addControl('home', () => {
            this.scene.start('MenuScene');
            this.graphics.destroy();
            this.sound.stopAll();
        }, 0.5);
    }

    destroy() {
        this.game.events.off('hidden');
        this.game.events.off('visible');
        window.removeEventListener('blur', this.onGameHidden);
        window.removeEventListener('focus', this.onGameVisible);
    }
}