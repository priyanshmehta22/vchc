import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [isloading, setisloading] = useState(false);
  const history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();

    var login = { email, password };
    setisloading(true);
    console.log("logged in: " + login);

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
        history.push("/appointment");
      })
      .catch((error) => {
        console.log(error);
      });
    //redirect to home page
    // window.location.href = "/";
  };
  return (
    <div className="Login">
      <Form onSubmit={handlesubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>

        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>

          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </Form.Group>

        {!isloading && (
          <Button block size="lg" type="submit" id="submitlogin">
            Submit
          </Button>
        )}
        {isloading && <Button restricted>Logging In...</Button>}
      </Form>
    </div>
  );
};

export default Login;
