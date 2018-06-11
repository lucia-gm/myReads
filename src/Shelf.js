import React from 'react'
import Book from './Book.js'

class Shelf extends React.Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.heading}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
          {this.props.book.filter( book => book.shelf === this.props.category).map( book => (
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.props.onUpdateShelf}/>
          ))}
          </ol>
        </div>
      </div>

    )
  }
}

export default Shelf