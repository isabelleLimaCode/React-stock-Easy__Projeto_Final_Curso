import React, { useEffect, useCallback, useState, useLayoutEffect } from 'react';
import { View ,TouchableOpacity} from 'react-native';
import { Avatar } from 'react-native-elements';
import { auth } from '../../../Services/Firebaseconfig';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

const Chat = ({ navigation }) => {
    const [messages, setMessages] = useState([]);
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    }
    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
        })
    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Olá ',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ])
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
    }, []);
    return (
      <View style={{flex:1,top:-20,backgroundColor:'#fff'}}>
         <View>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign style={{ left: 10 }} name="back" size={24} color="black" />
                </TouchableOpacity>
            </View>
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={messages => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
        </View>
    );
}

export default Chat;