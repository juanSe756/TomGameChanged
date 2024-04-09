import Tomato from '../Player/Tomato.js';
import Bombs from '../Objects/Bombs.js';
import TomatoItem from '../Objects/TomatoItem.js';

class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    
    init() {
        console.log('Se ha iniciado la escena Play');
        this.scene.launch('UI');
    }

    create() {
        
        this.add.image(0, 0, 'background')
            .setOrigin(0);
            
        this.wall_floor = this.physics.add.staticGroup();

        this.wall_floor.create(0, 0, 'wall')
            .setOrigin(0);
        this.wall_floor.create(this.scale.width, 0, 'wall')
            .setOrigin(1, 0)
            .setFlipX(true);
        
        this.wall_floor.create(0, this.scale.height, 'floor')
            .setOrigin(0, 1);
        this.add.image(300,
            30, 'restart')
            .setScale(0.1);

        this.wall_floor.refresh();

        this.wall_floor.getChildren()[2].setOffset(0, 15);


        // Bombs
        this.bombsGroup = new Bombs({
            physicsWorld: this.physics.world,
            scene: this
        });

        // Items
        this.itemsGroup = new TomatoItem({
            physicsWorld: this.physics.world,
            scene: this
        });

        // Personaje
        this.tomato = new Tomato({
            scene: this,
            x: 100,
            y: 100,
        });
        //Si se presiona la tecla R, se reinicia el juego
        this.input.keyboard.on('keydown-R', () => {
            this.registry.events.emit('restart');
        });
        //si se presiona en el boton restart se produce el evento restart
        this.input.on('pointerdown', (pointer) => {
            if(pointer.x > 250 && pointer.x < 350 && pointer.y > 10 && pointer.y < 40) {
                this.registry.events.emit('restart');
            }
        });
        
        this.physics.add.collider([this.tomato, this.bombsGroup], this.wall_floor);
        this.physics.add.overlap(this.tomato, this.bombsGroup, () => {
            this.tomato.bombCollision();
        });

        this.physics.add.overlap(this.itemsGroup, this.tomato, () => {
            this.sound.play('pop');
            this.registry.events.emit('update_points');
            this.itemsGroup.destroyItem();
            this.bombsGroup.addBomb();
        });
    }

    update() {
        this.tomato.update();
        this.bombsGroup.update();
    }
}

export default Play;