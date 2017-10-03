import React, { Component } from 'react';
import PollItem from './PollItem';
import Chart from './Chart.js';
import styled from 'styled-components';

const Left = styled.div`
    float: left;
    margin: 40px 0 40px 150px;
`

const Right = styled.div`
    margin: 50px 100px 50px 400px;
`

const Item = styled.div`
    border: 1px solid lightGray;
    border-radius: 5px;
    overflow: auto;
`

class Polls extends Component {
    handleCastVote(selectionIndex, index) {
        this.props.castVote(selectionIndex, index);
    }
    
    handleDeletePoll(index) {
        this.props.deletePoll(index);
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
        //  Declare an array to hold our poll elements
        let pollElements;
        //  App.js passes polls through props...
        if (this.props.polls) {
            //  Each poll is mapped to a JSX element
            pollElements = this.props.polls.map((poll, index) => {
                return this.renderPoll(poll, index);
            })
        }
        //  And we just display em!
        return (
            <div className="Polls">
                <h3>Latest Polls</h3>
                {pollElements}
            </div>
    );
    }
}

export default Polls;