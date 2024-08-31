import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import Cookies from "js-cookie"
import swal from "sweetalert"

import { db } from './config/firebase'
import { addDoc, collection, deleteDoc, doc, getDocs, query, Timestamp, updateDoc, where } from "firebase/firestore"

export default function ReturnBook() {

    const { id_pinjam, id_buku, email } = useParams()
    const [dataPinjam, setDataPinjam] = useState({})


    async function GetPeminjaman() {
        try {
            const get = await getDocs(query(collection(db, 'peminjaman'), where('id_pinjam', '==', id_pinjam)))
            const tempData = []
            get.forEach((data) => {
                tempData.push({ ...data.data(), id: data.id })
            })
            setDataPinjam(tempData[0])
        } catch (error) {
            console.log(error)
        }
    }

    async function kembalikan() {
        try {
            const currentEmail = JSON.parse(Cookies.get('loginData')).email
            if (currentEmail == email) {

                const alert = await swal({
                    icon: 'warning',
                    title: 'Kembalikan buku?',
                    buttons: ['Tidak', 'Iya']
                })

                if (alert) {
                    const docRef = doc(db, 'peminjaman', dataPinjam.id)
                    const bukuRef = doc(db, 'buku', dataPinjam.id_buku)

                    await deleteDoc(docRef)
                    await updateDoc(bukuRef, { dipinjam: false })
                    await addDoc(collection(db, 'history'), {
                        user: dataPinjam.user,
                        email: dataPinjam.email,
                        id_buku: dataPinjam.id_buku,
                        judul: dataPinjam.judul,
                        gambar: dataPinjam.gambar,
                        id_pinjam: dataPinjam.id_pinjam,
                        tanggal_pinjam: dataPinjam.tanggal_pinjam,
                        tenggat: dataPinjam.deadline,
                        tanggal_kembali: new Date().toLocaleDateString(),
                        time: Timestamp.now().toMillis()
                    })

                    swal({
                        icon: 'success',
                        title: 'Berhasil Mengembalikan Buku',
                        button: "Yay"
                    }).then(
                        (redirect) => {
                            if (redirect) {
                                location.href = '/peminjaman'
                            }
                        }
                    )

                }

            } else {
                swal({
                    icon: 'error',
                    title: 'Gagal Mengembalikan Buku!',
                    text: 'Anda harus menggunakan akun yang sama pada saat meminjam buku',
                    button: 'Oke'
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const getLogin = Cookies.get('isLoggedIn') === 'true' || false
        if (!getLogin) {
            location.href = '/'
        }
        GetPeminjaman()
    }, [])

    return (
        <>
            <Container>
                <Wrapper>
                    <div className="img-container">
                        <img src={dataPinjam.gambar} alt="" />
                    </div>
                    <div className="desc">
                        <div className="title"><h2>{dataPinjam.judul}</h2></div>
                        {/* <div className="deskripsi">{dataPinjam.desc}</div> */}
                        <div className="info">
                            <ul>
                                <li><span>Nama</span>: {dataPinjam.user}</li>
                                <li><span>Email</span>: {dataPinjam.email}</li>
                                <li><span>Tanggal Pinjam</span>: {dataPinjam.tanggal_pinjam}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="btn-kembalikan">
                        <button onClick={() => kembalikan()}>Kembalikan</button>
                    </div>
                </Wrapper>
            </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Wrapper = styled.div`
    width: 90%;
    height: 95%;
    overflow-y: auto;
    
    .img-container{
        width: 60%;
        height: 270px;
        margin: 0 auto;
    }

    .img-container img{
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .desc{
        /* border: 1px solid black; */
        background-color: white;
        box-shadow: 2px 2px 0 4px #efefef, -2px -2px 0 4px #efefef;
        width: 90%;
        height: auto;
        padding: 20px 10px;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 10px;
    }

    .desc .title{
        text-align: center;
    }

    .desc .deskripsi{
        margin-top: 10px;
    }

    .desc .info{
        margin-top: 20px;
    }

    .desc .info ul {
        list-style: none;
    }

    .desc .info span {
        font-weight: bold;
    }

    .btn-kembalikan{
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }

    .btn-kembalikan button{
        cursor: pointer;
        border: none;
        padding: 10px 20px;
        font-size: 14px;
        font-weight: bold;
        background-color: #2d3940;
        color: white;
        border-radius: 7px;
    }
`