import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorshow: false, errormessage: ''}

  updateusername = event => {
    this.setState({username: event.target.value})
  }

  updatepassword = event => {
    this.setState({password: event.target.value})
  }

  submitsuccessful = jwt_token => {
    const {history} = this.props
    Cookies.set('jwt_token', jwt_token)
    history.replace('/')
  }

  loginfunction = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const jsondata = await response.json()
    if (response.ok) {
      this.submitsuccessful(jsondata.jwt_token)
    } else {
      this.setState({errormessage: jsondata.error_msg, errorshow: true})
    }
  }

  render() {
    const {username, password, errormessage, errorshow} = this.state
    const jwt_token = Cookies.get('jwt_token')
    if (jwt_token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="bgContainer">
        <div className="loginContainer">
          <img
            className="logoimage"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <form className="formContainer" onSubmit={this.loginfunction}>
            <label className="labeltext" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              className="userInput"
              value={username}
              onChange={this.updateusername}
              id="username"
            />
            <label className="labeltext" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              className="userInput"
              value={password}
              onChange={this.updatepassword}
              id="password"
            />
            <button className="loginbutton" type="submit">
              login
            </button>
          </form>
          {errorshow ? <p className="error_msg">{`*${errormessage}`}</p> : ''}
        </div>
      </div>
    )
  }
}

export default Login
