import React, { Component } from "react";
import { Link } from "react-router";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import { optimistic } from "apollo-client/optimistic-data/store";

class LyricList extends Component {
  onLike(id, likes) {
    console.log("Like song");
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        _typename: "Mutation",
        likeLyric: {
          id,
          _typename: "LyricType",
          likes: likes + 1
        }
      }
    });
    // .then(() => this.props.data.refetch());
  }

  renderLyrics() {
    const { lyrics } = this.props;

    return lyrics.map(({ content, id, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => this.onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    return (
      <div>
        <h4>Lyrics</h4>
        <ul className="collection">{this.renderLyrics()}</ul>
      </div>
    );
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
// graphql(fetchLyrics)
