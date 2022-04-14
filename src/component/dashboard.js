import React, { Component } from 'react';

class Dashboard extends Component{
    render(){
        return(
            <div className="card">
                    
                    <div className="Titel">
                        Selamat datang kembali
                    </div>
                    <div className='Container'>
                        <div className='center'>
                            <button className="my-button btn-blue vertical-center" >Logout</button>
                        </div>
                    </div>
                    
                    
            </div>
        )
    }
}

export default Dashboard;