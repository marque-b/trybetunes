import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Favorites extends Component {
  state = {
    loading: false,
    favorited: [],
  }

  componentDidMount = () => {
    this.getFavoriteSongs();
    this.setState({
      loading: true,
    });
  }

  getFavoriteSongs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({
      favorited: favorites,
      loading: false,
    });
  }

  render() {
    const { loading, favorited } = this.state;
    console.log(favorited);

    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Loading />
          : (
            favorited.map((song) => (
              <MusicCard
                trackName={ song.trackName }
                previewUrl={ song.previewUrl }
                key={ song.trackId }
              />
            ))
          )}
      </div>
    );
  }
}
