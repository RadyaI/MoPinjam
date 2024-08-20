import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import semuaBuku from '../semuaBuku';
import Data from "../admin/data";

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
        path: "*",
        Component: NotFound
    }
])

export default router