import React, { Component } from 'react';
import AddPollChoice from './AddPollChoice.js';

class AddPoll extends Component {
    constructor() {
        super();
        this.state = { newPoll: {
            question: '',
            choiceArr: Array(2).fill('')
            //If you're looking for 'voteArr', it gets tacked on in App.js
            }
        }
    }
    
    //  This adds a blank spot to choiceArr
    //  These blanks are then turned into text inputs in render()
    handleAddChoice(e) {
        let choiceArr = this.state.newPoll.choiceArr;
        choiceArr.push('');
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
        //Prevents page reload
        e.preventDefault();
        
        let currChoices = this.state.newPoll.choiceArr;
        if (this.state.newPoll.question.value === '')
        {
            alert('Must provide a question!')
        }
        for (var i = 0; i < currChoices.length; i++) {
            if (currChoices[i] !== '') continue;
            else {
                alert('Must input text for every choice!');
                return;
            }
        }
        this.props.addPoll(this.state.newPoll);
        this.setState({
            newPoll: {
                question: '',
                choiceArr: Array(2).fill('')
            }
        });
    }
    
    handleQuestionChange = (e) => {
        this.setState({
            newPoll: {
                question: e.target.value,
                choiceArr: this.state.newPoll.choiceArr
            }
        })
    }
    
    //  This gets called whenever a text input is changed (see render())
    //  And updates the state
    handleChoiceChange = (index, textValue) => {
        //  Grab all our choices
        let choiceArr = this.state.newPoll.choiceArr;
        //  Plug in the one that was changed
        choiceArr[index] = textValue;
        //  Set the state
        this.setState({
            newPoll: {
                question: this.state.newPoll.question,
                choiceArr: choiceArr
            }
        });
    }
    
    handleDeleteChoice = (index) => {
        let choiceArr = this.state.newPoll.choiceArr;
        if (choiceArr.length <= 2) {
            alert("At least 2 choices are required!");
            return;
        }
        choiceArr.splice(index, 1);
        this.setState({
            newPoll: {
                question: this.state.newPoll.question,
                choiceArr: choiceArr
            }
        });
    }
    
    renderChoice(index) {
        //  Populate fields based on state
        let textValue = (this.state.newPoll.choiceArr[index]) ? this.state.newPoll.choiceArr[index] : "";
        return (
            <div>
                <label>Choice</label><input type="text" value={textValue} onChange={this.handleChoiceChange(index)}/>
                <button onClick={this.handleDeleteChoice(index)}>X</button><br />
            </div>
        )
    }
    
    render() {
        let choiceElements;
        choiceElements = this.state.newPoll.choiceArr.map((choice, index) => {
           return (
               <AddPollChoice key={index} index={index} choice={choice} choiceChange={this.handleChoiceChange} deleteChoice={this.handleDeleteChoice}/>
           )
        });
        
        return (
            <div>
                <h3>Add Poll</h3>
                <form onSubmit={this.handleAddPoll.bind(this)}>
                    <label>Question</label> <input type="text" onChange={this.handleQuestionChange} value={this.state.newPoll.question} /><br/>
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