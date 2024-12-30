import { MenuItemEnum, MenuItems, STARTMENU } from '../types/MenuItems';

export class MenuScene extends Phaser.Scene {
    private demo_rectangle!: Phaser.GameObjects.Rectangle;
    private menuTexts: Phaser.GameObjects.Text[] = [];
    private startMenuData: MenuItems[];
    private graphics!: Phaser.GameObjects.Graphics;
    private shader!: Phaser.GameObjects.Shader;

    constructor() {
        super({ key: 'MenuScene'})
        this.startMenuData = STARTMENU;
    }

    preload() {
        // this.load.image ect, preload art / media
        this.load.glsl('bundle', 'assets/shaders/bundle4.glsl.js');
    }

    create() {
        // set this.background, text elments available on load
        console.log('hello world!');
        this.startMenuData = this.startMenuData.map((menuItem => {
            if (menuItem.item === MenuItemEnum.RobotEqScene) {
                return {
                    ...menuItem,
                    scene_key: 'RobotEqScene', // Assign data in main for abstraction
                };
            }
            if (menuItem.item === MenuItemEnum.MultChoice) {
                return {
                    ...menuItem,
                    scene_key: 'MultChoiceScene',
                };
            }
            if (menuItem.item === MenuItemEnum.Asteroids) {
                return {
                    ...menuItem,
                    scene_key: 'AsteroidsScene',
                };
            }
            return menuItem; // leave others w defaults
        }));
        
        // Crerate shader
        this.shader = this.add.shader('GridBack', 512, 300, 1024, 600);
        this.graphics = this.add.graphics();

        // Setup events for loss of browser focus - prevent tearing shader
        this.game.events.on('hidden', () => this.onGameHidden());
        this.game.events.on('visible', () => this.onGameVisible());
        window.addEventListener('blur', () => this.onGameHidden());
        window.addEventListener('focus', () => this.onGameVisible());
        
        // Draw the menu
        this.displayMenu();
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

    update(time: number, delta: number) {
        // This method is called once per game step while the scene is running.
        // https://docs.phaser.io/api-documentation/class/scene
        
        // handle shader / graphics
        //if (!this.graphics) {
        //    return;
        //}

        //this.graphics.clear()

    }

    private displayMenu() {
        this.menuTexts.forEach(text => text.destroy());
        this.menuTexts = [];
        this.startMenuData.forEach((option, index) => {
            const menuText = this.add.text(400, 300 + (index * 50), option.text, {
                fontSize: '20px',
                color: '#ffffff',
                backgroundColor: '#4a4a4a',
                padding: { x: 10, y: 5}
            })
            .setInteractive()
            .setOrigin(0.5);

            menuText.on('pointerdown', () => console.log('change scene placeholder'));
            menuText.on('pointerover', () => menuText.setBackgroundColor('#666666'));
            menuText.on('pointerout', () => menuText.setBackgroundColor('#4a4a4a'));

            if (option.scene_key !== undefined) {
                menuText.on('pointerdown', () => {
                    const msg = "changing scene to " + option.scene_key;
                    console.log(msg);
                    this.scene.start(option.scene_key);
                });
            }

            this.menuTexts.push(menuText);
        });
    }

    destroy() {
        this.game.events.off('hidden');
        this.game.events.off('visible');
        window.removeEventListener('blur', this.onGameHidden);
        window.removeEventListener('focus', this.onGameVisible);
    }

}