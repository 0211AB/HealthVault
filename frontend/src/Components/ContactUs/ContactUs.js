import React from "react";
import "./ContactUs.css";
import { useState } from "react";
import keys from "../../Store/emailKey";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

import { FaMap, FaEnvelope, FaPhone } from "react-icons/fa";

const ContactUs = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    text: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    emailjs
      .send(
        keys.REACT_APP_EMAILJS_SERVICE_ID,
        keys.REACT_APP_EMAILJS_TEMPLATE_ID,
        details,
        keys.REACT_APP_EMAILJS_USER_ID
      )
      .then(
        (result) => {
          setDetails({
            name: "",
            email: "",
            phone: "",
            subject: "",
            text: "",
          });

          navigate("/");
        },
        (error) => {
          alert(error);
        }
      );
  };

  return (
    <section className="contact" id="contact">
      <div className="heading">
        <span>contact us</span>
        <h3>get in touch</h3>
      </div>

      <div className="row">
        <div className="contact-info-container">
          <div className="box">
            <i className="fas fa-phone">
              <FaPhone></FaPhone>
            </i>
            <div className="info">
              <h3>phone </h3>
              <p>+123-456-7890</p>
              <p>+111-222-3333</p>
            </div>
          </div>

          <div className="box">
            <i className="fas fa-envelope">
              <FaEnvelope></FaEnvelope>
            </i>
            <div className="info">
              <h3>email </h3>
              <p>healthcareappsupp0rt@gmail.com</p>
            </div>
          </div>

          <div className="box">
            <i className="fas fa-map">
              <FaMap></FaMap>
            </i>
            <div className="info">
              <h3>address </h3>
              <p>Kolkata, india - 700027</p>
            </div>
          </div>
        </div>

        <form onSubmit={submitHandler}>
          <div className="inputBox">
            <input
              type="text"
              placeholder="name"
              name="name"
              required
              onChange={changeHandler}
            />
            <input
              type="email"
              placeholder="email"
              name="email"
              required
              onChange={changeHandler}
            />
          </div>
          <div className="inputBox">
            <input
              type="tel"
              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
              placeholder="phone"
              name="phone"
              required
              onChange={changeHandler}
            />
            <input
              type="text"
              placeholder="subject"
              name="subject"
              required
              onChange={changeHandler}
            />
          </div>
          <textarea
            name="text"
            placeholder="message"
            cols="30"
            rows="10"
            required
            onChange={changeHandler}
          ></textarea>
          <input type="submit" value="send message" className="btn" />
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
