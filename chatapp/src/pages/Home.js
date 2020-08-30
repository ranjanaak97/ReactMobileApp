import React, { Component } from 'react';
import {FlatList,Image, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userList } from '../actions/userAction';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

type Props = {
  name?: string,
};
class Home extends React.Component<Props>{

	  static navigationOptions = ({navigation}) => ({
    title: 'Friend List of '+(navigation.state.params || {}).name || 'Friend List!',
  });
	   state = {
    users: []
  };

	/*constructor(props) {
		super(props);
		this.state = {
			users: []
		};
		this.logout = this.logout.bind(this);
	}*/

	componentDidMount() {
		this.props.onUserList();
	}
	goToChat = (userid,name) => {
		this.props.navigation.navigate('Chat', {userid:userid,name:name});
	}
	logout() {
		AsyncStorage.removeItem('usercred');
		this.props.navigation.navigate('Login');
	}
	componentDidUpdate(nextProps){
    	if(this.props.userReducer && this.props.userReducer.userList && this.props.userReducer.userList!==nextProps.userReducer.userList && this.props.userReducer.userListSuccess===true){
    		this.setState({users: this.props.userReducer.userList});
    	}
    }

    render(){
    	const { users } = this.state;
    	return (
    	    <ImageBackground source={require('./images/x.jpg')} style = {styles.mycontainer}>
    		<View style ={styles.mycontainer}>
    		{users && users.length>0 ?
    		<View>
    		{users.map((item,index) => {
    			return (<TouchableOpacity style={styles.design} onPress={() => this.goToChat(item._id, item.name)} key={index}>
    			<Text style={styles.item}>
    			 {item.name}
    			</Text>
    			</TouchableOpacity>
    		)})}
    	</View>: null}
    	 <TouchableOpacity
				        style = {styles.submitButton}
				        onPress = {()=>this.logout()}>
				        <Text style = {styles.submitButtonText}> Logout! </Text>
		 </TouchableOpacity>
    	 </View>
         </ImageBackground>
    	)
    }
}
function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}
function mapDispatchToProps(dispatch) {
	return {
		onUserList: () =>  dispatch(userList())
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);
const styles=StyleSheet.create({
	submitButton: {
		backgroundColor: '#000',
		padding: 10,
		margin: 10,
		height: 20,
	},
	submitButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight:'bold'
	},
	mycontainer: {
		fontSize: 12,
		color: '#ffffff',
		//justifyContent: 'center',
		//alignItems: 'center',
		flex:1
	},
	item: {
		fontSize:25,
		color:'black'
	},
		submitButton: {
		borderRadius:30,
		backgroundColor: '#000',
		padding: 10,
		margin: 15,
		height: 40,
	},
	submitButtonText: {
		color: 'white',
		fontSize: 18,
		fontWeight:'bold'
	},
	design: {
		borderWidth: 1,
		borderColor: "#000",
		padding:10
	}
});

