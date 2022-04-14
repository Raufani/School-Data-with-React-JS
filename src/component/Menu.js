import React, { Component } from 'react';
import { Link } from "react-router-dom";
import '../assets/menu.css';
 
class Menu extends Component {
    render() {
        return (
            <div>
                <header className="header">
                    <a href="./" className="logo">Data SMK</a>
                    <input className="menu-btn" type="checkbox" id="menu-btn" />
                    <label className="menu-icon" for="menu-btn"><span className="navicon"></span></label>
                    <ul className="menu">
                        <li><Link to="/dashboard">Laman Utama</Link></li>
                        <li><Link to="/dataSekolah">Daftar Sekolah</Link></li>
                        <li><Link to="/dataGuru">Data Guru</Link></li>
                        <li><Link to="/dataKelas">Data Kelas 2021</Link></li>
                    </ul>
                </header>
            </div>
        );
    }
}
 
export default Menu;
