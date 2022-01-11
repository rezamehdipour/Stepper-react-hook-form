import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Context
import { useContext } from "react";
import DataContext from "../../context/dataContext";

// React Hook Form
import { useForm } from "react-hook-form";

// Moment
import mg from "moment";
import mj from "moment-jalaali";

// Date Picker
import DatePicker from "react-datepicker2";

// Components
import Buttons from "../../components/Buttons/Buttons";
import Error from "../../components/Error/Error";

// Functions & Variables
const firstNameErrors = {
	required: "First name is required!",
	minLength: "First name min length is 2!",
	maxLength: "First name max length is 16!",
	pattern: "Only A-Z characters allowed!",
};
const lastNameErrors = {
	required: "Last name is required!",
	minLength: "Last name min length is 2!",
	maxLength: "Last name max length is 16!",
	pattern: "Only A-Z characters allowed!",
};
const genderErrors = {
	required: "Gender must be selected!",
	pattern: "Gender must be male or female!",
};
const birthdateErrors = {
	required: "Birthdate must be entered!",
	format: "Date format is incrorrect!",
	adult: "You must be at least 18!",
};
const handleGetGregorianDate = (momentJalaliObject) => {
	let gregorianDateString = momentJalaliObject.format("YYYY-MM-DD"); // Format : YYYY-MM-DD | 2020-01-08
	return gregorianDateString;
};
const handleCheckBirthdateFormat = (momentJalaliObject) => {
	const gregorianDateString = handleGetGregorianDate(momentJalaliObject);
	const result = mg(gregorianDateString, "YYYY-MM-DD", true).isValid() ? true : false;
	return result;
};
const handleIsAdultBirthdate = (momentJalaliObject) => {
	const birthdateString = handleGetGregorianDate(momentJalaliObject);
	const currentDayGregorian = Number(mg().format("DD"));
	const currentMonthGregorian = Number(mg().format("MM"));
	const currentYearGregorian = Number(mg().format("YYYY"));

	const eighteenYearsAgoGregorianDate = `${
		currentYearGregorian - 18
	}-${currentMonthGregorian}-${currentDayGregorian}`;

	const eighteenYearsAgoGregorianUnix = mg(eighteenYearsAgoGregorianDate).unix();
	const enteredDateGregorianUnix = mg(birthdateString).unix();

	if (enteredDateGregorianUnix > eighteenYearsAgoGregorianUnix) {
		return false;
	}
	return true;
};

const Personal = (props) => {
	const navigate = useNavigate();
	const { data, setData } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	// Birthdate
	const nowJalaliObject = mj();
	const nowJalaliDateString = nowJalaliObject.format("jYYYY-jMM-jDD");
	const nowGregorianDateString = nowJalaliObject.format("YYYY-MM-DD");
	const eighteenYearAgoJalaliObject = nowJalaliObject.add(-18, "jYear");
	const eighteenYearAgoJalali = eighteenYearAgoJalaliObject.format("jYYYY-jMM-jDD");
	const eighteenYearAgoGregorian = eighteenYearAgoJalaliObject.format("YYYY-MM-DD");

	const [isGregorian, setIsGregorian] = useState(true);
	const handleToggleDate = () => setIsGregorian((prev) => !prev);

	const [birthdate, setBirthdate] = useState(() => {
		if (data.birthdate) {
			return mj(data.birthdate);
		} else {
			return eighteenYearAgoJalaliObject;
		}
	});
	const handleSetBirthdate = (date) => setBirthdate(date);

	// On Submit
	const handleOnSubmit = ({ firstName, lastName, gender }) => {
		setData(["firstName", firstName]);
		setData(["lastName", lastName]);
		setData(["gender", gender]);
		setData(["birthdate", handleGetGregorianDate(birthdate)]);

		navigate("/identity");
	};

	return (
		<div className="PersonalPage">
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="inputs">
					{/* First Name */}
					<div className="group">
						<label htmlFor="firstName">First name :</label>
						<input
							type="text"
							name="firstName"
							id="firstName"
							{...register("firstName", {
								value: data.firstName || "",
								// Validation
								required: true,
								minLength: 2,
								maxLength: 16,
								pattern: /^[A-Za-z]+$/,
							})}
						/>
						{errors.firstName && <Error error={firstNameErrors[errors.firstName.type]} />}
					</div>

					{/* Last Name */}
					<div className="group">
						<label htmlFor="lastName">Last name :</label>
						<input
							type="text"
							name="lastName"
							id="lastName"
							{...register("lastName", {
								value: data.lastName || "",
								// Validation
								required: true,
								minLength: 2,
								maxLength: 16,
								pattern: /^[A-Za-z]+$/,
							})}
						/>
						{errors.lastName && <Error error={lastNameErrors[errors.lastName.type]} />}
					</div>

					{/* Gender */}
					<div className="group">
						<label>Gender :</label>
						<br />
						<label htmlFor="male">Male</label>
						<input
							type="radio"
							name="gender"
							id="male"
							value="male"
							{...register("gender", { required: true })}
						/>
						<label htmlFor="female">Female</label>
						<input
							type="radio"
							name="gender"
							id="female"
							value="female"
							{...register("gender", { required: true, pattern: /^(male|female)$/ })}
						/>
						{errors.gender && <Error error={genderErrors[errors.gender.type]} />}
					</div>

					{/* Birthdate */}
					<div className="group">
						<label htmlFor="birthdate">Birthdate :</label>
						<button type="button" onClick={handleToggleDate} className="qgNNn">
							{isGregorian ? "به شمسی" : "to gregorian"}
						</button>
						<br />
						<input
							type="hidden"
							name="birthdate"
							id="birthdate"
							value={handleGetGregorianDate(birthdate)}
							{...register("birthdate", {
								// Validation
								required: true,
								validate: {
									format: (date) => handleCheckBirthdateFormat(birthdate),
									adult: (date) => handleIsAdultBirthdate(birthdate),
								},
							})}
						/>
						<DatePicker
							timePicker={false}
							isGregorian={isGregorian}
							inputFormat="YYYY-MM-DD"
							inputJalaaliFormat="jYYYY-jMM-jDD"
							max={eighteenYearAgoJalaliObject}
							value={birthdate}
							onChange={handleSetBirthdate}
						/>
						{errors.birthdate && <Error error={birthdateErrors[errors.birthdate.type]} />}
					</div>
				</div>

				<Buttons />
			</form>
		</div>
	);
};
export default Personal;
