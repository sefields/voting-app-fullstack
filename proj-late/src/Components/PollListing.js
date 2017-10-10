import React, { Component } from 'react';
import PollItem from './PollItem';
import Chart from './Chart.js';
import styled from 'styled-components';

const Left = styled.div`
    float: left;
    margin: 40px 0 40px 50px;
`

const Right = styled.div`
    margin: 50px 100px 50px 360px;
`

const Item = styled.div`
    border: 1px solid lightGray;
    border-radius: 5px;
    margin: 10px 0 10px 0;
    overflow: auto;
`

const Button = styled.div`
    margin: 0 auto;
    margin-top: 10px;
    margin-bottom: 10px;
    padding: 10px 0 10px 0;
    background-color: lightgray;
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
                <Left>
                    <PollItem key={index} poll={poll} index={index} castVote={this.handleCastVote.bind(this)} deletePoll={this.handleDeletePoll.bind(this)}/>
                </Left>
                <Right>
                    <Chart poll={poll} />
                </Right>
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