import React, { Component } from 'react';
 
class tableKelas extends Component {
 
    render() {
        const prmData = this.props.data;
        return (
            <tr className='content'>
                <td>{prmData._id}</td>
                <td>{prmData.nama_kelas}</td>     
                <td>{prmData.katagori}</td>
                <td>{prmData.jurusan}</td>
                <td>{prmData.id_sekolah}</td>
                <td>{prmData.id_wali}</td>
                <td>
                    <button className="my-button btn-yellow" onClick={() => this.props.update(prmData)} >Edit</button>
                    <button className="my-button btn-red" onClick={() => this.props.remove(prmData._id)} >Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default tableKelas;