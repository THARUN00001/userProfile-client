import React from "react";
import { Box, Button, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import WorkTwoToneIcon from '@mui/icons-material/WorkTwoTone';
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone';
import LaptopTwoToneIcon from '@mui/icons-material/LaptopTwoTone';


function userData(props) {
	return (
		<Box sx={{ display: "flex", justifyContent: "center" }}>
			<Box sx={{ width: '90%', border: '3px solid #b0b0b0fa', p: 5, m: 5, borderRadius: '28px' }}>

				<Box sx={{mb:5, overflow: "revert-layer" }} >
					<h3>
					<WorkTwoToneIcon/>	Current/Recent job details
					</h3>

					<table style={{ width: '100%' }}>
						<thead>
							<tr>
								<td style={{ width: '20%' }}>

								</td>
								<td style={{ width: '80%' }}>

								</td>
							</tr>
						</thead>
						<tbody>
							{props.currentOrRecentjobRole && <tr>

								<td>
									<h4>
										Role:
									</h4>
								</td>
								<td>
									{props.currentOrRecentjobRole}
								</td>
							</tr>}
							{props.currentOrRecentjobCompany && <tr>

								<td>
									<h4>
										Company name:
									</h4>
								</td>
								<td>
									{props.currentOrRecentjobCompany}
								</td>
							</tr>}
							{props.currentOrRecentstartDate && props.currentOrRecentendDate && <tr>

								<td>
									<h4>
										Duration:
									</h4>
								</td>
								<td>
									{props.currentOrRecentstartDate} - {props.currentOrRecentendDate}
								</td>
							</tr>}
							{props.currentOrRecentdescription && <tr>

								<td style={{boxSizing:"unset" }} >
									<h4>
										Job description:
									</h4>
								</td>
								<td>
									{props.currentOrRecentdescription}
								</td>
							</tr>}

						</tbody>
					</table>
				</Box>

				<hr sx={{ width: "80%" }} />

				<Grid container>

								<Grid size={{xl:6, md:6, sm:12,xs:12}}>
													<Box sx={{mt:5}}>
					<h3>
					<SchoolTwoToneIcon/>	 Current/Recent educational details
					</h3>

		<table style={{ width: '100%' }}>
						<thead>
							<tr>
								<td style={{ width: '20%' }}>

								</td>
								<td style={{ width: '80%' }}>

								</td>
							</tr>
						</thead>
						<tbody>
							{props.collegeName && <tr>

								<td>
									<h4>
											College Name:
									</h4>
								</td>
								<td>
									{props.collegeName}
								</td>
							</tr>}
							{props.degree && <tr>

								<td>
									<h4>
										Degree:
									</h4>
								</td>
								<td>
									{props.degree}
								</td>
							</tr>}
							{props.fieldOfStudy && <tr>

								<td>
									<h4>
											Field of study:
									</h4>
								</td>
								<td>
									{props.fieldOfStudy}
								</td>
							</tr>}
							{props.endYear && <tr>

								<td>
									<h4>
											Graduation year:
									</h4>
								</td>
								<td>
									{props.endYear}
								</td>
							</tr>}
							{props.gradeOrPercentage && <tr>

								<td>
									<h4>
										Grade/Percentage:
									</h4>
								</td>
								<td>
									{props.gradeOrPercentage}
								</td>
							</tr>}

						</tbody>
					</table>
				</Box>




				

								</Grid>
											<Grid size={{xl:6, md:6, sm:12,xs:12}}>
													<Box sx={{mt:5}}>
					<h3>
					<LaptopTwoToneIcon/>	 Project details 
					</h3>

		<table style={{ width: '100%' }}>
						<thead>
							<tr>
								<td style={{ width: '20%' }}>

								</td>
								<td style={{ width: '80%' }}>

								</td>
							</tr>
						</thead>
						<tbody>
							{props.projectTitle && <tr>

								<td>
									<h4>
										Project title:
									</h4>
								</td>
								<td>
									{props.projectTitle}
								</td>
							</tr>}
							{props.projectDescription && <tr>

								<td>
									<h4>
										Project description:
									</h4>
								</td>
								<td>
									{props.projectDescription}
								</td>
							</tr>}
							{props.technologiesUsed && <tr>

								<td>
									<h4>
										Technologies used:
									</h4>
								</td>
								<td>
									{props.technologiesUsed}
								</td>
							</tr>}
							{props.projectURL && <tr>

								<td>
									<h4>
										Live demo:
									</h4>
								</td>
								<td>
									<Button
										href={`${props.projectURL}`}
									>
										preview
									</Button>
								</td>
							</tr>}
							
						</tbody>
					</table>
				</Box>




				

								</Grid>

				</Grid>


			</Box>
		</Box>
	)
}

export default userData;
