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
                    <Cover></Cover>
                    <DetailBuku>
                        <div className="breadcrumb"><small><span onClick={() => navigation('/')}>Home</span> / <span onClick={() => navigation('/buku')}>Buku</span> / <span className="judul">{judul}</span></small></div>
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
    border:1px solid black;
    margin-top:30px;
    width:90%;
    height:80%;
    display:flex;

    @media only screen and (max-width:700px){
        flex-direction:column;
    }
`

const Cover = styled.div`
    background-color:black;
    width:20%;
    height:100%;    

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
    }

    .breadcrumb span{
        cursor: pointer;
    }

    .breadcrumb .judul{
        color:darkblue;
    }

    @media only screen and (max-width:700px){
        width:100%;   

        .breadcrumb{
            display:none;
        }
    }
`

const Pinjam = styled.div`
    background-color:black;
    width:30%;
    height:100%;

    @media only screen and (max-width:700px){
        width:100%;
    }
`