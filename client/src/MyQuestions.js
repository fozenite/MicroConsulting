import React, { Component } from 'react';
import Question from './Question.js';
import '../styles/QList.css';    // Change
import Cookies from 'universal-cookie';





let searchingFor = (term) => {

  return (x) => {
    return x.title.toLowerCase().includes(term.toLowerCase()) || !term;
  }
}


export default class MyQuestions extends Component {

  constructor(props) {
  super(props);
    this.state = {
      questions: [],
      term: ''
    }
    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler = (e) => {
    this.setState({term: e.target.value})
  }

  // getAllQuestions
  getAllQuestions = () => {

    const cookies = new Cookies();
    let token =  cookies.get('token')
    fetch("./api/questions/my_questions", {
      method: 'GET',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': token
      }
    })
   .then((response) => { return response.json()})
   .then((json) => {
     let getQs = this.state.questions;
     getQs = json

     this.setState({questions: getQs})
    })
  }

  componentWillMount = () => {
    this.getAllQuestions();
  }

  render() {

      const questions = this.state.questions


      let listItems = questions.filter(searchingFor(this.state.term)).map((question, i) =>
      <div className="Qlist" key={questions[i].id}>
        <div className="titleSection">
          <span className="titleT">Title:</span> <br/>
          <span>{question.title}</span>
          </div>
          <div className="questionSection">
            <span className="titleQ">Question:</span> <br/>
            <span>{question.content}</span>
          </div>

          <div className="questionSection">
            <span className="titleA">Answer:</span> <br/>
            <span>{question.answer}</span>
          </div>
      </div>
      );

      return(
        <div className="QlistScroll">
          <h2>My Questions</h2>
          <form>
            <img alt="login Icon" className="searchIcon" src="./searchIcon.svg" />
            <input className="searchBar" placeholder="Search" type="text" onChange={this.searchHandler} value ={this.state.term}/>
          </form>
           {listItems}
        </div>
      )
  }
}
