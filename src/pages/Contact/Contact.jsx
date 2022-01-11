import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import DataContext from "../../context/dataContext";

// React Hook Form
import { useForm } from "react-hook-form";

// Components
import Error from "../../components/Error/Error";
import Buttons from "../../components/Buttons/Buttons";

// Functions & Variables
const phoneNumberErrors = {
	required: "Enter a phone number!",
	pattern: "Enter a valid phone number (Starts with 09 and have 11 characters)",
};
const emailErrors = {
	required: "Enter an email!",
	pattern: "Enter a correct email",
};
const addressErrors = {
	required: "Enter an address!",
	minLength: "Enter a correct address. (at least 3 chars)",
};
const websiteErrors = {
	required: "Enter a website!",
	pattern: "Enter website in a correct format!",
};

const Contact = (props) => {
	const navigate = useNavigate();
	const { data, setData } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handlePrevious = () => {
		navigate("/identity");
	};
	// On Submit
	const handleOnSubmit = ({ phoneNumber, email, address, website }) => {
		setData(["phoneNumber", phoneNumber]);
		setData(["email", email]);
		setData(["address", address]);
		setData(["website", website]);

		navigate("/authentication");
	};

	return (
		<div className="ContactPage">
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="inputs">
					{/* Phone Number */}
					<div className="group">
						<label htmlFor="phoneNumber">Phone Number (09123456789) :</label>
						<br />
						<input
							type="tel"
							name="phoneNumber"
							id="phoneNumber"
							{...register("phoneNumber", {
								value: data.phoneNumber || "",
								// Validation
								required: true,
								pattern: /^09(\d){9,9}$/,
							})}
						/>
						{errors.phoneNumber && <Error error={phoneNumberErrors[errors.phoneNumber.type]} />}
					</div>

					{/* Email */}
					<div className="group">
						<label htmlFor="email">Email :</label>
						<br />
						<input
							type="email"
							id="email"
							{...register("email", {
								value: data.email || "",
								// Validation
								required: true,
								pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
							})}
						/>
						{errors.email && <Error error={emailErrors[errors.email.type]} />}
					</div>

					{/* Address */}
					<div className="group">
						<label htmlFor="address">Address :</label>
						<br />
						<input
							type="text"
							name="address"
							id="address"
							{...register("address", {
								value: data.address || "",
								// Validation
								required: true,
								minLength: 3,
							})}
						/>
						{errors.address && <Error error={addressErrors[errors.address.type]} />}
					</div>

					{/* Website */}
					<div className="group">
						<label htmlFor="website">Website :</label>
						<br />
						<input
							type="text"
							name="website"
							id="website"
							{...register("website", {
								value: data.website || "",
								// Validation
								required: true,
								pattern: /(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})[\w.-]*/,
							})}
						/>
						{errors.website && <Error error={websiteErrors[errors.website.type]} />}
					</div>
				</div>
				<Buttons onClickPrevious={handlePrevious} />
			</form>
		</div>
	);
};

export default Contact;
