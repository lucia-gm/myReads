import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import Book from './Book';

class SearchBook extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  updateSearch = (query) => {
    this.setState({ query: query })

    if (this.state.query) {
      BooksAPI.search(query).then((books)=>{
      this.setState({ showingBooks: books})
      console.log(this.state.showingBooks)
    }) 
    } else {
      this.setState({ showingBooks: []})
    }
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.query.length > 1 && this.state.showingBooks.length > 0 && this.state.showingBooks.map( (book) => (
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.props.onUpdateShelf}/>
          ))}
          </ol>
        </div>
      </div>
    )
  }
}

SearchBook.propTypes = {
  showingBooks: PropTypes.array,
  query: PropTypes.string
}

export default SearchBook