import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "./CartReducer";

const CartContext = createContext()

const getCartItems=()=>{ /// get localStorage data
    let localCartData = localStorage.getItem("cartitems")
    if(localCartData == []) {
        return []
    }else{
        return JSON.parse(localCartData)
    }
}

const initialstate = {
    cart: getCartItems(),
    total_item: '',
    total_price: '',
    shipping_fee: 'free'
}

export const CartProvider =({children})=>{
    const [state, dispatch] = useReducer(reducer, initialstate)

    const addToCart =(_id, productName, inStock, counter, color, price)=>{
        dispatch({type: "ADD_TO_CART", payload: {_id, productName, inStock, counter, color, price}})
    }

    const removeIten =(_id)=>{
        dispatch({type: "REMOVE_ITEM", payload:_id})
    }

    // set and get cart data to localStorage
    useEffect(()=>{
        dispatch({type: "TOTAL_PRICE_TO_PAY"})
        localStorage.setItem("cartitems", JSON.stringify(state.cart))
    },[state.cart])

    return <CartContext.Provider value={{...state, addToCart, removeIten}}>{children}</CartContext.Provider>
}

export const useCartContext =()=>{
    const cartContectValue = useContext(CartContext)
    return cartContectValue;
}