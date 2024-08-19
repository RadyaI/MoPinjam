import { useEffect, useState } from "react"
import '../assets/crud.css'

import Navbar from "../components/navbar"
import ManageBuku from "../components/admin/manageBuku"

import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"

export default function BukuData() {
  const [isLogin, setLogin] = useState(Cookies.get('isLoggedIn'))
  const [admin, setAdmin] = useState(['radyaiftikhar@gmail.com', 'radyaproject@gmail.com', 'rady61163@gmail.com'])
  const route = useNavigate()

  const [toggleMenu, setToggleMenu] = useState(false)
  const [onClose, setOnClose] = useState(false)
  const [selected, setSelected] = useState('buku')

  function closeMenu() {
    setOnClose(true)
    setTimeout(() => {
      setOnClose(false)
      setToggleMenu(false)
    }, 300);
  }

  useEffect(() => {
    const check = admin.includes(isLogin ? JSON.parse(Cookies.get('loginData')).email : 'anonim')
    if (!check) {
      route('/')
    }
  }, [])

  return (
    <>
      <Navbar></Navbar>
      {toggleMenu === true && (<Menu className={`${onClose === true ? 'hide' : ''}`}>
        <i className="bi bi-x close" onClick={() => closeMenu()}></i>
        <div className={`list ${selected === 'buku' ? "selected" : ''} `} onClick={() => setSelected('buku')} >Data Buku</div>
        <div className={`list ${selected === 'user' ? "selected" : ''} `} onClick={() => setSelected('user')} >Data User</div>
        <div className={`list ${selected === 'peminjaman' ? "selected" : ''} `} onClick={() => setSelected('peminjaman')} >Data Peminjaman</div>
      </Menu>)}
      <div className={`crud ${toggleMenu === true ? "blur" : ''}`}>
        <div className="wrapper">
          <i className="bi bi-list menu" onClick={() => setToggleMenu(true)}></i>
          <div className="card">
            {selected === 'buku' && (<ManageBuku></ManageBuku>)}
          </div>
        </div>
      </div>
    </>
  )
}


const toggle = keyframes`
    from { opacity: 0; height: 0; }
    to { opacity: 1; height: 150px; }
`;

const hide = keyframes`
    from { opacity: 1; height: 150px; }
    to { opacity: 0; height: 0; }
`

const Menu = styled.div`
    position:absolute;
    z-index:2;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:200px;
    height:150px;
    padding:30px 40px;
    padding-top:60px;
    border-radius:5px;
    border:1px solid #222831;
    display:flex;
    flex-direction:column;
    align-items:flex-start;
    justify-content:space-around;
    background-color:#efefef;
    animation:${toggle} 0.2s linear;

    &.hide{
        animation: ${hide} 0.4s linear;
    }

    .close{
        position:absolute;
        top:0;
        right:0;
        margin-top:-5px;
        margin-right:5px;
        font-size:45px;
        cursor:pointer;
    }
    
    .list{
        background-color:#ffffff;
        width:100%;
        height:35px;
        border-radius:5px;
        padding-left:10px;
        display:flex;
        align-items:center;
        cursor:pointer;
        }
        
    .selected{
        background-color:black;
        color:white;
    }
`