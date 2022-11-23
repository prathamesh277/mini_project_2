import Nav from './Components/Nav'
import Editor from './Components/Editor'
import Notes from './Components/Notes'
import React from 'react';
import {text} from './Components/Card.js';
import {BrowserRouter as Router,Route} from 'react-router-dom'
function App() {
  return(
    <React.Fragment>
      <Router>
        <Nav/>
        <Route exact path = "/">
          <Editor text={text}/>
        </Route>
        <Route path ="/Notes">
          <Notes/>
        </Route>
      </Router>
    </React.Fragment>
  );
}
export default App;
