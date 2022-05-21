import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/styles.scss";
import "../../styles/Home.scss";
import NavBar from "../../components/NavBar";
import CreateYourList from "../../components/CreateYourList";
import { Container } from "react-bootstrap";

const Home = () => {
  return (
    <div>
      <div>
        <nav>
          <NavBar />
        </nav>
      </div>
      <div className="home-bg">
        <h1 className="start-text">Let's get packing!</h1>
        <Container style={{ paddingBottom: "380px" }}>
          <CreateYourList />
        </Container>
      </div>
    </div>
  );
};

export default Home;
