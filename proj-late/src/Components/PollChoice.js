import React, { Component } from 'react';

class Choice extends Component {
    
    handleChoiceChange = (index) => (e) => {
        let textValue = (this.textInput.value) ? this.textInput.value : "";
        this.props.choiceChange(index, textValue);
    }
    
    render() {
        return (
            <div>
                <label>Choice</label><input ref={ (input) => {this.textInput = input} } type="text" onChange={this.handleChoiceChange(this.props.index)}/>
            </div>
        )
    }
}

export default Choice