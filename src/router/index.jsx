import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import semuaBuku from '../semuaBuku';
import BukuDetail from "../bukuDetail";

import Data from "../admin/data";
import Cek from "../admin/cek";
import Peminjaman from "../protected/peminjaman";

import Protected from '../components/protectedRoute'
import NotFound from '../components/404/notfound'

const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    },
    {
        path: '/buku',
        Component: () => <Protected Component={semuaBuku} />
    },
    {
        path: '/buku/data',
        Component: () => <Protected Component={Data} />
    },
    {
        path: '/buku/d/:judul',
        Component: BukuDetail
    },
    {
        path: '/peminjaman',
        Component: () => <Protected Component={Peminjaman} />
    },
    {
        path: '/peminjaman/cek',
        Component: Cek
    },
    {
        path: "*",
        Component: NotFound
    }
])

export default router