import { View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, Button, Alert } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import Logo from '../../assets/images/cutlery.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import io from "socket.io-client";
import { NavigationContainer, createNativeStackNavigator } from '@react-navigation/native';
import Navigation from './Navigation'
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

// const socket = io("http://192.249.18.146:443");
const socket = io("http://192.249.18.165:443");

//const stack = createNativeStackNavigator();

const SignInScreen = ({navigation, route}) => {
    // const toastRef = useRef(null);
    // const showToast1 = useCallback(() => {
    //     toastRef.current.show('Id를 입력해주세요.');
    // }, []);
    // const showToast2 = useCallback(() => {
    //     toastRef.current.show('Password를 입력해주세요.');
    // }, []);
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const win = Dimensions.get('window')

    const UserInfo = {
        nickname: "",
        win: 0,
        lose: 0
    }

    socket.on("tunnel", msgs => {
        console.log("-------------------receive message----------------");
        console.log("");
        console.log(msgs.id1);
        console.log(msgs.id2);
        console.log(msgs.id3);
        //socket.emit("msg", {id1:msgs.id1,id2:msgs.id2,id3:msgs.id3});
    });

    const onSignInPress = () => {
        if (username.length == 0) {
            console.log("---no id");
            Alert.alert(null, 'ID를 입력해주세요.',[{text:'ok', onPress: () => console.log('ok')}]);
        }
        else if (password.length == 0) {
            console.log("---no password");
            Alert.alert(null, 'PASSWORD를 입력해주세요.', [{text:'ok', onPress: () => console.log('ok')}]);
        }
        else {
            console.log("---------send message");
            // socket.emit("tunnel", object1);
            socket.emit("login", {userId: username, userPassword: password});
            socket.on("loginResult", loginResult => {
                if (loginResult.nickname.length == 0) {
                    console.log("---login fail");
                    Alert.alert(null, 'ID 또는 PASSWORD를 잘못 입력했습니다.', [{text:'ok', onPress: () => console.log('ok')}]);
                } else {
                    console.log("---login succeed");
                    console.log(loginResult.nickname);
                    console.log(loginResult.win);
                    console.log(loginResult.lose);
                    
                    UserInfo.nickname = loginResult.nickname;
                    UserInfo.win = loginResult.win;
                    UserInfo.lose = loginResult.lose;
                    //console.log(UserInfo.win);
                }

                
            })
        }
        
    }
    const onForgotPasswordPressed = () => {

    }
    const onSignUpPress = () => {
        navigation.navigate('SignUpPage')
    }
    const onSignInKakaoPress = () => {

    }

    return (
        <View style={styles.root}>
            {/* <Image
                source={Logo}
                style={[styles.logo, {
                    width: win.width * 0.7,
                    height: win.height * 0.3,
                    maxWidth: 200,
                    maxHeight: 200,
                }]}
            /> */}
            <CustomInput placeholder="Id" value={username} setValue={setUsername} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton text="Sign In" onPress={onSignInPress} />
            <CustomButton text="Sign Up" onPress={onSignUpPress} type="TERTIARY" />
            {/* <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} bgColor="#FAE9EA" fgColor="#DD4D44" /> */}
            {/* <CustomButton text="Sign In with Kakao" onPress={onSignInKakaoPress} bgColor="#FEE500" fgColor="#000000" /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        //backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        resizeMode: 'contain',
        marginVertical: 10,
    }
})

export default SignInScreen