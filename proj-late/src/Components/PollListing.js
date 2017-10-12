import React, { Component } from 'react';
import PollItem from './PollItem';
import Chart from './Chart.js';
import styled from 'styled-components';

const SubItem = styled.div`
    width: 50%;
    display: inline-block;
`

const Item = styled.div`
    width: 75%;
    border: 2px solid floralwhite;
    border-radius: 5px;
    margin: auto;
    margin-bottom: 10px;
    overflow: auto;
`

const Button = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 0 10px 0;
    background-color: floralwhite;
    border-radius: 10px;
    width: 50%;
    cursor: pointer;
    cursor: hand;
`

class PollListing extends Component {

    constructor() {
        super();
        this.state = {
            displayContents: false
        }
        
    }
    
    handleCastVote(selectionIndex, index) {
        this.props.castVote(selectionIndex, index);
    }
    
    handleDeletePoll(index) {
        this.props.deletePoll(index);
    }
    
    handleClick() {
        this.setState({
            displayContents: !this.state.displayContents
        });
    }
    
    renderButton() {
        return (
                <Button>
                    <div onClick={this.handleClick.bind(this)}>Q: {this.props.poll.question} </div>
                </Button>
        )
    }
    
    renderPoll(poll, index) {
        return (
            <Item>
                <SubItem>
                    <PollItem key={index} poll={poll} index={index} castVote={this.handleCastVote.bind(this)} deletePoll={this.handleDeletePoll.bind(this)}/>
                </SubItem>
                <SubItem>
                    <Chart poll={poll} />
                </SubItem>
            </Item>
        )
    }
    
    render() {
        if (this.state.displayContents === false) {
            return (
                this.renderButton()
            )
        }
        else {
            return (
                <div>
                    {this.renderButton()}
                    {this.renderPoll(this.props.poll, this.props.index)}
                </div>
            )
        }
    }

}

export default PollListing;