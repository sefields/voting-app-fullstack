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
        if (this.props.polls.length > 0) {
            //  Each poll is mapped to a JSX element
            pollElements = this.props.polls.map((poll, index) => {
                return this.renderPoll(poll, index);
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