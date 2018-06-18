import React, { Component } from 'react'
import ShelfSelector from './ShelfSelector.js'

class Book extends Component {
  render() {
    const { book, shelf, onUpdateShelf, title, author } = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.img})` }}></div>
            <ShelfSelector book={book} shelf={shelf} onUpdateShelf={onUpdateShelf}/>
          </div>
          <div className="book-title">{title}</div>
          <div className="book-authors">{author}</div>
        </div>
      </li>
    )
  }
}


export default Book