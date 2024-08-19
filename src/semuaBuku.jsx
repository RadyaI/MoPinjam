import { useEffect, useState } from 'react' 
import './assets/semuabuku.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'
import dataBuku from './db/databuku.json'

export default function Semuabuku() {

    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState('Terbaru')

    const [book, setBook] = useState(dataBuku.Data);


    function BookList() {

        let filteredBook = book
        if (search !== '') {
            filteredBook = book.filter(i => i.title.toLowerCase().includes(search.toLowerCase()) || i.author.toLowerCase().includes(search.toLowerCase()))
        }
        const data = filteredBook.map((i, index) =>
            <div className="card" key={index}>
                <div className="img-cover"><img loading='lazy' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="Buku" /></div>
                <div className="desc">
                    <div className="author"><small>{i.author}</small></div>
                    <div className="title">{i.title}</div>
                </div>
            </div>
        )
        return data
    }


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