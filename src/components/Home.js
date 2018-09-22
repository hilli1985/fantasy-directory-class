import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import '../styles/home.css'
// import MyAutosuggest from '../MyAutosuggest';
import MyAutosuggest from '../components/MyAutosuggest';


class Home extends Component {
    
    render() {
        let list = this.props.names;
        return (
            <div>
            <div id="u-input">
            <MyAutosuggest names={list}/>
            </div>
            <h1 id="home-title">Your Adventure</h1>
            <div id="home-container">
            <div id="world"><span className="main-directory-text">World</span></div>
            <Link to="/directory/wizards">
            <div className="directory" id="wizards"><span className="main-directory-text">Wizards</span></div>
            </Link>
            <Link to="/directory/bestiary">
            <div className="directory" id="bestiary"><span className="main-directory-text">Bestiary</span></div>
            </Link>
            <div id="potions"><span className="main-directory-text">Potions</span></div>
            <div id="deities"><span className="main-directory-text">Deities</span></div>
            </div>
            </div>
        );
    }
}

export default Home;