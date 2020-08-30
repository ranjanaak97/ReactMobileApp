import axios from 'axios';
import {
	CHAT_INSERT_LOAD,
	CHAT_INSERT_DONE,
	CHAT_INSERT_FAIL,
	CHAT_LIST_LOAD,
	CHAT_LIST_DONE,
	CHAT_LIST_FAIL
} from '../actions/constants';
import { SERVERURL } from '../../config';

export function chatInsertLoading(){
	return {
		type: CHAT_INSERT_LOAD,
	};
}
export function chatInsertSuccess(payload) {
	return{
		type: CHAT_INSERT_DONE,
		payload: payload
	};
}
export function chatInsertFailure(payload) {
	return{
		type: CHAT_INSERT_FAIL,
		payload: payload
	};
}
export function chatInsert(chatdetails){
	const data=chatdetails;
	return(dispatch) => {
		dispatch(chatInsertLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${ SERVERURL }chatInsert`,
			crossDomain: true,
			data,
		}).then((res) => {
			if(res.status === 200) {
				dispatch(chatInsertSuccess(res.data));
			}
		}).catch((error) => {
			if(error.response) {
				dispatch(chatInsertFailure(error.response));
			}
		});
	};
}
export function chatListLoading(){
	return {
		type: CHAT_LIST_LOAD,
	};
}
export function chatListSuccess(payload) {
	return{
		type: CHAT_LIST_DONE,
		payload: payload
	};
}
export function chatListFailure(payload) {
	return{
		type: CHAT_LIST_FAIL,
		payload: payload
	};
}
export function chatList(chatdetails){
	const data=chatdetails;
	return(dispatch) => {
		dispatch(chatListLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${ SERVERURL }chatList`,
			crossDomain: true,
			data,
		}).then((res) => {
			if(res.status === 200) {
				dispatch(chatListSuccess(res.data));
			}
		}).catch((error) => {
			if(error.response) {
				dispatch(chatListFailure(error.response));
			}
		});
	};
}