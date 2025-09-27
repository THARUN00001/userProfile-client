import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Container, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useNavigate } from 'react-router-dom';



function RegisterationForm() {
	const [formData, setFormData] = useState({

		profilePic: '',

		//user information
		firstName: '',
		lastName: '',
		emailID: '',
		phone: '',
		dateOfBirth: '',
		gender: '',

		//user addcityaddress: '',
		address: '',
		city: '',
		state: '',
		country: '',
		postalCode: '',

		//user porfessional information

		userHeadline: '',
		userSummary: '',
		skills: '',
		experience: '',

		//security
		password: '',
		confirmPassword: ''
	})


	const [errors, setError] = useState({})


	// To update form data on every change made in the form inputs
	const handleChange = (e) => {



		const { name, value } = e.target;

		setFormData({
			...formData,
			[name]: value,
		});
	};



	const navigate = useNavigate();


	// form validation

	const validate = () => {
		let tempErrors = {};
		tempErrors.firstName = formData.firstName ? "" : "First name is required.";
		tempErrors.lastName = formData.lastName ? "" : "Last name is required.";
		const email = formData.emailID.trim();
		tempErrors.emailID = (/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).test(email) ? '' : "Email is not valid.";
		tempErrors.phone = formData.phone.length == 10 ? "" : "Phone number must be 10 digits";
		tempErrors.dateOfBirth = formData.dateOfBirth ? "" : "Choose Data of Birth";
		tempErrors.gender = formData.gender ? '' : "Choose Gender";


		tempErrors.address = formData.address ? "" : "Enter address";
		tempErrors.city = formData.city ? "" : "Enter city";
		tempErrors.state = formData.state ? "" : "Enter state";
		tempErrors.country = formData.country ? "" : "Enter country";
		tempErrors.postalCode = formData.postalCode ? "" : "Enter postalCode";


		tempErrors.userHeadline = formData.userHeadline ? "" : "Enter Headline";
		tempErrors.userSummary = formData.userSummary ? "" : "Enter Summary";
		tempErrors.skills = formData.skills ? "" : "Enter skills";
		tempErrors.experience = formData.experience ? "" : "Enter experience";


		tempErrors.password = formData.password.length >= 6 ? "" : "Password must be at least 6 characters.";
		tempErrors.confirmPassword = formData.confirmPassword === formData.password ? "" : "Passwords do not match.";
		setError(tempErrors);
		return Object.values(tempErrors).every(x => x === "");
	};


	// On click register button : append profilePic and post req to the server along with form data

	async function handleRegistrationFormSubmit(e) {
		e.preventDefault();
		if (validate()) {
			try {
				const data = new FormData();

				// add the file(PIC)
				data.append("profilePic", formData.profilePic);
				Object.keys(formData).forEach((key) => {
					if (key !== "profilePic") {
						data.append(key, formData[key]);
					}
				});


				const response = await axios.post("http://localhost:4000/userRegistration", data, {
					headers: { "Content-Type": "multipart/form-data" },
				});
				if (response) {

					localStorage.setItem('token', response.data.token);
					const token = localStorage.getItem('token');
					navigate('/userDashboard', { state: response.data.user });
				}
			} catch (err) {
				if (err.status == 400) {
					document.getElementById("errorText").innerHTML = "User Already Exists, Please Login with the same Email-ID"
				} else if (err.status == 500) {
					document.getElementById("errorText").innerHTML = "Internal server ERROR, please try again."
				}

			}

		} else {
			alert("Form validation failed");

		}
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
					User registeration
				</Typography>
				<form onSubmit={(handleRegistrationFormSubmit)} sx={{ mt: 1, width: "80%" }}>

				<h3 style={{marginTop: "40px"}} >
					Choose Profile picture
				</h3>
					<input
						onChange={
							(e) => {

								setFormData({
									...formData,
									profilePic: e.target.files[0]
								})

							}
						}
						id="contained-button-file"
						type="file"
						name="profilePic"
					/>

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
								value={formData.firstName}
								onChange={handleChange}
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
								value={formData.lastName}
								onChange={handleChange}
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
								label="Email Address"
								name="emailID"
								value={formData.emailID}
								onChange={handleChange}
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
								maxLength='10'
								label="Phone number"
								placeholder="Enter 10 digit mobile number"
								name="phone"
								value={formData.phone}
								onChange={handleChange}
								error={!!errors.phone}
								helperText={errors.phone}
							/>
						</Grid>
						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<TextField

								className="form-input"
								margin="normal"
								required
								fullWidth
								type="date"
								name="dateOfBirth"
								value={formData.dateOfBirth}
								onChange={handleChange}
								error={!!errors.dateOfBirth}
								helperText={errors.dateOfBirth}
							/>


						</Grid>


						<Grid className="form-textfield" size={{ lg: 6, md: 6, sm: 6, xs: 12 }}>
							<Box  >
								<RadioGroup
									className="radio-btn-group"
									aria-labelledby="demo-radio-buttons-group-label"

									name="gender"
									onChange={handleChange}
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
								value={formData.address}
								onChange={handleChange}
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
								value={formData.city}
								onChange={handleChange}
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
								value={formData.state}
								onChange={handleChange}
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
								value={formData.country}
								onChange={handleChange}
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
								value={formData.postalCode}
								onChange={handleChange}
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
								value={formData.userHeadline}
								onChange={handleChange}
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
								value={formData.userSummary}
								onChange={handleChange}
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
								value={formData.skills}
								onChange={handleChange}
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
								type="number"
								maxLength="2"
								label="Experience in years"
								name="experience"
								value={formData.experience}
								onChange={handleChange}
								error={!!errors.experience}
								helperText={errors.experience}
							/>
							{/* <TextField
								 
								className="form-input"
								margin="normal"
								required
								fullWidth

								label="Primary skills"
								placeholder="Type skills seperated by a comma(',')"
								name="skills"
								value={formData.skills}
								onChange={handleChange}
								error={!!errors.skills}
								helperText={errors.skills}
							/> */}




						</Grid>







						<Grid size={12} sx={{ mt: "50px" }} >
							<Typography variant="h6">
								Security
							</Typography>
						</Grid>





						<TextField
							className="form-input"
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							value={formData.password}
							onChange={handleChange}
							error={!!errors.password}
							helperText={errors.password}
						/>
						<TextField
							className="form-input"
							margin="normal"
							required
							fullWidth
							name="confirmPassword"
							label="Confirm Password"
							type="password"
							value={formData.confirmPassword}
							onChange={handleChange}
							error={!!errors.confirmPassword}
							helperText={errors.confirmPassword}
						/>
						<h2 id="errorText" style={{ color: '#ff0000' }} >

						</h2>
						<Button
						
							type="submit"
							fullWidth
							variant="contained"
							sx={{ mt: 3, mb: 2, backgroundColor: "black" }}
						>
							Register
						</Button>
					</Grid>
				</form>
			</Box>
		</Container >
	)


}

export default RegisterationForm;