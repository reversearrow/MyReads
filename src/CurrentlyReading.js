import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

function BooksRow(props) {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width:128, height: 188, backgroundImage: `url(${props.book.imageLinks.thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={props.book.shelf} onChange={props.change}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="boot-title">{props.book.title}</div>
        <div className="book-authors">{
          props.book.authors.map(author =>
            author
          )
        }</div>
      </div>
    )
}

function BookSection(props){
  let books = props.books
  if(books){
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.section}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) =>
            (
              <li key={book.id}>
                <BooksRow book={book} change={(event)=>(props.update(book,event.target.value))}/>
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  )
  }
}


class MyReadsTable extends Component {
  state= {
    allBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>
      this.setState(
        {allBooks: books}
      )
    )
  }

  updateBooks = (book,shelf) => {
    BooksAPI.update(book,shelf)
    this.setState((state)=>(
      {
        allBooks: state.allBooks.map(function(b){
            if(b.id === book.id){
              b.shelf = shelf
              return b
            }else {
              return b
            }
        })
      }
    )
    )
  }

  filterBooksByShelf = (books) => {
    let currentlyReading = books.filter(book => book.shelf === "currentlyReading")
    let wantToRead = books.filter(book => book.shelf === "wantToRead")
    let read = books.filter(book => book.shelf === "read")
    return [currentlyReading,wantToRead,read]
  }

  render(){
    let[currentlyReading,wantToRead,read] = this.filterBooksByShelf(this.state.allBooks)
    return(
      <div>
        <BookSection section="Currently Reading" books={currentlyReading} update={this.updateBooks}/>
        <BookSection section="wantToRead" books={wantToRead} update={this.updateBooks}/>
        <BookSection section="read" books={read} update={this.updateBooks}/>
      </div>
    )
  }
}

export default MyReadsTable
