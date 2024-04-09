class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    init() {
        console.log('Se ha iniciado la escena GameOverScene');
        this.scene.launch('UI');
    }

    create() {
        this.add.image(this.scale.width/2, this.scale.height-80, 'exit').setOrigin(0.5).setScale(0.1);
        this.add.bitmapText(
            this.scale.width/2, this.scale.height/2,
            'pixelFont', 'GAME OVER').setOrigin(0.5);
            
        // Evento para reiniciar el juego
        this.input.on('pointerdown', (pointer) => {
            if(pointer.x >= (this.scale.width/2)-20 && pointer.x <= (this.scale.width/2)+30 && pointer.y >= this.scale.height-90 && pointer.y <= this.scale.height-50) {
                this.registry.events.emit('exit');
                console.log('exit');
            }
        });
        
    }
}

export default GameOverScene;
