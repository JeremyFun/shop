import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DETAILS_ORDER_FAIL,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_SUCCESS,
    PAY_ORDER_FAIL,
    PAY_ORDER_REQUEST,
    PAY_ORDER_SUCCESS,
    PAY_ORDER_RESET,
    ORDER_LIST_MY_REQUEST,
    ORDER_LIST_MY_SUCCESS,
    ORDER_LIST_MY_FAIL,
    ORDER_LIST_MY_RESET,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../constants/orderConstants";

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_ORDER_REQUEST:
            return {
                loading: true
            }
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false, success: true, order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return {...state}
    }
}

export const detailsOrderReducer = (state = {orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case DETAILS_ORDER_REQUEST:
            return {
                ...state, loading: true
            }
        case DETAILS_ORDER_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }
        case DETAILS_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return {...state}
    }
}


export const payOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case PAY_ORDER_REQUEST:
            return {
                loading: true
            }
        case PAY_ORDER_SUCCESS:
            return {
                loading: false,
                success: true
            }
        case PAY_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case PAY_ORDER_RESET:
            return {}
        default:
            return {...state}
    }
}

export const orderListMyReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_MY_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_MY_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case ORDER_LIST_MY_RESET:
            return {
                orders: []
            }
        default:
            return state
    }
}

export const orderListReducer = (state = {orders: []}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false,
                orders: action.payload
            }
        case ORDER_LIST_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}