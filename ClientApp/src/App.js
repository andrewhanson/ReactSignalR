import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { Admin } from './components/Admin';
import { About } from './components/About';

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Dashboard} />
        <Route path='/admin' component={Admin} />
        <Route path='/about' component={About}/>
      </Layout>
    );
  }
}
