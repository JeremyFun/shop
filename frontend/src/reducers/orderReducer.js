import {
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    DETAILS_ORDER_FAIL,
    DETAILS_ORDER_REQUEST,
    DETAILS_ORDER_SUCCESS
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
            return { ...state }
    }
}

export const detailsOrderReducer = (state = { orderItems: [], shippingAddress: {}, loading: true }, action) => {
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
            return { ...state }
    }
}