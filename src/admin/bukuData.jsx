import { useEffect, useState } from "react"
import Navbar from "../components/navbar"

import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

export default function BukuData() {
    const [isLogin, setLogin] = useState(Cookies.get('isLoggedIn'))
    const [admin, setAdmin] = useState(['radyaiftikhar@gmail.com', 'radyaproject@gmail.com', 'rady61163@gmail.com'])
    const route = useNavigate()

    useEffect(() => {
        const check = admin.includes(isLogin ? JSON.parse(Cookies.get('loginData')).email : 'anonim')
        if (!check) {
            route('/')
        }
    }, [])

    return (
        <>
            <Navbar></Navbar>
        </>
    )
}