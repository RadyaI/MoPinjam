import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Cookies from "js-cookie"

import Navbar from "../components/navbar"

import { db } from "../config/firebase"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

export default function Peminjaman() {

    const [selected, setSelected] = useState('pinjam')
    const [popup, setPopup] = useState(false)
    const [search, setSearch] = useState('')

    const [peminjamanData, setPeminjamanData] = useState([])
    const [idPeminjaman, setIdPeminjaman] = useState(123)

    function closePopUp() {
        if (popup) {
            setPopup(false)
        }
    }

    function BukuPinjam() {

        let filtered = peminjamanData

        if (search !== '') {
            filtered = filtered.filter(i => i.judul.toLowerCase().includes(search.toLowerCase()))
        }

        const card = filtered.map((i, index) =>
            <div className="card" key={index} onClick={() => { setPopup(true); setIdPeminjaman(i.id_pinjam); }}>
                <div className="img"><img src={i.gambar} alt={i.judul} loading="lazy" /></div>
                <div className="body">
                    <div className="desc">
                        <div className="author"><small>{i.penulis}</small></div>
                        <div className="title">{i.judul}</div>
                    </div>
                </div>
            </div>
        )

        return card
    }

    async function getPeminjaman() {
        try {
            const userLogin = JSON.parse(Cookies.get('loginData')).displayName
            const get = await getDocs(query(collection(db, 'peminjaman'), where('user', '==', userLogin)))
            const tempData = []
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })
            setPeminjamanData(tempData)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPeminjaman()
    }, [])

    return (
        <>
            <Navbar></Navbar>
            <Container onClick={closePopUp}>
                {popup && (<div className="popup">
                    <div className="title">ID Peminjaman:</div>
                    <div className="id">{idPeminjaman}</div>
                </div>)}
                <Wrapper>
                    <Menu>
                        <div className="select">
                            <button className={`history ${selected === 'history' ? 'selected' : ''}`} onClick={() => setSelected('history')}>History</button>
                            <button className={`pinjam ${selected === 'pinjam' ? 'selected' : ''}`} onClick={() => setSelected('pinjam')}>Pinjam</button>
                        </div>
                        <div className="search">
                            <input type="text" placeholder="Cari judul buku..." onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </Menu>
                    <Card>
                        {selected === 'pinjam' && (<PinjamCard>
                            <BukuPinjam></BukuPinjam>
                        </PinjamCard>)}
                        {selected == 'history' && (<HistoryCard></HistoryCard>)}
                    </Card>
                </Wrapper>
            </Container>
        </>
    )
}

const popup = keyframes`
    0% {
        width: 0px;
        height: 0px;
    }
    50% {
        width: 170px;
        height: 120px;
    }
    100% {
        width: 150px;
        height: 100px;
    }
`

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .popup{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #202938;
        text-align: center;
        width: 150px;
        height: 100px;
        padding: 10px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: white;
        animation: ${popup} 0.3s;
    }

    .popup .title{
        font-weight: bold;
    }

    .popup .id{
        font-weight: bold;
        font-size: 20px;
        margin-top: 10px;
    }

`

const Wrapper = styled.div`
    margin-top: 50px;
    width: 95%;
    height: 80%;
`

const color = keyframes`
    from { background-color:white; }
    to { background-color:#202938; }
`

const Menu = styled.div`
    margin-top: 20px;
    padding: 5px;
    display: flex;
    justify-content: flex-start;

    button{
        padding: 11px 28px;
        border: 1px solid black;
        background-color: white;
        cursor: pointer;
        font-size: 15px;
    }

    input{
        padding: 11px 10px;
        width: 100%;
        outline: none;
        border: 1px solid black;
        border-radius: 50px;
    }

    .search{
        width: 50%;
        margin-left: 30px;
    }

    .select .history{
        border-radius: 50px 0 0 50px;
    }

    .select .pinjam{
        border-radius: 0 50px 50px 0;
    }

    .selected{
        background-color: #202938;
        color: white;
        animation: ${color} 0.2s linear;
    }

    @media only screen and (max-width:700px){
        flex-direction: column;

        .search{
            width: 80%;
            margin-top: 20px;
            margin-left: 0;
        }
    }
`

const Card = styled.div`
    height: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    `

const PinjamCard = styled.div`
    padding: 10px 5px;
    overflow-y: auto;
    width: 95%;
    height: 90%;
    display: flex;
    gap: 25px;
    flex-wrap: wrap;

    
    .card{
        border-radius: 7px;
        box-shadow: 3px 3px 0 3px #efefef, -3px -3px 0 3px #efefef;
        width: 170px;
        height: 260px;
        padding-top: 10px;
        cursor: pointer;
        transition: box-shadow 0.5s;
    }

    .card:hover{
        box-shadow: 3px 3px 0 3px #2d3940, -3px -3px 0 3px #efefef;
    }

    .card .img{
        margin: 0 auto;
        width: 90%;
        height: 70%;
    }

    .card .img img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .card .body{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .card .body .desc{
        width: 80%;
        height: 85%;
    }
    
    .card .body .desc .author{
        color: grey;
    }
    
    .card .body .desc .title{
        margin-top: 5px;
    }

    @media only screen and (max-width:700px){
        .card{
            margin: 0 auto;
        }
    }
`

const HistoryCard = styled.div`
    border: 1px solid red;
    padding: 10px 5px;
    overflow-y: auto;
    width: 95%;
    height: 90%;
`