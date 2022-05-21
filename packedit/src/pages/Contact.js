import React from "react";
import "../styles/Home.scss";
// import "../../styles/styles.scss";
import NavBar from '../components/NavBar';

const Contact = () => {
  return (
    <div>
      <nav>
        <NavBar />
      </nav>
      <div className="contact-bg">
        <div className="contact-header-text">
          <h2>Get in touch.</h2>
        </div>
        <div className="contact-body-text">
            <p>
              If you have any questions about the project or would just like to
              have a chat, feel free to send us a message at:
            </p>
            <p>packeditteam@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
