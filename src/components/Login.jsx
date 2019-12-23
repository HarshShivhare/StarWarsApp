import React from "react";
import { withRouter } from "react-router-dom";
import logo from "../img/star-wars-logo-trans.png";
import StarWarsChar from "../img/starwars.png";

class Login extends React.Component {
  state = {
    name: "",
    password: "",
    data: {},
    error: "",
    isLoaded: false
  };
  handleNameChange = e => {
    this.setState({ name: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  loginHandler = e => {
    e.preventDefault();
    fetch(`https://swapi.co/api/people?search=${this.state.name}`)
      .then(res => res.json())
      .then(result => {
        if (
          result.count > 0 &&
          result.results[0].birth_year === this.state.password
        ) {
          this.setState({
            data: result.results
          });
          this.props.history.push("/search", { username: this.state.name });
        } else {
          this.setState({
            error: "We need your username and password",
            isLoaded: true
          });
        }
      })
      .catch(error => this.setState({ error, isLoaded: false }));
  };
  render() {
    return (
      <div className="App login-wraper">
        <div className="outer-loginChar">
          <img className="loginChar" alt="starWars" src={StarWarsChar} />
        </div>
        <form onSubmit={this.loginHandler}>
          <div>
            <div className="login-wraper">
              <img className="logo" alt="starWars" src={logo} />
              <h2 className="title">Sign In</h2>
              <input
                type="text"
                className="input-group"
                name="name"
                placeholder="Type your name"
                value={this.state.name}
                onChange={this.handleNameChange}
              />
              <br />
              <input
                type="password"
                className="input-group"
                name="password"
                placeholder="Type your DOB for password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
              <br />
              <button className="btn log" type="submit">
                Sign In
              </button>
            </div>
          </div>
          <div className="help">
            <span>Need help signin?</span>
            <span class="tooltiptext">Luke skywalker 19BBY</span>
          </div>
          {this.state.isLoaded && this.state.error ? (
            <div id="error">{this.state.error}</div>
          ) : null}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
