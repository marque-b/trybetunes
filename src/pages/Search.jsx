import React, { Component } from 'react';
import Header from '../components/Header';

export default class Search extends Component {
  state = {
    searchArtistInput: '',
  }

  updateArtistName = ({ target }) => {
    const { value } = target;
    this.setState({
      searchArtistInput: value,
    });
  }

  render() {
    const { searchArtistInput } = this.state;
    const minCharacAllowed = 2;

    return (
      <div data-testid="page-search">
        <Header />
        <p>Search</p>
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
