import React, { Component } from 'react';
import TableSekolah from '../component/tableLlist/tableSekolah'
import Alert from '../component/alert/Alert'
 
const apiURLSekolah = "http://localhost:3005/Sekolah/"
 
class CrudSekolah extends Component {
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
                id: 1,
                nama_sekolah: '',
                alamat: '',
                email: '',
                telepon: '',
                gambar: '',
            }
        }
    }
 
    componentDidMount() {
        this.GetdataUsers()
    }
 
    GetdataUsers() {
        fetch(apiURLSekolah).then(res => {
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
 
        fetch(apiURLSekolah, {
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
        const id = dataUpdate.id;
 
        fetch(apiURLSekolah + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataUpdate)
        }).then((res) => {
            console.log(res)
            console.log("Status Update", res.status)
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
        
        fetch(apiURLSekolah + id, {
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
        const NumberingId = this.state.totalData + 1; 
        let prmInputUser = { ...this.state.DataUserNew }; 
        if (!this.state.isUpdate) { 
            prmInputUser['id'] = NumberingId;
        }
        prmInputUser[event.target.name] = event.target.value;
        this.setState({
            DataUserNew: prmInputUser
        })
 
    }

    ClearForm = () => {
        this.setState({
            isUpdate: false,
            DataUserNew: {
                id: 1,
                nama_sekolah: '',
                email: '',
                telepon: '',
                gambar: ''
                
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
                    Daftar Sekolah 2021
                </div>
                

                <div className="container">
                    <Alert data={this.state.Notif} />
                    <div className="titel">
                        <div className="form-inline" >
                            <label htmlFor="nama_sekolah">Nama:</label>
                            <input type="text" id="nama_sekolah" placeholder="Nama" name="nama_sekolah" onChange={this.HendelOnchange} value={this.state.DataUserNew.nama_guru} />
                            
                            <label htmlFor="alamat">Alamat:</label>
                            <input type="text" id="alamat" placeholder="Alamat" name="alamat" onChange={this.HendelOnchange} value={this.state.DataUserNew.alamat} />
                            <label htmlFor="alamat">Email:</label>
                            <input type="text" id="email" placeholder="Email" name="email" onChange={this.HendelOnchange} value={this.state.DataUserNew.email} />
                            <label htmlFor="telepon">Telpon:</label>
                            <input type="text" id="telepon" placeholder="No.Telepon" name="telepon" onChange={this.HendelOnchange} value={this.state.DataUserNew.telepon} />
                            <label htmlFor="alamat">Foto Sekolah:</label>
                            <input type="file" id="gambar" name="gambar" accept="image/*" />
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
                                    <th>Gambar</th>
                                    <th>Nama Sekolah</th>
                                    <th>Alamat</th>
                                    <th>Email</th>
                                    <th>Telepon</th>
                                    <th>Options</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.dataUser.map(dataUser => {
                                        return (
                                            <TableSekolah key={dataUser.id}
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


 
export default CrudSekolah;