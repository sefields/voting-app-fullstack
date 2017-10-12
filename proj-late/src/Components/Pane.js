import React, { Component } from 'react';
import styled from 'styled-components';

const StyledPane = styled.div`
    background-color: LightGray;
    border-style: none;
    border-radius: 10px;
    padding: 20px 20px 20px 20px;
`

class Pane extends Component {
    render() {
        return (
            <StyledPane>
                {this.props.children}
            </StyledPane>
        )
    }    
}

Pane.propTypes = {
    label: React.PropTypes.string.isRequired,
    children: React.PropTypes.element.isRequired
}

// https://toddmotto.com/creating-a-tabs-component-with-react/

export default Pane;