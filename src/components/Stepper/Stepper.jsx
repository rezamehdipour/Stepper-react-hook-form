// Context
import { useContext } from "react";
import StepContext from "../../context/stepContext";

// CSS
import "./Stepper.scss";

const Stpper = (props) => {
	const { step } = useContext(StepContext);

	// Fill
	let fillWidth = (step - 1) * 33;
	fillWidth = `${fillWidth}%`;

	return (
		<div className="StepperComponent">
			<div className="wrapper">
				<div className="line">
					<div className="fill" style={{ width: fillWidth }}></div>
				</div>
				<ul className="steps">
					<li className={`step ${step === 1 ? "active" : ""} ${step > 1 ? "done" : ""}`} data-count="1">
						<span>Personal</span>
					</li>
					<li className={`step ${step === 2 ? "active" : ""} ${step > 2 ? "done" : ""}`} data-count="2">
						<span>Identity</span>
					</li>
					<li className={`step ${step === 3 ? "active" : ""} ${step > 3 ? "done" : ""}`} data-count="3">
						<span>Contact</span>
					</li>
					<li className={`step ${step === 4 ? "active" : ""} ${step > 4 ? "done" : ""}`} data-count="4">
						<span>Authentication</span>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Stpper;
