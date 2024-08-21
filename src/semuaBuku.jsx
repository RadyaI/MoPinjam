import { useEffect, useState } from 'react'
import './assets/semuabuku.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import dataBuku from './db/databuku.json'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from './firebase'

export default function Semuabuku() {

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Terbaru')

    const [book, setBook] = useState([]);


    function BookList() {

        let filteredBook = book
        if (search !== '') {
            filteredBook = book.filter(i => i.judul.toLowerCase().includes(search.toLowerCase()) || i.penulis.toLowerCase().includes(search.toLowerCase()))
        }
        const data = filteredBook.map((i, index) =>
            <div className="card" key={index}>
                <div className="img-cover"><img loading='lazy' width="160" height="200" src={i.gambar} alt="Buku" /></div>
                <div className="desc">
                    <div className="author"><small>{i.penulis}</small></div>
                    <div className="title">{i.judul}</div>
                </div>
            </div>
        )
        return data
    }

    async function getBuku() {
        try {
            const get = await getDocs(query(collection(db, 'buku'), orderBy('time', 'asc')))
            let tempData = []
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })
            setBook(tempData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBuku()
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <div className="buku-container">
                <Sidebar></Sidebar>
                <div className="content">
                    <div className="filter">
                        <input type="text" placeholder='Cari judul atau penulis...' onChange={(e) => setSearch(e.target.value)} />
                        <select onChange={(e) => setFilter(e.target.value)}>
                            <option value="terbaru">Terbaru</option>
                            <option value="tersedia">Tersedia</option>
                        </select>
                    </div>
                    <div className="buku-data">

                        <BookList></BookList>

                    </div>
                </div>
            </div>
        </>
    )
}