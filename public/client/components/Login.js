import styles from 'style';
import React from 'react';
import $ from 'jquery';
import auth from '../lib/auth';

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
  }
  
  checkUser(e) {
    e.preventDefault();
    auth.login(e.target.username.value, e.target.password.value);
  }

  render() {
    return (
      <div>
        <h1>Login Page!</h1>
        <form onSubmit={this.checkUser}>
          <div>
            <label for="username">Username</label>
            <input type="text" name="username" value={this.state.username}/>
          </div>
          <div>
            <label for="password">Password</label>
            <input type="text" name="password" value={this.state.password}/>
          </div>
          <div>
            <input type="submit" value="Login"/>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;