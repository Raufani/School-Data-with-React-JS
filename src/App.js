import React, { useState, useEffect } from "react";
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
import axios from "axios";


function App() {
  
  const [isLoading, setIsLoading] = useState(false);
  

  useEffect(() => {
    // declare the data fetching function
    
    const fetchData = async () => {
      localStorage.setItem("name", JSON.stringify('false'));
      setIsLoading(true);
      const data = await fetch('/user/login',{
          method: "post",
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
        }
      ).then(
          res => {
            if (res.ok){
              
              setIsLoading(false);
              return localStorage.setItem("name", JSON.stringify('true'));
            }
            else
            
               return <p>Please Login First</p>
          }
      )
      
      
    }
    
    
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])

  

  return (

    <React.Fragment>
      {isLoading ? (
        <div className="container">
          <div className="display-middle">
            <h1>Loading ...</h1>
            
            
          </div>
          
        </div>
        
      ) : (
        
        <Router >
      <div className="app-header">
        <Menu />
      </div>
      <div className="app">
          {
          //localStorage.getItem("test") ? 
          //isSubmitted ? 
            <Switch>
              {
            
                <div className="app-content">
                  
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/dataSekolah" exact component={CrudSekolah} />
                  <Route path="/dataGuru" exact component={CrudGuru} />
                  <Route path="/dataKelas" exact component={CrudKelas} />
                </div>
                
              }
            </Switch>
          }
      
    </div>
    </Router>



      )}
    </React.Fragment>

    
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
export default App;