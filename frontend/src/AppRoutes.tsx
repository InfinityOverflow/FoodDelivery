import { Navigate, Route, Routes } from "react-router-dom"

export const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element ={<span>HOME PAGE</span>}/>
            <Route path="/user-profile" element ={<span>Profile PAGE</span>}/>
            <Route path="*" element ={<Navigate to="/"/>}/>
        </Routes>
    )
}