import React from 'react'
import './App.css'
import MainPage from './MainPage'
import SearchBooks from './SearchBooks.js'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'



class BooksApp extends React.Component {
  state= {
    allBooks: [],
    searchedBooks: []
  }


  search = (event) => {
    let query = event.target.value
    if(query){
      BooksAPI.search(query,10).then((books)=>
        {if(books){
          if(books.error !== "empty query"){
            this.setState({searchedBooks:books})
          }else{
            this.setState({searchedBooks:[]})
          }
        }
      }
      )
    }else{
      this.setState({searchedBooks:[]})
    }
  }

  render() {
    return (
    <div className="app">
        <MainPage/>
    </div>
    )
  }
}

export default BooksApp
