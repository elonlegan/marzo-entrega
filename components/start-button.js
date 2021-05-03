export class StartButton {
	constructor(scene) {
		this.relatedScene = scene;
	}

	preload() {
		this.relatedScene.load.spritesheet(
			'startButton',
			'https://i.postimg.cc/bvMjQZ8T/start-button.png',
			{
				frameWidth: 264,
				frameHeight: 73,
			}
		);
	}

	create() {
		this.startButton = this.relatedScene.add
			.sprite(500, 250, 'startButton')
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
