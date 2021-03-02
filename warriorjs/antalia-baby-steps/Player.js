class Player {
	playTurn(warrior) {
		const feeling = warrior.feel();
		if (feeling.isEmpty()) {
			if (warrior.health() < warrior.maxHealth()) {
				warrior.rest();
			}
			else {
				warrior.walk();
			}
		}
		else {
			warrior.attack();
		}
	}
}
