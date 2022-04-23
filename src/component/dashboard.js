import React from 'react';
import { Link } from "react-router-dom";

function Dashboard(props){
    const removeUserSession = () => {
        sessionStorage.removeItem('session-id');
    }

    const handleLogout = () => {
        removeUserSession();
        props.history.push('/');
      }


    return(
        <div className="card-center">
                
            <div className="Titel text-white">
                Selamat datang kembali
            </div>
            <div className='Container'>
                <div className='center'>
                    <button className="my-button btn-blue vertical-center"  onClick={handleLogout}>Logout</button>
                </div>
            </div>
                
                
        </div>
    )
    
}

export default Dashboard;