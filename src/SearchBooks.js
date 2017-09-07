import React, { Component } from 'react';
import {Link,Route} from 'react-router-dom'
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  render(){
    console.log(this.props.books)
    return(
      <div className="search-books">
            <div className="search-books-bar">
              <Link className="close-search" to="/">Close</Link>
              <form>
                <div className="search-books-input-wrapper">
                  <input type="text" onChange={this.props.search} placeholder="Search by title or author"/>
                </div>
              </form>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
          
              </ol>
            </div>
      </div>
    )
  }
}

export default SearchBooks
