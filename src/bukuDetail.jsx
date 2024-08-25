import { useParams } from "react-router-dom"

export default function BukuDetail() {

    const {judul} = useParams()

    return (
        <>
            <h1>Buku {judul} detail</h1>
        </>
    )
}