import {
	CHAT_INSERT_LOAD,
	CHAT_INSERT_DONE,
	CHAT_INSERT_FAIL,
	CHAT_LIST_LOAD,
	CHAT_LIST_DONE,
	CHAT_LIST_FAIL
} from '../actions/constants';

const initialState = {
	chatInsert: {},
	chatInsertSuccess: false,
	chatList: [],
	chatListSuccess: false
}

export default function chatReducer(state,action){
	if(typeof state === 'undefined') {
		return initialState
	}
	switch(action.type){
		case CHAT_INSERT_LOAD:
		return{
			...state,
			chatInsertSuccess: false
		}
		case CHAT_INSERT_DONE:
		return{
			...state,
			chatInsertSuccess:true,
			chatInsert:action.payload
		}
		case CHAT_INSERT_FAIL:
		return{
			...state,
			chatInsertSuccess:false,
			chatInsert:action.payload
		}
		case CHAT_LIST_LOAD:
		return{
			...state,
			chatListSuccess: false
		}
		case CHAT_LIST_DONE:
		return{
			...state,
			chatListSuccess:true,
			chatList:action.payload
		}
		case CHAT_LIST_FAIL:
		return{
			...state,
			chatListSuccess:false,
			chatList:action.payload
		}
		default:
		return state;
	}
}