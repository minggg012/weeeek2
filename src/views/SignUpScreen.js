import { View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, Button, Alert } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import Logo from '../../assets/images/cutlery.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import io from "socket.io-client";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const socket = io("http://192.249.18.165:443");

const SignUpScreen = ({navigation, route}) => {
    const [username, setUsername] = useState('')
    const [userid, setUserId] = useState('')
    const [password, setPassword] = useState('')

    const onSignUpPress = () => {
        if (username.length == 0) {
            console.log("---no name");
            Alert.alert(null, 'NICKNAME을 입력해주세요.',[{text:'ok', onPress: () => console.log('ok')}]);
        }
        else if (userid.length == 0) {
            console.log("---no id");
            Alert.alert(null, 'ID를 입력해주세요.',[{text:'ok', onPress: () => console.log('ok')}]);
        }
        else if (password.length == 0) {
            console.log("---no password");
            Alert.alert(null, 'PASSWORD를 입력해주세요.', [{text:'ok', onPress: () => console.log('ok')}]);
        }
        else {
            console.log("---------send signup message");
            socket.emit("signUp", {userId: userid, userPassword: password, userNickname: username});
            socket.on("signUpResult", signupResult =>{
                if (signupResult.result.length == 0) {
                    console.log("---signup succeed")
                    navigation.navigate('LoginPage')
                } 
                else {
                    console.log("---signup fail")
                    Alert.alert(null, '이미 등록된 정보입니다.\n다른 것으로 시도해주세요.', [{text: 'ok', onPress: () => console.log('ok')}]);
                }
            })
        }
    }
    return (
        <View style={styles.root}>
            <CustomInput placeholder="Nickname" value={username} setValue={setUsername} />
            <CustomInput placeholder="Id" value={userid} setValue={setUserId} />
            <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
            <CustomButton text="Sign Up" onPress={onSignUpPress} type="TERTIARY" />
            <View style = {styles.row}>
                {/* <View style = {styles.userComment}> */}
                    <Text>이미 계정이 있으신가요?</Text>
                {/* </View> */}
                <Button onPress = {navigation.navigate(route)} title = "로그인" color = '#2c2c2c'/>
                {/* <CustomButton text="이미 계정이 있으신가요?" onPress={onSignUpPress} type="TERTIARY" /> */}
                {/* <CustomButton text="Sign Up" onPress={onSignUpPress} type="TERTIARY" /> */}
            </View>
        </View>
    );
    
}

const styles = StyleSheet.create({
    root: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        resizeMode: 'contain',
        marginVertical: 10,
    },
    row : {
        width: "100%",
        maxWidth: 200,
        flex: 1,
        flexDirection: 'row',
    },
    userComment: {
        padding:8,
        backgroundColor:'yellow',
        borderRadius:5,
    },
})

export default SignUpScreen