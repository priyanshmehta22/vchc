import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import Login from './login';


const Appointment = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pname, setPname] = useState("");
  const [age, setAge] = useState("");
  const [blood, setblood]= useState("");
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState("");
  const [isloading, setisloading] = useState(false);
  const history = useHistory();
  

  


  const handlesubmit = (e) => {
    e.preventDefault();

    let patients = {pname,blood,gender, age, date, time, phone };
    setisloading(true);
    console.log("patients: " + patients);


    fetch("http://localhost:8004/patients", {
      method: "POST",
      body: JSON.stringify(patients),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("new appointment sent");
        setisloading(false);

        // history.go(-1);
        window.location.href = "/payment";
      })
      .catch((error) => {
        console.log(error);
      });
      let templateParams = {
        to_name: pname,
        to_date: date,
        to_time: time,
    
      };
    
      emailjs.send('service_k14rp0b', 'template_u58ojrh', templateParams,'8toInmAio3APvbxYe')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.log('FAILED...', error);
        });

        emailjs.send('service_k14rp0b', 'template_u58ojrh', templateParams,'8toInmAio3APvbxYe')
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
        }, function(error) {
          console.log('FAILED...', error);
        });

    window.alert("Appointment booked successfully");
  };

  return (
    <div className="Login center">
      <form onSubmit={handlesubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>
            <b>PATIENT NAME</b>
          </Form.Label>

          <Form.Control
            autoFocus
            required
            className="inputsignup pn"
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="name">
          <Form.Label>
            <b>PHONE NO: </b>
          </Form.Label>

          <Form.Control
            
            required
            className="inputsignup phone"
            type="text"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="blood">
          <Form.Label>
            <b>BLOOD GROUP</b>
          </Form.Label>

          <Form.Control
            required
            className="inputsignup pn"
            type="text"
            value={blood}
            onChange={(e) => setblood(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="gender">
          <Form.Label>
            <b>GENDER</b>
            </Form.Label>
            <Form.Control
            required
            className="inputsignup gd"
            type="text"
            value={gender}
            onChange={(e) => setgender(e.target.value)}
          />
            </Form.Group>

        <Form.Group size="lg" controlId="age">
          <Form.Label>
            <b>PATIENT AGE</b>
          </Form.Label>

          <Form.Control
            required
            className="inputsignup pa"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="date">
          <Form.Label className="pdl">
            <b>APPOINTMENT DATE</b>
          </Form.Label>
          <Form.Control
            className="inputsignup pd"
            required
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="time at">
          <Form.Label className="at">
            <b>APPOINTMENT TIME</b>
          </Form.Label>
          <Form.Control
            className="inputsignup at"
            required
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>
        <div className="signupbtn3">
          {!isloading && (
             <button>SUBMIT</button>
          )}
        </div>
        {isloading && (
          <Button className="signupbtn3" restricted>
            Booking Appointment..
          </Button>
        )}
      </form>
    </div>
  );
};

export default Appointment;
