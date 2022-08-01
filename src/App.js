import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Content from './components/Content';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Content />
      </BrowserRouter>
    );
  }
}
