import React, { Component } from 'react';
import BoardList from '../components/BoardList';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div>
                <h1>Welcome user!</h1>
                <h1>Your Kanban Boards</h1>
                <button type="button">Log Out</button>
                <BoardList />
            </div>
        );
    }
}

export default Home;
