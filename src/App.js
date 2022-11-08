import './App.css';
import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API;

  state={
    progress:0,
    mode: 'light'
  }

  setProgress=(progress) => {
    this.setState({progress: progress})
  }

  setMode=() => {
    if (this.state.mode==='light') {
      this.setState({mode: 'dark'});
      document.body.style.backgroundColor = '#484848';
    }
    else {
      this.setState({mode: 'light'});
      document.body.style.backgroundColor = 'white';
    }
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar mode={this.state.mode} setMode={this.setMode}/>

          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            // onLoaderFinished={() => setProgress(0)}
          />

          <Routes>
            <Route exact path='/' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={15} country="in" category="general"/>}/>
            <Route exact path='/business' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={15} country="in" category="business"/>}/>
            <Route exact path='/entertainment' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={15} country="in" category="entertainment"/>}/>
            <Route exact path='/general' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={15} country="in" category="general"/>}/>
            <Route exact path='/health' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={15} country="in" category="health"/>}/>
            <Route exact path='/science' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={15} country="in" category="science"/>}/>
            <Route exact path='/sports' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={15} country="in" category="sports"/>}/>
            <Route exact path='/technology' element={<News mode={this.state.mode}  setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={15} country="in" category="technology"/>}/>
          </Routes>

        </Router>
      </div>
    )
  }
}

