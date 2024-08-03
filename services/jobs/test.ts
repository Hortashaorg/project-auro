class Player {
	private _startHealth: number;
	private _startDefense: number;
	private _startAttack: number;
	private _startSpeed: number;

	private _name: string;
	private _health: number;
	private _defense: number;
	private _attack: number;
	private _speed: number;

	constructor(
		name: string,
		health: number,
		defense: number,
		attack: number,
		speed: number,
	) {
		this._health = health;
		this._defense = defense;
		this._attack = attack;
		this._speed = speed;
		this._name = name;
		this._startHealth = health;
		this._startDefense = defense;
		this._startAttack = attack;
		this._startSpeed = speed;
	}

	// Method to apply damage
	takeDamage(damage: number) {
		const damageTaken = Math.max(damage - this._defense, 0);
		this._health -= damageTaken;
		return damageTaken;
	}

	// Method to check if the player is still alive
	isAlive() {
		return this._health > 0;
	}

	increaseDamage(amount: number) {
		this._attack += amount;
	}

	getStats() {
		return {
			name: this._name,
			health: this._startHealth,
			defense: this._startDefense,
			attack: this._startAttack,
			speed: this._startSpeed,
		};
	}

	get attack() {
		return this._attack;
	}

	get speed() {
		return this._speed;
	}

	get name() {
		return this._name;
	}
}

type AttackLog = {
	round: number;
	action: "attack";
	attacker: string;
	defender: string;
	damageDealt: number;
	message: string;
};

type FightStartLog = {
	round: number;
	action: "fightStart";
	message: string;
};

type FightEndLog = {
	round: number;
	action: "fightEnd";
	message: string;
	winner: string;
};

type RampUpLog = {
	round: number;
	action: "rampUp";
	message: string;
	player1Attack: number;
	player2Attack: number;
};

type Log = AttackLog | FightStartLog | FightEndLog | RampUpLog;

const player1 = new Player("player1", 100, 5, 5, 2);
const player2 = new Player("player2", 100, 5, 5, 2);

function attack(
	attacker: Player,
	defender: Player,
	round: number,
	logs: Log[],
) {
	const damageDealt = defender.takeDamage(attacker.attack);
	logs.push({
		round: round,
		action: "attack",
		attacker: attacker.name,
		defender: defender.name,
		damageDealt: damageDealt,
		message: `${attacker.name} attacks ${defender.name} for ${damageDealt} damage!`,
	});
}

function fight(player1: Player, player2: Player) {
	let round = 1;
	const rampUpStart = 10;
	const rampAmount = 5;
	const logs: Log[] = [];

	while (player1.isAlive() && player2.isAlive()) {
		logs.push({
			round: round,
			action: "fightStart",
			message: `Round ${round} begins`,
		});

		// Apply ramping damage after the specified round
		if (round >= rampUpStart) {
			player1.increaseDamage(rampAmount);
			player2.increaseDamage(rampAmount);

			logs.push({
				round: round,
				action: "rampUp",
				message: `Ramping damage applied: +${rampAmount} attack for both players.`,
				player1Attack: player1.attack,
				player2Attack: player2.attack,
			});
		}

		// Determine who attacks first based on speed
		if (player1.speed > player2.speed || Math.random() < 0.5) {
			attack(player1, player2, round, logs);
			if (player2.isAlive()) {
				attack(player2, player1, round, logs);
			}
		} else {
			attack(player2, player1, round, logs);
			if (player1.isAlive()) {
				attack(player1, player2, round, logs);
			}
		}
		round++;
	}

	const winner = player1.isAlive() ? player1 : player2;
	const loser = player1.isAlive() ? player2 : player1;
	logs.push({
		round: round,
		action: "fightEnd",
		message: `${winner.name} wins the fight!`,
		winner: winner.name,
	});

	return {
		logs: logs,
		winner: winner.getStats(),
		loser: loser.getStats(),
	};
}

const result = fight(player1, player2);

for (const log of result.logs) {
	console.log(log.message);
}

console.log(result.winner);
console.log(result.loser);
