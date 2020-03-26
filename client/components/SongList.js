import React, { Component } from "react";
import { Link } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class SongList extends Component {
  renderSongs() {
    const { songs } = this.props.data;

    return songs.map(song => (
      <li key={song.id} className="collection-item">
        {song.title}
      </li>
    ));
  }

  render() {
    const { loading } = this.props.data;

    if (!loading) {
      return (
        <div>
          <ul className="collection">{this.renderSongs()}</ul>
          <Link to="/songs/new" className="btn-floating btn-large red right">
            <i className="material-icons">add</i>
          </Link>
        </div>
      );
    } else return <div>Loading...</div>;
  }
}

const query = gql`
  {
    songs {
      id
      title
    }
  }
`;

export default graphql(query)(SongList);
