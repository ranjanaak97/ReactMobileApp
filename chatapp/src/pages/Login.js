import React, { Component } from 'react';
import {Image, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userLogin,userAuth } from '../actions/userAction';
import { connect } from 'react-redux';
//import axios from 'axios';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: '',
			password: '',
			errors: {},
		};
		this.validateForm = this.validateForm.bind(this);
		this.goToRegister = this.goToRegister.bind(this);
	}
	handleEmail = (text) => {
		this.setState({ email: text })
	}
	handlePassword = (text) => {
		this.setState({ password: text })
	}

	componentDidMount () {
		this.props.userAuth()
	}
	validateForm(){
        console.log('hello');
		const { errors } = this.state;
		const emailaddr = this.state.email;
		const pass = this.state.password;
		const reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
		if(emailaddr === '') {
			console.log('working');
			errors.emailaddr = "Email address cannot be empty.";
		}
		else if(emailaddr.length>0 && !reg.test(emailaddr)){
			errors.emailaddr = "Please provide correct email address";
		}
		else {
			errors.emailaddr = '';
		}

		if(pass === '') {
			errors.pass = "Password cannot be empty.";
		}
		else if(pass && pass.length<5){
			errors.pass="Password should be more than 5 characters.";
		}
		else {
			errors.pass ='';
		}
		//console.log(errors);
		this.setState({ errors })
		if(errors.emailaddr === '' && errors.pass === ''){
			const userinfo = {
				email: this.state.email,
				password: this.state.password
			}
			this.props.onLogin(userinfo)
		}
	}
	goToRegister(){
    	this.props.navigation.navigate('Register');
    }
    componentDidUpdate(nextProps){
    	if(this.props.userReducer && this.props.userReducer.userAuth && this.props.userReducer.userAuth!==nextProps.userReducer.userAuth && this.props.userReducer.userAuthSuccess===true){
    		this.props.navigation.navigate('Home',{name:this.props.userReducer.userAuth.name});
    	}
    }
	render() {
		const { errors } = this.state;
		return (
			<ImageBackground source={require('./images/xx.gif')} style = {styles.container}> 
  			           <Image source={require('./images/m.png')} style={styles.logoImage} />
  			           <Text style={styles.logoText}>Welcome back ! </Text>
				  <View style={styles.SectionStyle}>
                <Image source={require('./images/e.png')} style={styles.ImageStyle} />
				<TextInput style = {{flex:1}}
				       underlineColorAndroid = "transparent"
				       placeholder = "Email"
				       placeholderTextColor = "#000000"
				       autoCapitalize = "none"
				       onChangeText = {this.handleEmail}/>
				    <Text style={styles.errorstyle}>{errors.emailaddr}</Text>
				</View>
                
                <View style={styles.SectionStyle}>
                <Image source={require('./images/pss.png')} style={styles.ImageStyle} />
				 <TextInput style = {{flex:1}}
				       underlineColorAndroid = "transparent"
				       placeholder = "Password"
				       placeholderTextColor = "#000000"
				       autoCapitalize = "none"
				       secureTextEntry={true}
				       onChangeText = {this.handlePassword}/>
				    <Text style={styles.errorstyle}>{errors.pass}</Text>
				</View>

				    

				    <TouchableOpacity
				        style = {styles.submitButton}
				        onPress = {this.validateForm}>
				        <Text style = {styles.submitButtonText}> Submit </Text>
				    </TouchableOpacity>

				    <TouchableOpacity
				        style = {styles.submitButton}
				        onPress = {this.goToRegister}>
				        <Text style = {styles.submitButtonText}> Register Now! </Text>
				    </TouchableOpacity>



			</ImageBackground>

        );
    }
}
function mapStateToProps(state) {
	return {
		userReducer: state.userReducer
	};
}
function mapDispatchToProps(dispatch) {
	return {
		onLogin: (userinfo) =>  dispatch(userLogin(userinfo)),
		userAuth: () => dispatch(userAuth())
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex:1
	},
	  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    height: 40,
    borderRadius: 5 ,
    margin: 15,
    width: '70%'
},
 
ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode : 'stretch',
    alignItems: 'center'
},
	/*headerImage: {
		width: 250,
		height: 200,
		marginHorizontal: 10
	},
	headerTitle: {
		flexDirection: 'column'
	},*/
	input: {
		borderRadius:30,
		margin: 15,
		height: 40,
		borderColor: '#000',
		borderWidth: 1,
		width:'70%',
		padding: 10,
		fontSize: 16,
		lineHeight: 20,
		color:'#000'
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
	errorstyle: {
		color: 'black',
		fontSize: 14
	},
	logoImage: {
		width: 120,
		height: 90,
		justifyContent: 'center',
		alignItems: 'center',
		marginHorizontal: 10,
	},
	logoText: {
		fontWeight: 'bold',
		color: "blue",
		fontSize: 20
	},
})
