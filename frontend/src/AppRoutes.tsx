import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePages"
import AuthCallbackPage from "./pages/AuthCallbackPage"

export const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element ={<Layout><HomePage/></Layout>}/>
            <Route path="/auth-callback" element ={<AuthCallbackPage/>}/>
            <Route path="/user-profile" element ={<span>Profile PAGE</span>}/>
            <Route path="*" element ={<Navigate to="/"/>}/>
        </Routes>
    )
}