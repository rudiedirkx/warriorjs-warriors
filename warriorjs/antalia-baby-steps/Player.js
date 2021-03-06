class Player {
	playTurn(warrior) {
		this.warrior = warrior;

		const healthLost = this.healthLost(warrior);
		const feeling = warrior.feel();
		this.killedEnemy = this.prevMove == 'attack' && feeling.isEmpty();
this.killedEnemy && this.log('killed enemy');
		this.killedEnemy && (this.facingEnemy = null);
		const isCaptive = !feeling.isEmpty() && !feeling.getUnit().isEnemy() && feeling.getUnit().isBound();
		const isArcher = this.facingEnemy == 'archer' || this.isArcher(healthLost, feeling);
this.log(isArcher ? 'is archer' : 'is not archer');
this.facingEnemy && this.log('facing ' + this.facingEnemy);

		if (isCaptive) {
			warrior.rescue();
		}
		else if (healthLost > 0 && !isArcher) {
			this.prevMove = 'backward';
			warrior.walk('backward');
		}
		else if (feeling.isEmpty()) {
			if (!isArcher && warrior.health() < warrior.maxHealth()) {
				this.prevMove = 'rest';
				warrior.rest();
			}
			else {
				this.prevMove = 'forward';
				warrior.walk();
			}
		}
		else {
			this.prevMove = 'attack';
			this.facingEnemy = isArcher ? 'archer' : 'sludge';
			warrior.attack();
		}

		this.prevEmpty = feeling.isEmpty();
		this.prevHealth = warrior.health();
	}

	log(msg) {
		this.warrior.think(msg.toUpperCase ? msg.toUpperCase() : msg);
	}

	isArcher(healthLost, feeling) {
		return healthLost > 0 && (feeling.isEmpty() || this.prevEmpty);
	}

	healthLost(warrior) {
		if (this.prevHealth == null) {
			return 0;
		}

		const healthLost = this.prevHealth - warrior.health();
		return Math.max(0, healthLost);
	}
}
