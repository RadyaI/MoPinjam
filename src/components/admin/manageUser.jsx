import { collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { db } from "../../firebase";

export default function ManageBuku() {

  const [toggleCard, setToggleCard] = useState(false)
  const [onCloseCard, setOnCloseCard] = useState(false)

  const [search, setSearch] = useState('')
  const [tabelLoading, setTabelLoading] = useState(false)

  const [userData, setUserData] = useState([])
  const [dataForm, setDataForm] = useState({})
  const [newRole, setNewRole] = useState('')
  const [roleUpdated, setRoleUpdated] = useState(false)

  function closeCard() {
    setOnCloseCard(true)
    setTimeout(() => {
      setOnCloseCard(false)
      setToggleCard(false)
    }, 240);
  }

  function getOneUser(id) {
    const data = userData.filter(i => i.id === id)
    setDataForm(data)
  }

  async function getUser() {
    try {
      setTabelLoading(true)
      console.log('Menampilkan Loading')
      const get = await getDocs(query(collection(db, 'users'), orderBy('time', 'asc')))
      const tempData = []
      get.forEach((data) => {
        const user = data.data()
        tempData.push({ ...user, id: data.id })
      })
      setTabelLoading(false)
      console.log('Menghapus Loading')
      setUserData(tempData)
    } catch (error) {
      console.log(error)
      setTabelLoading(false)
    }
  }

  function DisplayUser() {
    let filteredData = userData;

    if (search !== '') {
      filteredData = filteredData.filter(i =>
        i.displayName.toLowerCase().includes(search.toLowerCase()) || i.email.toLowerCase().includes(search.toLowerCase())
      );
    }

    const user = filteredData.map((i, no) =>
      <tr key={no}>
        <td>{no + 1}</td>
        <td>{i.displayName}</td>
        <td>{i.email}</td>
        <td>{i.role}</td>
        <td>
          <button className="btn-edit" onClick={() => { setToggleCard(true); getOneUser(i.id); }}>Edit</button>
          <button className="btn-hapus" onClick={() => deleteUser(i.id)}>Hapus</button>
        </td>
      </tr>
    );

    return user;
  }

  async function updateRole(id) {
    try {
      const alert = await swal({
        icon: 'warning',
        title: 'Yakin ingin mengubah data?',
        dangerMode: true,
        buttons: ['Tidak', 'Iya']
      })
      if (alert) {
        const refData = doc(db, 'users', id)
        await updateDoc(refData, {
          role: newRole
        })
        closeCard()
        setRoleUpdated((prev) => !prev)
        swal({
          icon: 'success',
          button: false,
          timer: 700
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function deleteUser(id) {
    try {
      const alert = await swal({
        icon: 'warning',
        title: 'Ingin menghapus user ini?',
        buttons: ['Tidak', 'Iya'],
        dangerMode: true
      })

      if (alert) {
        const refData = doc(db, 'users', id)
        await deleteDoc(refData)
        const remove = userData.filter(i => i.id !== id)
        setUserData(remove)
        swal({
          icon: 'success',
          title: false,
          buttons: false,
          timer: 1000
        })
      }

    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    getUser()
  }, [roleUpdated])

  return (
    <>
      {toggleCard && (<Form className={`${onCloseCard ? 'close-animation' : ''}`} >
        <div className="formCLose"><i className="bi bi-x-lg close-icon" onClick={() => closeCard()}></i></div>
        <div className="formBody">

          <div className="form-group">
            <label htmlFor="nama" className="form-label">Nama: </label>
            <input type="text" id="nama" className="form-input" placeholder="Masukkan Nama" readOnly value={dataForm[0].displayName} />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email: </label>
            <input type="email" id="email" className="form-input" placeholder="example@gmail.com" readOnly value={dataForm[0].email} />
          </div>
          <div className="form-group">
            <label htmlFor="role" className="form-label">Role: (<b>{dataForm[0].role}</b>) </label>
            <select name="role" id="role" className="form-input" onChange={(e) => setNewRole(e.target.value)}>
              <option value="-">-</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

        </div>
        <div className="formSubmit"><button className="btn-submit" onClick={() => updateRole(dataForm[0].id)}>Submit</button></div>
      </Form>)}
      <Card className={`${toggleCard ? 'blur' : ''}`}>
        <Filter>
          {/* Manage user tidak butuh create button */}
          {/* <button>Create</button> */}
          <input type="text" placeholder="Cari user atau email..." onChange={(e) => setSearch(e.target.value)} />
          {/* <select>
            <option value="terbaru">Terbaru</option>
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select> */}
        </Filter>
        <TabelContainer>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Nama</th>
                <th>Email</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {tabelLoading && (<tr>
                <td>Loading</td>
                <td>Loading</td>
                <td>Loading</td>
                <td>Loading</td>
                <td>Loading</td>
              </tr>)}
              <DisplayUser></DisplayUser>
            </tbody>
          </table>
        </TabelContainer>
      </Card>
    </>
  );
}

const FormToggle = keyframes`
  0%{ 
    width:400px;
    height:500px;
  }
  50%{
    width:410px;
    height:510px;
  }
  100%{
    width:400px;
    height:500px;
  }
`

const closeAnimation = keyframes`
  0%{ 
    width:400px;
    height:500px;
  }
  50%{
    width:410px;
    height:510px;
  }
  100%{
    width:0px;
    height:0px;
  }
`

const Card = styled.div`
  width:100%;
  height:100%;

  &.blur{
    filter:blur(3px);
  }
`;

const Filter = styled.div`
  // border:1px solid green; 
  width:100%;
  height:20%;
  display:flex;
  justify-content:space-around;
  align-items:center;

  button{
    border:none;
    border-radius:50px;
    width:10%;
    height:60%;
    background-color:#222831;
    color:white;
    font-size:15px;
    cursor:pointer;
  }

  input{
    outline:none;
    border:none;
    border-radius:50px;
    background-color:#efefef;
    width:60%;
    height:60%;
    padding:0 20px;
    font-size:15px;
  }

  select{
    border:none;
    border-radius:50px;
    width:10%;
    height:60%;
    background-color:#222831;
    color:white;
    padding:0 10px;
    cursor:pointer;
    appearance:none;
    text-align:center;
    font-size:15px;
  }

  @media only screen and (max-width:700px){
    button{
      width:20%;
    }

    select{
      display:none;
    }
  }
`;

const TabelContainer = styled.div`
  width: 100%;
  height: 80%;
  overflow-y: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }

  th, td {
    padding: 12px 15px;
    text-align: left;
  }

  th {
    background-color: #222831;
    color: white;
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }

  td {
    border-bottom: 1px solid #ddd;
  }

  .btn-edit{
    border:none;
    border-radius:5px 0 0 5px;
    padding:10px 15px;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }
  
  .btn-hapus{
    border:none;
    border-radius:0 5px 5px 0;
    padding:10px 15px;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }

  .btn-edit:hover, .btn-hapus:hover{
    background-color:#2b2f36;
  }
`;

const Form = styled.div`
  width:400px;
  height:500px;
  background-color:#efefef;
  position:absolute;
  z-index:10;
  top:50%;
  left:50%;
  transform:translate(-50%, -50%);
  box-shadow:0.5px 0 1px 0px rgba(0, 0, 0, 0.5);
  border-radius:10px;
  animation:${FormToggle} 0.2s;

  &.close-animation{
    animation:${closeAnimation} 0.3s;
  }

  .formCLose{
    width:100%;
    height:15%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }

  .close-icon{
    margin-right:20px;
    font-size:30px;
    cursor: pointer;
  }

  .formBody{
    width:100%;
    height:70%;
    overflow-y:auto;
  }
  
  .formBody::-webkit-scrollbar{
    width:0px;
  }
  
  .form-group{
    width:90%;
    height:20%;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
    align-items:flex-start;
    margin:0 auto;
    margin-bottom:15px;
  }

  .form-group .form-label{
    font-weight:bold;
  }

  .form-group .form-input{
    border:none;
    outline:none;
    width:90%;
    height:35px;
    padding:0 10px;
    font-size:15px;
    border-radius:5px;
    background-color:white;
  }

  .formSubmit{
    width:100%;
    height:15%;
    display:flex;
    justify-content:flex-end;
    align-items:center;
  }

  .btn-submit{
    margin-right:20px;
    border:none;
    border-radius:5px;
    padding:10px 25px;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }
`