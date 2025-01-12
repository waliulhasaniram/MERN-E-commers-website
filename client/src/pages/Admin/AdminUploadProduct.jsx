import { useState } from "react"
import { useAuth } from "../../store/auth"
import { useNavigate } from "react-router-dom"

const AdminUploadProduct =()=>{
    const navigate = useNavigate()
    const {authorizationToken} = useAuth()
    const [uploadProduct, setUploadProduct] = useState({
        productName:'', description:'', inStock:'',  color:'', price:'', catagory:'', productAvatar:'', company:'' 
    })

    const handelChange =(e)=>{
        const name = e.target.name 
        const value = e.target.value 
        setUploadProduct({
            ...uploadProduct,
            [name]:value
        })
    }
    const handelSubmit =async(e)=>{
        e.preventDefault()
        
        // Append each field to the form data
        const formData = new FormData()
        formData.append("productName", uploadProduct.productName)
        formData.append("description", uploadProduct.description)
        formData.append('inStock', uploadProduct.inStock)
        formData.append('color', uploadProduct.color)
        formData.append('price', uploadProduct.price)
        formData.append('catagory', uploadProduct.catagory) 
        formData.append('company', uploadProduct.company)

        // Handling file input separately
        const fileField = document.querySelector('input[type="file"]')
        formData.append('productAvatar', fileField.files[0])

        try {
            const response = await fetch("http://localhost:3000/api/usables/products", {
                method: "POST",
                headers: {
                    Authorization: authorizationToken,
                },
                body: formData
            })
            if(response.ok){
                setUploadProduct({productName:'', description:'', inStock:'',  color:'', price:'', catagory:'', productAvatar:'', company:''})
                navigate("/product")
            }
        } catch (error) {
            console.log("product upload error", error)
        }
    }

    return <>
         <div className="reg_container">
            <div className="regForm">
            <form  encType="multipart/form-data" onSubmit={handelSubmit}>
            <h1>upload your product here</h1>
                    <div className="input_div">
                        <label>Product name: </label><br/>
                        <input type="text" name="productName" placeholder="product name" id="productName"  value={uploadProduct.productName} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>Description: </label><br/>
                        <textarea type="description" name="description" placeholder="description" id="description"  value={uploadProduct.description} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>In Stock: </label><br/>
                        <input type="number" name="inStock" placeholder="inStock" id="inStock" value={uploadProduct.inStock} onChange={handelChange}  required />
                    </div>
                    <div className="input_div">
                        <label>category: </label><br/>
                        <input type="text" name="catagory" placeholder="catagory" id="catagory"  value={uploadProduct.catagory} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>company: </label><br/>
                        <input type="text" name="company" placeholder="company" id="company"  value={uploadProduct.company} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>color: </label><br/>
                        <input type="text" name="color" placeholder="color" id="color"  value={uploadProduct.color} onChange={handelChange} required />
                    </div>
                    <div className="input_div">
                        <label>price: </label><br/>
                        <input type="number" name="price" placeholder="price" id="price"  value={uploadProduct.price} onChange={handelChange} required />
                    </div>

                    <label for="file">upload product photo </label>
                        <input type="file"  id="productAvatar" name="productAvatar" value={uploadProduct.productAvatar} onChange={handelChange} required/>

                    <div className="input_div">
                        <button type="submit">upload</button>
                    </div>
                </form>
            </div>
        </div> 
    </>
}

export default AdminUploadProduct