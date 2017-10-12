import React, { Component } from 'react';

class User extends Component {
    render() {
        if (this.props.user) {
            return (
                <div>
                    <h4>Logged in:</h4>
                    <h3>{this.props.user.displayName}</h3>
                </div>
            )  
        } 
        else {
            return (
                <h3>
                    Not logged in!
                </h3>
            )
        }
    }
}

export default User;