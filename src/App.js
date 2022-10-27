import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

// Components
import Die from "./components/Die";

const App = () => {
	const [dice, setDice] = useState(allNewDice());
	const [tenzies, setTenzies] = useState(false);

	useEffect(() => {
		const allHeld = dice.every((die) => die.isHeld);
		const firstValue = dice[0].value;
		const allSameValue = dice.every((die) => die.value === firstValue);
		if (allHeld && allSameValue) {
			setTenzies(true);
		}
	}, [dice]);

	function generateNewDie() {
		return {
			value: Math.ceil(Math.random() * 6),
			isHeld: false,
			id: nanoid(),
		};
	}

	function allNewDice() {
		// new array to hold my numbers
		const newDice = [];
		// loop 10 times
		for (let i = 0; i < 10; i++) {
			// push a random number from 1-6 to my array
			newDice.push(generateNewDie());
		}
		// return array
		return newDice;
	}

	const rollDice = () => {
		if (!tenzies) {
			setDice((oldDice) =>
				oldDice.map((die) => {
					return die.isHeld ? die : generateNewDie();
				})
			);
		} else {
			setTenzies(false);
			setDice(allNewDice());
		}
	};

	const holdDice = (id) => {
		setDice((oldDice) =>
			oldDice.map((die) => {
				return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
			})
		);
	};

	const diceElements = dice.map((die) => {
		const { value, isHeld, id } = die;
		return (
			<Die
				holdDice={() => holdDice(id)}
				key={id}
				value={value}
				isHeld={isHeld}
			/>
		);
	});

	return (
		<main>
			{tenzies && <Confetti />}
			<h1 className="title">Tenzies</h1>
			<p className="instructions">
				Roll until all dice are the same. Click each die to freeze it at its
				current value between rolls.
			</p>
			<div className="dice-container">{diceElements}</div>
			<button className="roll-dice" onClick={rollDice}>
				{tenzies ? "New Game" : "Roll"}
			</button>
		</main>
	);
};

export default App;
