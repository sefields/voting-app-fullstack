import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Button = styled.div`
    margin: 10px 1px 0 1px;
    padding: 10px 0 10px 0;
    border-radius: 10px 10px 0 0;
    width: 20%;
    cursor: pointer;
    cursor: hand;
    display: inline-block;
`

const FocusButton = Button.extend`
    background-color: LightGray;
`

const UnfocusButton = Button.extend`
    background-color: DarkGray;
`

class Tabs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        }
        
    }
    
    handleClick(index, event) {
        event.preventDefault();
        this.setState({
           selected: index 
        });
    }
    
    _renderTitles() {
        function labels(child, index) {
            let activeClass = '';
            if (this.state.selected === index) {
                activeClass = 'active';
                return (
                    <FocusButton 
                        key={index}
                        className={activeClass}
                        onClick={this.handleClick.bind(this,index)}>
                        {child.props.label}
                    </FocusButton>
                );
            }
            else {
                return (
                    <UnfocusButton 
                        key={index}
                        className={activeClass}
                        onClick={this.handleClick.bind(this,index)}>
                        {child.props.label}
                    </UnfocusButton>
                );
            }
        }
        return (
            <div>
                {this.props.children.map(labels.bind(this))}
            </div>
        )
    }
    
    _renderContent() {
        return (
            <div className="tabs_content">
                {this.props.children[this.state.selected]}
            </div>
        );
    }
    
    render() {
        return (
            <div className="tabs">
                {this._renderTitles()}
                {this._renderContent()}
            </div>    
        )
    }
}

Tabs.propTypes = {
    selected: React.PropTypes.number,
    children: React.PropTypes.oneOfType([
        React.PropTypes.array,
        React.PropTypes.element
    ]).isRequired
}

Tabs.defaultProps = {
    selected: 0
};

export default Tabs;