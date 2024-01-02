import { useMemo } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import { parseCookies } from "nookies";
import jwt_decode from "jwt-decode";

const PrivateRoute = ()=> {

    const isLogged = useMemo(() => {
        const { 'bb.token': token } = parseCookies();

        if(!token) return false

        const decodedToken: any = jwt_decode(token);

        if(Date.now() >= decodedToken.exp * 1000) return false

        return true
    },[])
    
    return (
        <>
            { isLogged ? <Outlet />: <Navigate to='/login' /> }
        </>
    )
}

export default PrivateRoute