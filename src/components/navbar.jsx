import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const NavWrapper = styled.div`
    position:fixed;
    height:80px;
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    z-index: 2;
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
    `

const Button = styled.button`
    border:none;
    padding:10px 30px;
    border-radius:5px;
    font-weight:bold;
    background-color:#222831;
    color:white;
    cursor:pointer;
  }`

const Group = styled.div`
    margin-right:30px;
    width:250px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    `

export default function Navbar() {

    const route = useNavigate()

    return (
        <>
            <NavWrapper>
                <Title onClick={() => { route('/') }}>DigiPerpus</Title>
                <Group>
                    <Menu onClick={() => { route('/buku') }} >Semua Buku</Menu>
                    <Button>LOGIN</Button>
                </Group>
            </NavWrapper>
        </>
    )
}