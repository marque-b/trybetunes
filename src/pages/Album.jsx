import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

export default class Album extends Component {
  state = {
    albumInfo: [],
    albumTitle: '',
    artistName: '',
    albumImage: '',
    loaded: false,
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const [info, ...content] = await getMusics(id);
    console.log(info);
    this.setState({
      albumInfo: content,
      loaded: true,
    }, () => {
      this.setState({
        albumTitle: info.collectionName,
        artistName: info.artistName,
        albumImage: info.artworkUrl100,
      });
    });
  }

  render() {
    const { albumTitle, artistName, albumImage, albumInfo, loaded } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <img src={ albumImage } alt="" />
        <p data-testid="artist-name">{ artistName }</p>
        <p data-testid="album-name">{ albumTitle }</p>
        { !loaded
          ? <Loading />
          : albumInfo.map((e) => (
            <MusicCard
              trackName={ e.trackName }
              previewURL={ e.previewUrl }
              key={ e.trackId }
            />
          ))}
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
