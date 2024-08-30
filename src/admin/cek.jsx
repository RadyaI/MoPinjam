import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import Cookies from "js-cookie"

import { db } from "../config/firebase"
import { collection, getDocs, query, where } from "firebase/firestore"

export default function Cek() {

    const route = useNavigate()
    const [animation, setAnimation] = useState(false)
    const [notFound, setNotFound] = useState(false)

    const [idPinjam, setIdPinjam] = useState('')
    const [search, setSearch] = useState(false)
    const [bukuData, setbukuData] = useState({})

    async function searchPinjam(e) {
        if (e.key === "Enter") {

            // Start
            setAnimation(true)
            setNotFound(false)
            setSearch(false)
            // Start

            const get = await getDocs(query(collection(db, 'peminjaman'), where('id_pinjam', '==', idPinjam)))
            const tempData = []
            let isEmpty
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })

            if (tempData.length > 0) {
                setbukuData(tempData[0])
                setSearch(true)
            } else {
                setNotFound(true)
            }

            setAnimation(false)
        }
    }

    useEffect(() => {
        const isAdmin = Cookies.get('role') === "admin" || false
        if (!isAdmin) { route('/') }
    }, [])

    return (
        <>
            <Blob></Blob>
            <Container>
                <div className="wrapper">
                    <div className={`top`}>
                        <div className="title"><h1>Cari ID Peminjaman:</h1></div>
                        {animation && (<div className="loading"></div>)}
                        { notFound && (<div className="notFound">Data Peminjaman Tidak Ditemukan</div>)}
                        <input type="text" placeholder="Cari berdasarkan id..." onKeyUp={(e) => searchPinjam(e)} onChange={(e) => setIdPinjam(e.target.value)} />
                    </div>
                    {search && (<Card>
                        <div className="img"><img src={bukuData.gambar} alt="buku" loading="lazy" /></div>
                        <div className="body">
                            <div className="desc">
                                <div className="author"><small>{bukuData.penulis}</small></div>
                                <div className="title">{bukuData.judul}</div>
                            </div>
                        </div>
                    </Card>)}
                </div>
            </Container>
        </>
    )
}

const Up = keyframes`
    from {
        height: 0;
    }
    to {
        height: 260px;
    }
`

const Loading = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const Container = styled.div`
    background-color: #ecedef;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    .wrapper{
        z-index: 2;
        width: 80%;
        height: 90%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }

    .wrapper .top{
        width: 100%;
        height: 35%;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;
    }

    
    .wrapper .top .title{
        font-size: 20px;
    }

    .wrapper .top .loading{
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 5px solid transparent;
        border-top: 5px solid black;
        border-bottom: 5px solid black;
        margin-bottom: 10px;
        animation: ${Loading} 1s linear infinite;
    }

    .wrapper .top .notFound{
        color: red;
    }

    .wrapper .top input{
        outline: none;
        border: 1px solid black;
        border-radius: 50px;
        background-color: #ffffff;
        padding: 15px 20px;
        width: 50%;
        font-size: 15px;
    }
`

const Card = styled.div`
        border-radius: 7px;
        box-shadow: 3px 3px 0 3px #ffffff, -3px -3px 0 3px #ffffff;
        width: 170px;
        height: 260px;
        padding-top: 10px;
        cursor: pointer;
        transition: box-shadow 0.5s;
        animation: ${Up} 0.3s linear;

    &:hover{
        box-shadow: 3px 3px 0 3px #2d3940, -3px -3px 0 3px #efefef;
    }

    .img{
        margin: 0 auto;
        width: 90%;
        height: 70%;
    }   

    .img img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .body{
        width: 100%;
        height: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .body .desc{
        width: 80%;
        height: 85%;
        overflow-y: auto;
    }

    .body .desc::-webkit-scrollbar{
        display: none;
    }
    
    .body .desc .author{
        color: grey;
    }
    
    .body .desc .title{
        margin-top: 5px;
        font-size: 15px;
    }
`

const Blob = styled.div`
    position: absolute;
    z-index: 1;
    top: 100px;
    left: 100px;
    border-radius: 40px;
    transform: rotate(40deg);
    filter: blur(100px);
    width: 500px;
    height: 350px;
    background-color: lightblue;
`