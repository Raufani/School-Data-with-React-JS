import React, { Component } from 'react';
 
class tableKelas extends Component {
 
    render() {
        const prmData = this.props.data;
        return (
            <tr>
                <td>{prmData.id}</td>
                <td>{prmData.nama_kelas}</td>     
                <td>{prmData.rank_kelas}</td>
                <td>{prmData.jurusan}</td>
                <td>{prmData.id_sekolah}</td>
                <td>{prmData.id_wali}</td>
                <td>
                    <button className="my-button btn-yellow" onClick={() => this.props.update(prmData)} >Edit</button>
                    <button className="my-button btn-red" onClick={() => this.props.remove(prmData.id)} >Delete</button>
                </td>
            </tr>
        );
    }
}
 
export default tableKelas;