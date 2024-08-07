import { useState } from 'react'
import './assets/dashboard.css'
import Navbar from './components/navbar'


export default function Dashboard() {

  const [search, setsearch] = useState(false)
  const [input, setInput] = useState(null)
  const [placeholder, setPlaceholder] = useState('Cari buku yang kamu inginkan...')
  const [sambutan, setSambutan] = useState('Selamat Datang di DigiPerpus')

  function animateCard(e) {
    if (e.key === "Enter" && input) {
      setsearch(true)
      setPlaceholder('Cari buku yang kamu inginkan...')
      setSambutan('')
    }
  }

  function searchBook() {
    if (input === null || input === '') {
      console.log('belum mencari')
      setPlaceholder('Harap diisi...')
    } else {
      console.log('mencari')
      setPlaceholder('Cari buku yang kamu inginkan...')
      setsearch(true)
      setSambutan('')
    }
  }

  return (
    <>
      <Navbar />
      <div className={`home ${search ? 'home-animate' : ''}`}>
        <div className={`card ${search ? 'card-animate' : ''}`}>
          <h2>{sambutan}</h2>
          <div className="search">
            <input type="text" placeholder={placeholder} onKeyUp={(e) => animateCard(e)} onChange={(e) => setInput(e.target.value)} />
            <button onClick={searchBook}>CARI</button>
          </div>
        </div>
      </div>
      {search === true && (
        <div className="data" id='book'>
          <div className="card-container">

            <div className="card">
              <div className="img-cover"><img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="Buku" /></div>
              <div className="desc"></div>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
