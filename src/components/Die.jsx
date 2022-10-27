const Die = ({ value, isHeld, holdDice }) => {
	return (
		<div
			onClick={holdDice}
			style={{ backgroundColor: isHeld ? "#59E391" : "white" }}
			className="die-face"
		>
			<h2 className="die-num">{value}</h2>
		</div>
	);
};

export default Die;
