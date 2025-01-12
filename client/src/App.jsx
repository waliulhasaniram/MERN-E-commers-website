import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'
import SingleProduct from './pages/SingleProduct'
import Cart from './pages/Cart'

import Registration from './pages/Registration'
import Login from './pages/Login'
import Navbar from './navbar/Navbar' 
import Footer from './pages/Footer'
import Logout from './pages/logout'
import Profile from './pages/Profile'
import Admin from './pages/Admin/Admin'
import AdminUser from './pages/Admin/AdminUser'
import AdminSellProduct from './pages/Admin/AdminSellProduct'
import AdminUploadProduct from './pages/Admin/AdminUploadProduct'
import AdminContact from './pages/Admin/AdminContact'
import AdminUpdateUser from './pages/Admin/AdminUpdataUser'
import AdminUpdateProductsData from './pages/Admin/AdminUpdateProductsData'

function App() {
 
 return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/about' element={<About />}/>
          <Route path='/contact' element={<Contact />}/>
          <Route path='/product' element={<Product />}/>
          <Route path='/singleproduct/:id' element={<SingleProduct />}/>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/cart/:id' element={<Cart/>}/>
          <Route path='/register' element={<Registration />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/profile' element={<Profile />}/>
          <Route path='/admin' element={<Admin />}>
            <Route path='admin-user' element={<AdminUser />}/>
            <Route path='admin-update-user/:id' element={<AdminUpdateUser />}/>
            <Route path='admin-update-product/:id' element={<AdminUpdateProductsData />}/>
            <Route path='admin-sell-product' element={<AdminSellProduct />}/>
            <Route path='admin-upload-product' element={<AdminUploadProduct />}/>
            <Route path='admin-contact' element={<AdminContact />}/>
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
