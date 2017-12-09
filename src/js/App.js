import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Index from './Components/Index';

import '../index.html';
import '../scss/general.scss';

ReactDOM.render(
  (
    <BrowserRouter key={Math.random()}>
      <Switch>
        <Route exact path="/" component={Index} />
      </Switch>
    </BrowserRouter>),
  document.getElementById('root'),
);

if (process.env.NODE_ENV !== 'production') {
  module.hot.accept();
}
