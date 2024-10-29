import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar/>
          <Routes>
            <Route path='/' element={<News category='general'/>} />
            <Route path='/business' element={<News key='business' category='business'/>} />
            <Route path='/entertainment' element={<News key='entertainment' category='entertainment'/>} />
            <Route path='/health' element={<News key='health' category='health'/>} />
            <Route path='/science' element={<News key='science' category='science'/>} />
            <Route path='/sports' element={<News key='sports' category='sports'/>} />
            <Route path='/technology' element={<News key='technology' category='technology'/>} />
          </Routes>
        </Router>
      </div>
    );
  }
}
