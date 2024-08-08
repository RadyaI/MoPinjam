import { useState } from 'react'
import '../assets/sidebar.css'

export default function Sidebar() {

    const [selectedOption, setSelectedOption] = useState('semua')
    const [basicFilter, setBasicFilter] = useState('terbaru')

    return (
        <>
            <div className="sidebar">
                <div className="card">
                    <div className="filter">
                        <h2>Filter</h2>
                        <div className="basic-filter">
                            <select value={basicFilter} onChange={(e) => setBasicFilter(e.target.value)}>
                                <option value="terbaru">Terbaru</option>
                                <option value="tersedia">Tersedia</option>
                            </select>
                        </div>
                        <div className="stok">
                            <p>Filter berdasarkan stok</p>
                            <div className="input">
                                <div className="tersedia">
                                    <input
                                        type="radio"
                                        value="tersedia"
                                        checked={selectedOption === 'tersedia'}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    <label>Tersedia</label>
                                </div>
                                <div className="semua">
                                    <input
                                        type="radio"
                                        value="semua"
                                        checked={selectedOption === 'semua'}
                                        onChange={(e) => setSelectedOption(e.target.value)}
                                    />
                                    <label>Semua</label>
                                </div>
                            </div>
                        </div>
                        <div className="kategori">
                            <p>Kategori</p>
                            <ul>
                                <li>Buku Sekolah</li>
                                <li>Teknologi</li>
                                <li>Makanan/Minuman</li>
                                <li>Komik</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
