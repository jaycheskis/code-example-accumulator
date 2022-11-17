import React, { Component } from 'react';
import CreateMethod from './CreateMethod.jsx';
import FindMethod from './FindMethod.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='main-container'>
        <FindMethod />
        <CreateMethod />
      </div>
    );
  }
}

export default App;