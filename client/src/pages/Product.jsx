import { useAuth } from "../store/auth"
import {NavLink} from "react-router-dom"
import FilterSection from "./FilterSection"
import ReactPaginate from 'react-paginate';

const Product =()=>{
    const {allProductData, getAllProductData, pageCount, currentPage} = useAuth()
    //console.log(allProductData)
        
    const handlePageClick=(e)=>{
        console.log(e)
        currentPage.current = e.selected+1
        getAllProductData()
    }

    return <>
        <div className="product_page">
            <div className="filter_section">
                <FilterSection />
            </div>
            <div className="product_section">
                {Array.isArray(allProductData) && allProductData.map((curELem, index)=>{
                    const {_id, productName, productAvatar, price, company} = curELem
                    return <div key={index}>
                                <NavLink to={`/singleproduct/${_id}`} state={{...curELem}}>
                                    <div className="card">
                                        <img className="image" src={productAvatar} alt="image"/>
                                        <div className="name_price">
                                            <div><h4>{productName}</h4><h4>Company: {company}</h4></div>
                                            <div><h4>Price: {price}</h4></div>
                                        </div> 
                                    </div>
                                </NavLink>
                            </div>
                })}
            </div>
        </div>


      <div className="pagination">
            <ReactPaginate
            className="pagination"
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
            />
      </div>

    </>
}

export default Product