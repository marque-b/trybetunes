import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

export default class Login extends Component {
  state = {
    nameInput: '',
    loading: false,
  };

  updateName = ({ target }) => {
    const { value } = target;
    this.setState({
      nameInput: value,
    });
  }

  handleClick = async () => {
    const { history } = this.props;
    const { nameInput } = this.state;
    await this.setState({
      loading: true,
    }, async () => {
      await createUser({ name: nameInput });
    });
    this.setState({ loading: false }, () => history.push('/search'));
  }

  render() {
    const { nameInput, loading } = this.state;
    const minCharacAllowed = 3;

    return (
      <div data-testid="page-login">

        { loading
          ? <Loading />
          : (
            <form>
              <label htmlFor="login-name-input">
                Name
                <input
                  type="text"
                  data-testid="login-name-input"
                  onChange={ this.updateName }
                />
              </label>

              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ nameInput.length < minCharacAllowed }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>)}

      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
