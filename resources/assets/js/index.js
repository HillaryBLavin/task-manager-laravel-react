import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

const Topics = () => (
    <div>
      <h2>Topics</h2>
    </div>
  );
  
  const About = () => (
    <div>
      <h2>About</h2>
    </div>
  );

if (document.getElementById('root')) {
    ReactDOM.render(
    
    <Router>
        <div>
            <ul>
                <li>
                <Link to="/">Home</Link>
                </li>
                <li>
                <Link to="/about">About</Link>
                </li>
                <li>
                <Link to="/topics">Topics</Link>
                </li>
            </ul> 
            <Switch>
                <Route exact path="/" component={App} />
                <Route path="/about" component={About} />
                <Route path="/topics" component={Topics} />
            </Switch>
        </div>
    </Router>
    
    
    , document.getElementById('root'));
}
