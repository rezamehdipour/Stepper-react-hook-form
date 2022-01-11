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
const continents = ["asia", "europe", "africa", "oceania"];
const countries = ["iran", "germany", "russia", "china", "georgia"];

const contentErrors = {
	required: "Select a continent!",
	exists: "Selected continent is not in the list!",
};
const countryErrors = {
	required: "Select a country!",
	exists: "Selected country is not in the list!",
};
const nationalCardIdErrors = {
	required: "Enter your national card id!",
	pattern: "Enter a proper id! (Only numbers, 10 characters)",
};
const nationalCardPhotoErrors = {
	required: "Choose a card photo!",
	photo: "Only .jpg , .jpeg , .png allowed!",
	size: "Maximum allowed size : 100KB",
};

const handleIsContinentExists = (continent) => {
	if (continents.find((c) => c === continent) === undefined) {
		return false;
	}
	return true;
};
const handleIsCountryExists = (country) => {
	if (countries.find((c) => c === country) === undefined) {
		return false;
	}
	return true;
};
const handleIsNationalCardPhoto = (file) => {
	const photo = file[0];
	const extension = photo.name.split(".").at(-1);
	const allowedExtensions = ["jpg", "jpeg", "png"];
	if (allowedExtensions.find((exten) => exten === extension) === undefined) {
		return false;
	}
	return true;
};
const handleNationalCardSize = (file) => {
	const photo = file[0];
	const photoSizeInKb = (photo.size / 1024).toFixed(1);
	if (photoSizeInKb > 100) {
		return false;
	}
	return true;
};

const Identity = (props) => {
	const navigate = useNavigate();
	const { data, setData } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const handlePrevious = () => {
		navigate("/");
	};
	// On Submit
	const handleOnSubmit = ({ continent, country, nationalCardId, nationalCardPhoto }) => {
		setData(["continent", continent]);
		setData(["country", country]);
		setData(["nationalCardId", nationalCardId]);
		setData(["nationalCardPhoto", nationalCardPhoto[0].name]);

		navigate("/contact");
	};

	return (
		<div className="IdentityPage">
			<form onSubmit={handleSubmit(handleOnSubmit)}>
				<div className="inputs">
					{/* ——— Continent ——— */}
					<div className="group">
						<label htmlFor="continent">Continent :</label>
						<br />
						<select
							name="continent"
							id="continent"
							{...register("continent", {
								value: data.continent || "",
								// Validation
								required: true,
								validate: {
									exists: (continent) => handleIsContinentExists(continent),
								},
							})}
						>
							<option value=""></option>
							{continents.map((continent, index) => (
								<option key={index} value={continent}>
									{continent}
								</option>
							))}
						</select>
						{errors.continent && <Error error={contentErrors[errors.continent.type]} />}
					</div>

					{/* ——— Country ——— */}
					<div className="group">
						<label htmlFor="country">Country :</label>
						<br />
						<select
							name="country"
							id="country"
							{...register("country", {
								value: data.country || "",
								// Validation
								required: true,
								validate: {
									exists: (country) => handleIsCountryExists(country),
								},
							})}
						>
							<option value=""></option>
							{countries.map((country, index) => (
								<option key={index} value={country}>
									{country}
								</option>
							))}
						</select>
						{errors.country && <Error error={countryErrors[errors.country.type]} />}
					</div>

					{/* ——— National Card Id ——— */}
					<div className="group">
						<label htmlFor="nationalCardId">National Card ID (Number Only) :</label>
						<br />
						<input
							type="tel"
							id="nationalCardId"
							{...register("nationalCardId", {
								value: data.nationalCardId || "",
								// Validation
								required: true,
								pattern: /^([0-9]{10,10})$/,
							})}
						/>
						{errors.nationalCardId && (
							<Error error={nationalCardIdErrors[errors.nationalCardId.type]} />
						)}
					</div>

					{/* ——— National Card Photo ——— */}
					<div className="group">
						<label htmlFor="nationalCardPhoto">
							National Card Photo (JPEG,PNG | Max : 100KB) :
						</label>
						<br />
						<input
							type="file"
							accept=".png, .jpg, .jpeg"
							{...register("nationalCardPhoto", {
								required: true,
								validate: {
									photo: (file) => handleIsNationalCardPhoto(file),
									size: (file) => handleNationalCardSize(file),
								},
							})}
						/>
						{errors.nationalCardPhoto && (
							<Error error={nationalCardPhotoErrors[errors.nationalCardPhoto.type]} />
						)}
					</div>
				</div>
				<Buttons onClickPrevious={handlePrevious} />
			</form>
		</div>
	);
};

export default Identity;
