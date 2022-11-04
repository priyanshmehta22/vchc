import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useState } from "react";

const Payment = () => {
    const [isloading, setisloading] = useState(false);
    const [name, setname] = useState("");
    const [money, setmoney] = useState("500 (consultation)");

    const handlesubmit = (e) => {
        e.preventDefault();
    let payment = { name, money };
    setisloading(true);
    console.log("payment: " + payment);

    fetch("http://localhost:8007/payment", {
      method: "POST",
      body: JSON.stringify(payment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        console.log("new appointment sent");
        setisloading(false);
        window.location.href = "/";

        // history.go(-1);
        
      })
      .catch((error) => {
        console.log(error);
      });
      let templateParams = {
        to_name: name,
        to_money: money,
      };

    emailjs.send('service_k14rp0b', 'template_wawxyq5', templateParams,'8toInmAio3APvbxYe')
    .then(function(response) {
      console.log('SUCCESS!', response.status, response.text);
    }, function(error) {
      console.log('FAILED...', error);
    });
    window.alert("Payment done successfully");
    
};

    return ( 
    <div className="main">
        <div class="paymentbackg">
            <img src="https://www.aalpha.net/wp-content/uploads/2021/05/integrate-payment-gateway.gif"></img>
        </div>
    <div className="payment">
      <center>  <h1 class>PAYMENT PORTAL</h1>
              <p id="scantxt">Scan the QR Code to pay</p> 
               <div className="paytmimg">
                    </div></center> 
        
        <div className="Login center paymentform">
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
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Group>
          <Form.Group size="lg" controlId="name">
            <Form.Label>
              <b>AMOUNT:</b>
            </Form.Label>
  
            <Form.Control
              autoFocus
              required
              disabled
              className="inputsignup mn"
              type="text"
              value={money}
              onChange={(e) => setmoney(e.target.value)}
            />
          </Form.Group>
          <div className="buttonpaydiv">
          {!isloading && (
           <button class="buttonpay">PAY</button>
          )}
        </div>
        </form>
        
        </div>
        </div>
        </div> 
        );
    };
 
export default Payment;