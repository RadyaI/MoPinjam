import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import semuaBuku from '../semuaBuku'


const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    },
    {
        path: '/buku',
        Component: semuaBuku
    }
])

export default router