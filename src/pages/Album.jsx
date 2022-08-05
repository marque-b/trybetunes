import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    albumInfo: [],
    albumTitle: '',
    artistName: '',
    albumImage: '',
    loading: false,
    favLocalStorage: [],
  }

  retrieveFavorites = async () => {
    this.setState({ loading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favLocalStorage: favoriteSongs,
      loading: false,
    });
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const [info, ...content] = await getMusics(id);
    this.setState({
      albumInfo: content,
      albumTitle: info.collectionName,
      artistName: info.artistName,
      albumImage: info.artworkUrl100,
    });
    this.retrieveFavorites();
  }

  updateFavorites = async (target) => {
    this.setState({ loading: true });
    const { favLocalStorage } = this.state;
    const isSaved = favLocalStorage.some((song) => song.trackId === target.trackId);
    if (isSaved === true) {
      await removeSong(target);
      const newArray = favLocalStorage.filter((e) => e.trackId !== target.trackId);
      this.setState({
        favLocalStorage: newArray,
        loading: false,
      });
    } else {
      await addSong(target);
      this.setState((prevState) => ({
        loading: false,
        favLocalStorage: [...prevState.favLocalStorage, target],
      }));
    }
  }

  render() {
    const { albumTitle, artistName, albumImage,
      albumInfo, loading, favLocalStorage } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        <img src={ albumImage } alt="" />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumTitle }</p>
        { loading
          ? <Loading />
          : (
            albumInfo.map((e) => (
              <MusicCard
                trackName={ e.trackName }
                previewURL={ e.previewUrl }
                key={ e.trackId }
                trackId={ e.trackId }
                onChange={ () => this.updateFavorites(e) }
                favorited={ favLocalStorage }
              />
            )))}
      </div>
    );
  }
}

Album.propTypes = {
  id: PropTypes.string.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
