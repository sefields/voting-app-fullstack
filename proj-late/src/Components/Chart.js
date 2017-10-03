import React, { Component } from 'react';
import {Doughnut} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                labels: this.props.poll.choiceArr,
                datasets: [{
                    label: '# of Votes',
                    data: this.props.poll.voteArr,
                    backgroundColor: [
                        'rgba(54, 164, 235, .7)',
                        'rgba(255, 74, 46, .7)',
                        'rgba(44, 241, 104, .7)',
                        'rgba(255, 163, 46, .7)'
                    ],
                    borderWidth: 1
                }]
            }        
        }
    }
    
    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) return;
        this.setState({
            data: {
                labels: nextProps.poll.choiceArr, // labels update
                datasets: [{
                    label: this.state.data.datasets[0].label, // This stays same
                    data: nextProps.poll.voteArr, // data update
                    backgroundColor: this.state.data.datasets[0].backgroundColor, // This stays same
                    borderWidth: this.state.data.datasets[0].borderWidth
                }]
            }   
        });
    }
    
    renderNoVotes() {
        return (
                <div>
                    No votes yet!
                </div>
        )
    }
    
    render() {
        var divStyle = {
            width: 300,
            height: 300
        };

        var voteArr = this.state.data.datasets[0].data;
        for (var i = 0; i < voteArr.length; i++) {
            if (voteArr[i] === "0") continue;
            else {
                return (
                    <center>
                        <div style={divStyle}>
                            <Doughnut data={this.state.data} redraw={true} />
                        </div>
                    </center>
                )
            }
        }
        return this.renderNoVotes();
    }
}

export default Chart;