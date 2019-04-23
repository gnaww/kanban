import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount = async () => {
    }

    render() {
        let { id, content } = this.props;
        return (
            <div>
                { `${id}) ${content}` }
            </div>
        );
    }
}

export default Item;
