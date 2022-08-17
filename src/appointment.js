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
  };

  return (
    <div className="appointment">
      <Form onSubmit={handlesubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label> Patient Name</Form.Label>

          <Form.Control
            autoFocus
            type="text"
            value={pname}
            onChange={(e) => setPname(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="age">
          <Form.Label> Patient Age</Form.Label>

          <Form.Control
            autoFocus
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="date">
          <Form.Label>Appointment Date</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="time">
          <Form.Label>Appointment Time</Form.Label>
          <Form.Control
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </Form.Group>

        {!isloading && (
          <Button block size="lg" type="submit" id="submitlogin">
            Submit
          </Button>
        )}
        {isloading && <Button restricted>Booking Appointment..</Button>}
      </Form>
    </div>
  );
};

export default Appointment;
