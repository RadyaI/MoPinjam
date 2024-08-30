import { useParams } from "react-router-dom"
import styled from "styled-components"

export default function ReturnBook() {

    const { id_pinjam, id_buku, email } = useParams()

    return (
        <>
            <Container>
                <h2>{id_pinjam}</h2>
                <h2>{id_buku}</h2>
                <p>{email}</p>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    background-color: black;
    color: white;
`