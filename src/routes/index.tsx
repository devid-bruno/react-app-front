import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Login,
    Home,
    Users
} from '../pages';

import PrivateRoute from "./Private";

export default function RoutesComponent(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path='/login' element={<Login />} />

            <Route element={<PrivateRoute />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/portabilidade" element={<Users.Portabilidade />} />
                    <Route path="/whatsapp" element={<Users.whatsApp />} />
            </Route>
        </Routes>
    </BrowserRouter>
    )
}