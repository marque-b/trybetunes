import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    nameInput: '',
    loading: false,
  }

  componentDidMount = async () => {
    this.setState({
      loading: true,
    });
    const user = await getUser();
    this.setState({
      nameInput: user.name,
      loading: false,
    });
  }

  render() {
    const { nameInput, loading } = this.state;

    return (
      <header data-testid="header-component">

        { loading
          ? <Loading />
          : (
            <section>
              <Link to="/search" data-testid="link-to-search">Search</Link>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
              <p
                data-testid="header-user-name"
              >
                User:
                { nameInput }
              </p>
            </section>)}
      </header>
    );
  }
}
