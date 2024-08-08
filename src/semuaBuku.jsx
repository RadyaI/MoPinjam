import './assets/semuabuku.css'
import Navbar from './components/navbar'
import Sidebar from './components/sidebar'

export default function Semuabuku() {
    return (
        <>
            <Navbar></Navbar>
            <div className="buku-container">
                <Sidebar></Sidebar>
                <div className="content"></div>
            </div>
        </>
    )
}