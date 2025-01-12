import { NavLink } from "react-router-dom"
import { useAuth } from "../store/auth"
import { MdLaptopChromebook } from "react-icons/md";
import { BsWatch } from "react-icons/bs";
import { FaHeadphones } from "react-icons/fa";
import { ImMobile } from "react-icons/im";

const Home =()=>{
    const {allProductData} = useAuth()
    return <>
        <div className="hero_section">
            <div className="hero_info">
                <h1 className="heorh1">welcome, to our wesite </h1> 
                <h1 className="heorh1">This is a mern demo E-commers website</h1>
                <h1 className="heorh1">MERN is the technology that will take your business to the next level.</h1>
                
                <div className="hero_button">
                    <button className='hero_button1'> <NavLink to='/product'>shop now</NavLink> </button> 
                    <button className='hero_button2'> <NavLink to='/contact'>Contact</NavLink> </button>   
                </div> 
                    
            </div>
            <div className="hero_slider">
                <img className="heroReactImage" src="vite.svg" alt="this is a registration image" />
                <img className="heroReactImage" src="react.svg" alt="this is a registration image" />
            </div>
        </div>
        
        <div className="hero_section">
            <div className='hero_tech'>
                <NavLink to="/product"> <h1><ImMobile /></h1> </NavLink>  <h1>|</h1>
                <NavLink to="/product"> <h1><MdLaptopChromebook /></h1> </NavLink>  <h1>|</h1>
                <NavLink to="/product"> <h1><BsWatch /></h1> </NavLink>  <h1>|</h1>
                <NavLink to="/product"> <h1><FaHeadphones /></h1> </NavLink>
            </div>  
        </div>


        
            <div className="hero_product_section">
                {Array.isArray(allProductData) && allProductData.map((curELem, index)=>{
                    const {_id, productName, productAvatar, price, company} = curELem
                    return <div key={index}>
                                <NavLink to={`/singleproduct/${_id}`} state={{...curELem}}>
                                    <div className="card">
                                        <img className="image" src={productAvatar} alt="image"/>
                                        <div className="name_price">
                                            <div><h4>{productName}</h4><h4>Company: {company}</h4></div>
                                            <div><h4>Price: {price}</h4></div>
                                        </div> 
                                    </div>
                                </NavLink>
                            </div>
                })}
            </div>
        


        <div className="contact_section">
            <div className="hero_slider">
                <img className="heroImage" src="/image/iphone.jpg" alt="this is a registration image"/>
            </div>
            <div className="hero_info">
                <h1>Why Mern is the best</h1>
                <p>why you should use Mern: </p>
                    <ul className='hero_list'>
                        <li>Full-Stack JavaScript: It uses a single language (JavaScript) across the stack, from front-end to back-end, making development more efficient and streamlined.</li><br/>
                        <li>Fast Development: Pre-built tools and libraries in MongoDB, Express, React, and Node.js speed up development time.</li>
                        <li>Scalability: MongoDB provides flexible data models, and Node.js enables handling of high traffic with non-blocking I/O.</li> 
                        <li>Rich User Experience: React’s component-based architecture allows for dynamic, interactive, and responsive user interfaces.</li> 
                        <li>Open Source: Each technology in the MERN stack is open-source, which provides strong community support and continuous updates.</li>     
                    </ul>
            </div>
        </div>

        <div className="hero_section">
            <div className="hero_info">
                <h1>Mern is the simple form of full-stack development.</h1>
                <p>A MERN project offers several key benefits: </p>
                    <ul className='hero_list'>
                        <li>Full-Stack JavaScript: It uses a single language (JavaScript) across the stack, from front-end to back-end, making development more efficient and streamlined.</li><br/>
                        <li>Fast Development: Pre-built tools and libraries in MongoDB, Express, React, and Node.js speed up development time.</li>
                        <li>Scalability: MongoDB provides flexible data models, and Node.js enables handling of high traffic with non-blocking I/O.</li> 
                        <li>Rich User Experience: React’s component-based architecture allows for dynamic, interactive, and responsive user interfaces.</li> 
                        <li>Open Source: Each technology in the MERN stack is open-source, which provides strong community support and continuous updates.</li>     
                    </ul>        
            </div>
            <div className="hero_slider">
                <img className="heroImage" src="/image/random.jpg" alt="this is a registration image" />
            </div>
        </div>
    </>
}
export default Home