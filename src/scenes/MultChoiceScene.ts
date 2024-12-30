import { MultChoice, FAMILYMC } from '../types/MultChoice';
import { ControlPanel } from '../widgets/ControlPanel'

export class MultChoiceScene extends Phaser.Scene {
    private controlPanel?: ControlPanel;
    private score: number = 0;
    private currentQuestion: number = 0;
    private questionText!: Phaser.GameObjects.Text;
    private optionTexts: Phaser.GameObjects.Text[] = [];
    private scoreText!: Phaser.GameObjects.Text;
    private background!: Phaser.GameObjects.Image;

    constructor() {
        super({ key: 'MultChoiceScene' });
    }

    preload() {
        this.load.image('background', 'assets/skies/space3.png');
        this.load.image('button', 'assets/sprites/button-bg.png');
        this.load.audio('correct', 'assets/audio/training-program-correct2-88734.mp3');
        this.load.audio('wrong', 'assets/audio/buzzer-or-wrong-answer-20582.mp3');
        this.load.image('home', 'assets/sprites/home_128x128.png');
    }

    create() {
        this.background = this.add.image(400, 300, 'background');
        
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '32px',
            color: '#ffffff'
        });

        this.questionText = this.add.text(400, 200, '', {
            fontSize: '24px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        // Type assertion for sound manager to access Web Audio API
        const soundManager = this.sound as Phaser.Sound.WebAudioSoundManager;

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

        this.displayQuestion();
    }

    private displayQuestion() {
        if (this.currentQuestion >= FAMILYMC.length) {
            this.gameOver();
            return;
        }

        const question = FAMILYMC[this.currentQuestion];
        this.questionText.setText(question.text);

        // Clear existing option buttons
        this.optionTexts.forEach(text => text.destroy());
        this.optionTexts = [];

        // Create new option buttons
        question.options.forEach((option, index) => {
            const optionText = this.add.text(400, 300 + (index * 50), option, {
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: '#4a4a4a',
                padding: { x: 10, y: 5 }
            })
            .setInteractive()
            .setOrigin(0.5);

            optionText.on('pointerdown', () => this.checkAnswer(index));
            optionText.on('pointerover', () => optionText.setBackgroundColor('#666666'));
            optionText.on('pointerout', () => optionText.setBackgroundColor('#4a4a4a'));

            this.optionTexts.push(optionText);
        });
    }

    private checkAnswer(selectedIndex: number) {
        const question = FAMILYMC[this.currentQuestion];
        
        if (selectedIndex === question.correctAnswer) {
            this.score += 10;
            this.scoreText.setText(`Score: ${this.score}`);
            this.sound.play('correct');
        } else {
            this.sound.play('wrong');
        }

        this.currentQuestion++;
        setTimeout(() => this.displayQuestion(), 500);
    }

    private gameOver() {
        this.questionText.setText(`Game Over!\nFinal Score: ${this.score}`);
        this.optionTexts.forEach(text => text.destroy());
        
        const restartButton = this.add.text(400, 400, 'Play Again', {
            fontSize: '24px',
            backgroundColor: '#4a4a4a',
            padding: { x: 10, y: 5 }
        })
        .setInteractive()
        .setOrigin(0.5)
        .on('pointerdown', () => {
            this.score = 0;
            this.currentQuestion = 0;
            this.displayQuestion();
            restartButton.destroy();
        });
    }
}
