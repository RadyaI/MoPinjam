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
    width:220px;
    display:flex;
    align-items:center;
    justify-content:space-around;
    `

export default function Navbar() {
    return (
        <>
            <NavWrapper>
                <Title>DigiPerpus</Title>
                <Group>
                    <Menu>Pinjam</Menu>
                    <Button>LOGIN</Button>
                </Group>
            </NavWrapper>
        </>
    )
}