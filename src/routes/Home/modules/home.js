import update from "react-addons-update";
import constants from "./actionConstants";
const axios = require('axios');

const {
    GET_ORDERS
} = constants;


export function getOrders() {
    return (dispatch, store) => {
        
        // handle success
        dispatch({
            type: GET_ORDERS,
            payload: []
        })

     
    };
}

export function handleGetOrders(state, action) {
    return update(state, {
        orders: {
            $set: action.payload
        }
    })
}

const ACTION_HANDLERS = {
    GET_ORDERS: handleGetOrders
}

const initialState = {
    
};

export function HomeReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}