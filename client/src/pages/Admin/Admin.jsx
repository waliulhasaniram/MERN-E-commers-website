import { NavLink, Outlet } from "react-router-dom"

const Admin =()=>{
    return <>
        <header>
            <div className="admin_navbar">
                <h4>click the buttons here to see data</h4>
                <nav className="adminNav">
                    <ul>
                        <li><button> <NavLink to="/admin/admin-user">user</NavLink></button></li><br/>
                        <li><button><NavLink to="/admin/admin-sell-product">sell</NavLink></button></li><br/>
                        <li><button><NavLink to="/admin/admin-upload-product">upload product</NavLink></button></li><br/>
                        <li><button><NavLink to="/product">update product</NavLink></button></li><br/>
                        <li><button><NavLink to="/admin/admin-contact">contact</NavLink></button></li>
                    </ul>
                </nav>
            </div>
        </header>
        <Outlet/>
    </>
}

export default Admin