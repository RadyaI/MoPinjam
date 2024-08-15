import { useEffect } from "react"
import styled, { keyframes } from "styled-components"

const appear = keyframes`
    0% { transform:translateX(-100px); }
    50% { transform:translateX(10px); }
    100% { transform:translateX(0px); }
`

const Card = styled.div`
    position:absolute;
    z-index:99;
    background-color:red;
    color:white;
    width:fit-content;
    height:50px;
    padding:0 35px;
    border-radius:5px;
    bottom:0;
    margin-bottom:25px;
    margin-left:25px;
    display:flex;
    justify-content:center;
    align-items:center;  
    font-size:18px;
    font-weight:bold;
    animation:${appear} 0.3s;
`


export default function LoginDulu() {
    return (
        <>
            <Card>
                <p>Login Dulu!</p>
            </Card>
        </>
    )
}