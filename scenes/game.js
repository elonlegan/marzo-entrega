import { LiveCounter } from '../components/live-counter.js';

export class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'game' });
	}

	init() {
		this.score = 0;
		this.liveCounter = new LiveCounter(this, 3);
		this.spawnasteroidtimeout;
		this.beforeAsteroidPosition;
		this.cam = this.cameras.main;
		this.level = 1;

		this.bulletdelay = 200;
		this.shootable = 1;
	}

	preload() {
		this.background = [
			'../images/Japon.svg',
			'../images/lima.svg',
			'../images/hong_kong.svg',
			'../images/londres.svg',
			'../images/toronto_.svg',
			'../images/rio_janeiro.svg',
			'../images/bogota.svg',
			'../images/chicago.svg',
		];
		this.backgroundWidth = 700;
		this.backgroundHeight = 700;

		this.background.forEach((element, index) => {
			this.load.svg('background' + index, element, {
				width: this.backgroundWidth,
				height: this.backgroundHeight,
			});
		});

		this.load.image('platform', 'https://i.postimg.cc/QCgfMjq6/plane-2.png');
		this.load.image(
			'asteroid',
			'https://i.postimg.cc/Dw0BJB9F/Asteroids-1.png'
		);

		this.load.image('laser', 'https://i.postimg.cc/dQp78ZCw/laser-Blue02.png');

		this.load.audio('gameoversample', 'sounds/gameover.ogg');
		this.load.audio('startgamesample', 'sounds/start-game.ogg');
		this.load.audio('livelostsample', 'sounds/live-lost.ogg');
		this.load.audio('changeTab', 'sounds/change-tab.ogg');
		this.load.audio('breakAsteroid', 'sounds/ast-exp.mp3');
		this.load.audio('shoot', 'sounds/shoot.wav');
		this.objects = {};
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

		this.physics.world.setBoundsCollision(true, true, true, false);

		this.liveCounter.create();

		this.platform = this.physics.add.image(60, 250, 'platform');
		this.platform.setCollideWorldBounds(true);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
		this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
		this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
		this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
		this.spaceBar = this.input.keyboard.addKey(
			Phaser.Input.Keyboard.KeyCodes.SPACE
		);

		this.scoreText = this.add.text(16, 16, 'PUNTOS: 0', {
			fontSize: '20px',
			fill: '#fff',
			fontFamily: 'verdana, arial, sans-serif',
		});

		this.largeast = this.physics.add.group(
			{
				immovable: true,
				allowGravity: false,
			},
			'asteroid'
		);
		this.bullets = this.physics.add.group(
			{
				immovable: true,
				allowGravity: false,
			},
			'laser'
		);

		this.physics.add.collider(
			this.platform,
			this.largeast,
			this.playerhit,
			null,
			this
		);

		this.physics.add.collider(
			this.bullets,
			this.largeast,
			this.hitasteroid,
			null,
			this
		);

		setTimeout(this.spawnasteroid.bind(this), 1000);

		this.gameOverSample = this.sound.add('gameoversample');
		this.liveLostSample = this.sound.add('livelostsample');
		this.shootSample = this.sound.add('shoot');
		this.changeTabSample = this.sound.add('changeTab', { volume: 0.1 });
		this.brakeAsteroidSample = this.sound.add('breakAsteroid');
	}

	update(time, delta) {
		this.increasePoints(time);
		//taking bullet input and shooting
		if (this.spaceBar.isDown && this.shootable) {
			this.bul = this.bullets
				.create(this.platform.x + 40, this.platform.y - 10, 'laser')
				.setScale(0.6);
			this.bul.angle = 90;
			this.bul.body.velocity.x = Math.sin((Math.PI / 180) * 90) * 1000;
			this.bul.setVisible(false);
			setTimeout(
				function () {
					this.bul.setVisible(true);
				}.bind(this),
				10
			);
			this.shootable = 0;
			this.shootSample.play();

			setTimeout(
				function () {
					this.shootable = 1;
				}.bind(this),
				this.bulletdelay
			);
		}

		if (this.cursors.up.isDown || this.keyW.isDown) {
			this.changeTabSample.play();
			this.platform.setVelocityY(-500);
		} else if (this.cursors.down.isDown || this.keyS.isDown) {
			this.platform.setVelocityY(500);
			this.changeTabSample.play();
		} else if (this.cursors.left.isDown || this.keyA.isDown) {
			this.platform.setVelocityX(-500);
			this.platform.setVelocityY(0);
		} else if (this.cursors.right.isDown || this.keyD.isDown) {
			this.platform.setVelocityY(0);
			this.platform.setVelocityX(500);
		} else {
			this.platform.setVelocity(0, 0);
		}

		if (this.platform.y > 580 && this.platform.active) {
			let gameNotFinished = this.liveCounter.liveLost();
			if (!gameNotFinished) {
				this.setInitialPlatformState();
			}
		}

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

	increasePoints(time) {
		this.numberdivide = 1000 / this.level;
		if (time % this.numberdivide >= 0 && time % this.numberdivide <= 10) {
			this.score++;
			this.scoreText.setText('PUNTOS: ' + this.score);
		}
	}

	endGame(completed = false) {
		if (!completed) {
			this.gameOverSample.play();
			this.scene.start('gameover');
		} else {
			this.scene.start('congratulations');
		}
	}
	setInitialPlatformState() {
		this.liveLostSample.play();
		this.platform.x = 60;
		this.platform.y = 250;
	}

	spawnasteroid() {
		this.ast = this.largeast.create(
			1100,
			calcY(this.beforeAsteroidPosition, 100, 30, 470),
			'asteroid'
		);
		this.ast.body.velocity.x = -500 * this.level;
		this.spawnasteroidtimeout = setTimeout(
			this.spawnasteroid.bind(this),
			500 / this.level
		);
		this.ast.angle = Phaser.Math.Between(-180, 180);
		this.beforeAsteroidPosition = this.ast.y;

		this.level = this.level * 1.001;

		function calcY(befast, range, between1, between2) {
			let ramdonY = Phaser.Math.Between(between1, between2);
			do {
				ramdonY = Phaser.Math.Between(between1, between2);
			} while (befast + range >= ramdonY && befast - range <= ramdonY);
			return ramdonY;
		}
	}

	playerhit(player, ast) {
		ast.destroy();
		this.brakeAsteroidSample.play();
		let gameNotFinished = this.liveCounter.liveLost();
		if (!gameNotFinished) {
			this.setInitialPlatformState();
		}

		var particles = this.add.particles('asteroid');

		var emitter = particles.createEmitter();

		emitter.setPosition(ast.x, ast.y);
		emitter.setSpeed(100, 250);
		emitter.setLifespan(2000);
		emitter.setScale(0.1);
		emitter.setBlendMode('normal');
		setTimeout(function () {
			emitter.stop();
		}, 200);
	}

	hitasteroid(bullet, aster) {
		aster.anims.accumulator += 1;
		if (aster.anims.accumulator > 2) {
			aster.destroy();
			this.brakeAsteroidSample.play();

			//add score
			this.score += 100;
			this.scoreText.setText('PUNTOS: ' + this.score);

			//emit particles where asteroid is distroyed
			var particles = this.add.particles('asteroid');

			var emitter = particles.createEmitter();

			emitter.setPosition(bullet.x, bullet.y);
			emitter.setSpeed(100, 250);
			emitter.setLifespan(2000);
			emitter.setScale(0.1);
			emitter.setBlendMode('normal');
			setTimeout(function () {
				emitter.stop();
			}, 200);
		} else {
			//emit particles where bullet hits
			var particles = this.add.particles('asteroid');

			var emitter = particles.createEmitter();

			emitter.setPosition(bullet.x, bullet.y);
			emitter.setSpeed(200, 350);
			emitter.setLifespan(100);
			emitter.setScale(0.1);
			emitter.setBlendMode('normal');
			setTimeout(function () {
				emitter.stop();
			}, 200);
		}

		bullet.destroy();
	}
}
