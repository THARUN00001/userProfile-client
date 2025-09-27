import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


function AddMoreDataOrEdit() {

	const location = useLocation();
	const receivedData = location.state;


	const userData = receivedData


	var primaryData = userData.primaryData;
	var secondaryData = userData.secondaryData;



	const [changedFields1, setChangedFields1] = useState({});

	const [formData1, setFormData1] = useState({

		//user information
		firstName: primaryData.firstName,
		lastName: primaryData.lastName,
		emailID: primaryData.emailID,
		phone: primaryData.phone,
		dateOfBirth: primaryData.dateOfBirth,
		gender: primaryData.gender,

		//user addcityaddress: '',
		address: primaryData.address,
		city: primaryData.city,
		state: primaryData.state,
		country: primaryData.country,
		postalCode: primaryData.postalCode,

		//user porfessional information

		userHeadline: primaryData.userHeadline,
		userSummary: primaryData.userSummary,
		skills: primaryData.skills,
		experience: primaryData.experience,

		userID: primaryData.userID
	})



	var [formData2, setFormData2] = useState({


		// //work experience
		currentOrRecentjobRole: secondaryData.currentOrRecentjobRole, //current or recent
		currentOrRecentjobCompany: secondaryData.currentOrRecentjobCompany,
		currentOrRecentstartDate: secondaryData.currentOrRecentstartDate,
		currentOrRecentendDate: secondaryData.currentOrRecentendDate,
		currentOrRecentdescription: secondaryData.currentOrRecentdescription,

		//education details
		collegeName: secondaryData.collegeName,
		degree: secondaryData.degree,
		fieldOfStudy: secondaryData.fieldOfStudy,
		endYear: secondaryData.endYear,
		gradeOrPercentage: secondaryData.gradeOrPercentage,

		// project Details
		projectTitle: secondaryData.projectTitle,
		projectDescription: secondaryData.projectDescription,
		technologiesUsed: secondaryData.technologiesUsed,
		projectURL: secondaryData.projectURL,


		//user web-links
		website: secondaryData.website,
		github: secondaryData.github,
		linkedIn: secondaryData.linkedIn,
		resume: secondaryData.resume,

		user: {
			connect: { userID: primaryData.userID }
		}

	})



	const [errors, setError] = useState({})

	var isChecked = false;
	const updateEndDate = (e) => {


		isChecked = true;
		const element = document.getElementById("workCheckBox");
		if (element.checked == true) {
			document.getElementById("endDate").style.display = "none"
			isChecked = true;
			setFormData2({
				...formData2,
				currentOrRecentendDate: "Present",
			});
		} else {
			isChecked = false;
			document.getElementById("endDate").style.display = "block"
		}
	}


	const handleChangeForm2 = (e) => {


		const { name, value } = e.target;

		setFormData2({
			...formData2,
			[name]: value,
		});
	};


	const handleChangeForm1 = (e) => {
		const { name, value } = e.target;

		setFormData1((prev) => ({
			...prev,
			[name]: value,

		}));

		
		setChangedFields1((prev) => ({
			...prev,
			[name]: value,

		}));
	

	};



	const navigate = useNavigate();


	// form validation

	const validate = () => {
		let tempErrors = {};
		tempErrors.firstName = formData1.firstName ? "" : "First name is required.";
		tempErrors.lastName = formData1.lastName ? "" : "Last name is required.";
		const email = formData1.emailID.trim();
		tempErrors.emailID = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email) ? '' : "Email is not valid.";
		tempErrors.phone = formData1.phone.length === 10 ? "" : "Phone number must be 10 digits";
		tempErrors.dateOfBirth = formData1.dateOfBirth ? "" : "Choose Data of Birth";
		tempErrors.gender = formData1.gender ? '' : "Choose Gender";

		tempErrors.address = formData1.address ? "" : "Enter address";
		tempErrors.city = formData1.city ? "" : "Enter city";
		tempErrors.state = formData1.state ? "" : "Enter state";
		tempErrors.country = formData1.country ? "" : "Enter country";
		tempErrors.postalCode = formData1.postalCode ? "" : "Enter postalCode";


		tempErrors.userHeadline = formData1.userHeadline ? "" : "Enter Headline";
		tempErrors.userSummary = formData1.userSummary ? "" : "Enter Summary";
		tempErrors.skills = formData1.skills ? "" : "Enter skills";
		tempErrors.experience = formData1.experience ? "" : "Enter experience";

		setError(tempErrors);
		return Object.values(tempErrors).every(x => x === "");
	};


	async function handleRegistrationFormSubmit(e) {





		e.preventDefault();
		if (validate()) {

			try {
				

					const token = localStorage.getItem('token');

				const response = await axios.post(
					"http://localhost:4000/userAddmoreDataOrEditData",
					{
						formData1,
						changedFields1,
						formData2,
						userID: primaryData.userID
					},
					{
						headers: {
							Authorization: `${token}`
						}
					}
				);

				if (response.status == 200) {

				
					const result = {
						...response.data.update[0],
						userDetails: [response.data.update[1]]  // wrap second object inside an array
					};

		


					navigate('/userDashboard', { state: result });
				} 
			} catch (err) {
				alert(err.message );
			}

		} else {
			alert("Form validation failed");

		}
	}

	//check if there is a token and if it is valid, if its not present or not valid redirect to login page
  const decoded = jwtDecode(token);
  const isExpired = Date.now() >= decoded.exp * 1000;
  const token = localStorage.getItem("token")
  if (!token || isExpired) {
		localStorage.removeItem("token");
	navigate("/login");
  }


	return (
		<Container component="main" >
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					flexWrap: 'wrap',
					alignContent: 'space-around',
					alignItems: 'center',

					mt: 12,
				}}
			>
				<Typography component="h1" variant="h4">
					Add user information
				</Typography>

				<Box
					component="form" onSubmit={(handleRegistrationFormSubmit)} sx={{ mt: 1, width: "80%" }}>
					<Typography sx={{ mt: "50px" }} variant="h6">
						Personal Details
					</Typography>
					<Grid container columnSpacing={5} className="form-box">
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								required
								fullWidth
								label="First name"
								name="firstName"
								value={formData1.firstName}
								onChange={handleChangeForm1}
								error={!!errors.firstName}
								helperText={errors.firstName}
							/>
						</Grid>
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								required
								fullWidth
								label="Last name"
								name="lastName"
								value={formData1.lastName}
								onChange={handleChangeForm1}
								error={!!errors.lastName}
								helperText={errors.lastName}
							/>
						</Grid>
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								disabled
								label="Email Address"
								name="emailID"
								value={formData1.emailID}
								onChange={handleChangeForm1}
								error={!!errors.emailID}
								helperText={errors.emailID}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								type="number"
								
								label="Phone number"
								placeholder="Enter 10 digit mobile number"
								name="phone"
								value={formData1.phone}
								onChange={handleChangeForm1}
								error={!!errors.phone}
								helperText={errors.phone}
							/>
						</Grid>
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<br />
							<label>Date of birth:</label>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								type="date"
								name="dateOfBirth"
								value={formData1.dateOfBirth}
								onChange={handleChangeForm1}
								error={!!errors.dateOfBirth}
								helperText={errors.dateOfBirth}
							/>


						</Grid>


						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<label for="gender">Gender</label>
							<Box  >

								<RadioGroup
									className="radio-btn-group"
									aria-labelledby="demo-radio-buttons-group-label"
									defaultValue={primaryData.gender}
									name="gender"
									onChange={handleChangeForm1}
								>
									<FormControlLabel name="gender" className="radio-btn" value="male" control={<Radio />} label="Male" />
									<FormControlLabel name="gender" className="radio-btn" value="female" control={<Radio />} label="Female" />

								</RadioGroup>

							</Box>
						</Grid>



						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Residential address
							</Typography>
						</Grid>


						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth

								label=" Address"
								name="address"
								value={formData1.address}
								onChange={handleChangeForm1}
								error={!!errors.address}
								helperText={errors.address}
							/>


						</Grid>
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								label="City"
								name="city"
								value={formData1.city}
								onChange={handleChangeForm1}
								error={!!errors.city}
								helperText={errors.city}
							/>


						</Grid>

						<Grid className="form-textfield" size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								label="State"
								name="state"
								value={formData1.state}
								onChange={handleChangeForm1}
								error={!!errors.state}
								helperText={errors.state}
							/>


						</Grid>
						<Grid className="form-textfield" size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								label="Country"
								name="country"
								value={formData1.country}
								onChange={handleChangeForm1}
								error={!!errors.country}
								helperText={errors.country}
							/>


						</Grid>
						<Grid className="form-textfield" size={{ lg: 4, md: 4, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								type="number"
								maxLength="6"
								label="Postal code"
								name="postalCode"
								value={formData1.postalCode}
								onChange={handleChangeForm1}
								error={!!errors.postalCode}
								helperText={errors.postalCode}
							/>


						</Grid>



						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Porfessional information
							</Typography>
						</Grid>



						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
							<TextField


								className="form-input"
								margin="normal"
								required
								fullWidth

								label="Heading"
								name="userHeadline"
								value={formData1.userHeadline}
								onChange={handleChangeForm1}
								error={!!errors.userHeadline}
								helperText={errors.userHeadline}
							/>


						</Grid>

						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								multiline
								rows={4}

								label="Summary"
								name="userSummary"
								value={formData1.userSummary}
								onChange={handleChangeForm1}
								error={!!errors.userSummary}
								helperText={errors.userSummary}
							/>


						</Grid>

						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth

								label="Primary skills"
								placeholder="Type skills seperated by a comma(',')"
								name="skills"
								value={formData1.skills}
								onChange={handleChangeForm1}
								error={!!errors.skills}
								helperText={errors.skills}
							/>


						</Grid>


						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>



							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth

								label="Experience in years"
								name="experience"
								value={formData1.experience}
								onChange={handleChangeForm1}
								error={!!errors.experience}
								helperText={errors.experience}
							/>




						</Grid>

						{/* Current or Recent Job Details */}


						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Current or Recent Job Details
							</Typography>
						</Grid>


						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Current or Recent Job Role"
								name="currentOrRecentjobRole"
								value={formData2.currentOrRecentjobRole}
								onChange={handleChangeForm2}
								error={!!errors.currentOrRecentjobRole}
								helperText={errors.currentOrRecentjobRole}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Current or Recent Company"
								name="currentOrRecentjobCompany"
								value={formData2.currentOrRecentjobCompany}
								onChange={handleChangeForm2}
								error={!!errors.currentOrRecentjobCompany}
								helperText={errors.currentOrRecentjobCompany}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<br />
							<label for="dateOfBirth">Start date</label>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								type="month"
								name="currentOrRecentstartDate"
								value={formData2.currentOrRecentstartDate}
								onChange={handleChangeForm2}
								error={!!errors.currentOrRecentstartDate}
								helperText={errors.currentOrRecentstartDate}
							/>




						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<br />
							<Box id="endDate">
								<label for="dateOfBirth">End date</label>
								<TextField
									className="form-input"

									margin="normal"

									fullWidth
									type="month"
									name="currentOrRecentendDate"
									value={formData2.currentOrRecentendDate}
									onChange={handleChangeForm2}
									error={!!errors.currentOrRecentendDate}
									helperText={errors.currentOrRecentendDate}
								/>
							</Box>



							{
								isChecked = true ?
									<Checkbox
										id="workCheckBox"
										label="Present"
										// checked = {isChecked}
										sx={{ color: "black" }}
										onChange={updateEndDate}
									/> :
									<Checkbox
										id="workCheckBox"
										label="Present"
										// checked = {isChecked}
										sx={{ color: "black" }}
										onChange={updateEndDate}
									/>

							}




						</Grid>

						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								multiline
								label="Job Description"
								name="currentOrRecentdescription"
								value={formData2.currentOrRecentdescription}
								onChange={handleChangeForm2}
								error={!!errors.currentOrRecentdescription}
								helperText={errors.currentOrRecentdescription}
							/>
						</Grid>





						{/* Education Details */}

						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Education Details
							</Typography>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="College Name"
								name="collegeName"
								value={formData2.collegeName}
								onChange={handleChangeForm2}
								error={!!errors.collegeName}
								helperText={errors.collegeName}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Degree"
								name="degree"
								value={formData2.degree}
								onChange={handleChangeForm2}
								error={!!errors.degree}
								helperText={errors.degree}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Field of Study"
								name="fieldOfStudy"
								value={formData2.fieldOfStudy}
								onChange={handleChangeForm2}
								error={!!errors.fieldOfStudy}
								helperText={errors.fieldOfStudy}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								type="number"
								maxLength="4"
								fullWidth
								label="Graduation Year"
								name="endYear"
								value={formData2.endYear}
								onChange={handleChangeForm2}
								error={!!errors.endYear}
								helperText={errors.endYear}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								type="number"
								maxLength="2"
								fullWidth
								label="CGPA / Percentage"
								name="gradeOrPercentage"
								value={formData2.gradeOrPercentage}
								onChange={handleChangeForm2}
								error={!!errors.gradeOrPercentage}
								helperText={errors.gradeOrPercentage}
							/>
						</Grid>

						{/* Project Details */}

						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Project Details
							</Typography>
						</Grid>


						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Project Title"
								name="projectTitle"
								value={formData2.projectTitle}
								onChange={handleChangeForm2}
								error={!!errors.projectTitle}
								helperText={errors.projectTitle}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 12, md: 12, sm: 12, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								multiline
								label="Project Description"
								name="projectDescription"
								value={formData2.projectDescription}
								onChange={handleChangeForm2}
								error={!!errors.projectDescription}
								helperText={errors.projectDescription}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Technologies Used"
								name="technologiesUsed"
								value={formData2.technologiesUsed}
								onChange={handleChangeForm2}
								error={!!errors.technologiesUsed}
								helperText={errors.technologiesUsed}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"

								fullWidth
								label="Project URL"
								name="projectURL"
								value={formData2.projectURL}
								onChange={handleChangeForm2}
								error={!!errors.projectURL}
								helperText={errors.projectURL}
							/>
						</Grid>

						{/* User Web-Links */}

						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								User Web-Links
							</Typography>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								fullWidth
								label="Website"
								name="website"
								value={formData2.website}
								onChange={handleChangeForm2}
								error={!!errors.website}
								helperText={errors.website}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								fullWidth
								label="GitHub"
								name="github"
								value={formData2.github}
								onChange={handleChangeForm2}
								error={!!errors.github}
								helperText={errors.github}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								fullWidth
								label="LinkedIn"
								name="linkedIn"
								value={formData2.linkedIn}
								onChange={handleChangeForm2}
								error={!!errors.linkedIn}
								helperText={errors.linkedIn}
							/>
						</Grid>

						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField
								className="form-input"
								margin="normal"
								fullWidth
								label="Resume"
								name="resume"
								value={formData2.resume}
								onChange={handleChangeForm2}
								error={!!errors.resume}
								helperText={errors.resume}
							/>
						</Grid>
















						<Button
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2 }}
						>
							Register
						</Button>
					</Grid>
				</Box>
			</Box>
		</Container >
	)


}

export default AddMoreDataOrEdit;