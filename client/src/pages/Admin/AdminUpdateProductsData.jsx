import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../store/auth"

const AdminUpdateProductsData =()=>{
        const navigate = useNavigate()
        const {authorizationToken} = useAuth()

        const location = useLocation()
        //console.log(location.state)
        const {_id, productName, description, inStock, color, price, catagory, productAvatar, company} = location.state    

        const [updateProduct, setUpdateProduct] = useState({
            productName:'', description:'', inStock:'',  color:'', price:'', catagory:'', productAvatar:'', company:'' 
        })
    
        useEffect(()=>{
            setUpdateProduct({productName:productName, description:description, inStock:inStock, color:color, price:price, catagory:catagory, 
                company:company})
        },[])

        const handelChange =(e)=>{
            const name = e.target.name 
            const value = e.target.value 
            setUpdateProduct({
                ...updateProduct,
                [name]:value
            })
        }
        const handelSubmit =async(e)=>{
            e.preventDefault()
            try {
                // const formData = new FormData()
                // formData.append('productName', updateProduct.productName)
                // formData.append("description", updateProduct.description)
                // formData.append('inStock', updateProduct.inStock)
                // formData.append('color', updateProduct.color)
                // formData.append('price', updateProduct.price)
                // formData.append('catagory', updateProduct.catagory) 
                // formData.append('company', updateProduct.company)

                try {
                    const response = await fetch(`http://localhost:3000/api/usables/update-product/${_id}`, {
                        method: "PATCH",
                        headers: {
                            Authorization: authorizationToken,
                            'Content-Type' : 'application/json'
                        },
                        body: JSON.stringify(updateProduct)
                    })
                    if(response.ok){
                        setUpdateProduct({productName:'', description:'', inStock:'',  color:'', price:'', catagory:'', productAvatar:'', company:''})
                        navigate("/product")
                    }
                } catch (error) {
                    console.log("product upload error", error)
                }
                
            } catch (error) {
                console.log("product upload error", error)
            }
        }
        
    return <>
   <div className="reg_container">
            <div className="regForm">
            <form encType="multipart/form-data" onSubmit={handelSubmit}>
            <h1>Update your product here</h1>
                    <div className="input_div">
                        <label>Product name: </label><br/>
                        <input type="text" name="productName" placeholder="product name" id="productName"  value={updateProduct.productName} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>Description: </label><br/>
                        <textarea type="description" name="description" placeholder="description" id="description"  value={updateProduct.description} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>In Stock: </label><br/>
                        <input type="number" name="inStock" placeholder="inStock" id="inStock" value={updateProduct.inStock} onChange={handelChange}  required />
                    </div>
                    <div className="input_div">
                        <label>category: </label><br/>
                        <input type="text" name="catagory" placeholder="catagory" id="catagory"  value={updateProduct.catagory} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>company: </label><br/>
                        <input type="text" name="company" placeholder="company" id="company"  value={updateProduct.company} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>color: </label><br/>
                        <input type="text" name="color" placeholder="color" id="color"  value={updateProduct.color} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>price: </label><br/>
                        <input type="number" name="price" placeholder="price" id="price"  value={updateProduct.price} onChange={handelChange} required />
                    </div>

                    <label for="file">upload product photo </label>
                        <input type="file"  id="productAvatar" name="productAvatar" value={updateProduct.productAvatar} onChange={handelChange} />

                    <div className="input_div">
                        <button type="submit">update</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}

export default AdminUpdateProductsData