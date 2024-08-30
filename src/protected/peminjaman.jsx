import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import Cookies from "js-cookie"

import Navbar from "../components/navbar"

import { db } from "../config/firebase"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"

export default function Peminjaman() {

    const [selected, setSelected] = useState('pinjam')

    const [peminjamanData, setPeminjamanData] = useState([])

    function BukuPinjam() {
        const card = peminjamanData.map((i, index) =>
            <div className="card" key={index}>
                <div className="img"><img src={i.gambar} alt={i.judul} /></div>
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
            <Container>
                <Wrapper>
                    <Menu>
                        <button className={`history ${selected === 'history' ? 'selected' : ''}`} onClick={() => setSelected('history')}>History</button>
                        <button className={`pinjam ${selected === 'pinjam' ? 'selected' : ''}`} onClick={() => setSelected('pinjam')}>Pinjam</button>
                    </Menu>
                    <Card>
                        { selected === 'pinjam' && (<PinjamCard>
                            <BukuPinjam></BukuPinjam>
                        </PinjamCard>)}
                        { selected == 'history' && (<HistoryCard></HistoryCard>)}
                    </Card>
                </Wrapper>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

    button{
        padding: 11px 28px;
        border: 1px solid black;
        background-color: white;
        cursor: pointer;
        font-size: 15px;
    }

    .history{
        border-radius: 50px 0 0 50px;
    }

    .pinjam{
        border-radius: 0 50px 50px 0;
    }

    .selected{
        background-color: #202938;
        color: white;
        animation: ${color} 0.2s linear;
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
`

const HistoryCard = styled.div`
    border: 1px solid red;
    padding: 10px 5px;
    overflow-y: auto;
    width: 95%;
    height: 90%;
`