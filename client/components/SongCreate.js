import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

class SongCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: ""
    };
  }

  onSubmit(event) {
    this.props
      .mutate({
        variables: {
          title: this.state.title
        }
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
    // console.log("STATE", this.state);

    const { title } = this.state;
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>Create a New Song</h3>
        <form onSubmit={event => this.onSubmit(event)}>
          <label>Song Title:</label>
          <input
            onChange={event => this.setState({ title: event.target.value })}
            value={title}
          ></input>
        </form>
      </div>
    );
  }
}

const mutation = gql`
  mutation AddSong($title: String) {
    addSong(title: $title) {
      title
    }
  }
`;

export default graphql(mutation)(SongCreate);
