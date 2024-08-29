import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"

import Navbar from "./components/navbar"
import Loader from "./components/loader"

export default function BukuDetail() {

    const route = useNavigate()
    const { judul } = useParams()

    const [loading, setLoading] = useState(false)

    function navigation(params) {
        setLoading(true)
        setTimeout(() => {
            route(`${params}`)
            setLoading(false)
        }, 600);
    }

    return (
        <>
            {loading && (<Loader></Loader>)}
            <Navbar></Navbar>
            <Container>
                <Card>
                    <Cover>
                        <div className="img-container">
                            <img src="https://edit.org/images/cat/book-covers-big-2019101610.jpg" alt="foto buku" />
                        </div>
                    </Cover>
                    <DetailBuku>
                        <div className="breadcrumb"><small><span onClick={() => navigation('/')}>Home</span> / <span onClick={() => navigation('/buku')}>Buku</span> / <span className="judul">{judul}</span></small></div>
                        <Title>
                            <div className="head">
                                <div className="penulis">Oxford University Press</div>
                                <div className="judul">Oxford English Dictionary For Schools</div>
                            </div>
                            <div className="share"><i className="bi bi-share-fill share-icon"></i></div>
                        </Title>
                        <div className="judul_section1">
                            Deskripsi Buku
                        </div>
                        <Desc>
                            The Oxford English Dictionary for Schools is easy to use with clear signposting, accessible design, and expertly levelled definitions and examples, making it the perfect language resource for school work and studying at home.
                        </Desc>
                        <div className="judul_section2">
                            Detail
                        </div>
                        <Detail>
                            <div className="info">
                                <div className="info1">Jumlah Halaman: 299</div>
                                <div className="info2">Bahasa: Indonesia</div>
                            </div>
                            <div className="info">
                                <div className="info1">Penulis: Muhammad Radya</div>
                                <div className="info2">Status: Tersedia</div>
                            </div>
                        </Detail>
                    </DetailBuku>
                    <Pinjam></Pinjam>
                </Card>
            </Container>
        </>
    )
}

const Container = styled.div`
    width:100%;
    height:100vh;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
`

const Card = styled.div`
    margin-top:30px;
    width:90%;
    height:80%;
    display:flex;
    

    @media only screen and (max-width:700px){
        flex-direction:column;
        overflow: auto;
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
        margin-top: 50px;
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
`

const Pinjam = styled.div`
    border: 1px solid black;
    width:30%;
    height:100%;

    @media only screen and (max-width:700px){
        width:100%;
    }
`