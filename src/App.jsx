import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import {
  BasicLayout,
  PersonalCenter,
  SalesMain,
  AnswerQuestion
  } from 'page';

const App = () => (
  <Router>
    <div>
      <Route exact path='/an' component={AnswerQuestion} />
      <Switch>
        <BasicLayout>
          <Route exact path='/' component={PersonalCenter} />
          <Route exact path='/home' component={PersonalCenter} />
          <Route exact path='/personalCenter' component={PersonalCenter} />
          <Route exact path='/platform/salesMain' component={SalesMain} />
        </BasicLayout>
      </Switch>
    </div>
  </Router>)

export default App;
