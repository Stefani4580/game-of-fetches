import React from 'react';
import './App.css';
import axios from "axios";
import Answer from "./components/Answer";

// let questions = [
//   "http://anapioficeandfire.com/api/characters/16",
//   "http://www.anapioficeandfire.com/api/houses/378",

// ]

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      data: []  
    }
  }

  componentDidMount(){
    // Where was Margaery Tyrell born?
    axios.get(`http://anapioficeandfire.com/api/characters/16`)
    .then(response => {
      const answer1 = response.data.born;
      const answer1Array = [answer1];
      this.setState({
        data : answer1Array
      })
    })
    .catch(err => console.log("error: ", err));

    //What region is House Targaryen in?
    axios.get(`http://www.anapioficeandfire.com/api/houses/378`)
    .then(response => {
      const answer2 = response.data.region;
      this.setState({
        data : this.state.data.concat(answer2)
      })
    })
    .catch(err => console.log("error: ", err));

    //What's the coat of arms of House Lannister?
    axios.get(`http://www.anapioficeandfire.com/api/houses/229`)
    .then(response => {
      const answer3 = response.data.coatOfArms;
      this.setState({
        data : this.state.data.concat(answer3)
      })
    })
    .catch(err => console.log("error: ", err));

    //What is the second seat of House Baratheon?
    axios.get(`http://www.anapioficeandfire.com/api/houses/17`)
    .then(response => {
      const answer4 = response.data.seats[1];
      this.setState({
        data : this.state.data.concat(answer4)
      })
    })
    .catch(err => console.log("error: ", err));

    //What is Robert Baratheon's second alias?
    axios.get(`http://www.anapioficeandfire.com/api/characters/901`)
    .then(response => {
      const answer5 = response.data.aliases[1];
      this.setState({
        data : this.state.data.concat(answer5)
      })
    })
    .catch(err => console.log("error: ", err));
    
    //What's the name of the founder of House Stark?
    const founderAPI = "";
    axios.get(`http://www.anapioficeandfire.com/api/characters/901`)
    .then(response => {
      founderAPI = response.data.founder[1];
    })

    .catch(err => console.log("error: ", err));
    axios.get(founderAPI)
    .then(response => {
      const answer6 = response.data.name;
      this.setState({
        data : this.state.data.concat(answer6)
      })
    })
    .catch(err => console.log("error: ", err));

    //What are the titles of Catelyn Stark's three POV books?
    let title1Req = axios.get("https://www.anapioficeandfire.com/api/books/1");
    let title2Req = axios.get("https://www.anapioficeandfire.com/api/books/2");
    let title3Req = axios.get("https://www.anapioficeandfire.com/api/books/3")
    axios.all([title1Req, title2Req, title3Req])
    .then(axios.spread((...responses) => {
      this.setState({
        data : this.state.data.concat(responses[0].data.name)
      })
      this.setState({
        data : this.state.data.concat(responses[1].data.name)
      })
      this.setState({
        data : this.state.data.concat(responses[2].data.name)
      })

    }))
    .catch(err => console.log("error: ", err));

  }


  render(){
    return (
      <div className="App">
        <Answer num="1" answer={this.state.data[0]} />
        <Answer num="2" answer={this.state.data[1]} />
        <Answer num="3" answer={this.state.data[2]} />
        <Answer num="4" answer={this.state.data[3]} />
        <Answer num="5" answer={this.state.data[4]} />
        <Answer num="6" answer={this.state.data[5]} />
        <Answer num="7.a" answer={this.state.data[6]} />
        <Answer num="7.b" answer={this.state.data[7]} />
        <Answer num="7.c" answer={this.state.data[8]} />
      </div>
    );
  }
}
