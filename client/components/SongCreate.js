import React, { Component } from "react";
import { Link, hashHistory } from "react-router";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

import query from "../queries/fetchSongs";

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
        },
        refetchQueries: [{ query }]
      })
      .then(() => hashHistory.push("/"));
  }

  render() {
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
