import React, { Component } from 'react';
 
class tableGuru extends Component {
 
    render() {
        const prmData = this.props.data;
        return (
            <tr >
                <td>{prmData.id}</td>
                <td>{prmData.nama_guru}</td>
                
                <td>{prmData.alamat}</td>
                <td>{prmData.email}</td>
                <td>{prmData.telepon}</td>
                <td>{prmData.id_sekolah}</td>
                <td>
                    <button className="my-button btn-yellow" onClick={() => this.props.update(prmData)} >Edit</button>
                    <button className="my-button btn-red" onClick={() => this.props.remove(prmData.id)} >Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default tableGuru;