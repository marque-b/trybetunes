import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    nameInput: '',
    loading: false,
  }

  componentDidMount = async () => {
    await this.setState({
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
    console.log(nameInput);

    return (
      <header data-testid="header-component">

        { loading
          ? <Loading />
          : (
            <p
              data-testid="header-user-name"
            >
              { nameInput }
            </p>)}
      </header>
    );
  }
}
