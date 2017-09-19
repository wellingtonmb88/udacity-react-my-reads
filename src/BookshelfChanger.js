import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookshelfChanger extends Component {

    static propTypes = {
        shelfState: PropTypes.string.isRequired,
        onShelfStateChanged: PropTypes.func.isRequired
    };

    change = (event) => {
        this.setState({ shelfState: event.target.value });
        this.props.onShelfStateChanged(event.target.value);
    };

    render() {
        const { shelfState } = this.props
        return (
            <div className="book-shelf-changer">
                <select onChange={this.change} value={shelfState}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
};

export default BookshelfChanger;