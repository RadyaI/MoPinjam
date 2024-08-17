import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import semuaBuku from '../semuaBuku';
import BukuData from "../admin/bukuData";

import Protected from '../components/protectedRoute'


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
        Component: () => <Protected Component={BukuData} />
    }
])

export default router