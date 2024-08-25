import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'

import './assets/dashboard.css'
import Navbar from './components/navbar'
import { collection, getDocs, query } from 'firebase/firestore'
import { db } from './config/firebase'
import { useNavigate } from 'react-router-dom'


export default function Dashboard() {

  const route = useNavigate()
  const [search, setsearch] = useState(false)
  const [buttonText, setButtonText] = useState('CARI')

  const [input, setInput] = useState(null)
  const [placeholder, setPlaceholder] = useState('Cari buku yang kamu inginkan...')
  const [sambutan, setSambutan] = useState('Selamat Datang di MoPinjam')

  const [bukuData, setBukuData] = useState([])

  function animateCard(e) {
    if (e.key === "Enter" && input) {
      setButtonText('Loading...')
      getBuku()
      setTimeout(() => {
        setsearch(true)
        setPlaceholder('Cari buku yang kamu inginkan...')
        setSambutan('')
        setButtonText('CARI')
      }, 1500);
    }
  }

  function searchBook() {
    setButtonText('Loading...')
    if (input === null || input === '') {
      setPlaceholder('Harap diisi...')
      setButtonText('CARI')
    } else {
      getBuku()
      setTimeout(() => {
        setPlaceholder('Cari buku yang kamu inginkan...')
        setsearch(true)
        setSambutan('')
        setButtonText('CARI')
      }, 1500);
    }
  }

  function goToDetail(judul) {
    route(`buku/d/${judul}`)
  }

  function DisplayBuku() {
    try {
      const data = bukuData.filter(i => i.judul.toLowerCase().includes(input.toLowerCase()) || i.penulis.toLowerCase().includes(input.toLowerCase()))

      const card = data.map((i, index) =>
        <div className="card" key={index} onClick={() => goToDetail(i.judul)}>
          <div className="img-cover"><img loading='lazy' src={i.gambar} alt="Buku" /></div>
          <div className="desc">
            <div className="author"><small>{i.penulis}</small></div>
            <div className="title">{i.judul}</div>
          </div>
        </div>
      )

      return card

    } catch (error) {
      console.log(error)
    }
  }

  async function getBuku() {
    try {
      const get = await getDocs(collection(db, 'buku'))
      let tempData = []
      get.forEach((data) => {
        tempData.push({ ...data.data(), id: data.id })
      })
      setBukuData(tempData)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const development = import.meta.env.VITE_DEV === "true" || false
    if (development) {
      Cookies.set('isLoggedIn', true)
      Cookies.set('LoginData', JSON.stringify({ displayName: 'Admin' }))
    }

    const login = Cookies.get('isLoggedIn') == 'true' || false
    const loginData = login && Cookies.get('loginData') ? JSON.parse(Cookies.get('loginData')).displayName : false
    if (login) {
      setSambutan(`Halo ${loginData}`)
    }

  }, [])

  return (
    <>
      <Navbar />
      <div className={`home ${search ? 'home-animate' : ''}`}>
        <div className="circle"></div>
        <div className={`card ${search ? 'card-animate' : ''}`}>
          <h2>{sambutan}</h2>
          <div className="search">
            <input type="text" placeholder={placeholder} onKeyUp={(e) => animateCard(e)} onChange={(e) => setInput(e.target.value)} />
            <button onClick={searchBook}>{buttonText}</button>
          </div>
        </div>
      </div>
      {search === true && (
        <div className="data" id='book'>
          <div className="card-container">

            <DisplayBuku></DisplayBuku>

          </div>
        </div>
      )}
    </>
  )
}
