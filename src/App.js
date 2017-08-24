import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import MyReadsTable from './CurrentlyReading.js'
import SearchBooks from './SearchBooks.js'
import { Link,Route } from 'react-router-dom'
import MainPage from './MainPage'


class BooksApp extends React.Component {
  render() {
    return (
    <div className="app">
      <Route exact path="/" component={MainPage}/>
      <Route exact path="/search" component={SearchBooks}/>
    </div>
    )
  }
}

export default BooksApp
