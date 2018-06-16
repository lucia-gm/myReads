import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf.js'
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
          <SearchBook books={this.state.books} onUpdateShelf={this.updateShelf}/>
        )}/>
  
        <Route exact path="/" render={()=>(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <Shelf category="currentlyReading" heading="Currently Reading" books={this.state.books} onUpdateShelf={this.updateShelf}/>
              <Shelf category="wantToRead" heading="Want to Read" books={this.state.books} onUpdateShelf={this.updateShelf}/>
              <Shelf category="read" heading="Read" books={this.state.books} onUpdateShelf={this.updateShelf}/>
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
