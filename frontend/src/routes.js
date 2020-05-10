import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import mainPage from './pages/MainPage/index.js';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={mainPage} />
      </Switch>
    </BrowserRouter>
  );
}
