import axios from 'axios'
import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_PAYMENT_METHOD,
    CART_SAVE_SHIPPING_ADDRESS
} from "../constants/cartConstants";

export const addToCard = (id, qty) => async (dispatch, getState) => {
    try {
        const { data }  = await axios.get(`/api/products/${id}`)

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                name: data.name,
                image: data.image,
                price: data.price,
                countInStock: data.countInStock,
                qty
            }
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error, 'Action addToCard')
    }
}

export const removeToCard = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: id
        })
        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        console.log(error, 'Action removeToCard')
    }
}

export const saveShippingAddress = (shippingAddress) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_SAVE_SHIPPING_ADDRESS,
            payload: shippingAddress
        })
        localStorage.setItem('shippingAddress', JSON.stringify(getState().cart.shippingAddress))
    } catch (error) {
        console.log(error, 'Action shippingCart')
    }

}

export const savePaymentMethod = (data) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CART_SAVE_PAYMENT_METHOD,
            payload: data
        })
        localStorage.setItem('paymentMethod', JSON.stringify(getState().cart.paymentMethod))
    } catch (error) {
        console.log(error, 'Action paymentMethod')
    }
}
