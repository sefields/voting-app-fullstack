import React, { Component } from 'react';

class PollItem extends Component {
    constructor() {
        super();
        this.state = {
            selectedIndex : null
        }
    }
    
    handleCastVote(e) {
        if (this.state.selectedIndex === null) {
            alert("You forgot to make a selection for this poll!");
        }
        else {
            this.props.castVote(this.state.selectedIndex, this.props.index);
        }
        e.preventDefault();
    }
    
    handleSelectionChange = (index) => (e) => {
        this.setState({
            selectedIndex : index
        });
    }
    
    renderChoice(choice, index) {
        return(
            <div>
                <input type="radio" name="temp" onClick={this.handleSelectionChange(index)}/> 
                <label> {choice} - Votes: {this.props.poll.voteArr[index]}</label>
            </div>
        )
    }
    
    handleDeletePoll = (index) => (e) => {
        this.props.deletePoll(index);
    }
    
    render() {
        //  Declare an array to hold our choice elements
        let choiceElements;
        //  The poll object comes down from Polls.js
        if (this.props.poll.choiceArr) {
            //  Choices are read from the object and mapped onto elements
            choiceElements= this.props.poll.choiceArr.map((choice, index) => {
                return this.renderChoice(choice, index);
            })
        }
        //  Return a form with the question and choiceElements! This constitutes a PollItem
        return (
            <div>
                <hr />
                <form onSubmit = {this.handleCastVote.bind(this)}>
                    {/*<h3>Id:{this.props.poll.id}</h3>*/}
                    <h3>Q: {this.props.poll.question} <a href="#" onClick={this.handleDeletePoll(this.props.index)}>X</a></h3>
                    {choiceElements}
                    <input type="submit" value="Submit" />
                </form>
            </div>
        )
    }
}

export default PollItem;