import { StartButton } from '../components/start-button.js';

export class Start extends Phaser.Scene {
	constructor() {
		super({ key: 'Start' });
		this.startButton = new StartButton(this);
	}

	preload() {
		this.background = [
			'../../img/Animados/Japon.svg',
			'../../img/Animados/lima.svg',
			'../../img/Animados/hong_kong.svg',
			'../../img/Animados/londres.svg',
			'../../img/Animados/toronto_.svg',
			'../../img/Animados/rio_janeiro.svg',
			'../../img/Animados/bogota.svg',
			'../../img/Animados/chicago.svg',
		];
		this.backgroundWidth = 700;
		this.backgroundHeight = 700;

		this.background.forEach((element, index) => {
			this.load.svg('background' + index, element, {
				width: this.backgroundWidth,
				height: this.backgroundHeight,
			});
		});

		this.load.image(
			'keyShoot',
			'https://i.postimg.cc/v1fWS4cj/keyboard-shoot.png'
		);
		this.load.image(
			'keyMovement',
			'https://i.postimg.cc/87qRHRPM/keys-movement.png'
		);

		this.startButton.preload();

		this.cam = this.cameras.main;
	}

	create() {
		this.backgroundArray = [];
		this.background.forEach((element, index) => {
			this.backgroundArray[index] = this.physics.add.image(
				this.backgroundWidth * index,
				382,
				'background' + index
			);

			this.backgroundArray[index].body.allowGravity = false;
			this.backgroundArray[index].setVelocityX(-100);
			this.backgroundArray[index].displayOriginX = 0;
		});
		this.numberBackground = 0;
		this.currentBackground = this.backgroundArray[0];

		this.cam.setBackgroundColor('#5aa7dc');

		this.startButton.create();

		this.StartImage = this.add.image(100, 400, 'keyMovement');
		this.StartImage = this.add.image(900, 400, 'keyShoot');
	}

	update() {
		if (this.currentBackground.x < -this.backgroundWidth) {
			this.numberofbackground = this.backgroundArray.length - 1;
			this.numberBackground++;
			this.currentBackground.x = this.numberofbackground * this.backgroundWidth;
			if (this.numberBackground == this.backgroundArray.length) {
				this.numberBackground = 0;
			}
			this.currentBackground = this.backgroundArray[this.numberBackground];
		}
	}
}
