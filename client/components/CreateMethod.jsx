import React, { Component } from 'react';

const intialState = {
  class: '',
  name: '',
  mdnExample: '',
  w3Example: '',
  submitMessage: ''
}

class CreateMethod extends Component {
  constructor(props) {
    super(props);
    this.state = intialState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({
      [name]: target.value
    });
  }
  
  handleSubmit(event) {
    event.preventDefault();
    console.log(this.state.class);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        class: this.state.class,
        name: this.state.name,
        mdn: this.state.mdnExample,
        w3: this.state.w3Example
      })
    }
    fetch('http://localhost:3000/api', requestOptions)
      .then((res) => console.log(res))
    this.setState(intialState);
    this.setState({submitMessage: 'Method submitted!'});
  }

  render() {
    return(
      <div>
        <h2>Add a method to the database</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Class Name:
            <input
              name="class"
              type="text"
              value={this.state.class}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <br />
          <label>
            Method Name:
            <input
              name="name"
              type="text"
              value={this.state.name}
              onChange={this.handleInputChange} />
          </label>
          <br />
          <br />
          <textarea rows="7"
                    cols="50"
                    name="mdnExample"
                    value={this.state.mdnExample}
                    onChange={this.handleInputChange}
                    placeholder="MDN Example">
          </textarea>
          <br />
          <br />
          <textarea rows="7"
                    cols="50"
                    name="w3Example"
                    value={this.state.w3Example}
                    onChange={this.handleInputChange}
                    placeholder="W3 Example">
          </textarea>
          <br />
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.submitMessage}</p>
      </div>
    );
  }
}



export default CreateMethod;