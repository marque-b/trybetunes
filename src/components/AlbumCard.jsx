import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class AlbumCard extends Component {
  render() {
    const { albumImage, artistName, albumName, collectionId } = this.props;

    return (
      <div>
        <img
          src={ albumImage }
          alt={ `Capa do disco ${albumName}, ${artistName}` }
          width="200"
        />
        <h3>{albumName}</h3>
        <h4>{artistName}</h4>
        <Link
          to={ `/album/${collectionId}` }
          data-testid={ `link-to-album-${collectionId}` }
        >
          Ir para o álbum
        </Link>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  albumImage: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  collectionId: PropTypes.number.isRequired,
};
