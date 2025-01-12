import { useEffect, useState } from "react"
import { useAuth } from "../../store/auth"
import { NavLink } from "react-router-dom"

const AdminUser =()=>{
    const {authorizationToken} = useAuth()
    const [user, setUser] = useState() 

    const getAllUser = async()=>{
        try {
            const response = await fetch("http://localhost:3000/api/admin/adminUser", {
                method: "GET",
                headers: {
                    Authorization: authorizationToken
                }
            })
            if(response.ok){
                const res_data = await response.json()
                setUser(res_data.data)
            }
        } catch (error) {
            console.log("admin user get error", error)
        }
    }
    useEffect(()=>{
        getAllUser()
    },[])

    const deleteUser =async(id)=>{
        try {
            const response = await fetch(`http://localhost:3000/api/admin/adminDeleteUser/${id}`,{
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken
                }
            })

            if(response.ok){
                getAllUser()
            }
        } catch (error) {
            console.log("delete error", error)
        }
    }

    return <>
        <h1>Admin user</h1>
        <div className="adminUser">
            {Array.isArray(user) && user.map((curElem, index)=>{
                const {username, email, phone} = curElem
                return <div key={index}>
                    <div className="adminSingleUser">
                        <h3>Username: {username}</h3>
                        <h3>Email: {email}</h3>
                        <h3>Phone: {phone}</h3>
                        <button onClick={()=> deleteUser(curElem._id)}>Delete</button>=
                        <NavLink to={`/admin/admin-update-user/${curElem._id}`} state={{...curElem}}><button>Update</button></NavLink>
                        
                    </div>
                </div>
            })}
        </div>
    </>
}

export default AdminUser