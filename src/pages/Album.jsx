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
    }, () => {
      this.setState({
        albumTitle: info.collectionName,
        artistName: info.artistName,
        albumImage: info.artworkUrl100,
      });
    });
    this.retrieveFavorites();
  }

  updateFavorites = async (target) => {
    this.retrieveFavorites();
    const { favLocalStorage } = this.state;
    const isSaved = favLocalStorage.some((song) => song.trackId === target.trackId);
    console.log(isSaved);
    if (isSaved === true) {
      await removeSong(target);
    } else {
      await addSong(target);
    }
  }

  render() {
    const { albumTitle, artistName, albumImage,
      albumInfo, loading } = this.state;
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
                entireObj={ e }
                trackName={ e.trackName }
                previewURL={ e.previewUrl }
                key={ e.trackId }
                trackId={ e.trackId }
                onChange={ () => this.updateFavorites(e) }
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
