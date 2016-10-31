import styles from 'style';
import React from 'react';
import { Link } from 'react-router';
import $ from 'jquery';
import auth from '../lib/auth';


const logout = function(e) {
  delete window.localStorage.user;
  e.preventDefault();
  auth.logout();
}; 

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authenticated: false
    };
  }

  render() {
    return (
      <div className="header">
        <Link to="/" className="logo">RADRADIO</Link>
        <div className="nav">
          <ul className="navList">
            <li><Link to="/recorder" className="navItem">Recorder</Link></li>
            <li><Link to="/player" className="navItem">Player</Link></li>
            <li><a href="#" className="navItem">About</a></li>
            <li><Link to="/login" className="navItem">Login</Link></li>
            <li><Link to="/register" className="navItem">Register</Link></li>
            <li onClick={logout}><a href="#" target="_self" className="navItem">Logout</a></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default NavBar;
