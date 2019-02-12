import React, { Component } from "react";
import "./App.css";
import Person from "../components/persons/Person/Person";

class App extends Component {
  state = {
    persons: [
      { id: "few", name: "Tom", age: 28 },
      { id: "gree", name: "Jim", age: 26 },
      { id: "ere", name: "Kim", age: 27 },
    ],
    otherState: "Something different",
    showpersons: false
  }

  switchNameHandler = (newName) => {
    console.log("It was clicked");
    this.setState({
      persons: [
        { name: newName, age: 38 },
        { name: "Jim", age: 26 },
      ],
    })
  }
  deleteHandler = (personIndex) => {
    const persons = this.state.persons.slice();
    // const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showpersons;
    this.setState({
      showpersons: !doesShow
    });
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: event.target.value, age: 38 },
        { name: "Jim", age: 26 },
      ],
    })
  }
  personsNameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(person => {
      return person.id === id;
    });
    const person = {
      ...this.state.persons[personIndex]
    };

    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  }
  render() {

    const style = {
      backgroundColor: "green",
      color: "white",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    }

    let persons = null;
    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push("red");
    }

    if (this.state.persons.length <= 1) {
      classes.push("bold");
    }
    if (this.state.showpersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.personsNameChangedHandler(event, person.id)}
              delete={() => this.deleteHandler(index)} />
          })}
          {/* <Person changed={this.nameChangedHandler} click={() => this.switchNameHandler("Smith")} name={this.state.persons[0].name} age={this.state.persons[0].age} />
          <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>
            Hello World</Person> */}
        </div>
      );
      style.backgroundColor = "red";
    }

    return (
      <div className="App">
        <p className={classes.join(" ")}>{this.props.title}</p>
        {/* <button style={style} onClick={this.switchNameHandler.bind(this, "Smith")}>Switch Name</button> */}
        <button style={style} onClick={this.togglePersonsHandler}>Toggle Persons</button>
        {persons}
      </div>
    );
  }
}

export default App;
