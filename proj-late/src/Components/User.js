import React, { Component } from 'react';

class User extends Component {
    render() {
        console.log(this.props.user);
        if (this.props.user) {
            return (
                <div>
                    <h4>Logged in: {this.props.user.displayName}</h4>
                </div>
            )  
        } 
        else {
            return (
                <div>
                    Not logged in!
                </div>
            )
        }
    }
}

export default User;