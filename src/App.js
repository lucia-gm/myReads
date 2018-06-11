import React from 'react'
import * as BooksAPI from './BooksAPI'
import Book from './Book.js'
import SearchBook from './SearchBook.js'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: [],
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
        <Route path="/search" render={ () => (
          <SearchBook/>
        )}/>
  
        <Route exact path="/" render={()=>(
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
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
  )}
}

export default BooksApp
