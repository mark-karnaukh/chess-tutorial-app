// Libs
import React from 'react';

// Components
import { AuthLayout, MainLayout } from './layouts';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app-view">
        <Switch>
          <Route path="/" exact component={MainLayout}></Route>
          <Route path="/auth" component={AuthLayout}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
