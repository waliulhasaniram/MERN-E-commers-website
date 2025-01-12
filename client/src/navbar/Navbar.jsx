import { NavLink } from "react-router-dom"
import './Navbar.css'
import { useState } from "react"
import { FaBlog } from "react-icons/fa";
import { useAuth } from "../store/auth";

const Navbar =()=>{
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const {isLoggedIn, loggedInUser} = useAuth()     
    //console.log(loggedInUser)
    const toggolMepu =()=>{
        setIsMenuOpen(!isMenuOpen)
    }

    return <>
        <nav className="container">
        <NavLink to="/">
                <div className="title">
                    <FaBlog className="navLogo"/>
                    <h2></h2>
                </div>
        </NavLink>
            <div>
                <div className="menu" onClick={toggolMepu}>
                    <div className="menu_icon"></div>
                    <div className="menu_icon"></div>
                    <div className="menu_icon"></div>
                </div>
                <div>
                    <ul className={isMenuOpen ? "navList active" : "navList"}>
                        <li><NavLink to="/" onClick={toggolMepu}>Home</NavLink></li>
                        <li><NavLink to="/about" onClick={toggolMepu}>About</NavLink></li>
                        <li><NavLink to="/contact" onClick={toggolMepu}>Contact</NavLink></li>
                        <li><NavLink to="/product" onClick={toggolMepu}>Products</NavLink></li>
                        

                        {isLoggedIn ? 
                            loggedInUser && loggedInUser.isAdmin ? (
                                    <>
                                        <li><NavLink to="/profile" onClick={toggolMepu}>Profile</NavLink></li>
                                        <li><NavLink to="/admin" onClick={toggolMepu}>Admin</NavLink></li>
                                        <li><NavLink to="/logout" onClick={{toggolMepu}}>Logout</NavLink></li>
                                    </>
                            ) : (
                                    <>
                                        <li><NavLink to="/profile" onClick={toggolMepu}>Profile</NavLink></li>
                                        <li><NavLink to="/logout" onClick={{toggolMepu}}>Logout</NavLink></li>
                                    </>
                            ) 
                            : (<>
                            <li><NavLink to="/register" onClick={toggolMepu}>Register</NavLink></li>
                            <li><NavLink to="/login" onClick={toggolMepu}>Login</NavLink></li>
                        </>)}
                        
                        <li><NavLink to="/cart" onClick={toggolMepu}>Cart</NavLink></li>
                    </ul>
                </div>
            </div>
        </nav>
    </>
}
export default Navbar