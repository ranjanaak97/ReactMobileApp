import React, { Component } from 'react';
import {Image, ImageBackground, View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { userRegister,userAuth } from '../actions/userAction';
import {connect} from 'react-redux';
class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
			email: '',
			password: '',
			errors: {},
		};
		this.validateForm = this.validateForm.bind(this);
		this.goToLogin = this.goToLogin.bind(this);
	}
	handleName = (text) => {
		this.setState({ name: text })
	}
	handlePhone = (text) => {
		this.setState({ phone: text })
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
		const { errors } = this.state;
		const n = this.state.name;
		const phn = this.state.phone;
		const emailaddr = this.state.email;
		const pass = this.state.password;
		const reg2 = /^[a-zA-Z\s]+$/;
		const reg = /^(?:\d{10}|\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$)$/;///^{(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))}$/;
		const reg1 = /^[0][1-9]\d{9}$|^[1-9]\d{9}$/;
		if(n === ''){
			errors.n = "Please put your name.";
		}
		else if(n.length>0 && !reg2.test(n)){
			errors.n = "Please provide correct name.";
		}
		else{
			errors.n='';
		}
		if(phn === ''){
			errors.phn = "Please add a phone number.";
		}
		else if(n.length>0 && !reg1.test(phn)){
			errors.phn = "Please provide correct phone number.";
		}
		else{
			errors.phn='';
		}

		if(emailaddr === '') {
			errors.emailaddr = "Email address cannot be empty.";
		}
		else if(emailaddr.length>0 && !reg.test(emailaddr)){
			errors.emailaddr = "Please provide correct email address";
		}
		else{
			errors.emailaddr = '';
		}

		if(pass === ''){
			errors.pass = "Password cannot be empty.";
		}
		else if(pass && pass.length<5){
			errors.pass="Password should be more than 5 characters.";
		}
		else{
			errors.pass ='';
		}
		//this.setState({ errors })
		if(errors.emailaddr === '' && errors.pass === '' && errors.n === '' && errors.phn === ''){
			const userinfo = {
				name:this.state.name,
				phone:this.state.phone,
				email: this.state.email,
				password: this.state.password
			}
			this.props.onRegister(userinfo)
		}
	}
    goToLogin(){
    	this.props.navigation.navigate('Login');
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
                <View>
  			           <Image source={require('./images/m.png')} style={styles.logoImage} />
  			           <Text style={styles.logoText}>Lets Get Started folks ! </Text>

			    </View>
                <View style={styles.SectionStyle}>
                <Image source={require('./images/ic_person.png')} style={styles.ImageStyle} />
 
			    <TextInput style = {{flex:1}}
				       underlineColorAndroid = "transparent"
				       placeholder = "Name"
				       placeholderTextColor = "#000000"
				       autoCapitalize = "none"
				       onChangeText = {this.handleName}/>
				    <Text style={styles.errorstyle}>{errors.n}</Text>
				</View>
                
                <View style={styles.SectionStyle}>
                <Image source={require('./images/p.png')} style={styles.ImageStyle} />
				<TextInput style = {{flex:1}}
				       underlineColorAndroid = "transparent"
				       placeholder = "Phone"
				       placeholderTextColor = "#000000"
				       autoCapitalize = "none"
				       onChangeText = {this.handlePhone}/>
				    <Text style={styles.errorstyle}>{errors.phn}</Text>
				</View>

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
				        onPress = {this.goToLogin}>
				        <Text style = {styles.submitButtonText}> Login </Text>
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
		onRegister: (userinfo) =>  dispatch(userRegister(userinfo)),
		userAuth: () => dispatch(userAuth())
	};
}
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Register);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		flex:1
	},
	ImageIconStyle:{
		 padding: 10,
   margin: 15,
   height: 25,
   width: '30%',
   resizeMode : 'stretch'
	},
   SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
	submitButton: {
		backgroundColor: '#000',
		borderRadius:30,
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
		color: '#ff0000',
		fontSize: 14,
		fontWeight: 'bold',
	}
})
