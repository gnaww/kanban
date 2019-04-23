import React, { Component } from 'react';
import './App.css';
import BoardList from './components/BoardList';
import Login from './components/Login';
import Signup from './components/Signup';

class App extends Component {
    render() {
        return (
            <div class="Container">
                <BoardList />
            </div>
        );
    }
}

export default App;
