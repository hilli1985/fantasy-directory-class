import React, { Component } from 'react';
import '../styles/MyAutosuggest.css';
import Autosuggest from 'react-autosuggest';
import { Redirect } from 'react-router-dom'

class MyAutosuggest extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      suggestions: [],
      fNames : [],
      redirectTo :''
    };  
  }
  
  updateRedirect =(msg)=>{
    this.setState({...this.state,redirectTo:msg})
  }
  componentWillUpdate() {
    if(this.state.fNames.length===0){
      this.setState({...this.state,fNames:this.props.names});
    }
  }
  componentDidMount() {
    if(this.state.fNames.length===0){
      this.setState({...this.state,fNames:this.props.names});
    }
  }
  
  // createfNames = ()=>{
  //   let newState = ({...this.state,fNames:this.props.names});
  //   this.state = newState;
  // }
  
  escapeRegexCharacters= (str)=> {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  
  getSuggestions= (value)=> {
    const escapedValue = this.escapeRegexCharacters(value.trim());
    
    if (escapedValue === '') {
      return [];
    }
    
    const regex = new RegExp(escapedValue, 'i');
    
    return this.state.fNames.filter(fName => regex.test(fName.name));
  }
  
  getSuggestionValue = (suggestion)=> {
    return suggestion.name;
  }
  
  renderSuggestion =(suggestion)=> {
    return (
      // <span onClick={this.handleClick} id={suggestion.name}>{suggestion.name}</span>
      <span id={suggestion.name}>{suggestion.name}</span>
    );
  }
  
  onChange = (event, { newValue, method }) => {
    //this.createfNames();  
    this.setState({
      value: newValue
    },()=>this.updateRedirect(this.state.value));
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    let suggestions = this.getSuggestions(value);
    this.setState({
      suggestions:suggestions
    })
    
  };
  
  onSuggestionsClearRequested = () => {
    // this.setState({
    //   suggestions: []
    // });
  };
  
  seekClicked = (e) => {
    e.preventDefault() ;
    this.setState({...this.state,redirectTo:this.state.suggestions[0].name})
  }
  
  foo =(e) => {
    e.preventDefault();
    alert("Submit button clicked!");
    return true
  }
  
  render() {
    // if(this.state.fNames.length===0){
    //   //this.createfNames();
    // } 
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: "Ask and you shall receive",
      value,
      onChange: this.onChange,
      className:"input-suggest"
      
    };
    
    let fname = ((this.state.fNames).filter(x=>x.name===this.state.redirectTo));
    if((this.state.redirectTo)&&(fname)&&(fname[0])){
      if((this.state.redirectTo)===(fname[0].name)){
        return <Redirect to={`/directory/${fname[0].category}/${fname[0].name}`}/>;
      }
    };  
    return (
      <div>
      <form ref="form" onSubmit={this.seekClicked} >
      <Autosuggest 
      suggestions={suggestions}
      onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
      getSuggestionValue={this.getSuggestionValue}
      renderSuggestion={this.renderSuggestion}
      onSuggestionsClearRequested={this.onSuggestionsClearRequested}
      inputProps={inputProps}
      />
      <button id="button" type="submit">Seek</button>
      </form>
      </div>
    );
  }
}
export default MyAutosuggest;
