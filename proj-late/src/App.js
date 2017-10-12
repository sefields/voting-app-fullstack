import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';

import Polls from './Components/Polls.js'
import AddPoll from './Components/AddPoll.js'
import Login from './Components/Login.js'
import User from './Components/User.js'
import Tabs from './Components/Tabs.js'
import Pane from './Components/Pane.js'

var $ = require('jquery');
//var fetch = require('isomorphic-fetch');

class App extends Component {
  
  constructor(){
    super();
    
    this.state = {
      polls: [],
      myPolls: [],
      user: null
    }
    
  }
  
  componentDidMount() {
    //  Ajax call: is user logged in w/ Google?
    /*var fetchedUser = null;
    $.ajax({
      type: 'GET',
      url: '/getuser',
      dataType: 'json'
    }).done(function(data) {
      fetchedUser = data;
      this.setState({
        polls: this.state.polls,
        myPolls: this.state.myPolls,
        user: fetchedUser
      })
      console.log(this.state);
    }.bind(this));*/
    
    //  Invent dummy user
    var dummyUser = {
      id: "0",
      displayName: "Rick"
    };
    
    //  All we set here is the user
    this.setState({
      polls: this.state.polls,
      myPolls: this.state.myPolls,
      user: dummyUser
    });
    
    //  Presently, this depends on a user being present
    this.fetchPolls();
  }
  
  fetchPolls() {
    // Ajax call: fetch polls from db
    var fetchedPolls = [];
    var myFetchedPolls = [];
    $.ajax({
      type: 'GET',
      url: '/getpolls',
      dataType: 'json'
    }).done(function(data) {
      fetchedPolls = data;
      myFetchedPolls = this.queryUserPolls(fetchedPolls);
      console.log("User polls include:");
      console.log(myFetchedPolls);
      this.setState({
        polls: fetchedPolls,
        myPolls: this.queryUserPolls(fetchedPolls),
        user: this.state.user
      });
    }.bind(this));
  }
  
  handleAddPoll(newPoll) {
    //  Add a spot for votes
    newPoll.voteArr = Array(newPoll.choiceArr.length).fill("0");
    newPoll.googleID = this.state.user.id;
    
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
    //  Vote counts are stored as strings, hence the length of this line
    polls[index].voteArr[selectionIndex] = (parseInt(polls[index].voteArr[selectionIndex], 10) + 1).toString();
    
    this.setState({
      polls: polls,
      myPolls: this.state.myPolls,
      user: this.state.user
    });
    
    $.ajax({
      type: 'POST',
      url: '/castvote',
      data: polls[index],
      dataType: 'json'
    }).done(this.fetchPolls());
  }
  
  handleCastVoteOnMyPoll(selectionIndex, index) {
    let myPolls = this.state.myPolls;
    myPolls[index].voteArr[selectionIndex] = (parseInt(myPolls[index].voteArr[selectionIndex], 10) + 1).toString();
    
    this.setState({
      polls: this.state.polls,
      myPolls: myPolls,
      user: this.state.user
    });
    
    $.ajax({
      type: 'POST',
      url: '/castvote',
      data: myPolls[index],
      dataType: 'json'
    }).done(this.fetchPolls());
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
  
  queryUserPolls(polls) {
    var result = [];
    for (var i = 0; i < polls.length; i++) {
      if (polls[i].googleID === this.state.user.id) {
        result.push(polls[i]);
      }
    }
    return result;
  }
  
  render() {
    //  Displaying AddPoll and MyPolls depend on whether user is logged in
    let addPollComponent = null;
    let myPollsComponent = null;
    if (this.state.user) {
      addPollComponent = <AddPoll addPoll={this.handleAddPoll.bind(this)}/>
      
      myPollsComponent = <Polls polls={this.state.myPolls} 
              castVote={this.handleCastVoteOnMyPoll.bind(this)} 
              deletePoll={this.handleDeletePoll.bind(this)}/>
    }
    else {
      addPollComponent = <h3>Log in to add polls!</h3>;
      myPollsComponent = <h3>Log in to view your polls!</h3>
    }
    
    return (
      <div className="App">
        <Tabs selected={0}>
          <Pane label="Latest polls">
            <Polls polls={this.state.polls} 
              castVote={this.handleCastVote.bind(this)} 
              deletePoll={this.handleDeletePoll.bind(this)}/>
          </Pane>
          <Pane label="My polls">
            {myPollsComponent}
          </Pane>
          <Pane label="Add a poll">
            {addPollComponent}
          </Pane>
          <Pane label="Profile">
            <User user={this.state.user}/>
          </Pane>
        </Tabs>
        <Login />
      </div>
    );
  }
}

export default App;
