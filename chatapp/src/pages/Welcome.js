import React, { Component } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

export default class Welcome extends Component {
  constructor(props) {
    super(props);
    setTimeout(() => {
      this.props.navigation.navigate('Login')
    },5000);
    this.state = {
      animating: false,
      align: 'center',
      alignsecond: false,
    };
    setTimeout(
      () =>
        this.setState({ align: 'flex-start' }, function() {
          this.setState({
            alignsecond: true,
          });
        }),
      3000
    );
  }
  
  render() {
    return (
      <ImageBackground source={require('./images/y.jpg')} style={{justifyContent: 'center',
    alignItems: 'center',
    flex:1}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: this.state.align,
          marginHorizontal: 40,
        }}>
        <Image
          source={require('./images/hello.gif')}
          style={{ width: 120, height: 150 }}
        />
        {!this.state.alignsecond ? null : (
          <View style={{ margin: 10 }}>
            <Text
              style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Welcome to My Chat App
            </Text>
          </View>
        )}
      </View>
      </ImageBackground>
    );
  }
}