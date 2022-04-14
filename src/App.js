import { useState } from "react";
import Menu from './component/Menu'
import './App.css'
import './assets/style.css'
import './assets/table.css'
import './assets/alert.css'
import './assets/menu.css'
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Dashboard from './component/dashboard'
import LoginForm from './component/loginForm'
import CrudGuru from './crud/crudGuru'
import CrudKelas from './crud/crudKelas'
import CrudSekolah from './crud/crudSekolah'


function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // User Login info
  const database = [
    {
      username: "user1",
      password: "pass1"
    },
    {
      username: "user2",
      password: "pass2"
    }
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };

  const handleSubmit = (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
  <Router >
    <div className="app-header">
      <Menu />
    </div>
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? 
          
            <Switch>
              <div className="app-content">
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/dataSekolah" exact component={CrudSekolah} />
                <Route path="/dataGuru" exact component={CrudGuru} />
                <Route path="/dataKelas" exact component={CrudKelas} />
              </div>
            </Switch>
           : renderForm
          }
      </div>
    </div>
    </Router>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;