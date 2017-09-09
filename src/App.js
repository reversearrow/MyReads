import React from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import MyReads from './MyReads.js'

class BooksApp extends React.Component {
  render() {
    return (
    <div className="app">
      {(
      <div className="list-books">
        <div className="list-books-content">
          <div>
            <MyReads/>
          </div>
        </div>
        <div className="open-search">
          <Link to="search">Add a book</Link>
        </div>
      </div>
      )}
    </div>
    )
  }
}

export default BooksApp
