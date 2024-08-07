import './assets/semuabuku.css'
import Navbar from './components/navbar'

export default function Semuabuku() {
    return (
        <>
            <Navbar></Navbar>
            <div className="buku-container">
                <div className="content"></div>
            </div>
        </>
    )
}