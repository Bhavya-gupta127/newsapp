
import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";

export default class App extends Component {
  Pgno=6;
  render() {
    return <div>
      <Router>
      <Navbar/>
      <Routes>
        {/* we will add unique key to force re-mound  */} 
          <Route exact path="/" element={<News pagesize={this.Pgno} country="in" key="home" category="General"/>}/>
          <Route exact path="/technology" element={<News pagesize={this.Pgno} country="in" key="technology" category="Technology"/>}/>
          <Route exact path="/Business" element={<News pagesize={this.Pgno} country="in" key="Businessscience" category="Business"/>}/>
          <Route exact path="/Entertainment" element={<News pagesize={this.Pgno} country="in" key="Entertainment" category="Entertainment"/>}/>
          <Route exact path="/General" element={<News pagesize={this.Pgno} country="in" key="General" category="General"/>}/>
          <Route exact path="/Health" element={<News pagesize={this.Pgno} country="in" key="Health" category="Health"/>}/>
          <Route exact path="/Science" element={<News pagesize={this.Pgno} country="in" key="Science" category="Science"/>}/>
          <Route exact path="/sports" element={<News pagesize={this.Pgno} country="in" key="sports" category="Sports"/>}/>




         
        </Routes>
    
      </Router>
    </div>;
  }
}

