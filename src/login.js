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
    <div className="Login center">
      <Form onSubmit={handlesubmit}>
        <Form.Group size="lg" controlId="email">
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
  );
};

export default Login;
