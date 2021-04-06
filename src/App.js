import React, { useState, useEffect } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import './App.css';
import Menu from './Menu';
import LogIn from './LogIn';
import SignUp from './SignUp';


function App() {
  const [showPopUp, setShowPopUp] = useState(false);


  useEffect(() => {
    const logInPopUp = setTimeout(() => {
      setShowPopUp(true);
    }, 2000);

    return () => clearTimeout(logInPopUp);
  }, []);


  const closePopUp = () => {
    setShowPopUp(false);
  };


  return (
    <div className="App-social">
      <header className="App-header">
        <h1 className="App-title"><Link to="/">Social Star<i class="fas fa-star"></i></Link></h1>
      </header>
      {(showPopUp) ?
        <aside className="LogInPopUp">
          <LogIn closePopUp={closePopUp} />
        </aside> : ''}
      <Switch>
        <Route exact path="/">
          <Menu />
        </Route>
        <Route path="/login">
          <LogIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
