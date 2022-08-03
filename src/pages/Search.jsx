import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    loading: false,
    searchArtistInput: '',
    albunsResult: [],
    lastSearchInput: '',
  }

  updateArtistName = ({ target }) => {
    const { value } = target;
    this.setState({
      searchArtistInput: value,
    });
  }

  apiRetrieve = async () => {
    const { searchArtistInput } = this.state;
    this.setState({ loading: true });
    const apiResult = await searchAlbumsAPI(searchArtistInput);
    this.setState({
      loading: false,
      listLoaded: true,
      albunsResult: apiResult,
      lastSearchInput: searchArtistInput,
    });
  }

  render() {
    const { searchArtistInput, loading, listLoaded,
      albunsResult, lastSearchInput } = this.state;
    const minCharacAllowed = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
        {loading && <Loading />}
        {!loading
          && (
            <form>
              <input
                type="text"
                data-testid="search-artist-input"
                onChange={ this.updateArtistName }
              />
              <button
                type="button"
                data-testid="search-artist-button"
                disabled={ searchArtistInput.length < minCharacAllowed }
                onClick={ this.apiRetrieve }
              >
                Pesquisar
              </button>
            </form>
          )}
        {listLoaded
          && (
            <div>
              <span>
                {`Resultado de álbuns de: ${lastSearchInput}`}
              </span>
            </div>
          )}
        {listLoaded && albunsResult.length === 0
          ? <span>Nenhum álbum foi encontrado</span>
          : albunsResult.map((e) => (
            <AlbumCard
              collectionId={ e.collectionId }
              albumImage={ e.artworkUrl100 }
              artistName={ e.artistName }
              albumName={ e.collectionName }
              key={ e.collectionId }
            />
          ))}
      </div>
    );
  }
}
