import React, { Component } from 'react';
import './Board.css';
import Item from './Item';

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
    }

    render() {
        let { name, items } = this.props;
        return (
            <div>
                <h1>{ name }</h1>
                <div>
                    { items.map((item, idx) => <Item key={idx} id={idx} content={item} />) }
                </div>
            </div>
        );
    }
}

export default Board;
