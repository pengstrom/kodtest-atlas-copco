import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';

import { CharacterContainer } from './components/CharacterContainer';

import './custom.css'
import { Shop } from './components/Shop';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={CharacterContainer} />
        <Route exact path='/shop' component={Shop} />
      </Layout>
    );
  }
}
