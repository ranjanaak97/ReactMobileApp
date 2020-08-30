import React, { Component } from 'react';
import { GiftedChat, Bubble, Day,Send } from 'react-native-gifted-chat';
import { connect } from 'react-redux';
import { View,ImageBackground,Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { chatInsert, chatList } from '../actions/chatAction';
import SocketIOClient from 'socket.io-client';
import { SERVERURL } from '../../config';

type Props = {
  name?: string,
};

class Chat extends React.Component<Props> {

  static navigationOptions = ({ navigation }) => ({
    title: 'Chatting with '+(navigation.state.params || {}).name || 'Chat!',
  });
  state = {
    userid: this.props.navigation.state.params.userid,
    messages: [],
  };


  componentDidMount() {
    this.socket = SocketIOClient('http://192.168.1.211:8082');
    const data = {
      receiver_id: this.props.navigation.state.params.userid,
      sender_id: this.props.userReducer.userAuth._id
    }
    this.socket.emit('getMessage',data);
    this.socket.on('receiveMessage', (chatList) => {
      if(chatList && chatList.length>0) {
        this.setState({messages: chatList});
      }
    });
   /* let that = this;
    setInterval(async () => {
      this.props.onGetMessage(data)
    },10000);*/
  }

  componentDidUpdate(nextProps) {
    if(this.props.chatReducer && this.props.chatReducer.chatList && this.props.chatReducer.chatList!==nextProps.chatReducer.chatList && this.props.chatReducer.chatListSuccess===true) {
      this.setState({
        messages: this.props.chatReducer.chatList
      })
    }
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  submitChatMessage(messages = []) {
    const date = new Date();
    this.onSend(messages)
    let details = {
      user: {
        _id: this.props.userReducer.userAuth._id
      },
      receiver_id: this.state.userid,
      sender_id: this.props.userReducer.userAuth._id,
      chatdate: date,
      text: messages && messages[0] && messages[0].text
    }
    //console.log(details,"Details");
    this.socket.emit('chatMessage', details);
  }

  renderDay(props) {
    return <Day {...props} textStyle={{color: '#FFEFD5', fontWeight:'bold'}}/>
  }

 renderBubble = (props) => {
    return (<Bubble {...props}
      textStyle={{
        right: {
          color: '#000000',
          fontWeight:'bold'
        },
        left: {
          color: '#000000',
          fontWeight:'bold'
        },
      }}
      timeTextStyle={{
        right: {
          color: '#000000',
          fontWeight:'bold'
        },
        left: {
          color: '#000000',
          fontWeight:'bold'
        },
      }}
      wrapperStyle={{
        left: {
          backgroundColor: '#FFFF00',
        },
        right: {
          backgroundColor: '#F0E68C',
        }
      }} />
    );
  }

      render(){
        return (
          <ImageBackground source={require('./images/c.jpg')} style = {styles.mycontainer}>
              <View style={{flex: 1,marginTop: 90 ,color:'#DAA520'}}>
              <GiftedChat
              messages={this.state.messages}
              onSend={messages => this.submitChatMessage(messages)}
              renderBubble={this.renderBubble}
              user = {{
                _id: this.props.userReducer.userAuth._id,
              }}
              renderDay={this.renderDay}
             />
              </View>
          </ImageBackground>
            )
          }
}
function mapStateToProps(state) {
  console.log(state.userReducer,"userReducer");
  return {
    chatReducer: state.chatReducer,
    userReducer: state.userReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onChatMessage: (chatMessage) => dispatch(chatInsert(chatMessage)),
    onGetMessage: (data) => dispatch(chatList(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

const styles=StyleSheet.create({
mycontainer: {
    fontSize: 12,
    color: '#DAA520',
    //justifyContent: 'center',
    //alignItems: 'center',
    flex:1,
  }
});