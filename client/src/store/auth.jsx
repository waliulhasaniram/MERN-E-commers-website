import { createContext, useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie"

const AuthContext = createContext()

export const AuthProvider =({children})=>{
    const [loggedInUser, setLoggedInUser] = useState()
    const [allProductData, setAllProductData] = useState()
    const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"))
    const [isLoading, setIsLoading] = useState(true) 
    
    // const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(3)
    const [pageCount, setPageCount] = useState(1)
    const currentPage = useRef()
    
    const authorizationToken = `Bearer ${accessToken}`
    const isLoggedIn = !!accessToken

    const storeAccessToken =(storeToken)=>{
        setAccessToken(storeToken)
        return Cookies.set("accessToken", storeToken)
    }

    const loggout =async()=>{
        const response = await fetch("http://localhost:3000/api/user/logout", {
            method: "POST",
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            setAccessToken("")
            Cookies.remove("accessToken")
        }
    }

    const getUserData =async()=> {
        setIsLoading(true)
        const response = await fetch("http://localhost:3000/api/user/getuser", {
            method: "GET", 
            headers: {
                Authorization: authorizationToken
            }
        })
        if(response.ok){
            const res_user = await response.json()
            setLoggedInUser(res_user.data)
            setIsLoading(false)
        }
    }

    //all products
    const getAllProductData =async()=>{
        setIsLoading(true)
        const response = await fetch(`http://localhost:3000/api/usables/allproducts?page=${currentPage.current || 1}&limit=${limit || 3}`, {
            method: "GET", 
        })

        if(response.ok){
            const res_product = await response.json()
            //console.log(res_product.data)
            setAllProductData(res_product.data.results)
            setPageCount(res_product.data.pageCount)
            setIsLoading(false)
        }
    }

    ///search products
    const getSearchProducts =async(searchQuery)=>{
        setIsLoading(true)
        const response = await fetch(`http://localhost:3000/api/usables/filter-products/search?productName=${searchQuery}&page=${currentPage.current}&limit=${limit || 3}` ,{
                method: "GET"
        })
        if(response.ok){
            const res_product = await response.json()
            //console.log(res_product.data)
            if(res_product.data.length !== 0){    /// res_product.data-> [{..}] and length zero means-> [] 
                setAllProductData(res_product.data)
                
            }else{
                getAllProductData()
                
            }
        }
        setIsLoading(false)
    }

    //filter product
    const getFilterProduct =async(catagory, company, sort, page, limit)=>{
        setIsLoading(true)
        //const url = `http://localhost:3000/api/usables/filter-products/filter?${catagory ? `catagory=${catagory}` : ''}${company ? `&company=${company}`:''}${sort ? `&sort=${sort}` : ''}`
        const url = `http://localhost:3000/api/usables/filter-products/filter?page=${currentPage.current || 1}&limit=${limit || 3}${catagory ? `&catagory=${catagory}` : ''}${company ? `&company=${company}` : ''}${sort ? `&sort=${sort}` : ''}`
        const response = await fetch(url, {
            method: "GET"
        })
        if(response.ok){
            const res_product = await response.json()
            if(res_product.data && res_product.data.length !== 0){
                //console.log(res_product.data.filterData)
                setAllProductData(res_product.data.filterData)
                setIsLoading(false)
            }else{
                getAllProductData()
                setIsLoading(false)
            }
        }
    }
    useEffect(()=>{
        currentPage.current = 1
        getAllProductData()
        getFilterProduct()
    },[limit]);

    useEffect(()=>{
        getUserData()
    },[])

    return <AuthContext.Provider value={{isLoggedIn, storeAccessToken, loggout, getSearchProducts, getFilterProduct, getAllProductData,
        currentPage, pageCount,  limit, loggedInUser, allProductData, authorizationToken}}>{children}</AuthContext.Provider>
}

export const useAuth =()=>{
    const contextData = useContext(AuthContext)
    return contextData
}

