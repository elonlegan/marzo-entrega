export class RestartButton {
	constructor(scene) {
		this.relatedScene = scene;
	}

	preload() {
		this.relatedScene.load.spritesheet(
			'restartButton',
			'https://i.postimg.cc/yN3GCv4m/game-buttons.png',
			{
				frameWidth: 264,
				frameHeight: 73,
			}
		);
	}

	create() {
		this.startButton = this.relatedScene.add
			.sprite(500, 250, 'restartButton')
			.setInteractive();

		this.startButton.on('pointerover', () => {
			this.startButton.setFrame(1);
		});
		this.startButton.on('pointerout', () => {
			this.startButton.setFrame(0);
		});
		this.startButton.on('pointerdown', () => {
			this.relatedScene.scene.start('game');
		});
	}
}
