import React, { Component } from 'react';
import '../styles/fentity.css'
import { Link, Redirect } from 'react-router-dom'


class Fentity extends Component {
    render() {
        const match = this.props.match
        const state = this.props.state
        const fentitiesCategory = match.params.fentities
        const name = match.params.name
        const fentity = state[fentitiesCategory].filter(f => f.name.toLowerCase() === name.toLowerCase())[0];
        const other ="/directory/wizards/Merlin";
        const redirect  = !(fentity);
        if (redirect){
            return <Redirect to='/'/>;
        }
        else if (fentity.name==="Morgana Le Fay"){
            return (
                <div>
                <Link to={`/directory/${fentitiesCategory}/${name}`}>
                 <div id="main-links-f">
                <Link to={`/directory/${fentitiesCategory}/`}>{fentitiesCategory}</Link>
                </div>
                <div id="creature-container">
                <h1>{fentity.name}</h1>
                <img src={fentity.imgUrl} alt=""/>
                <div className="title">Power:</div>
                <div className="power text"> {fentity.power}</div>
                <div className="other text">Trapped <Link to={other}>Merlin</Link> in a cave for eternity</div>
                </div>
                </Link>
                </div>
            )}
            return (  
                <Link to={`/directory/${fentitiesCategory}/${name}`}>
                <div id="main-links-f">
                <Link to={`/directory/${fentitiesCategory}/`}>{fentitiesCategory}</Link>
                </div>
                <div id="creature-container">
                <h1>{fentity.name}</h1>
                <img src={fentity.imgUrl} alt=""/>
                <div className="title">Power:</div>
                <div className="power text"> {fentity.power}</div>
                <div className="other text">{fentity.other}</div>
                </div>
                </Link>
            )
        }
    }
    
    export default Fentity;
    