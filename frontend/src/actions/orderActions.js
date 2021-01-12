import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    DETAILS_ORDER_SUCCESS,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_FAIL,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_REQUEST,
    PAY_ORDER_FAIL,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL
} from "../constants/orderConstants"
import axios from "axios"

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/orders', order, config)
        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: DETAILS_ORDER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/${id}`, config)
        debugger
        dispatch({
            type: DETAILS_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DETAILS_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}


export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: PAY_ORDER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
        debugger
        dispatch({
            type: PAY_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: PAY_ORDER_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_MY_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({ type: ORDER_LIST_MY_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_MY_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/orders`, config)

        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
        })
    }
}