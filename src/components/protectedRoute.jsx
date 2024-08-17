import { useState } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Protected({ Component }) {
    const [login, setLogin] = useState(Cookies.get('isLoggedIn') === 'true' || false)

    return login ? <Component /> : <Navigate to='/' replace />
}