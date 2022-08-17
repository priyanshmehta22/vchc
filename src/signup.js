import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

const Signup = (loggedin) => {
  const [login, setLogin] = useState(false);
  const [name, setname] = useState("");

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpass, setconfirmpass] = useState("");
  const [isloading, setisloading] = useState(false);
  const [number, setnumber] = useState("");
  const history = useHistory();

  const handlesubmit = (e) => {
    e.preventDefault();

    var signup = { name, email, password, number };
    setisloading(true);
    console.log("signup: " + signup);

    fetch("http://localhost:8002/signup", {
      method: "POST",
      body: JSON.stringify(signup),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("new enquiry sent");
        setisloading(false);
        setLogin(true);
        // history.go(-1);
        history.push("/appointment");
      })
      .catch((error) => {
        console.log(error);
      });
    //redirect to home page
    // window.location.href = "/";
  };
  function validateForm() {
    return email.length > 0 && password.length > 0 && confirmpass == password;
  }
  return (
    <div className="Login">
      <Form onSubmit={handlesubmit}>
        <Form.Group size="lg" controlId="name">
          <Form.Label>Name</Form.Label>

          <Form.Control
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>

          <Form.Control
            autoFocus
            type="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="phone">
          <Form.Label>Phone No</Form.Label>

          <Form.Control
            autoFocus
            type="text"
            value={number}
            onChange={(e) => setnumber(e.target.value)}
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
        <Form.Group size="lg" controlId="confirmpass">
          <Form.Label>Confirm Password</Form.Label>

          <Form.Control
            type="password"
            value={confirmpass}
            onChange={(e) => setconfirmpass(e.target.value)}
          />
        </Form.Group>

        {!isloading && (
          <Button
            block
            size="lg"
            type="submit"
            id="submitlogin"
            disabled={!validateForm()}
          >
            Submit
          </Button>
        )}
        {isloading && <Button restricted>Logging In...</Button>}
      </Form>
    </div>
  );
};
export default Signup;
