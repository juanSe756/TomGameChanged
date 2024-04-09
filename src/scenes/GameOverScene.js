class GameOverScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOverScene' });
    }
    init(data) {
        this.points = 0;
        console.log('Se ha iniciado la escena GameOverScene');
        this.scene.launch('UI');
        if(Object.keys(data).length !== 0) {
            this.points = data.points;
        }

    }

    create() {
        this.add.image(this.scale.width/2, this.scale.height-80, 'exit').setOrigin(0.5).setScale(0.1);
        this.add.bitmapText(
            this.scale.width/2, this.scale.height/2,
            'pixelFont', 'GAME OVER').setOrigin(0.5);

        this.pointsText = this.add.bitmapText(
            this.scale.width/2,
            this.scale.height - 300,
            'pixelFont',
            'PUNTOS ' + this.points,
            10
        ).setDepth(2).setOrigin(0.5);
            
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
