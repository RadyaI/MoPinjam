import { useParams } from "react-router-dom"
import styled from "styled-components"

import Navbar from "./components/navbar"

export default function BukuDetail() {

    const { judul } = useParams()

    return (
        <>
            <Navbar></Navbar>
            <Container>
                <Card>
                    <Cover></Cover>
                    <DetailBuku></DetailBuku>
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

    @media only screen and (max-width:700px){
        width:100%;   
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