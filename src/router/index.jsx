import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../dashboard";


const router = createBrowserRouter([
    {
        path: '/',
        Component: Dashboard
    }
])

export default router