import { useEffect, useState } from 'react'
import './assets/semuabuku.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

export default function Semuabuku() {

    const [search, setSearch] = useState(null)
    const [filter, setFilter] = useState('Terbaru')

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
                </div>
            </div>
        </>
    )
}