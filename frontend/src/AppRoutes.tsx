import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePages"

export const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element ={<Layout><HomePage/></Layout>}/>
            <Route path="/user-profile" element ={<span>Profile PAGE</span>}/>
            <Route path="*" element ={<Navigate to="/"/>}/>
        </Routes>
    )
}