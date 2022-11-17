import React, { Component } from 'react';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mdnText: '',
      w3Text: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fetch('http://localhost:3000/api?' + new URLSearchParams({
      class: 'test1',
      name: 'test2'
      }))
      .then((response) => response.json())
      .then((data) => this.setState({mdnText: data.mdn_example, w3Text: data.w3_example}));
    //this.setState({mdnText: newMdnText, w3Text: newW3Text});
  }

  render() {
    return(
      <div>
        <button onClick={this.handleClick}>This is a test</button>
        <p>{this.state.mdnText}</p>
        <p>{this.state.w3Text}</p>
      </div>
    );
  }
}

export default App;