import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { Grid } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import WebsiteIcon from '@mui/icons-material/Language';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';


export default function userCard(props) {
	return (

		<Box sx={{ height: '100%' }}>

			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: 5, width: '100%', backgroundImage: `url("userCard-bg.jpg")`, backgroundSize: 'cover' }}>

				<Box sx={{ p: 5, m: '5%', height: '70%', width: "90%", backdropFilter: `blur(50px)`, backgroundPosition: 'center', borderRadius: '28px' }}>
					<Grid container justifyContent={'flex-end'} sx={{ mb: 3 }}>
						<Button sx={{ float: "inline-end", color: 'white', backgroundColor: "#00000038" }} onClick={props.onClick}>

							<EditIcon
								sx={{ color: "white" }}
							/> Edit
						</Button>
					</Grid>
					<Grid container spacing={1}>


						<Grid sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }} size={{ lg: 3, md: 3, sm: 12, xs: 12 }}  >
							<center>

								{props.profilePic == "" ? <Avatar sx={{ bgcolor: "grey",height: 50, width: 50 }}> {props.firstName[0] + props.lastName[0]} </Avatar>
									: <CardMedia
										sx={{ height: 130, width: 130, borderRadius: '50%' }}
										image={`http://localhost:4000/uploads/${props.profilePic}`}
										title="Profile Picture"
									/>
								}


							</center>
						</Grid>

						<Grid size={{ lg: 9, md: 9, sm: 12, xs: 12 }} sx={{ color: 'white' }} >

							<Box>

								<h1>
									{props.firstName + " " + props.lastName}
								</h1>


								<h3>
									{props.userHeadline}
								</h3>
								<p>
									{props.userSummary}
								</p>
								<h5 style={{ margin: '40px 0 20px 0' }}>
									Skills: {props.skills}
								</h5>
								<h5>
									{props.experience} Years of tolal work experience
								</h5>
							</Box>

						</Grid>




					</Grid>

					<Grid container sx={{ alignItems: 'baseline' }}>
						<Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
							<Box sx={{ float: 'left', color: "white" }}>
								<h5>
									EmailID: {props.emailID}
								</h5>
								<h5>
									Phone: {props.phone}
								</h5>
								<h5>
									{props.city}, {props.country}
								</h5>
							</Box>

						</Grid>
						<Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
							<Box sx={{ float: 'right' }}>
								{/* {data && <p>The value is: {data}</p>} */}
								{props.website &&
									<a href={`${props.website}`} target="_blank" rel="noopener noreferrer">
										<WebsiteIcon
											href={`${props.website}`}
											target="_blank"
											sx={{ color: 'white', m: 2 }}
										/></a>
								}
								{props.github &&
									<a href={`${props.github}`} target="_blank" rel="noopener noreferrer">
										<GitHubIcon

											sx={{ color: 'white', m: 2 }}
										/></a>
								}
								{props.linkedIn &&
									<a href={`${props.linkedIn}`} target="_blank" rel="noopener noreferrer">
										<LinkedInIcon

											sx={{ color: 'white', m: 2 }}
										/>
									</a>
								}



							</Box>
						</Grid>
					</Grid>

				</Box>

			</Box>
		</Box>

	);
}
