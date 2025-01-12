import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../store/auth"
import { useCartContext } from "../store/ContextCart"

const SingleProduct =()=>{
    const {authorizationToken, loggedInUser} = useAuth()
    const {addToCart} = useCartContext()
    const [comment, setComment] = useState()
    const location = useLocation()
    //console.log(location.state)
    const {_id, productName, description, inStock, productAvatar, color, price, catagory, company} = location.state
    
    //counter
    const [counter, setCounter] = useState(1);
    const plus=()=>{
        counter < inStock ? setCounter(counter+1) : setCounter(inStock)
    }
    const minus=()=>{
        counter > 1 ? setCounter(counter-1) : setCounter(1)
    }

    /// show all comments
    const grab_comments =async()=>{
        try {
            const response = await fetch(`http://localhost:3000/api/message/getComments/${_id}`, {
                method: "GET",
            })
            if(response.ok){
                const res_data = await response.json()
                setComment(res_data.data)
            }

        } catch (error) {
            console.log("comments error", error)
        }
    }
    
    useEffect(()=>{ 
        grab_comments() 
    }, [])


    /// post comment
    const [postCommentTxt, setPostCommentTxt] = useState({username: loggedInUser?.username, commentText:''})
    const commentHandelChange =(e)=>{
        const name = e.target.name 
        const value = e.target.value 
        setPostCommentTxt({
            ...postCommentTxt,
            [name]:value
        })
    }
    const handelSubmitComment =async(e)=>{
        e.preventDefault()
        try {
            const response = await fetch(`http://localhost:3000/api/message/postComments/${_id}`, {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(postCommentTxt)
            })
            if(response.ok){
                setPostCommentTxt({commentText:''})
            }
        } catch (error) {
         console.log("comment post error", error)   
        }
    }

    return <>
        <div className="container_section">

            <div className="image_Section">
            <img className="image_single" src={productAvatar} alt="image"/>                
            </div>
            <div className="description">
                <h1>{productName}</h1>
                <h2>Price: {price}</h2>
                <h4><u>Product description:</u><br/> {description}</h4>
                <h3>In stock: {inStock} {inStock > 0 ? "available" : "not available"}</h3>
                <h3>Company: {company}</h3>
                <h3>Category: {catagory}</h3>
                <hr/>
                <div className="counter">
                    <button onClick={()=>minus()}>-</button>
                    <h4>{counter}</h4>
                    <button onClick={()=>plus()}>+</button>
                </div>
                <button className="orderButton">
                    <NavLink to={`/cart/${_id}`} onClick={()=> addToCart(_id, productName, inStock, counter, color, price)}>Buy now</NavLink>
                </button><br/><br/>

                {loggedInUser && loggedInUser.isAdmin ? ( //if admin then show
                <>
                    <NavLink to={`/admin/admin-update-product/${_id}`} state={{...location.state}}><button>Update</button></NavLink>
                    <button>delete</button>
                </>
                ) : (<></>)}

            </div>

        </div>
        <div>


        </div>

        {/* comment section */}
        <div className="allComments">
            <div className="comments">
                    <h3>comment here</h3>
                    <form onSubmit={handelSubmitComment}>
                        <label>username:</label>
                        <input className="commentInput" name="username" value={postCommentTxt.username} onChange={commentHandelChange}/><br/>
                        <label>message:</label><br/>
                        <textarea className="commentInput" name="commentText" value={postCommentTxt.commentText} onChange={commentHandelChange} ></textarea><br/>
                        <button type="submit">post</button>
                    </form>
            </div>
            <h1>Reviews:</h1>
                {
                    Array.isArray(comment) && comment.map((curElem, index)=> {
                        const {commentText, the_commenter, createdAt} = curElem
                        //console.log(the_commenter[0].username)
                        return <div key={index}>
                            <div className="comments">
                                <h3>username: {the_commenter[0].username}</h3>
                                <h4>comment: {commentText}</h4>
                                <p>posted: {createdAt.slice(0,10)}</p>
                            </div>
                        </div>
                    })
                }
            
        </div>
    </>
}
export default SingleProduct