import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"

import Loader from "./loader"

const NavWrapper = styled.div`
    position:fixed;
    height:80px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    z-index: 2;

    i{
    font-size:45px;
    margin-left:50px;
    }

    @media only screen and (min-width:700px){
    i{
    display:none;}
    }
    `

const Title = styled.h1`
    margin-left:40px;
    color:#222831;
    cursor:pointer;
    `

const Menu = styled.p`
    cursor:pointer;

    @media only screen and (max-width: 700px) {
    display: none;
    }
    `

const Button = styled.button`
    border:none;
    padding:10px 30px;
    border-radius:5px;
    font-weight:bold;
    background-color:#222831;
    color:white;
    cursor:pointer;

    @media only screen and (max-width:700px){
    display:none;
  }`

const Group = styled.div`
    margin-right:30px;
    width:250px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    }
    `

const slideIn = keyframes`
    from{margin-left:-300px;}
    to{margin-left:0px;}
`

const NavMobile = styled.div`
    width:65%;
    height:100vh;
    background-color:#EEEEEE;
    position:fixed;
    z-index:999;
    animation:${slideIn} 0.1s linear;
    margin-left: 0px;

    .card{
    width:100%;
    height:20%;
    padding-top:50px;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:space-around;
    }

    p{
    border-bottom:1px solid black;
    padding:0 0 5px 10px;
    width:80%;
    font-size:18px;
    }

    button{
    border:none;
    padding:10px 30px;
    border-radius:5px;
    font-weight:bold;
    background-color:#222831;
    color:white;
    cursor:pointer;
    }

    @media only screen and (min-width:700px){
    display:none;
    }
    `


export default function Navbar() {

    const [toggleNav, setToggleNav] = useState(false)
    const [loading, setLoading] = useState(false)
    const route = useNavigate()

    function navigate(params) {
        setLoading(true)
        setTimeout(() => {
            route(`${params}`)
        }, 650);
    }

    return (
        <>
            {loading === true && (<Loader></Loader>)}
            {toggleNav === true && (
                <NavMobile>
                    <div className="card">
                        <p onClick={() => navigate('/buku')}>Semua Buku</p>
                        <button>LOGIN</button>
                    </div>
                </NavMobile>
            )}
            <NavWrapper>
                <Title onClick={() => navigate('/')}>MoPinjam</Title>
                <Group>
                    <Menu onClick={() => navigate('/buku')} >Semua Buku</Menu>
                    <Button>LOGIN</Button>
                    <i className="bi bi-list" onClick={() => setToggleNav(!toggleNav)}></i>
                </Group>
            </NavWrapper>
        </>
    )
}