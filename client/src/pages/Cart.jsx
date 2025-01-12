import { NavLink } from "react-router-dom"
import { useCartContext } from "../store/ContextCart"
import { useState } from "react";

const Cart =()=>{
    const {cart, removeIten, total_price, shipping_fee} = useCartContext() 
    //console.log(cart)

    return <>
        <h1>Cart</h1>
        <div className="order_section">
            {Array.isArray(cart) && cart.map((cueElem, index)=>{
                let {_id, productName, inStock, counter, color, price} = cueElem
                return <>
                        <div key={index} className="singleOrder">
                            <h3>id: {_id}</h3>
                            <h3>product name: {productName}</h3>

                            <h4>{counter}</h4>
                        
                            <h3>color: {color}</h3>
                            <h3>total price: {price*counter}</h3>
                            <button onClick={()=> removeIten(_id)}>remove</button>
                        </div>
                </>
            })}

        </div>
            <div className="orderButton">
                <button><NavLink to="/product">Shop more</NavLink></button>
                <button>Order</button>
                
            </div>
        <div className="totalPrice">
            <h2>Price to pay: {total_price}</h2>
            <h2>shipping cost: {shipping_fee}</h2>
        </div>
    </>
}

export default Cart


