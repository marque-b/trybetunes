import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends Component {
  checkFavorites = (trackId) => {
    const { favorited } = this.props;
    return favorited.some((song) => trackId === song.trackId);
  }

  render() {
    const { trackName, previewURL, trackId, onChange } = this.props;

    return (
      <div>
        <section>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewURL } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label
            htmlFor={ `trackId ${trackId}` }
            data-testid={ `checkbox-music-${trackId}` }
          >
            Favorita
            <input
              type="checkbox"
              name="favorite"
              id={ `trackId ${trackId}` }
              trackid={ trackId }
              onChange={ onChange }
              checked={ this.checkFavorites(trackId) }
            />
          </label>
        </section>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewURL: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  favorited: PropTypes.shape([]).isRequired,
  some: PropTypes.func.isRequired,
};
