import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"

const FilterSection =()=>{
    const {getAllProductData, getSearchProducts, getFilterProduct} = useAuth()
    const [search, setSearch] = useState('')

    const [filterCatagory, setAllFilterCatagory] = useState()
    const [filterCompnay, setFilterCompany] = useState()

    const [selectCatagory, setSelectCatagory] = useState('')
    const [selectCompany, setSelectCompany] = useState('')

    const [sortOrder, setSortOrder] = useState('');

    const getCatagoryCompanyDataForFilter =async()=>{
        const response = await fetch("http://localhost:3000/api/usables/filter-product", {
            method: "GET"
        })
        if(response.ok){
            const res_data = await response.json()

            const dataCatagory = res_data.data.getCatagory                                    //array of objects
            const uniqueCatagorySet = new Set(dataCatagory.map(item=> item.catagory))        //unique catagory value (as set)
            const uniqueCatagory = ["All", ...uniqueCatagorySet]                            // spread operator to convert it to an array  
            const uniqueCatagoryObject = uniqueCatagory.map(catagory=> ({catagory}))       //converting the array to an object again
            setAllFilterCatagory(uniqueCatagoryObject) 
            
            const dataCompany = res_data.data.getCompany                                //array of objects
            const uniqueCompanySet = new Set(dataCompany.map(item=> item.company))     //unique catagory value (as set)\
            const uniqueCompany = ["All", ...uniqueCompanySet]                        // spread operator to convert it to an array  
            const uniqueCompanyObject = uniqueCompany.map(company=> ({company}))     //converting the array to an object again
            setFilterCompany(uniqueCompanyObject)
            
        }
    }
    useEffect(()=>{
        getCatagoryCompanyDataForFilter()
    },[])

    const handelSearchChange =(e)=>{
        const value = e.target.value 
        setSearch(value)
        getSearchProducts(search) //search is useStast value 
        
    }

    const handelCatagoryClick =async(catagory)=>{
        if(catagory === "All") {
            setSelectCatagory('')
            getAllProductData();}
        else {
            setSelectCatagory(catagory)
            getFilterProduct(catagory, selectCompany, sortOrder)
        }
    }

    const handelCompanyClick =async(company)=>{
        if(company === "All") {
            setSelectCompany('')  
            getAllProductData()}
        else{
            setSelectCompany(company)
            getFilterProduct(selectCatagory, company, sortOrder)
        }
    }

    const handleSortChange = async(order) => { 
        setSortOrder(order);
        const sortByPrice = order
        getFilterProduct(selectCatagory, selectCompany, sortByPrice); 
    }

    const handleClearFilter =async()=>{
        setSearch('')
        setSelectCatagory('')
        setSelectCompany('') 
        setSortOrder('');
        getAllProductData();
    }

    return <>
        <div className="filter_div">
        <input className="filter_input" placeholder="search" name="search" value={search} onChange={handelSearchChange} />

            <p>Category</p>
            {Array.isArray(filterCatagory) && filterCatagory.map((curElem, index)=>{
                return <div key={index}>
                    <button className={curElem.catagory === selectCatagory ? 'activeFilter' : 'filterButton'}
                    onClick={()=> handelCatagoryClick(curElem?.catagory)}> {curElem.catagory} </button>
                </div>
            })}
        </div>
        <div className="filter_div">
            <p>Company</p>
            {Array.isArray(filterCompnay) && filterCompnay.map((curElem, index)=>{
                return <div key={index}>
                    <button className={curElem.company === selectCompany ? 'activeFilter': 'filterButton'} 
                    onClick={()=> handelCompanyClick(curElem?.company)}> {curElem.company} </button>
                </div>
            })}
        </div>

        <div className="filter_div">
            <p>Sort by price</p>
            <button onClick={()=> {handleSortChange('asc')}}>low to high</button>
            <button onClick={()=> handleSortChange('desc')}>high to low</button>
        </div>

        <div className="filter_div">
            {/* <p>Price range</p> 
            <input type="range" name="price" min={0} />  */}
            <p>Remove Filter</p>
            <button className="clearFilter" onClick={()=> handleClearFilter()}>Clear filter</button>
               
        </div>    
    </>
}

export default FilterSection