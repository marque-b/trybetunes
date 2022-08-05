import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    favLocalStorage: [],
  }

  retrieveFavorites = async () => {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favLocalStorage: favoriteSongs,
    });
  }

  checkFavorites = (trackId) => {
    const { favLocalStorage } = this.state;
    return favLocalStorage.some((song) => trackId === song.trackId);
  }

  componentDidMount = () => {
    this.retrieveFavorites();
  }

  render() {
    const { trackName, previewURL, trackId, onChange } = this.props;
    const { loading } = this.state;
    return (
      <div>
        <section>
          <p>{ trackName }</p>
          <audio data-testid="audio-component" src={ previewURL } controls>
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          { loading
            ? <Loading />
            : (
              <label htmlFor="favorite" data-testid={ `checkbox-music-${trackId}` }>
                Favorita
                <input
                  type="checkbox"
                  name="favorite"
                  id="favorite"
                  trackid={ trackId }
                  onChange={ onChange }
                  checked={ this.checkFavorites(trackId) }
                />
              </label>
            )}
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
};
