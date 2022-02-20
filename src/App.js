import './App.css';
import Navbar from './Components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

import React, { Component } from 'react';
import News from './Components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pagesize = 5;
  apiKey = "3342a2e31a7247dc8acbed709d3831ed"
  
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({progress: progress})
  }
  render() {
    return(
      <Router>
        <div>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />
          <Navbar />
          <Routes>
              <Route exact path="/"  element={<News setProgress={this.setProgress} apiKey={this.apiKey}   key="general" pagesize={this.pagesize} category="general"/> }/>
              <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="business" pagesize={this.pagesize} category="business"/> }/>
              <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="entertainment" pagesize={this.pagesize} category="entertainment"/> }/>
              <Route exact path="/general" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pagesize={this.pagesize} category="general"/> }/>
              <Route exact path="/health" element={ <News setProgress={this.setProgress} apiKey={this.apiKey}  key="health" pagesize={this.pagesize} category="health"/> }/>
              <Route exact path="/science" element= {<News setProgress={this.setProgress} apiKey={this.apiKey}  key="science" pagesize={this.pagesize} category="science"/> }/>
              <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="sports" pagesize={this.pagesize} category="sports"/> }/>
              <Route exact path="/technology" element= {<News setProgress={this.setProgress} apiKey={this.apiKey}  key="technology" pagesize={this.pagesize} category="technology"/> }/>
          </Routes>
      </div>
   </Router>
   )
  }
}
