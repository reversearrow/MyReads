import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'

function BooksRow(props) {
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width:128, height: 188, backgroundImage: `url(${props.book.imageLinks.thumbnail})`}}></div>
          <div className="book-shelf-changer">
            <select value={props.value}>
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
              <li>
                <BooksRow book={book} value={props.value}/>
              </li>
            )
          )}
        </ol>
      </div>
    </div>
  )
  }
}

class CurrentlyReading extends Component {
  render(){
    let currentReads = this.props.current;
    return(
      <BookSection section="Currently Reading" books={currentReads} value="currentlyReading"/>
    )
  }
}

class WantToRead extends Component {
  render(){
    let wantToRead = this.props.wantTo;
    return(
      <BookSection section="Want to Read" books={wantToRead} value="wantToRead"/>
    )
  }
}

class Read extends Component {
  state={
    value: "read"
  }
  render(){
    let read = this.props.read;
    return(
      <BookSection section="Read" books={read} value="read"/>
    )
  }
}

class MyReadsTable extends Component {
  state= {
    currentReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>
      this.setState(
        {currentReading:books.filter(book => book.shelf === "currentlyReading"),
        wantToRead:books.filter(book => book.shelf === "wantToRead"),
        read:books.filter(book => book.shelf === "read")
        }
      )
    )
  }

  render(){
    return(
      <div>
        <CurrentlyReading current={this.state.currentReading}/>
        <WantToRead wantTo={this.state.wantToRead}/>
        <Read read={this.state.read}/>
      </div>
    )
  }
}

export default MyReadsTable
