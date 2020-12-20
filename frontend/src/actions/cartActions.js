import axios from 'axios'
import {CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants";

const setItemToLocalStorage = (getState, name = 'cartItems') => {
    localStorage.setItem(name, JSON.stringify(getState().cart.cartItems))
}

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
        setItemToLocalStorage(getState)
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
        setItemToLocalStorage(getState)
    } catch (error) {
        console.log(error, 'Action removeToCard')
    }
}