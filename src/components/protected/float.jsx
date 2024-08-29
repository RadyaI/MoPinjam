import { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import Cookies from "js-cookie"

import Loader from "../loader"

import floatImg from '../../assets/img/float4.png'

export default function Float() {
    const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('isLoggedIn') === 'true' || false)
    const [loading, setLoading] = useState(false)
    const route = useNavigate()

    function redirect(){
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            route('/peminjaman')
        }, 600);
    }

    return (
        <>
        { loading && (<Loader></Loader>)}
            {isLoggedIn && (<Menu onClick={() => redirect()} >
                <img src={floatImg} alt="" />
            </Menu>)}
        </>
    )
}

const Menu = styled.div`
    position: absolute;
    bottom: 30px;
    right: 40px ;
    z-index: 10;
    width: 60px;
    height: 60px;   
    border-radius: 50%;
    cursor: pointer;

    img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
    }
`