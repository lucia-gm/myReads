import React from 'react'
import ShelfSelector from './ShelfSelector.js'

const Book = (props) => ( 
  <li>
    <div className="book">
      <div className="book-top">
        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${props.img})` }}></div>
        <ShelfSelector book={props.book} shelf={props.shelf} onUpdateShelf={props.onUpdateShelf}/>
      </div>
      <div className="book-title">{props.title}</div>
      <div className="book-authors">{props.author}</div>
    </div>
  </li>
)

export default Book