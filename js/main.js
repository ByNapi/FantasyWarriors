window.onload = () => {
  function createRectTexture(scene, key, width, height, color){
    const gfx = scene.add.graphics();
    gfx.fillStyle(color, 1);
    gfx.fillRect(0, 0, width, height);
    gfx.generateTexture(key, width, height);
    gfx.destroy();
  }

  class StoryScene extends Phaser.Scene {
    constructor() { super('StoryScene'); }
    create() {
      const { width, height } = this.scale;
      createRectTexture(this,'player',40,40,0x00aaff);
      createRectTexture(this,'enemy',40,40,0xff5555);
      createRectTexture(this,'bullet',8,16,0xffff00);
      this.cameras.main.setBackgroundColor('#222244');
      this.player = this.physics.add.sprite(width/2,height - 80,'player').setCollideWorldBounds(true);
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
      this.bullets = this.physics.add.group();
      this.enemies = this.physics.add.group();
      this.time.addEvent({ delay: 1500, callback: () => this.spawnEnemy(), loop:true });
      this.physics.add.overlap(this.bullets,this.enemies,(b,e)=>{b.destroy();e.destroy();},null,this);
    }
    update() {
      const speed = 250;
      this.player.setVelocity(0);
      if(this.cursorKeys.left.isDown)  this.player.setVelocityX(-speed);
      if(this.cursorKeys.right.isDown) this.player.setVelocityX(speed);
      if(this.cursorKeys.up.isDown)    this.player.setVelocityY(-speed);
      if(this.cursorKeys.down.isDown)  this.player.setVelocityY(speed);
      if(Phaser.Input.Keyboard.JustDown(this.spacebar)) this.fireBullet();
    }
    fireBullet() {
      const b = this.bullets.create(this.player.x,this.player.y - 25,'bullet');
      b.setVelocityY(-400);
    }
    spawnEnemy() {
      const x = Phaser.Math.Between(40,this.scale.width - 40);
      const e = this.enemies.create(x,-40,'enemy').setVelocityY(100);
    }
  }

  const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: window.innerWidth,
    height: window.innerHeight,
    physics: { default: 'arcade', arcade: { debug: false }},
    scene: [StoryScene],
    scale: { mode: Phaser.Scale.RESIZE }
  };

  new Phaser.Game(config);
};