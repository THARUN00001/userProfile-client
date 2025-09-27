import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Navbar from "../components/navbar";
import UserCard from "../components/userCard";
import UserData from "../components/userData";



function UserDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const receivedData = location.state;


  const [primaryData, setPrimaryData] = useState({});
  const [secondaryData, setSecondaryData] = useState({});

  useEffect(() => {
    if (Array.isArray(receivedData?.userDetails) && receivedData.userDetails.length > 0) {
      setSecondaryData(receivedData.userDetails[0]);
      const { userDetails, ...rest } = receivedData;
      setPrimaryData(rest);
    } else {
      const { userDetails, ...rest } = receivedData;



      setPrimaryData(rest);
      setSecondaryData({
        // //work experience
        currentOrRecentjobRole: "", //current or recent
        currentOrRecentjobCompany: "",
        currentOrRecentstartDate: "",
        currentOrRecentendDate: "",
        currentOrRecentdescription: "",

        //education details
        collegeName: "",
        degree: "",
        fieldOfStudy: "",
        endYear: "",
        gradeOrPercentage: "",

        // project Details
        projectTitle: "",
        projectDescription: "",
        technologiesUsed: "",
        projectURL: "",


        //user web-links
        website: "",
        github: "",
        linkedIn: "",
        resume: "",
        userID: receivedData.userID
      });
    }
  }, [receivedData]);

  

  function addMoreData() {
    navigate("/addMoreDataOrEdit", { state: { primaryData, secondaryData } });
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
    <div>
      <Navbar />

      <UserCard
        onClick={addMoreData}
        firstName={primaryData.firstName}
        lastName={primaryData.lastName}
        emailID={primaryData.emailID}
        userHeadline={primaryData.userHeadline}
        userSummary={primaryData.userSummary}
        skills={primaryData.skills}
        experience={primaryData.experience}
        phone={primaryData.phone}
        city={primaryData.city}
        country={primaryData.country}
        profilePic={primaryData.profilePic}
        website={'' || secondaryData.website}
        linkedIn={'' || secondaryData.linkedIn}
        github={'' || secondaryData.github}
      />

      {secondaryData ? (

        <UserData



          currentOrRecentjobRole={'' || secondaryData.currentOrRecentjobRole}
          currentOrRecentjobCompany={'' || secondaryData.currentOrRecentjobCompany}
          currentOrRecentstartDate={'' || secondaryData.currentOrRecentstartDate}
          currentOrRecentendDate={'' || secondaryData.currentOrRecentendDate}
          currentOrRecentIsCurrent={'' || secondaryData.currentOrRecentIsCurrent}
          currentOrRecentdescription={'' || secondaryData.currentOrRecentdescription}
          collegeName={'' || secondaryData.collegeName}
          degree={'' || secondaryData.degree}
          fieldOfStudy={'' || secondaryData.fieldOfStudy}
          endYear={'' || secondaryData.endYear}
          gradeOrPercentage={'' || secondaryData.gradeOrPercentage}
          projectTitle={'' || secondaryData.projectTitle}
          projectDescription={'' || secondaryData.projectDescription}
          technologiesUsed={'' || secondaryData.technologiesUsed}
          projectURL={'' || secondaryData.projectURL}
        />

      ) : (
        <></>
      )}
    </div>
  );
}

export default UserDashboard;
