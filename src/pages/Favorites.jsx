import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: true,
    favorited: [],
  }

  componentDidMount = () => {
    this.retrieveFavorites();
  }

  retrieveFavorites = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({
      favorited: favorites,
      loading: false,
    });
  }

  removeFavorite = async (song) => {
    const { favorited } = this.state;
    const newArray = favorited.filter((elem) => elem.trackId !== song.trackId);
    this.setState({
      favorited: newArray,
      loading: true,
    });
    await removeSong(song);
    this.setState({ loading: false });
  }

  render() {
    const { loading, favorited } = this.state;

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading
          ? <Loading />
          : (
            favorited.map((song) => (
              <MusicCard
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                key={ song.trackId }
                onChange={ () => this.removeFavorite(song) }
                trackId={ song.trackId }
                favorited={ favorited }
              />
            )))}
      </div>
    );
  }
}
