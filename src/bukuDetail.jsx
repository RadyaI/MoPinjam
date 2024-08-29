import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import swal from "sweetalert"

import Navbar from "./components/navbar"
import Loader from "./components/loader"
import Float from "./components/protected/float"

import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "./config/firebase"

export default function BukuDetail() {

    const route = useNavigate()
    const { judul } = useParams()

    const [loading, setLoading] = useState(false)
    const [bukuData, setBukuData] = useState({})
    const [deadline, setDeadline] = useState('')

    function navigation(params) {
        setLoading(true)
        setTimeout(() => {
            route(`${params}`)
            setLoading(false)
        }, 600);
    }

    async function getBukuDetail() {
        try {
            const get = await getDocs(query(collection(db, 'buku'), where('judul', '==', judul)))
            const tempData = []
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })
            setBukuData(tempData[0])
        } catch (error) {
            console.log(error)
        }
    }

    async function pinjamBuku() {
        try {
            const alert = await swal({
                icon: 'warning',
                title: 'Ingin meminjam buku ini?',
                buttons: ['Tidak', 'Iya']
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getBukuDetail()
    }, [])

    return (
        <>
            {loading && (<Loader></Loader>)}
            <Navbar></Navbar>
            <Float></Float>
            <Container>
                <Card>
                    <Cover>
                        <div className="img-container">
                            <img src={bukuData.gambar} alt="foto buku" />
                        </div>
                    </Cover>
                    <DetailBuku>
                        <div className="breadcrumb"><small><span onClick={() => navigation('/')}>Home</span> / <span onClick={() => navigation('/buku')}>Buku</span> / <span className="judul">{judul}</span></small></div>
                        <Title>
                            <div className="head">
                                <div className="penulis">{bukuData.penulis}</div>
                                <div className="judul">{bukuData.judul}</div>
                            </div>
                            <div className="share"><i className="bi bi-share-fill share-icon"></i></div>
                        </Title>
                        <div className="judul_section1">
                            Deskripsi Buku
                        </div>
                        <Desc>
                            {bukuData.deskripsi}
                        </Desc>
                        <div className="judul_section2">
                            Detail
                        </div>
                        <Detail>
                            <div className="info">
                                <div className="info1">Jumlah Halaman: {bukuData.jumlah_halaman}</div>
                                <div className="info2">Bahasa: {bukuData.bahasa}</div>
                            </div>
                            <div className="info">
                                <div className="info1">Penulis: {bukuData.penulis}</div>
                                {bukuData.dipinjam === false && (<div className="info2">Status: <span className="badge-success">Tersedia</span></div>)}
                                {bukuData.dipinjam && (<div className="info2">Status: <span className="badge-danger">Tidak tersedia</span></div>)}
                            </div>
                        </Detail>
                    </DetailBuku>
                    <Pinjam>
                        <div className="card">
                            <div className="title">Ingin pinjam buku ini ?</div>
                            <div className="form">
                                <label htmlFor="deadline">Pinjam sampai hari?</label>
                                {bukuData.dipinjam && (<input id="deadline" type="date" disabled />)}
                                {bukuData.dipinjam === false && (<input id="deadline" type="date" onChange={(e) => setDeadline(e.target.value)} />)}
                            </div>
                            {bukuData.dipinjam === false && (<button className="btn-pinjam" onClick={() => pinjamBuku()}>Pinjam</button>)}
                        </div>
                    </Pinjam>
                </Card>
            </Container>
        </>
    )
}

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const Card = styled.div`
    margin-top: 100px;
    width:90%;
    height:70%;
    display:flex;
    
    
    @media only screen and (max-width:700px){
        flex-direction:column;
        overflow: auto;
        height:80%;
    }
`

const Cover = styled.div`
    width:20%;
    height:100%;   

    .img-container{
        background-color: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(193, 193, 193, 0.1);
        border-radius: 10px;
        width: 90%;
        height: 300px;
        margin-top: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .img-container img{
        object-fit: cover;
        width: 90%;
        height: 90%;
    }

    @media only screen and (max-width:700px){
        width:100%;

        .img-container{
            width: 70%;
            height: auto;
            margin: 0 auto;
        }
    }
`
const DetailBuku = styled.div`
    background-color:white;
    width:50%;
    height:100%;

    .breadcrumb{
        color:grey;
        width:95%;
        margin: 0 auto;
    }

    .breadcrumb span{
        cursor: pointer;
    }

    .breadcrumb .judul{
        color:darkblue;
    }

    .judul_section1{
        margin: 0 auto;
        margin-top: 30px;
        width: 95%;
        font-weight: bold;
    }

    .judul_section2{
        margin: 0 auto;
        margin-top: 50px;
        width: 95%;
        font-weight: bold;
    }

    @media only screen and (max-width:700px){
        width:100%;   

        .breadcrumb{
            display:none;
        }
    }
`

const Title = styled.div`
    margin:0 auto;
    margin-top:20px;
    width:95%;
    height:auto;
    display:flex;
    justify-content:space-between;

    .head{
        width:fit-content;
    }

    .head .penulis{
        color:grey;
    }

    .head .judul{
        font-size:25px;
    }

    .share{
        width:50px;
        height:50px;
        display:flex;
        justify-content:flex-end;
    }

    .share .share-icon{
        cursor: pointer;
        font-size:20px;
        color:grey;
    }
`

const Desc = styled.div`
    margin:0 auto;
    margin-top:15px;
    width:95%;
    height:auto;
    letter-spacing:1px;
`

const Detail = styled.div`
    width:95%;
    margin: 0 auto;
    margin-top: 15px;
    display:flex;
    color: grey; 
    font-size: 13px;
    font-weight: bold;

    .info:nth-child(2){
        margin-left: 50px;
    }

    .info .info2{
        margin-top: 20px;
    }

    .badge-success{
        border-radius: 7px;
        padding: 3px 5px;
        background-color: green;
        color: white;
    }

    .badge-danger{
        border-radius: 7px;
        padding: 3px 5px;
        background-color: red;
        color: white;
    }
`

const Pinjam = styled.div`
    width:30%;
    height:100%;

    .card{
        background-color: #ffffff;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1), 0 2px 4px 0 rgba(193, 193, 193, 0.1);
        border-radius: 10px;
        width: 85%;
        height: 200px;
        padding: 10px;
        margin: 0 auto;
        margin-top: 50px;
        display: flex;
        flex-direction: column;
        align-items: start;
        justify-content: space-around;
    }

    .card .title{
        font-weight: bold;
        margin-top: 10px;
        color: grey;
    }

    .card .form{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        width: 100%;
        height: 40%;
    }

    .card .form label {
        font-weight: bold;
    }

    .card .form input{
        width: 90%;
        height: 30px;
        padding: 5px;
        border-radius: 10px;
        background-color: #efefef;
        outline: none;
        border: none;
    }

    .btn-pinjam{
        border: none;
        border-radius: 10px;
        background-color: #222831;
        color: white;
        font-weight: bold;
        padding: 10px 23px;
        margin: 0 auto;
        cursor: pointer;
    }

    @media only screen and (max-width:700px){
        width:100%;
    }
`