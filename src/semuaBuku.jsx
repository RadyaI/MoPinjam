import { useEffect, useState } from 'react'
import './assets/semuabuku.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

export default function Semuabuku() {

    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState('Terbaru')

    const book = [
        { author: 'Fulan', title: 'How to basic' },
        { author: 'Fulan', title: 'How to basic' },
    ]

    function BookList() {
        const data = book.map(i =>
            <div className="card">
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
                        <input type="text" placeholder='Cari buku...' onChange={(e) => setSearch(e.target.value)} />
                        <select onChange={(e) => setFilter(e.target.value)}>
                            <option value="terbaru">Terbaru</option>
                            <option value="tersedia">Tersedia</option>
                        </select>
                    </div>
                    <div className="buku-data">

                        {/* <div className="card">
                            <div className="img-cover"><img loading='lazy' src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="Buku" /></div>
                            <div className="desc">
                                <div className="author"><small>My Name Here</small></div>
                                <div className="title">Secrets in a silicon valley startup</div>
                            </div>
                        </div> */}

                        <BookList></BookList>

                    </div>
                </div>
            </div>
        </>
    )
}