import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll().then( books => {
      this.setState({books})
      console.log(this.state.books)
    })
  }

  updateShelf = (book,event) => {
    BooksAPI.update(book,event).then(() => {
      book.shelf = event
      const updatedBooks = this.state.books.filter( b => b.id !== book.id)
      updatedBooks.push(book)
      this.setState({
        books: updatedBooks,
      })
  })}

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter( book => book.shelf === "currentlyReading").map( book => (
                      <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.updateShelf}/>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter( book => book.shelf === "wantToRead").map( book => (
                      <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.updateShelf}/>
                    ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.books.filter( book => book.shelf === "read").map( book => (
                      <Book book={book} shelf={book.shelf} title={book.title} author={book.authors} img={book.imageLinks.thumbnail} key={book.id} onUpdateShelf={this.updateShelf}/>
                    ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
