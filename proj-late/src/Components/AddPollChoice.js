import React, { Component } from 'react';

class AddPollChoice extends Component {
    
    handleChoiceChange = (index) => (e) => {
        let textValue = (this.textInput.value) ? this.textInput.value : "";
        this.props.choiceChange(index, textValue);
    }
    
    handleDeleteChoice = (index) => (e) => {
        e.preventDefault();
        this.props.deleteChoice(index);
    }
    
    render() {
        return (
            <div>
                <label>Choice</label> <input ref={ (input) => {this.textInput = input} } type="text" value={this.props.choice} onChange={this.handleChoiceChange(this.props.index)}/> 
                <button onClick={this.handleDeleteChoice(this.props.index)} className="btn">X</button>
            </div>
        )
    }
}

export default AddPollChoice