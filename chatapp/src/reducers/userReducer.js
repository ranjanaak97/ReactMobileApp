import {
	LOG_LOAD,
	LOG_DONE,
	LOG_FAIL,
	REG_LOAD,
	REG_DONE,
	REG_FAIL,
	USER_LOAD,
	USER_DONE,
	USER_FAIL,
	USER_AUTH_DONE,
	USER_AUTH_FAIL
} from '../actions/constants';

const initialState = {
	userAuth: {},
	userAuthSuccess: false,
	userList: [],
	userListSuccess: false
}

export default function userReducer(state,action){
	if(typeof state === 'undefined') {
		return initialState
	}
	switch(action.type){
		case LOG_LOAD:
		return{
			...state,
			userAuthSuccess: false
		}
		case LOG_DONE:
		return{
			...state,
			userAuthSuccess:true,
			userAuth:action.payload
		}
		case LOG_FAIL:
		return{
			...state,
			userAuthSuccess:false,
			userAuth:action.payload
		}
		case REG_LOAD:
		return{
			...state,
			userAuthSuccess: false
		}
		case REG_DONE:
		return{
			...state,
			userAuthSuccess:true,
			userAuth:action.payload
		}
		case REG_FAIL:
		return{
			...state,
			userAuthSuccess:false,
			userAuth:action.payload
		}
		case USER_LOAD:
		return{
			...state,
			userListSuccess: false
		}
		case USER_DONE:
		return{
			...state,
			userListSuccess:true,
			userList:action.payload
		}
		case USER_FAIL:
		return{
			...state,
			userListSuccess:false,
			userList:action.payload
		}
		case USER_AUTH_DONE:
		return{
			...state,
			userAuthSuccess:true,
			userAuth:action.payload
		}
		case USER_AUTH_FAIL:
		return{
			...state,
			userAuthSuccess:false,
			userAuth:action.payload
		}
		default:
		return state;
	}
}