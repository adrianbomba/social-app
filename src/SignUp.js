import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './SignUp.css';


const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [conf, setConf] = useState('');

  const [nameWarning, setNameWarning] = useState('');
  const [emailWarning, setEmailWarning] = useState('');
  const [passWarning, setPassWarning] = useState('');


  const formValidation = event => {
    let nameValidation = new RegExp("^(?=.{4,})");
    let emailValidation = new RegExp("^(?=.{2,})(?=.*[@])");
    let passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    if (!(nameValidation.test(name)) || /\s/.test(name)) {
      event.preventDefault();
      setNameWarning(`Username cannot be empty, cannot include white spaces and should have min. 4 chars`);
    } else {
      setNameWarning('');
    };

    if (!(emailValidation.test(email)) || /\s/.test(email)) {
      event.preventDefault();
      setEmailWarning(`e-mail address cannot be empty, cannot include white spaces - should be like: 'name@domain.com'`);
    } else {
      setEmailWarning('');
    };

    if (!(passwordValidation.test(pass)) || pass !== conf) {
      event.preventDefault();
      setPassWarning(`Password cannot be empty, should have min. 6 chars, at least 1 digit and at least 1 of special chars: ! @ # $ % ^ & *`);
    } else {
      setPassWarning('');
    };
  };


  const signUserData = (event) => {
    event.preventDefault();

    let newUser = {
      username: name,
      email: email,
      password: pass
    };

    let headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    axios.post(
      'https://akademia108.pl/api/social-app/user/signup',
      JSON.stringify(newUser),
      headerConfig)
      .then(req => {
        localStorage.setItem('userName', newUser.username);
        localStorage.setItem('userEmail', newUser.email);
        console.log(localStorage);
        console.log("RESPONSE: ", req);
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })
  };


  return (
    <div className="SignUp">
      <h3><i className="fas fa-user-plus"></i>Sign up</h3>
      <form onSubmit={signUserData}>
        <label>Name:</label><input type="text" placeholder="Username" autoComplete="new-password" onChange={event => { setName(event.target.value) }} className={(nameWarning) ? 'warning' : null} />
        <label>E-mail:</label><input type="email" placeholder="User e-mail" autoComplete="new-password" onChange={event => { setEmail(event.target.value) }} className={(emailWarning) ? 'warning' : null} />
        <label>Password:</label><input type="password" placeholder="Password" onChange={event => { setPass(event.target.value) }} className={(passWarning) ? 'warning' : null} />
        <label>Confirm:</label><input type="password" placeholder="Confirm password" onChange={event => { setConf(event.target.value) }} className={(passWarning) ? 'warning' : null} />
        <input type="submit" value="Sign up" onClick={formValidation} />
        <ul>
          <li className="nameWarning">{nameWarning}</li>
          <li className="emailWarning">{emailWarning}</li>
          <li className="passWarning">{passWarning}</li>
        </ul>
        <Link to="/login" className="RedirectionToLogIn">Log in</Link>
      </form>
      <div className="Closer">
        <Link to="/"><i className="far fa-times-circle"></i></Link>
      </div>
    </div>
  );
};

export default SignUp;
