import React from 'react';

function About() {
  return (
    <div
      className="text-center"
      style={{
        backgroundImage: 'url(/image-assets/about_background.png)',
        backgroundSize: 'cover',
        height: '100vh',
        paddingTop: '14vh',
        margin: '0 auto',
      }}
    >
      <h1 id="signin-header">about</h1>
      <p className="about-text about-div">
        an application tailored for both casual and professional musicians to create and view bands, organize their upcoming gigs, and connect with other musicians
        <br />
        <br />
        notemap solves the problem of communication between musicians who 1) largely perform freelance, 2) is looking for fulfill a role (or roles) for a group, 3) is already in a group and is looking for members, or 4) is interested in creating a group. for the most part, outside of relatively niche online communities and local networking, it can be hard for the average musician to socially connect for the sole purpose of performance
        <br />
        <br />
        notemap was developed by skeo as his frontstone capstone during his time at nashville software school
      </p>
    </div>
  );
}

export default About;
