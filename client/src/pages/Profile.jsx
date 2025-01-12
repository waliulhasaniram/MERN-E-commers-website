import { useAuth } from "../store/auth"

const Profile =()=>{
    const {loggedInUser} = useAuth()
    //console.log(loggedInUser)
    return <>
        <div className="profileDiv">
            <h1>User Profile</h1>
            <table border={3} className='profileTable'>
                <thead>
                    <th>username</th>
                    <th>email</th>
                    <th>phone</th>
                </thead>
                <tbody>
                    <tr>
                        <td>{loggedInUser && loggedInUser.username}</td>
                        <td>{loggedInUser && loggedInUser.email}</td>
                        <td>{loggedInUser && loggedInUser.phone}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}

export default Profile