import React, { Component } from 'react';
import './BoardList.css';
import Board from './Board';

class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            boards: [
                {
                    name: "Todo",
                    items: [
                        "lorem ipsum",
                        "foo bar"
                    ]
                },
                {
                    name: "In Progress",
                    items: [
                        "in progress 1",
                        "in progress 2"
                    ]
                },
                {
                    name: "Completed",
                    items: [
                        "completed 1",
                        "completed 2",
                        "completed 3"
                    ]
                }
            ]
        };
    }

    componentDidMount = async () => {
    }

    render() {
        const { boards } = this.state
        return (
            <div>
                { boards.map((board, idx) => <Board key={idx} id={idx} name={board.name} items={board.items} />) }
            </div>
        );
    }
}

export default BoardList;
