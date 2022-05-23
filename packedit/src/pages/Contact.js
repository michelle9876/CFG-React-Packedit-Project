import React from "react";
import "../styles/Contact.scss";
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

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
          <p><a href="mailto:packeditteam@gmail.com"
            className="a"
            target="_blank"
            rel="noreferrer"
          >
            packeditteam@gmail.com
          </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
