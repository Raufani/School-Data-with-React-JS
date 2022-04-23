import React, { Component } from 'react';
import TableKelas from '../component/tableLlist/tableKelas'
import Alert from '../component/alert/Alert'
 
//const apiURLKelas = "http://localhost:3005/kelas/"
 
class CrudKelas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataUser: [],       
            totalData: 0,       
            isUpdate: false,    
            Notif: {            
                alertShow: false,
                actionType: '',
                responCode: 0,
            },
            DataUserNew: {     
                nama_kelas: '',
                katagori: '',
                jurusan: '',
                id_sekolah: '',
                id_wali: '',
            },
        }
    }
 
    componentDidMount() {
        this.GetdataUsers()
    }
 
    GetdataUsers() {
        fetch('/kelas').then(res => {
            if (res.status === 200)
                return res.json()
            else
                return <p>No data Found</p>
        }).then(resdata => {
            console.log(resdata)
            this.setState({
                dataUser: resdata,
                totalData: resdata.length
            })
        })
    }

    SaveNewDataUSer = () => {
        const Newdata = this.state.DataUserNew;
 
        fetch('/kelas', {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Newdata)
        }).then((res) => {
            console.log(res)
            console.log("Status Create", res.status)
            this.setState({
                Notif: {
                    alertShow: true,
                    actionType: 'created',
                    responCode: res.status,
                }
            })
 
            this.GetdataUsers()
            this.ClearForm()
        });
    }

    UpdateDataUser = () => {
        const dataUpdate = this.state.DataUserNew;
        const id = dataUpdate._id;
 
        fetch('/kelas/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        }).then((res) => {
            console.log(res)
            console.log("Status Update", res.status)
 
            // Untuk Tampung respon Dari Server
            this.setState({
                Notif: {
                    alertShow: true,
                    actionType: 'updated',
                    responCode: res.status,
                }
            })
 
            this.GetdataUsers()
            this.ClearForm()
        });
    }

    DeleteDataUser = (data) => {
        const id = data;
        
        fetch('/kelas/' + id, {
            method: 'DELETE',
        }).then((res) => {
            console.log(res)
            console.log("Status Delete", res.status)
 
            this.setState({
                Notif: {
                    alertShow: true,
                    actionType: 'deleted',
                    responCode: res.status,
                }
            })
 
            this.GetdataUsers()
            this.ClearForm()
        });
 
    }

    HendelOnchange = (event) => {
        let prmInputUser = { ...this.state.DataUserNew }; 
        prmInputUser[event.target.name] = event.target.value;
        this.setState({
            DataUserNew: prmInputUser
        })
 
    }

    ClearForm = () => {
        this.setState({
            isUpdate: false,
            DataUserNew: {
                id: '',
                nama_kelas: '',
                katagori: '',
                Jurusan: '',
                id_sekolah: '',
                id_wali: '',
                
            }
        })
 
        setInterval(() => {
            this.setState({
                Notif: {
                    alertShow: false,
                    actionType: '',
                    responCode: 0,
                }
            })
        }, 4500);
    }

    HandleSave = () => {
        if (this.state.isUpdate) {
            this.UpdateDataUser();
        } else {
            this.SaveNewDataUSer();
        }
    }


    HendelUpdate = (data) => {
        console.log('Update id', data.id);
        console.log('Update arry', data);
        this.setState({
            DataUserNew: data,
            isUpdate: true
        })
    }

    HendelDelete = (data) => {
        console.log('Id delete =', data)
        const id = data;
 
        if (window.confirm('Apakah anda akan menghapus data ' + id + ' ?')) {
            this.DeleteDataUser(id)
        }
    }
 
    render() {
 
        return (
            <div className="card">
                 <div className="Titel">
                    Data Kelas 2021
                </div>
                

                <div className="container">
                    <Alert data={this.state.Notif} />
                    <div className="titel">
                        <div className="form-inline" >
                            <label htmlFor="nama_kelas">Nama Kelas:</label>
                            <input type="text" id="nama_kelas" placeholder="Nama Kelas" name="nama_kelas" onChange={this.HendelOnchange} value={this.state.DataUserNew.nama_kelas} />
                            <label htmlFor="katagori">Label Kelas:</label>
                            <input type="text" id="katagori" placeholder="Label Kelas" name="katagori" onChange={this.HendelOnchange} value={this.state.DataUserNew.katagori} />
                            <label htmlFor="alamat">jurusan:</label>
                            <input type="text" id="jurusan" placeholder="Jurusan" name="jurusan" onChange={this.HendelOnchange} value={this.state.DataUserNew.jurusan} />
                            <label htmlFor="alamat">ID Sekolah:</label>
                            <input type="text" id="id_sekolah" placeholder="ID Sekolah" name="id_sekolah" onChange={this.HendelOnchange} value={this.state.DataUserNew.id_sekolah} />
                            <label htmlFor="telepon">ID Wali Kelas:</label>
                            <input type="text" id="id_wali" placeholder="ID Wali Kelas" name="id_wali" onChange={this.HendelOnchange} value={this.state.DataUserNew.id_wali} />
                            <button className="my-button btn-blue" onClick={this.HandleSave} >Simpan</button>
                        </div>
                    </div>
                </div>
 
                <div className="container">
                    <div className="my-table" >
                        <div className='content'>Total data {this.state.totalData} record</div>
                        <table>
                            <thead className='thead'>
                                <tr>
                                    <th>#ID</th>
                                    <th>Nama Kelas</th>
                                    <th>Label</th>
                                    <th>jurusan</th>
                                    <th>ID Sekolah</th>
                                    <th>ID Wali</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                    this.state.dataUser.map(dataUser => {
                                        return (
                                            <TableKelas key={dataUser.id}
                                                data={dataUser}
                                                update={this.HendelUpdate} 
                                                remove={this.HendelDelete}
                                            />
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}


 
export default CrudKelas;