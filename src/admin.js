import React from 'react';
// import './style.css';


class Admin extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          
          fields["password"] = "";
          this.setState({fields:fields});
          alert("HELLO ADMIN");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/VCHC/)) {
          formIsValid = false;
          errors["username"] = "*Please enter correct username.";
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/vchc@gmail.com/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter correct email-ID.";
        }
      }


      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/VCHC1234/)) {

          formIsValid = false;
          errors["password"] = "*Please enter correct password.";
        }
      }

      this.setState({
        errors: errors
      });
      console.log("logged in");
      if(formIsValid){
      window.location.href="/admindb";}
      return formIsValid;


    }



  render() {
    return (
    <div id="main-registration-container">
<div className='adminimg'>
        <img src="https://i.pinimg.com/originals/94/09/7e/94097e458fbb22184941be57aaab2c8f.png"></img>
</div>
     <div id="register">
        <center><h1>ADMIN LOGIN PAGE</h1></center>
        <form method="post"  className="admin" name="userRegistrationForm"  onSubmit={this.submituserRegistrationForm} >
        <label>Name</label>
        <input type="text" name="username" value={this.state.fields.username} autoFocus required onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>
        <label>Email ID:</label>
        <input type="text" name="emailid" value={this.state.fields.emailid} required onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>
        
        <label>Password</label>
        <input type="password" name="password" value={this.state.fields.password} required onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
        <button className="buttonadmin"  value="Register">SUBMIT</button>
        </form>
    </div>
</div>

      );
  }


}


export default Admin;