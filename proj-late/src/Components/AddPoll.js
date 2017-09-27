import React, { Component } from 'react';

class AddPoll extends Component {
    constructor() {
        super();
        this.state = { newPoll: {
            question: null,
            choiceArr: Array(2).fill(null)
            //If you're looking for 'voteArr', it gets tacked on in App.js
            }
        }
    }
    
    //  This adds a blank spot to choiceArr
    //  These blanks are then turned into text inputs in render()
    handleAddChoice(e) {
        let choiceArr = this.state.newPoll.choiceArr;
        choiceArr.push(null);
        this.setState({
            newPoll: {
                question: this.state.newPoll.question,
                choiceArr: choiceArr
            }
        });
        e.preventDefault();
    }
    
    //  This pushes a new poll up to App.js
    handleAddPoll(e) {
        if (this.refs.question === '')
        {
            alert('Must provide a question!')
        }
        else {
            this.setState({
                newPoll: {
                    question: this.refs.question.value,
                    choiceArr: this.state.newPoll.choiceArr
                }
            }, function() {
                // console.log("ADDPOLL.JS:");
                // console.log(this.state);
                this.props.addPoll(this.state.newPoll);
            });
        }
        e.preventDefault();
    }
    
    //  This gets called whenever a text input is changed (see render())
    //  And updates the state
    handleChoiceChange = (index) => (e) => {
        //  Grab all our choices
        let choiceArr = this.state.newPoll.choiceArr;
        //  Plug in the one that was changed
        choiceArr[index] = e.target.value;
        //  Set the state
        this.setState({
            newPoll: {
                question: this.state.newPoll.question,
                choiceArr: choiceArr
            }
        });
    }
    
    handleDeleteChoice = (index) => (e) => {
        let choiceArr = this.state.newPoll.choiceArr;
        console.log("Removing " + choiceArr[index]);
        choiceArr.splice(index, 1);
        this.setState({
            newPoll: {
                question: this.state.newPoll.question,
                choiceArr: choiceArr
            }
        });
        console.log(this.state.newPoll.choiceArr);
    }
    
    renderChoice(index) {
        //  Populate fields based on state
        let textValue = (this.state.newPoll.choiceArr[index]) ? this.state.newPoll.choiceArr[index] : "";
        return (
            <div>
                <label>Choice</label><input type="text" value={textValue} onChange={this.handleChoiceChange(index)}/>
                <a href="#" onClick={this.handleDeleteChoice(index)}>X</a><br />
            </div>
        )
    }
    
    render() {
        //  Pull all the choices from the state...
        let choiceElements;
        choiceElements = this.state.newPoll.choiceArr.map((choice, index) => {
            //... and turn them into JSX elements
            return this.renderChoice(index);
        });
        
        return (
            <div>
                <hr/>
                <h3>Add Poll</h3>
                <form onSubmit={this.handleAddPoll.bind(this)}>
                    <label>Question</label><input type="text" ref="question"/><br/>
                    {choiceElements}
                    <input type="submit" value="Submit" />
                </form>
                <form onSubmit={this.handleAddChoice.bind(this)}>
                    <input type="submit" value="Add A Choice" />
                </form>
            </div>
        )
    }
}

export default AddPoll