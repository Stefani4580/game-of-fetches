import React from 'react';
import './App.css';
import axios from "axios";
import Answer from "./components/Answer";


export default class App extends React.Component{
  constructor(){
    super();
    //Storing data in a Map object because the calls are async.  I'm using a key/value pair of question number and answer.  Also in setState calls I am creating a new Map object from this.state.data.  Then I'm adding the new key/value pair to this new Map.  Then the new Map is set.  I learned this in research of Arrays and State. 

    this.state = {
      data: new Map()  
    }
  }

  async question1(){
  // Where was Margaery Tyrell born?
    try {
    const response = await axios.get(`http://anapioficeandfire.com/api/characters/16`);
    const answer1 = response.data.born;
    console.log(`1. Where was Margaery Tyrell born? ${answer1}`);

    this.setState((prevState) => {
      const newData = new Map(prevState.data);
      newData.set(1, answer1);
      return ({
        data : newData
      })
    })  
    } catch (error) {
      console.log("error: ", error)
    }
  }

  async question2(){
    //What region is House Targaryen in?
    try {
      const response = await axios.get(`http://www.anapioficeandfire.com/api/houses/378`);
      const answer2 = response.data.region;
      console.log(`2. What region is House Targaryen in? ${answer2}`);

      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(2, answer2);
        return ({
          data : newData
        })
      })  
    } catch (error) {
      console.log("error: ", error)    
    }    
  }


  async question3(){
    //What's the coat of arms of House Lannister?
    try {
      const response = await axios.get(`http://www.anapioficeandfire.com/api/houses/229`);
      const answer3 = response.data.coatOfArms;
      console.log(`3. What's the coat of arms of House Lannister? ${answer3}`);

      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(3, answer3);
        return ({
          data : newData
        })
      })  

    } catch (error) {
    }
  }


  async question4(){
    //What is the second seat of House Baratheon?
    try {
      const response = await axios.get(`http://www.anapioficeandfire.com/api/houses/17`);
      const answer4 = response.data.seats[1];
      console.log(`4. What is the second seat of House Baratheon? ${answer4}`);

      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(4, answer4);
        return ({
          data : newData
        })
      })  

      
    } catch (error) {
      console.log("error: ", error)               
    }
  }

  async question5(){
      //What is Robert Baratheon's second alias?
    try {
      const response = await axios.get(`http://www.anapioficeandfire.com/api/characters/901`);
      const answer5 = response.data.aliases[1];
      console.log(`5. What is Robert Baratheon's second alias? ${answer5}`);
 
      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(5, answer5);
        return ({
          data : newData
        })
      })  
    
    } catch (error) {
      console.log("error: ", error)                     
    }    
  }


  async question6(){
     //What's the name of the founder of House Stark?
    try {
      const response1 = await axios.get(`http://www.anapioficeandfire.com/api/houses/362`);
      const response2 = await axios.get(response1.data.founder);
      const answer6 = response2.data.name;
      console.log(`6. What's the name of the founder of House Stark? ${answer6}`);

      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(6, answer6);
        return ({
          data : newData
        })
      })        
    } catch (error) {
      console.log("error: ", error)                           
    }
  }


  
   question7(){
    //What are the titles of Catelyn Stark's three POV books?
    let title1Req = axios.get("https://www.anapioficeandfire.com/api/books/1");
    let title2Req = axios.get("https://www.anapioficeandfire.com/api/books/2");
    let title3Req = axios.get("https://www.anapioficeandfire.com/api/books/3");
    axios.all([title1Req, title2Req, title3Req])
    .then(axios.spread((...responses) => {
      console.log(`7a. What are the titles of Catelyn Stark's three POV books? ${responses[0].data.name}`);
      console.log(`7b. What are the titles of Catelyn Stark's three POV books? ${responses[1].data.name}`);
      console.log(`7c. What are the titles of Catelyn Stark's three POV books? ${responses[2].data.name}`);

      this.setState((prevState) => {
        const newData = new Map(prevState.data);
        newData.set(7, responses[0].data.name);
        newData.set(8, responses[1].data.name);
        newData.set(9, responses[2].data.name);
        
        return ({
          data : newData
        })
      })  
    }))
    .catch(err => console.log("error: ", err));
    
  }


  componentDidMount(){

    this.question1();
    this.question2();
    this.question3();
    this.question4();
    this.question5();
    this.question6();
    this.question7();
  }


  render(){
    return (
      <div className="App">
        <Answer num="1" answer={this.state.data.get(1)} />
        <Answer num="2" answer={this.state.data.get(2)} />
        <Answer num="3" answer={this.state.data.get(3)} />
        <Answer num="4" answer={this.state.data.get(4)} />
        <Answer num="5" answer={this.state.data.get(5)} />
        <Answer num="6" answer={this.state.data.get(6)} />
        <Answer num="7.a" answer={this.state.data.get(7)} />
        <Answer num="7.b" answer={this.state.data.get(8)} />
        <Answer num="7.c" answer={this.state.data.get(9)} />

      </div>
    );
  }
}
