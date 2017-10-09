import React, { Component } from 'react';
import PollListing from './PollListing'

class Polls extends Component {
    handleCastVote(selectionIndex, index) {
        this.props.castVote(selectionIndex, index);
    }
    
    handleDeletePoll(index) {
        this.props.deletePoll(index);
    }
    
    render() {
        //  Declare an array to hold our poll elements
        let pollElements;
        //  App.js passes polls through props...
        if (this.props.polls.length > 0) {
            //  Each poll is mapped to a JSX element
            pollElements = this.props.polls.map((poll, index) => {
                return (
                    <PollListing key={index} poll={poll} index={index} castVote={this.handleCastVote.bind(this)} deletePoll={this.handleDeletePoll.bind(this)}/>
                )
            });
            //  And we just display em!
            return (
                <div className="Polls">
                    <h3>Latest Polls</h3>
                    {pollElements}
                </div>
            )
        }
        else {
            return (
                <div>
                    <h3>Latest Polls</h3>
                    <br/>
                        No polls yet!
                    <br/>
                </div>
            )
        }
    }
}

export default Polls;