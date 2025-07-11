window.onload = () => {
  class FPSScene extends Phaser.Scene {
    constructor() { super({ key: 'FPSScene' }); }
    preload() {}
    create() {
      this.cameras.main.setBackgroundColor('#1a1a1a');
      this.add.text(20, 20, 'Fantasy FPS - DEMO', { fontSize: '24px', fill: '#fff' });

      // Health bar
      this.healthBar = this.add.rectangle(160, this.scale.height - 20, 300, 20, 0xff0000).setOrigin(0, 0.5);

      // Joystick placeholder (left)
      this.joystick = this.add.circle(80, this.scale.height - 80, 40, 0x5555ff).setAlpha(0.5);

      // Right side buttons
      const baseX = this.scale.width - 80;
      const baseY = this.scale.height - 80;
      this.buttons = {
        shoot: this.add.circle(baseX, baseY, 30, 0xffcc00).setAlpha(0.8),
        jump: this.add.circle(baseX - 70, baseY - 60, 25, 0x00ff00).setAlpha(0.7),
        aim:  this.add.circle(baseX - 70, baseY + 60, 25, 0x0099ff).setAlpha(0.7),
        crouch: this.add.circle(baseX - 140, baseY, 25, 0xff00ff).setAlpha(0.7)
      };

      this.add.text(baseX - 5, baseY - 10, '●', { fontSize: '28px', color: '#000' });
    }
    update() {}
  }

  const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: 'game-container',
    scene: [FPSScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.CENTER_BOTH
    }
  };

  new Phaser.Game(config);
};