import { useEffect } from "react"

export default function reducer (state, actions){
    switch (actions.type) {
        case "ADD_TO_CART":
            let { _id, productName, inStock, counter, color, price } = actions.payload; 
            let productExists = state.cart.find((curItem) => curItem._id === _id);

            if (productExists) {
                let updateProduct = state.cart.map((curElem) => { 
                    if (curElem._id === _id) {
                        let newAmount = curElem.counter + counter;
                        if (newAmount >= curElem.inStock) { newAmount = curElem.inStock; }
                        return { ...curElem, counter: newAmount };
                    } else {
                        return curElem;
                    }
                });
                return {
                    ...state,
                    cart: updateProduct
                };
            } else {
                let cartProduct = {
                    _id: _id,
                    productName: productName,
                    inStock: inStock,
                    counter: counter,
                    color: color,
                    price: price
                };
                return {
                    ...state,
                    cart: [...state.cart, cartProduct]
                };
            }


        case "REMOVE_ITEM":
            const afterDeletingOne = state.cart.filter((curElem)=> curElem._id !== actions.payload)

            return {
                ...state,
                cart: afterDeletingOne
            } 
        case "TOTAL_PRICE_TO_PAY":
            let total_price = state.cart.reduce((initialValue, curElem)=>{
                let {price, counter} = curElem

                initialValue = initialValue + price*counter
                return initialValue
            }, 0)
            return {
                ...state,
                total_price: total_price
            }    
        
        default:
            return state;
    }
}
