import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Styles from './Loginpage.css';
import Login from './Components/Login';
import { reqAuth, reqSignup } from '../Redux/Actions/actionTypes';
import { connect } from 'react-redux';

class Loginpage extends Component {
  constructor (props) {
    super(props);
    this.loginOnClick = this.loginOnClick.bind(this);
    this.signupOnClick = this.signupOnClick.bind(this);
    this.redirect = this.redirect.bind(this);
  }

  loginOnClick () {
    var username = document.getElementById("login-form-email").value;
    var password = document.getElementById("login-form-password").value;
    var user = {
      username: username,
      password: password,
    }
    this.props.dispatch(reqAuth.bind(user));
  }

  signupOnClick () {
    var username = document.getElementById("signup-form-email").value;
    var password = document.getElementById("signup-form-password").value;
    var user = {
      username: username,
      password: password,
    }
    this.props.dispatch(reqSignup.bind(user));
  }

  redirect () {
    if (this.props.authState) {
      return (
        <Redirect to={{pathname:"/sandbox"}} />
      )
    }
  }

  render () {
    return (
      <div className="login-body">   
        <div className="container">
          <div className="row">
            <Login loginHandler={this.loginOnClick} />
            <Signup signupHandler={this.signupOnClick}/>
            {this.redirect()}
          </div>
        </div>
      </div>
    )
  }
}

export default connect((store) => {
  return {
    authState:store.auth.authentication.authorization,
    authProcess:store.auth.authentication.processing,
  }
})(Loginpage);