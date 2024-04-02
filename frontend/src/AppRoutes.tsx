import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePages"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import SearchPage from "./pages/SearchPage"

export const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element ={<Layout showHero={true}><HomePage/></Layout>}/>
            <Route path="/auth-callback" element ={<AuthCallbackPage/>}/>
            <Route element={<ProtectedRoute/>}>
            <Route path="/user-profile" element ={<Layout>
                <UserProfilePage/>
            </Layout>}/>
            </Route>
            <Route path="/search/:city" element ={<Layout showHero={false}>
            <SearchPage/>
            </Layout>}/>
            <Route path="*" element ={<Navigate to="/"/>}/>
        </Routes>
    )
}