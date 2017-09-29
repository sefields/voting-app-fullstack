import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Polls from './Components/Polls.js'
import AddPoll from './Components/AddPoll.js'
import Twitter from './Components/Twitter.js'

var $ = require('jquery');
//var fetch = require('isomorphic-fetch');

class App extends Component {
  constructor(){
    super();
    
    
    //  Fetch polls from database
    var fetchedPolls = [];
    
    $.ajax({
      type: 'GET',
      url: '/getpolls',
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
      url: '/writepoll',
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
      url: '/castvote',
      data: polls[index],
      dataType: 'json'
    });
  }
  
  handleDeletePoll(index) {
    let polls = this.state.polls;
    
    $.ajax({
      type: 'POST',
      url: '/deletepoll',
      data: polls[index],
      dataType: 'json'
    }).done(function(data) {
      console.log(data);
    });
    
    polls.splice(index, 1);
    this.setState(
      {
        polls: polls
      }  
    );
  }
  
  render() {
    return (
      <div className="App">
        <Polls polls={this.state.polls} castVote={this.handleCastVote.bind(this)} deletePoll={this.handleDeletePoll.bind(this)}/>
        <AddPoll addPoll={this.handleAddPoll.bind(this)}/>
        <Twitter />
      </div>
    );
  }
}

export default App;
