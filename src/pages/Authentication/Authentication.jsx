import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import DataContext from "../../context/dataContext";

// React Hook Form
import { useForm } from "react-hook-form";

// Axios
import axios from "axios";

// Toast
import { toast } from "react-toastify";

// Components
import Error from "../../components/Error/Error";
import Buttons from "../../components/Buttons/Buttons";

// Functions & Variables
const usernameErrors = {
	required: "Enter a username!",
	pattern: "Enter a correct username",
};
const passwordErrors = {
	required: "Enter a password!",
	pattern: "Enter a proper password! between 6 to 16 chars",
	minLength: "Min lenght is 6",
	maxLength: "Max lenght is 16",
};
const favoriteColorErrors = {
	required: "Select a favorite color!",
	pattern: "Selected color hex if not in a correct format",
	exactLength: "Selected color hex if not in a correct format",
};
const handleCheckFavoriteColorLength = (color) => {
	if (color.length !== 4 && color.length !== 7) {
		return false;
	}
	return true;
};

toast.configure();
const Authentication = (props) => {
	const navigate = useNavigate();
	const { data, setData } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Finish
	const handleFinish = async () => {
		await axios.post("https://jsonplaceholder.typicode.com/posts", data);
		toast.success("Request has been sent!");
	};

	const handlePrevious = () => {
		navigate("/identity");
	};
	// On Submit
	const handleOnSubmit = ({ username, password, favoriteColor }) => {
		setData(["username", username]);
		setData(["password", password]);
		setData(["favoriteColor", favoriteColor]);

		handleFinish();
	};

	return (
		<div className="AuthenticationPage">
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="inputs">
					{/* Username */}
					<div className="group">
						<label htmlFor="username">Username :</label>
						<br />
						<input
							type="text"
							name="username"
							id="username"
							{...register("username", {
								value: data.username || "",
								// Validation
								required: true,
								pattern: /^[A-Za-z][A-Za-z0-9_]{3,}$/,
							})}
						/>
						{errors.username && <Error error={usernameErrors[errors.username.type]} />}
					</div>

					{/* Password */}
					<div className="group">
						<label htmlFor="password">Password :</label>
						<br />
						<input
							type="password"
							id="password"
							{...register("password", {
								value: data.password || "",
								// Validation
								required: true,
								pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/,
								minLength: 6,
								maxLength: 16,
							})}
						/>
						{errors.password && <Error error={passwordErrors[errors.password.type]} />}
					</div>

					{/* Favorite Color */}
					<div className="group">
						<label htmlFor="favoriteColor">Favorite Color :</label>
						<br />
						<input
							type="color"
							name="favoriteColor"
							id="favoriteColor"
							{...register("favoriteColor", {
								value: data.favoriteColor || "",
								// Validation
								required: true,
								pattern: /#(?:[0-9a-fA-F]{3}){1,2}/,
								validate: {
									exactLength: (color) => handleCheckFavoriteColorLength(color),
								},
							})}
						/>
						{errors.favoriteColor && (
							<Error error={favoriteColorErrors[errors.favoriteColor.type]} />
						)}
					</div>
				</div>

				<Buttons onClickPrevious={handlePrevious} />
			</form>
		</div>
	);
};

export default Authentication;
