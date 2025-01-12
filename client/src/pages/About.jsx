const About =()=>{
    return <>
        <div className="contact_section">
            <div className="hero_slider">
            <img className="heroImage" src="/image/random.jpg" alt="this is a registration image"/>
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
            <img className="heroImage" src="/image/iphone.jpg" alt="this is a registration image" />
            </div>
        </div>
        
    </>
}
export default About