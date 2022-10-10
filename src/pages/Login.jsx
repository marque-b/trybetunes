import React, { Component } from 'react';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import {
  CustomContentLogin,
  CustomAssideLogin,
  CustomFormLogin,
  CustomImageLogin,
  CustomLogoImg,
} from '../styles/login';

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

  handleClick = () => {
    const { history } = this.props;
    const { nameInput } = this.state;
    this.setState({
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
      <CustomContentLogin data-testid="page-login">

        <CustomAssideLogin>
          <CustomImageLogin
            src="/assets/hands-in-the-air.jpg"
            alt="Great music throwing hands in the air"
          />
        </CustomAssideLogin>

        <CustomFormLogin>
          <CustomLogoImg
            src="/assets/logo.png"
            alt="logo"
          />
          { loading
            ? <Loading />
            : (
              <Stack spacing={ 2 }>
                <TextField
                  id="outlined-search"
                  label="User"
                  size="small"
                  data-testid="login-name-input"
                  onChange={ this.updateName }
                />
                <Button
                  id="login-name-input"
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ nameInput.length < minCharacAllowed }
                  onClick={ this.handleClick }
                  variant="contained"
                  endIcon={ <AudiotrackIcon /> }
                  size="large"
                >
                  Entrar
                </Button>
              </Stack>
            )}
        </CustomFormLogin>

      </CustomContentLogin>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
