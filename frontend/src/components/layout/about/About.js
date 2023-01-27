import React from "react";
import "./About.css";
import { Button, Typography, Avatar } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import InstagramIcon from "@mui/icons-material/Instagram";
const About = () => {
  const visitGithub = () => {
    window.location = 'https://github.com/tikamsingh172/';
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "15vmax", height: "17vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/dcj1ykq51/image/upload/v1674843532/Eshop/assets/tikam_singh_dkaucw.jpg"
              alt="Founder"
            />
            <Typography>Tikam Singh</Typography>
            <Button onClick={visitGithub} color="primary">
              Visit My Github
            </Button>
            <span>
              This is a Eccomarce website made by Tikam Singh. Only with the
              purpose to make MERN Stack project.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Follow us</Typography>
            <a
              href='https://www.linkedin.com/in/tikam-singh-5b04a4219'
              target="blank"
            >
              <LinkedInIcon className="linkedinSvgIcon" />
            </a>

            <a href="https://instagram.com" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
