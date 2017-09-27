import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Polls from './Components/Polls.js'
import AddPoll from './Components/AddPoll.js'

var $ = require('jquery');

class App extends Component {
  constructor(){
    super();
    
    
    //  Fetch polls from database
    var fetchedPolls = [];
    $.ajax({
      type: 'GET',
      url: 'https://late-night-react-sefields.c9users.io:8081/getpolls',
      dataType: 'json'
    }).done(function(data) {
      fetchedPolls = data;
      this.setState({
       polls: fetchedPolls 
      })
    }.bind(this));
    
    //  This is essentially setting 'polls' to [] since the API
    //  call most likely hasn't responded yet.
    //  Not sure of the most elegant way to write this.
    this.state = {
      polls: fetchedPolls
    }
  }
  
  handleAddPoll(newPoll) {
    //  Add a spot for votes
    newPoll.voteArr = Array(newPoll.choiceArr.length).fill(0);
    
    //  Add the new poll to the database
    $.ajax({
      type: 'POST',
      url: 'https://late-night-react-sefields.c9users.io:8081/writepoll',
      data: newPoll,
      dataType: 'json'
    });
    
    //  Update the state of the app with the new poll
    let polls = this.state.polls;
    polls.push(newPoll);
    this.setState({
      polls: polls
    });
  }
  
  handleCastVote(selectionIndex, index){
    let polls = this.state.polls;
    polls[index].voteArr[selectionIndex] = parseInt(polls[index].voteArr[selectionIndex]) + 1;
    this.setState({
      polls: polls
    });
    
    $.ajax({
      type: 'POST',
      url: 'https://late-night-react-sefields.c9users.io:8081/castvote',
      data: polls[index],
      dataType: 'json'
    });
  }
  
  render() {
    return (
      <div className="App">
        <Polls polls={this.state.polls} castVote={this.handleCastVote.bind(this)}/>
        <AddPoll addPoll={this.handleAddPoll.bind(this)}/>
      </div>
    );
  }
}

export default App;
