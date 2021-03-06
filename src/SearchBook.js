import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Book from './Book';

class SearchBook extends Component {
  state = {
    query: '',
    showingBooks: []
  }

  updateSearch = (query) => {
    this.setState({ query })

    if (this.state.query) {
      BooksAPI.search(query)
      .then((queryBooks) => {
        if (queryBooks instanceof Array) {
          queryBooks.forEach( queryBook => {
            queryBook.shelf = 'none'
            this.props.books.map( (bookInLibrary) => {
              if (bookInLibrary.id === queryBook.id) {
                queryBook.shelf = bookInLibrary.shelf
              }
              return queryBook
            })
          })
          this.setState({ showingBooks: queryBooks})
        } else {
          this.setState({ showingBooks: []})
        }
      })
      .catch( error => console.log(error) )
    } else {
      this.setState({ showingBooks: []})
    }
  }

  render() {
    const { query, showingBooks } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">

            <input 
              autoFocus="true"
              type="text" 
              placeholder="Search by category"
              value={query}
              onChange={(event) => this.updateSearch(event.target.value)}
            />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {query && showingBooks.map( (book) => (
            (book.imageLinks) ?
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.props.onUpdateShelf}/>
            :
            <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} key={book.id} onUpdateShelf={this.props.onUpdateShelf}/>
          ))}
          </ol>

          {query.length > 2 && showingBooks.length ===0 && (
            <div className="search-error">
              <h4>Sorry :&#40;</h4>
              <p>Unfortunately, no book matches your search. <br />
              Please, type another category.</p>
            </div>
          )}
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