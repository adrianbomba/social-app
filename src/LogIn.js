import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';


const LogIn = props => {
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');

  const [nameWarning, setNameWarning] = useState('');
  const [passWarning, setPassWarning] = useState('');


  const formValidation = event => {
    let nameValidation = new RegExp("^(?=.{4,})");
    let passwordValidation = new RegExp("^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{6,})");

    if (!(nameValidation.test(name))) {
      event.preventDefault();
      setNameWarning(`We can't find a user with that name, please sign up or check the username and password again`);
    } else {
      setNameWarning('');
    };

    if (!(passwordValidation.test(pass))) {
      event.preventDefault();
      setPassWarning(`Invalid password, check it again`);
    } else {
      setPassWarning('');
    };
  };


  const logUserData = (event) => {
    event.preventDefault();

    let userData = {
      username: name,
      password: pass,
      ttl: 3600
    };

    let headerConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    };

    axios.post(
      'https://akademia108.pl/api/social-app/user/login',
      JSON.stringify(userData),
      headerConfig)
      .then(res => {
        console.log("RESPONSE: ", res);
      })
      .catch(err => {
        console.log("ERROR: ", err);
      })
  };


  return (
    <div className="LogIn">
      <h3><i class="fas fa-house-user"></i>Log in</h3>
      <form onSubmit={logUserData}>
        <label>Name:</label><input type="text" placeholder="Username" autoComplete="new-password" onChange={event => setName(event.target.value)} className={(nameWarning) ? 'warning' : null} />
        <label>Password:</label><input type="password" placeholder="Password" onChange={event => setPass(event.target.value)} className={(passWarning) ? 'warning' : null} />
        <input type="submit" value="Log in" onClick={formValidation} />
        <ul>
          <li className="nameWarning">{nameWarning}</li>
          <li className="passWarning">{passWarning}</li>
        </ul>
        <Link to="/signup" onClick={props.closePopUp} className="RedirectionToSignUp">Sign up</Link>
      </form>
      <div className="Closer">
        <Link to="/" onClick={props.closePopUp}><i className="far fa-times-circle"></i></Link>
      </div>
    </div>
  );
};

export default LogIn;