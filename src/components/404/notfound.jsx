import { useNavigate } from "react-router-dom"
import styled from "styled-components"

const Container = styled.div`
width:100%;
height:100dvh;
background-color:black;
`

const Wrapper = styled.div`
color:white;
border:1px solid black;
position:absolute;
width:300px;
height:300px;
top:50%;
left:50%;
transform:translate(-50%,-50%);
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
gap:40px;

h1{
font-size:50px;
}

button{
border:none;
padding:10px 25px;
border-radius:5px;
cursor:pointer;
font-size:16px;
font-weight:bold;
background-color:white;
}
`

export default function NotFound() {

    const route = useNavigate()

    return (
        <>
            <Container>
                <Wrapper>
                    <h1>Not Found</h1>
                    <h1>404</h1>
                    <button onClick={() => route(-1)}>Kembali</button>
                </Wrapper>
            </Container>
        </>
    )
}