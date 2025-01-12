import { useEffect } from "react"
import { useAuth } from "../store/auth"
import { Navigate } from "react-router-dom"


const Logout =()=>{
   const {loggout} = useAuth()

    useEffect(()=>{
        loggout()
    },[loggout])
   
    return <Navigate to="/login"/>
}

export default Logout