import Phaser from 'phaser';

export default class Scene_2 extends Phaser.Scene {
  constructor() {
    super({
        key: 'Scene_2',
        physics: {
            matter: {
                positionIterations: 10,
                velocityIterations: 10,
                debug: false
            }
        }
    });
  }

  preload() { 
    this.load.audio('watyq', '/src/assets/1/sounds/watyq.mp3');
    this.load.audio('wfpyq', '/src/assets/1/sounds/wfpyq.mp3');
    this.load.audio('wfwyq', '/src/assets/1/sounds/wfwyq.mp3');
    this.load.audio('whtyq', '/src/assets/1/sounds/whtyq.mp3');
    this.load.audio('wmnyq', '/src/assets/1/sounds/wmnyq.mp3');
    this.load.audio('wnnyq', '/src/assets/1/sounds/wnnyq.mp3');
    this.load.audio('wodyq', '/src/assets/1/sounds/wodyq.mp3');
    this.load.audio('wsuyq', '/src/assets/1/sounds/wsuyq.mp3');
    
  }

  create() {
    this.scale.resize(400, 600);
    const background = this.add.graphics();
    background.fillStyle(0x2d2d2d, 1);
    background.fillRect(0, 0, 400, 600);    
    background.setDepth(-1);

    this.matter.world.disableGravity();

    const width = this.scale.width;
    const height = this.scale.height;
    const thickness = 64;

    const boundOptions = { isStatic: true, restitution: 1, friction: 0 };
    
    this.matter.add.rectangle(width / 2, -thickness / 2, width, thickness, boundOptions); 
    this.matter.add.rectangle(width / 2, height + thickness / 2, width, thickness, boundOptions); 
    this.matter.add.rectangle(-thickness / 2, height / 2, thickness, height, boundOptions);
    this.matter.add.rectangle(width + thickness / 2, height / 2, thickness, height, boundOptions);
    
    this.matter.add.gameObject(this.add.rectangle(0, 0, 100, 100, 0x222222),{
        isStatic: true, 
        restitution: 1, 
        friction: 0,
        angle: Phaser.Math.DegToRad(45),
    });
    this.matter.add.gameObject(this.add.rectangle(0, 600, 100, 100, 0x222222),{
        isStatic: true, 
        restitution: 1, 
        friction: 0,
        angle: Phaser.Math.DegToRad(45),
    });
    this.matter.add.gameObject(this.add.rectangle(400, 0, 100, 100, 0x222222),{
        isStatic: true, 
        restitution: 1, 
        friction: 0,
        angle: Phaser.Math.DegToRad(45),
    });
    this.matter.add.gameObject(this.add.rectangle(400, 600, 100, 100, 0x222222),{
        isStatic: true, 
        restitution: 1, 
        friction: 0,
        angle: Phaser.Math.DegToRad(45),
    });
    
    const wallWidth = 100;
    const wallHeight = 30;

    const rectData = [
        { x: 50, y: 50, width: wallWidth, height: wallHeight, color: 0xDF301C, angle: -45, sound: 'watyq' },  
        { x: 350, y: 50, width: wallWidth,  height: wallHeight, color: 0xFFD51E, angle: 45, sound: 'wfpyq' },   
        { x: 50, y: 550, width: wallWidth, height: wallHeight, color: 0x00B7CD, angle: -135, sound: 'wfwyq' },  
        { x: 350, y: 550, width: wallWidth, height: wallHeight, color: 0xAB03A9, angle: 135, sound: 'whtyq' },   
        { x: 20, y: 300, width: wallWidth,  height: wallHeight, color: 0x5003C0, angle: 90, sound: 'wmnyq' },   
        { x: 200, y: 20, width: wallWidth, height: wallHeight, color: 0xFF467A, angle: 0, sound: 'wnnyq' },  
        { x: 380, y: 300, width: wallWidth,  height: wallHeight, color: 0x2A7C13, angle: 90, sound: 'wodyq' },  
        { x: 200, y: 580, width: wallWidth, height: wallHeight, color: 0xd5070e, angle: 0, sound: 'wsuyq' } 
    ];

    rectData.forEach(data => {
        const rect = this.add.rectangle(data.x, data.y, data.width, data.height, data.color);

        const radians = Phaser.Math.DegToRad(data.angle);

        this.matter.add.gameObject(rect, {
            label: 'wall',
            sound: data.sound,
            color: data.color,
            isStatic: true, 
            restitution: 1, 
            friction: 0,
            angle: radians,
            originalX: data.x,
            originalY: data.y
        });
    });

    
    const ballsConfig = [
        { x: 100, y: 100, vx: 8, vy: 6, color: 0x165823 },  
        { x: 400, y: 150, vx: -6, vy: 9, color: 0xff0055 },
        { x: 200, y: 400, vx: 7, vy: -7, color: 0xD90000 } 
    ];

    ballsConfig.forEach(config => {
        const radius = 16;
        const ballGraphics = this.add.circle(config.x, config.y, radius, config.color);
        
        const ballBody = this.matter.add.circle(config.x, config.y, radius, {
            label: 'ball',
            restitution: 1,      
            friction: 0,
            frictionAir: 0,
            inertia: Infinity    
        });

        this.matter.add.gameObject(ballGraphics, ballBody);
        ballGraphics.setVelocity(config.vx, config.vy);
    });

    const boostFactor = 1.2;     
    const maxSpeed = 15;         
    
    this.matter.world.on('collisionstart', (event) => {
        event.pairs.forEach((pair) => {
            const { bodyA, bodyB } = pair;


            let wallBody = null;
            if (bodyA.label === 'wall') {
                wallBody = bodyA;
            } else if (bodyB.label === 'wall') {
                wallBody = bodyB;
            }

            if (wallBody) {
                
                wallBody.gameObject.setFillStyle(0xABDADC); 
                this.time.delayedCall(150, () => {
                    wallBody.gameObject.setFillStyle(wallBody.color); 
                });
                this.tweens.add({
                    targets: wallBody.gameObject,
                    x: wallBody.gameObject.x + Phaser.Math.Between(-5, 5),
                    y: wallBody.gameObject.y + Phaser.Math.Between(-5, 5),
                    duration: 40,
                    yoyo: true,
                    repeat: 3,
                    onComplete: () => {
                        this.tweens.add({
                            targets: wallBody.gameObject,
                            x: wallBody.originalX,
                            y: wallBody.originalY
                        });
                    }
                });

                this.sound.play(wallBody.sound, { volume: 0.5 });
                
            }

            let ballBody = null;
            if (bodyA.label === 'ball') {
                ballBody = bodyA;
            } else if (bodyB.label === 'ball') {
                ballBody = bodyB;
            }

            if (ballBody) {
                const vx = ballBody.velocity.x * boostFactor;
                const vy = ballBody.velocity.y * boostFactor;

                const currentSpeed = Math.sqrt(vx * vx + vy * vy);

                let finalVx = vx;
                let finalVy = vy;

                if (currentSpeed > maxSpeed) {
                    finalVx = (vx / currentSpeed) * maxSpeed;
                    finalVy = (vy / currentSpeed) * maxSpeed;
                }

                this.matter.body.setVelocity(ballBody, {
                    x: finalVx,
                    y: finalVy
                });

                
            }
        });
    });
  }
}