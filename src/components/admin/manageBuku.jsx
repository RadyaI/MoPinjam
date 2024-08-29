import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, Timestamp, updateDoc } from "firebase/firestore";

import { db, storage } from "../../config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function ManageBuku() {

  const [toggleCard, setToggleCard] = useState(false)
  const [onCloseCard, setOnCloseCard] = useState(false)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')
  const [tabelLoading, setTabelLoading] = useState(false)

  const [bukuData, setbukuData] = useState([])
  const [typeForm, setTypeForm] = useState('')
  const [updateButtonText, setUpdateButtonText] = useState('UPDATE')
  const [createButtonText, setCreateButtonText] = useState('CREATE')
  const [dataForm, setDataForm] = useState({
    judul: '',
    penulis: '',
    deskripsi: '',
    bahasa: 'Indonesia',
    jumlah_halaman: 0
  })
  const [file, setFile] = useState(null)

  function closeCard() {
    setOnCloseCard(true)
    setTimeout(() => {
      const form = [{}]

      setDataForm(form)
      setOnCloseCard(false)
      setToggleCard(false)
    }, 240);
  }

  function formHandle(e) {
    const name = e.target.name
    const value = e.target.value
    setDataForm({
      ...dataForm,
      [name]: value
    })
  }

  function fileHandle(e) {
    setFile(e.target.files[0])
  }

  function DisplayBuku() {
    let filteredData = bukuData;

    if (search) {
      filteredData = filteredData.filter(i => i.judul.toLowerCase().includes(search.toLowerCase()) || i.penulis.toLowerCase().includes(search.toLowerCase()))
    }
    if (filter === 'tersedia') {
      filteredData = filteredData.filter(i => i.dipinjam === false)
    } else if (filter === 'dipinjam') {
      filteredData = filteredData.filter(i => i.dipinjam === true)
    }

    const buku = filteredData.map((i, no) =>
      <tr key={no}>
        <td>{no + 1}</td>
        <td>{i.judul}</td>
        <td>{i.penulis}</td>
        <td>{i.bahasa}</td>
        <td>{i.jumlah_dipinjam}</td>
        <td><img src={i.gambar} alt={i.judul} width="160" height="200" loading="lazy" /></td>
        <td>
          <button className="btn-edit" onClick={() => { setToggleCard(true); getOneBuku(i.id); setTypeForm('edit') }}>Edit</button>
          <button className="btn-hapus" onClick={() => deleteBuku(i.id)}>Hapus</button>
        </td>
      </tr>
    );

    return buku;
  }

  async function getBuku() {
    try {
      setTabelLoading(true)
      onSnapshot(query(collection(db, 'buku'), orderBy('time', 'desc')), snapshot => {
        const tempData = []
        snapshot.forEach((data) => {
          tempData.push({ ...data.data(), id: data.id })
        })
        setbukuData(tempData)
      })
      setTimeout(() => {
        setTabelLoading(false)
      }, 500);
    } catch (error) {
      console.log(error)
      setTabelLoading(false)
    }
  }

  async function getOneBuku(id) {
    try {
      const refDoc = doc(db, 'buku', id)
      const data = await getDoc(refDoc)
      setDataForm({ ...data.data(), id: data.id })

    } catch (error) {
      console.log(error)
    }
  }

  async function postBuku() {
    try {
      const alert = await swal({
        icon: 'warning',
        title: 'Apakah data sudah benar?',
        buttons: ['Belum', 'Sudah']
      })
      if (alert) {
        setCreateButtonText('Loading..')
        const storageRef = ref(storage, `buku/${file.name}`)
        await uploadBytes(storageRef, file)
        const getLink = await getDownloadURL(storageRef)

        await addDoc(collection(db, "buku"), {
          ...dataForm,
          gambar: getLink,
          jumlah_dipinjam: 0,
          dipinjam: false,
          time: Timestamp.now().toMillis()
        })

        setCreateButtonText('CREATE')
        swal({
          icon: 'success',
          title: 'Berhasil upload buku',
          button: false,
          timer: 1200
        })
        setFile(null)
        closeCard()
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function updateBuku(id) {
    let gambar = dataForm.gambar
    setUpdateButtonText('Loading..')
    if (file) {
      const storageRef = ref(storage, `buku/${file.name}`)
      await uploadBytes(storageRef, file)
      gambar = await getDownloadURL(storageRef)
    }
    const docRef = doc(db, 'buku', id)
    await updateDoc(docRef, {
      ...dataForm,
      gambar
    })
    setUpdateButtonText('UPDATE')
    swal({
      icon: 'success',
      title: 'Berhasil ubah data buku',
      button: false,
      timer: 1200
    })
    setToggleCard(false)
  }

  async function deleteBuku(id) {
    try {
      const alert = await swal({
        icon: 'warning',
        title: 'Ingin menghapus buku ini?',
        buttons: ['Tidak', 'Iya'],
        dangerMode: true
      })
      if (alert) {
        const docRef = doc(db, 'buku', id)
        await deleteDoc(docRef)
        swal({
          icon: 'success',
          title: false,
          button: false,
          timer: 800
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBuku()
  }, [])

  return (
    <>
      {toggleCard && (<Form className={`${onCloseCard ? 'close-animation' : ''}`} >
        <div className="formCLose"><i className="bi bi-x-lg close-icon" onClick={() => closeCard()}></i></div>
        <div className="formBody">

          <div className="form-group">
            <label htmlFor="judul" className="form-label">Judul: </label>
            <input type="text" name="judul" id="judul" className="form-input" placeholder="Masukkan judul" autoComplete="off" value={dataForm.judul} onChange={(e) => formHandle(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="penulis" className="form-label">Penulis: </label>
            <input type="text" name="penulis" id="penulis" className="form-input" placeholder="Jhon Doe" autoComplete="off" value={dataForm.penulis} onChange={(e) => formHandle(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="deskripsi" className="form-label">Deskripsi: </label>
            <input type="text" name="deskripsi" className="form-input" autoComplete="off" value={dataForm.deskripsi} onChange={(e) => formHandle(e)} />
          </div>
          <div className="form-group">
            <label htmlFor="bahasa" className="form-label">Bahasa: ({dataForm.bahasa}) </label>
            <select name="bahasa" id="bahasa" className="form-input" onChange={(e) => formHandle(e)}>
              <option value="-">-</option>
              <option value="Arabic">Arabic</option>
              <option value="Bengali">Bengali</option>
              <option value="Bulgarian">Bulgarian</option>
              <option value="Catalan">Catalan</option>
              <option value="Chinese">Chinese</option>
              <option value="Croatian">Croatian</option>
              <option value="Czech">Czech</option>
              <option value="Danish">Danish</option>
              <option value="Dutch">Dutch</option>
              <option value="English">English</option>
              <option value="Estonian">Estonian</option>
              <option value="Filipino">Filipino</option>
              <option value="Finnish">Finnish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Greek">Greek</option>
              <option value="Hebrew">Hebrew</option>
              <option value="Hindi">Hindi</option>
              <option value="Hungarian">Hungarian</option>
              <option value="Icelandic">Icelandic</option>
              <option value="Indonesian">Indonesian</option>
              <option value="Italian">Italian</option>
              <option value="Japanese">Japanese</option>
              <option value="Korean">Korean</option>
              <option value="Latvian">Latvian</option>
              <option value="Lithuanian">Lithuanian</option>
              <option value="Malay">Malay</option>
              <option value="Norwegian">Norwegian</option>
              <option value="Persian">Persian</option>
              <option value="Polish">Polish</option>
              <option value="Portuguese">Portuguese</option>
              <option value="Romanian">Romanian</option>
              <option value="Russian">Russian</option>
              <option value="Serbian">Serbian</option>
              <option value="Slovak">Slovak</option>
              <option value="Slovenian">Slovenian</option>
              <option value="Spanish">Spanish</option>
              <option value="Swedish">Swedish</option>
              <option value="Thai">Thai</option>
              <option value="Turkish">Turkish</option>
              <option value="Ukrainian">Ukrainian</option>
              <option value="Urdu">Urdu</option>
              <option value="Vietnamese">Vietnamese</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="jumlah_halaman" className="form-label">Jumlah halaman: </label>
            <input type="number" name="jumlah_halaman" className="form-input" value={dataForm.jumlah_halaman} onChange={(e) => formHandle(e)} />
          </div>
          <div className="form-group">
            <input type="file" className="form-input file" onChange={(e) => fileHandle(e)} />
          </div>
        </div>
        <div className="formSubmit">
          {typeForm === 'create' && (<button className="btn-submit" onClick={() => postBuku()}>{createButtonText}</button>)}
          {typeForm === 'edit' && (<button className="btn-submit" onClick={() => updateBuku(dataForm.id)}>{updateButtonText}</button>)}
        </div>
      </Form>)}
      <Card className={`${toggleCard ? 'blur' : ''}`}>
        <Filter>
          {/* Manage user tidak butuh create button */}
          <button onClick={() => { setToggleCard(true); setTypeForm('create') }}>Create</button>
          <input type="text" placeholder="Cari buku atau penulis..." onChange={(e) => setSearch(e.target.value)} />
          <select onChange={(e) => setFilter(e.target.value)}>
            <option value="">Terbaru</option>
            <option value="tersedia">Tersedia</option>
            <option value="dipinjam">Dipinjam</option>
          </select>
        </Filter>
        <TabelContainer>
          <table>
            <thead>
              <tr>
                <th>No</th>
                <th>Judul</th>
                <th>Penulis</th>
                <th>Bahasa</th>
                <th>Jumlah Dipinjam</th>
                <th>Gambar</th>
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
                <td>Loading</td>
                <td>Loading</td>
              </tr>)}
              <DisplayBuku></DisplayBuku>
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
  width: 95%;
  height: 80%;
  overflow-y: auto;
  margin:0 auto;
  
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
  .form-group .file{
    display:flex;
    justify-content:center;
    align-items:center;
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