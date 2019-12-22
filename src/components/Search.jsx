import React from "react";
import { withRouter } from "react-router-dom";
import Avtar from "../img/iconfinder.png";
import { DebounceInput } from "react-debounce-input";
import SearchResults from "./SearchResults";

class Search extends React.Component {
  state = {
    searchValue: "",
    data: null,
    error: "",
    isLoaded: false
  };
  componentDidMount() {
    if (
      !(
        this.props.location &&
        this.props.location.state &&
        this.props.location.state.username
      )
    ) {
      this.props.history.push("/");
    }
  }
  logout = () => {
    this.props.history.replace("/search", null);
    this.props.history.push("/");
  };
  handleSearch = e => {
    this.fetchResult(e.target.value);
  };
  fetchResult = value => {
    fetch(`https://swapi.co/api/planets?search=${value}`)
      .then(res => res.json())
      .then(result => {
        this.setState({ data: result });
      })
      .catch(error => this.setState({ error, isLoaded: false }));
  };
  render() {
    return (
      <div className="App backImage">
        <div>
          <img className="avtar" alt="starWars" src={Avtar} />
          <h4 className="loged-user">
            Hello,{" "}
            {(this.props.location &&
              this.props.location.state &&
              this.props.location.state.username) ||
              ""}
          </h4>
          <h4 className="logout" variant="link" onClick={this.logout}>
            Logout
          </h4>
        </div>
        <br />
        <div className="searchbar">
          <DebounceInput
            className="search-input"
            placeholder="Search..."
            minLength={1}
            debounceTimeout={500}
            onChange={this.handleSearch}
          />
        </div>
        <SearchResults data={this.state.data}/>
      </div>
    );
  }
}
export default withRouter(Search);
