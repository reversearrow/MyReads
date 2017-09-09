import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import { Link,Route } from 'react-router-dom'

function BooksRow(props) {
    let authors = []
    let imgURL = ''
    if(props.book.authors){
      authors= props.book.authors
    }
    if(props.book.imageLinks){
      imgURL=props.book.imageLinks.smallThumbnail
    }
    if(!props.book.shelf){
      props.book.shelf = 'none'
    }
    return(
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width:128, height: 188, backgroundImage: `url(${imgURL})`}}></div>
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
          authors.map(author =>
            author
          )
        }</div>
      </div>
    )
}

function RenderBooks(props){
  let books = props.books
  return(
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
  )
}

function BookSection(props){
  if(props.books){
  return(
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.section}</h2>
        <RenderBooks books={props.books} update={props.update}/>
    </div>
  )
  }
}

function SearchBooks(props){
    return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <form>
                <div className="search-books-input-wrapper">
                  <input type="text" onChange={props.search} placeholder="Search by title or author"/>
                </div>
              </form>
            </div>
            <div className="search-books-results">
              <RenderBooks books={props.books} update={props.update}/>
            </div>
      </div>
    )
}

class MyReads extends Component {
  state= {
    allBooks: [],
    searchedBooks: []
  }

  componentDidMount(){
    BooksAPI.getAll().then((books) =>
      this.setState(
        {allBooks: books}
      )
    )
  }

  checkDuplicateBook = (bookid) => {
    for(let book of this.state.allBooks){
      if (book.id === bookid){
        return true
      }
    }
    return false
  }

  addBook = (book,shelf) => {
    let duplicate = this.checkDuplicateBook(book.id)
    console.log(duplicate)
    if(!duplicate){
      this.setState((state)=>{
        allBooks: state.allBooks.push(book)
      })
      this.updateBook(book,shelf)
    }
  }

  removeBook = (bookid) => {
    let books = this.state.allBooks.filter(book => book.id !== bookid)
    this.setState({
      allBooks: books
    })
  }

  updateBook = (book,shelf) => {
    BooksAPI.update(book,shelf)
    if(shelf === 'none'){
      this.removeBook(book.id)
    }
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

  updateCommonBooks = (searchedBooks) => {
    for(let searchedBook of searchedBooks){
      for(let book of this.state.allBooks){
        if (searchedBook.id === book.id){
          searchedBook.shelf = book.shelf
      }
    }
  }
}

  search = (event) => {
    let query = event.target.value
    if(query){
      BooksAPI.search(query,10).then((books)=>
        {
          if(books){
            if(books.error !== "empty query"){
              this.updateCommonBooks(books)
              this.setState(
                {
                  searchedBooks:books
                }
              )
            }else{
              console.log("Meet")
              this.setState({searchedBooks:[]})
          }
        }
      }
      )
    }else{
      console.log("Meet2")
      this.setState({searchedBooks:[]})
    }
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
        <Route exact path="/" render={() => (
          <div>
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
            <BookSection section="Currently Reading" books={currentlyReading} update={this.updateBook}/>
            <BookSection section="wantToRead" books={wantToRead} update={this.updateBook}/>
            <BookSection section="read" books={read} update={this.updateBook}/>
          </div>
        )}/>
        <Route exact path="/search" render={() => (
          <SearchBooks
          search={this.search}
          books={this.state.searchedBooks}
          update={this.addBook}
          />)}/>
      </div>
    )
  }
}

export default MyReads
