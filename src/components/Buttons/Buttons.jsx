// Context
import { useContext } from "react";
import StepContext from "../../context/stepContext";

// CSS
import "./Buttons.scss";

const Buttons = ({ onClickPrevious, onClickNext }) => {
	const { step } = useContext(StepContext);

	return (
		<div className="DlNmS">
			<button onClick={onClickPrevious} disabled={step < 2 ? true : false}>
				Previous
			</button>

			<button type="submit" onClick={onClickNext}>
				{step === 4 ? "Finish" : "Next"}
			</button>
		</div>
	);
};

export default Buttons;
