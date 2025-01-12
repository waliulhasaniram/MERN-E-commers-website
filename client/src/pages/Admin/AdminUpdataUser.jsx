import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../store/auth"

const AdminUpdateUser =()=>{
    const {authorizationToken} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    //console.log(location.state)
    const [updateUser , setUpdateUser] = useState({username:"", email:"", phone:""})
    
    useEffect(()=>{
        setUpdateUser({
            username: location.state.username,
            email: location.state.email,
            phone: location.state.phone
        })
    },[])

    const handelChange =(e)=>{
        const name = e.target.name 
        const value = e.target.value 
        setUpdateUser({
            ...updateUser,
            [name]:value 
        })
    }
    const handelSubmitUpdate =async(e)=>{
        e.preventDefault()
        try {
            const response =await fetch(`http://localhost:3000/api/admin/adminUpdateUser/${location.state._id}`, {
                method: "PATCH",
                headers: {
                    Authorization: authorizationToken,
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify(updateUser)
            })
            if(response.ok){
                navigate("/admin/admin-user")
            }
        } catch (error) {
            console.log(error)
        }
    }

    return <>
        
        <div className="reg_container">
            <div className="regForm">
            <form onSubmit={handelSubmitUpdate}>
                    <h1>update user</h1>
                    <div className="input_div">
                        <label>Username: </label><br/>
                        <input type="text" name="username" placeholder="username" id="username" value={updateUser.username} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>Email: </label><br/>
                        <input type="email" name="email" placeholder="email" id="email" value={updateUser.email} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>Phone: </label><br/>
                        <input type="number" name="phone" placeholder="phone" id="phone" value={updateUser.phone} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <button type="submit">update</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}
export default AdminUpdateUser