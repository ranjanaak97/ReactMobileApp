import axios from 'axios';
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
import { SERVERURL } from '../../config';
import AsyncStorage from '@react-native-community/async-storage';

export function loginLoading(){
	return {
		type: LOG_LOAD,
	};
}
export function loginSuccess(payload) {
	return{
		type: LOG_DONE,
		payload: payload
	};
}
export function loginFailure(payload) {
	return{
		type: LOG_FAIL,
		payload: payload
	};
}
export function userLogin(userinfo){
	const data=userinfo;
	return(dispatch) => {
		dispatch(loginLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${SERVERURL}loginuser`,
			crossDomain: true,
			data,
		}).then((res) => {
			console.log(res);
			if(res.status === 200) {
				const usercred = JSON.stringify(res.data);
				AsyncStorage.setItem('usercred',usercred);
				dispatch(loginSuccess(res.data));
			}
		}).catch((error) => {
			console.log(error);
			if(error.response.status === 400) {
				dispatch(loginFailure(error.response));
			}
		});
	};
}
export function registerLoading(){
	return {
		type: REG_LOAD,
	};
}
export function registerSuccess(payload) {
	return{
		type: REG_DONE,
		payload: payload
	};
}
export function registerFailure(payload) {
	return{
		type: REG_FAIL,
		payload: payload
	};
}
export function userRegister(userinfo){
	const data=userinfo;
	return(dispatch) => {
		dispatch(registerLoading());
		axios({
			method: "POST",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${ SERVERURL }registeruser`,
			crossDomain: true,
			data,
		}).then((res) => {
			if(res.status === 200) {
				const usercred = JSON.stringify(res.data);
				AsyncStorage.setItem('usercred',usercred);
				dispatch(registerSuccess(res.data));
			}
		}).catch((error) => {
			if(error.response.status === 400) {
				dispatch(registerFailure(error.response));
			}
		});
	};
}
export function userListLoading(){
	return {
		type: USER_LOAD,
	};
}
export function userListSuccess(payload) {
	return{
		type: USER_DONE,
		payload: payload
	};
}
export function userListFailure(payload) {
	return{
		type: USER_FAIL,
		payload: payload
	};
}
export function userList(){
	//const data=userinfo;
	return(dispatch) => {
		dispatch(userListLoading());
		axios({
			method: "GET",
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			url: `${SERVERURL}userList`,
			crossDomain: true,
		}).then((res) => {
			if(res.status === 200) {
				dispatch(userListSuccess(res.data));
			}
		}).catch((error) => {
			console.log(error);
			if(error.response) {
				dispatch(userListFailure(error.response));
			}
		});
	};
}
export function userAuthSuccess(payload) {
	return{
		type: USER_AUTH_DONE,
		payload: payload
	};
}
export function userAuthFailure(error) {
	return{
		type: USER_AUTH_FAIL,
		payload: error
	};
}
export function userAuth() {
	return async function (dispatch) {
		try {
			AsyncStorage.getItem('usercred')
			.then((value) => {
				console.log(value);
				const res = JSON.parse(value);
				dispatch(userAuthSuccess(res));
			});
		} catch(error) {
			dispatch(userAuthFailure(error))
		}
	}
}