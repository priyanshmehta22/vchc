import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
const Appointment = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pname, setPname] = useState("");
  const [age, setAge] = useState("");
  const [isloading, setisloading] = useState(false);
  const history = useHistory();
  const handlesubmit = (e) => {
    e.preventDefault();

    var patients = { pname, age, date, time };
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
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
    window.alert("Appointment booked successfully");
  };

  return (
    <div className="Login center">
      <Form onSubmit={handlesubmit}>
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
            <Button
              className="inputsignup"
              block
              size="lg"
              type="submit"
              id="submitlogin"
            >
              Submit
            </Button>
          )}
        </div>
        {isloading && (
          <Button className="signupbtn3" restricted>
            Booking Appointment..
          </Button>
        )}
      </Form>
    </div>
  );
};

export default Appointment;
