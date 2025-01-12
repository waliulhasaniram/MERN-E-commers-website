import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Registration =()=>{
    const navigate = useNavigate()
    const [regData, setRegData] = useState({username:"", email:"", password:"", phone:""})

    const inputHandeler =(e)=>{
        const name = e.target.name 
        const value = e.target.value

        setRegData({
            ...regData,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/user/register", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify(regData)
            });
    
            if (response.ok) {
                //const res_data = await response.json();
                setRegData({ username: "", email: "", password: "", phone: "" });
                navigate("/login");
            } else {
                // Handle non-OK responses
                const errorData = await response.json();
                console.error("Error during registration:", errorData);
            }
        } catch (error) {
            console.log("Registration error:", error);
        }
    };
    

    return <>
         <div className="reg_container">
            <div>
                <img className="regImage" src="/image/regimg.jpg" alt="this is a registration image" width="500" height="500"/>
            </div>
            <div className="regForm">
            <form onSubmit={handelSubmit}>
                    <h1>Registration Form</h1>
                    <div className="input_div">
                        <label>Username: </label><br/>
                        <input type="text" name="username" placeholder="username" id="username" value={regData.username} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Email: </label><br/>
                        <input type="email" name="email" placeholder="email" id="email" value={regData.email} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Password: </label><br/>
                        <input type="password" name="password" placeholder="password" id="password" value={regData.password} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <label>Phone: </label><br/>
                        <input type="number" name="phone" placeholder="phone" id="phone" value={regData.phone} onChange={inputHandeler} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">Register</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}
export default Registration