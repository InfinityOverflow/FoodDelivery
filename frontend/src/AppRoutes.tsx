import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import HomePage from "./pages/HomePages"
import AuthCallbackPage from "./pages/AuthCallbackPage"
import UserProfilePage from "./pages/UserProfilePage"
import ProtectedRoute from "./auth/ProtectedRoute"
import SearchPage from "./pages/SearchPage"
import DetailPage from "./pages/DetailPage"
import OrderStatusPage from "./pages/OrderStatusPage"

export const AppRoutes=()=>{
    return(
        <Routes>
            <Route path="/" element ={<Layout showHero={true}><HomePage/></Layout>}/>
            <Route path="/auth-callback" element ={<AuthCallbackPage/>}/>
            <Route element={<ProtectedRoute/>}>
            <Route
          path="/order-status" element={
            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />    
            <Route path="/user-profile" element ={<Layout>
                <UserProfilePage/>
            </Layout>}/>
            </Route>
            <Route path="/search/:city" element ={<Layout showHero={false}>
            <SearchPage/>
            </Layout>}/>
            <Route path="/detail/:restaurantId" element={<Layout showHero={false}> <DetailPage /> </Layout>}/>
            <Route path="*" element ={<Navigate to="/"/>}/>
        </Routes>
    )
}