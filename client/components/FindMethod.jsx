import React, { Component } from 'react';

class FindMethod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      class: '',
      name: '',
      mdnText: '',
      w3Text: '',
      allInfo: {},
      currentMethods: [],
      allClasses: []
    };
    this.handleMethodChange = this.handleMethodChange.bind(this);
    this.handleClassChange = this.handleClassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    fetch('http://localhost:3000/api/all')
      .then((response) => response.json())
      .then((data) => {
        const classObj = {};
        let firstClass;
        for(let i = 0; i < data.length; i++) {
          let current = data[i];
          if(classObj.hasOwnProperty(current.class)) {
            classObj[current.class].push(current);
            if(current.class === firstClass) {
              this.state.currentMethods.push(<option value={current.name}>{current.name}</option>)
            }
          } else {
            if(!firstClass) {
              firstClass = current.class;
              this.setState({class: firstClass});
              this.setState({name: current.name});
              this.state.currentMethods.push(<option value={current.name}>{current.name}</option>)
            }
            this.state.allClasses.push(<option value={current.class}>{current.class}</option>)
            classObj[current.class] = [current];
          }
        }
        this.setState({allInfo: classObj});
      });
  }


  handleMethodChange(event) {
    const target = event.target;
    console.log(target.value)
    this.setState({
      name: target.value
    });
    console.log(this.state.name);
  }

  handleClassChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({currentMethods: []});
    this.setState({
      [name]: target.value
    });
    const classArr = this.state.allInfo[target.value];
    const newMethodArr = [];
    for(let i = 0; i < classArr.length; i++) {
      let current = classArr[i];
      if(i === 0) this.setState({name: current.name});
      newMethodArr.push(<option value={current.name}>{current.name}</option>);
    }
    this.setState({currentMethods: newMethodArr});
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:3000/api?' + new URLSearchParams({
      class: this.state.class,
      name: this.state.name
      }))
      .then((response) => response.json())
      .then((data) =>this.setState({mdnText: data.mdn_example, w3Text: data.w3_example}));
  }

  render() {
    return(
      <div>
        <h2>Find an example from the database</h2>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Class:
            <select name='class' value={this.state.class} onChange={this.handleClassChange}>
              {this.state.allClasses}
            </select>
          </label>
          <br />
          <br />
          <label>
            Select Method:
            <select name='name' value={this.state.name} onChange={this.handleMethodChange}>
              {this.state.currentMethods}
            </select>
          </label>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
        <h4>MDN Example:</h4>
        <code>
          <pre>{this.state.mdnText}</pre>
        </code>
        <h4>W3Schools Example:</h4>
        <code>
          <pre>{this.state.w3Text}</pre>
        </code>
      </div>

    );
  }
}



export default FindMethod;