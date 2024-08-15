import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";
import semuaBuku from '../semuaBuku';

import Protected from '../components/protectedRoute'


const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    },
    {
        path: '/buku',
        Component: () => <Protected Component={semuaBuku} />
    }
])

export default router