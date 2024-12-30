interface ControlPanelConfig {
    scene: Phaser.Scene;
    x: number;
    y: number;
    width: number;
    height: number;
    padding?: number;
    buttonSpacing?: number;
    backgroundColor?: number;
    backgroundAlpha?: number;
}

export class ControlPanel {
    private scene: Phaser.Scene;
    private container: Phaser.GameObjects.Container;
    private background: Phaser.GameObjects.Rectangle;
    private controls: Phaser.GameObjects.Image[];
    private padding: number;
    private buttonSpacing: number;
    private currentX: number;
    private currentY: number;

    constructor(config: ControlPanelConfig) {
        this.scene = config.scene;
        this.controls = [];
        
        // Set default values
        this.padding = config.padding ?? 20;
        this.buttonSpacing = config.buttonSpacing ?? 10;
        
        // Create container
        this.container = this.scene.add.container(config.x, config.y);
        
        // Add background panel
        this.background = this.scene.add.rectangle(
            0,
            0,
            config.width,
            config.height,
            config.backgroundColor ?? 0x333333,
            config.backgroundAlpha ?? 0.8
        );
        this.container.add(this.background);
        
        // Initialize current position
        this.currentX = this.padding;
        this.currentY = this.padding;
    }
    
    addControl(
        imageKey: string,
        callback: () => void,
        scale: number = 1.0,
    ): Phaser.GameObjects.Image {
        const control = this.scene.add.image(0, 0, imageKey)
            .setInteractive()
            .setScale(scale);
            
        // Center the control in its grid cell
        control.x = -this.currentX - this.padding / 2;
        control.y = this.currentY + this.padding / 2;
        
        // Add interaction handlers
        control.on('pointerdown', () => {
            control.setScale(scale * 0.9);
            callback();
        });
        
        control.on('pointerup', () => {
            control.setScale(scale);
        });
        
        control.on('pointerout', () => {
            control.setScale(scale);
        });
        
        // Add to container
        this.container.add(control);
        this.controls.push(control);
        
        // Update position for next control
        this.currentX += control.displayWidth + this.buttonSpacing;
        
        // If we exceed panel width, move to next row
        if (this.currentX + control.displayWidth + this.padding > this.background.width) {
            this.currentX = this.padding;
            this.currentY += control.displayHeight + this.buttonSpacing;
        }
        
        return control;
    }

    // Additional utility methods
    setVisible(visible: boolean): void {
        this.container.setVisible(visible);
    }

    setPosition(x: number, y: number): void {
        this.container.setPosition(x, y);
    }

    destroy(): void {
        this.container.destroy();
    }
}