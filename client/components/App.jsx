import React, { Component } from 'react';
import CreateMethod from './CreateMethod.jsx';
import FindMethod from './FindMethod.jsx';


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div>
        <FindMethod />
        <CreateMethod />
      </div>
    );
  }
}

export default App;