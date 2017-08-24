import React from 'react'
import {Component} from 'react'
import {Link} from 'react-router-dom'
import MyReadsTable from './CurrentlyReading.js'
import SearchBooks from './SearchBooks.js'

class MainPage extends Component {
  render(){
    return (
      <div>
      {(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <MyReadsTable/>
            </div>
          </div>
          <div className="open-search">
            <Link to="search"
            >Add a book
            </Link>
          </div>
        </div>
        )}
      </div>
    )
  }
}
export default MainPage
