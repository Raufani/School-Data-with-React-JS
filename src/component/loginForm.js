
import React, { Component } from 'react';
import App from '../App.js'
import '../App.css'
import '../assets/style.css'
class LoginForm extends Component{
    login = (e) => {
        e.preventDefault();
        //const Newdata = this.state.DataUserNew;
        fetch('//localhost:4000/user/login', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            
        }).then((res) => {
            console.log(res);
            console.log("Status Create", res.status);
            localStorage.setItem("test", JSON.stringify(true));
        });
      }
    render(){
        return(
            <div className="card-center">
            <div className="title">Sign In</div>
            <form action='//localhost:4000/user/login' method='post'>
              <div className="input-container">
                <label>Username </label>
                <input type="text" name="username" required />
              </div>

              <div className="input-container">
                <label>Password </label>
                <input type="password" name="password" required />
              </div>

                <div className='center'>
                    <button className="my-button btn-yellow" type="submit" > Registration </button> 
                </div>
              
            </form>

            <form action='//localhost:4000/user/login' method='post'>
                <div className='center'>
                    <button className="my-button container-center btn-blue " type="submit" > Login </button>
                </div>   
            </form>
            
            
          </div>
        )
    }
}

export default LoginForm;