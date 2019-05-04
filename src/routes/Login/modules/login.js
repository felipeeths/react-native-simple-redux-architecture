import update from "react-addons-update";
import constants from "./actionConstants";
const axios = require('axios');
import AsyncStorage from '@react-native-community/async-storage';

const {
    ON_LOGIN,
    ON_LOGIN_ERROR,
    GET_USER_STORAGE,
} = constants;

export function onLogin(email, password) {
    return (dispatch, store) => {
        
            // handle success
        AsyncStorage.setItem('id_token',response.data.token);
        dispatch({
            type: ON_LOGIN,
            payload: response.data.token
        })        
        
     
    };
}
export function getUserStorage(){
    return(dispatch,store) =>{
        AsyncStorage.getItem('id_token').then((token) => {
            if(token != null){
                console.log(token)
                dispatch({
                    type: GET_USER_STORAGE,
                    payload: response.data
                })              
            }else {
                dispatch({
                    type: ON_LOGIN_ERROR,
                    payload: response.data
                }) 
            }
        });
    };
}

export function handleOnLoginError(state, action) {
    return update(state, {
        loginError: {
            $set: action.payload
        }
    })
}
export function handleGetUserStorage(state,action){
    return update(state,{
        ownerInfo:{
            $set:action.payload
        }
    });
}

export function handleOnLogin(state, action){
    return update(state,{
        loginSuccess:{
            $set:action.payload
        }
    });
}
const ACTION_HANDLERS = {
    ON_LOGIN_ERROR: handleOnLoginError,
    GET_USER_STORAGE: handleGetUserStorage,
    ON_LOGIN: handleOnLogin
}

const initialState = {
};

export function LoginReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}