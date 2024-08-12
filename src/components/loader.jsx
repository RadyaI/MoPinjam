import styled, { keyframes } from "styled-components"

const animate = keyframes`
0%{ width:0%; }
50%{ width:50%; }
100%{ width:100%; }
`

const Load = styled.div`
    position:fixed;
    z-index:9999;
    background-color:black;
    width:100%;
    height:2px;
    animation:${animate} 0.6s;
`

export default function Loader() {
    return (
        <>
            <Load></Load>
        </>
    )
}