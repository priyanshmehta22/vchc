import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import usersData from "./database/login.json";
import Appointment from "./appointment";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const history = useHistory();
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [pname, setPname] = useState("");
  const [age, setAge] = useState("");
  const [blood, setblood] = useState("");
  const [gender, setgender] = useState("");
  const [phone, setphone] = useState("");
  // const [isloading, setisloading] = useState(false);
  // const history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();
    let patients = { pname, blood, gender, age, date, time, phone };
    var login = { email, password };
    setisloading(true);
    console.log("logged in: " + login);
    console.log(usersData);
    const { login: loginData } = usersData;
    const isUserPresent = loginData.find((user) => {
      if (user.email === email) {
        return true;
      }
      return false;
    });
    console.log(isUserPresent);
    if (!isUserPresent) {
      alert("USER NOT FOUND, SIGNUP!");
      console.log("User Does Not Exist");
      window.location.href = "/signup";
    }
    else{
      window.location.href = "/appointment"; 
    }
    fetch("http://localhost:8005/login", {
      method: "POST",
      body: JSON.stringify(login),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("logged in");
        setisloading(false);

        // history.go(-1);
    
      })
      .catch((error) => {
        console.log(error);
      });
    //redirect to home page
    // window.location.href = "/";
  };
  return (
    <div className="parentloginclass">
      <center>
        <h1>LOGIN FORM</h1>
      </center>
      <div className="Login center">
        <Form onSubmit={handlesubmit}>
          <Form.Group size="lg" id="em" controlId="email">
            <Form.Label>
              <b>EMAIL </b>
            </Form.Label>

            <Form.Control
              autoFocus
              required
              className="inputsignup"
              type="email"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="password" className="pass">
            <Form.Label>
              <b>PASSWORD </b>
            </Form.Label>

            <Form.Control
              required
              className="inputsignup"
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </Form.Group>
          <div className="signupbtn2">
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
            <Button className="signupbtn2" restricted>
              Logging In...
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default Login;
