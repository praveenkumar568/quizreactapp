import React, { Component } from 'react';
import Header from './jsx/Header.jsx';
import Quiz from './jsx/Quiz.jsx';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { Carousel } from 'antd';

class App extends Component {
  render() {
    return (
      // <Router>
      <div>
        <Header />
        <Carousel>
        <Quiz />
        </Carousel>
      </div>
      // {/* </Router> */}
    );
  }
}

export default App;
