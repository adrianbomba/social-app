import React from 'react';
import { Link } from 'react-router-dom';
import './Menu.css';


const Menu = () => {
  return (
    <div className="Menu">
      <ul className="Menu-list">
        <li><Link to="/"><i className="fas fa-home"></i>Home</Link></li>
        <li><Link to="/login"><i className="fas fa-sign-in-alt"></i>Log in</Link></li>
        <li><Link to="signup"><i className="fas fa-user-plus"></i>Sign up</Link></li>
      </ul>
    </div>
  );
};

export default Menu;
