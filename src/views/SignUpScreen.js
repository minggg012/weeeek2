import { View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, Button, Alert } from 'react-native'
import React, { useState, useCallback, useRef } from 'react'
import Logo from '../../assets/images/cutlery.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import io from "socket.io-client";
import "react-native-gesture-handler";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import UserInfo, { updateEnemy, updateUser, deleteInof, getUserInfo, getEnemyInfo , updatePlayer, getPlayer} from './UserInfo'
import {socket} from './SignInScreen'

//const socket = io("http://192.249.18.165:443");


const SignUpScreen = ({navigation, route}) => {
    const [username1, setUsername] = useState('')
    const [userid1, setUserId] = useState('')
    const [password1, setPassword] = useState('')

    const onSignUpPress = () => {
        if (username1.length == 0) {
            console.log("---no name");
            Alert.alert(null, 'NICKNAME을 입력해주세요.',[{text:'ok', onPress: () => console.log('ok')}]);
        }
        else if (userid1.length == 0) {
            console.log("---no id");
            Alert.alert(null, 'ID를 입력해주세요.',[{text:'ok', onPress: () => console.log('ok')}]);
        }
        else if (password1.length == 0) {
            console.log("---no password");
            Alert.alert(null, 'PASSWORD를 입력해주세요.', [{text:'ok', onPress: () => console.log('ok')}]);
        }
        else {
            console.log("---------send signup message");
            socket.emit("signUp", {userId: userid1, userPassword: password1, userNickname: username1});
            socket.on("signUpResult", signupResult =>{
                if (signupResult.result.length == 0) {
                    console.log("---signup succeed")
                    navigation.navigate('LoginPage')
                } 
                else {
                    console.log("---signup fail")
                    Alert.alert(null, '이미 등록된 정보입니다.\n다시 시도해주세요.', [{text: 'ok', onPress: () => console.log('ok')}]);
                }
            })
        }
    }
    return (
        <View style={styles.root}>
            <CustomInput placeholder="Nickname" value={username1} setValue={setUsername} />
            <CustomInput placeholder="Id" value={userid1} setValue={setUserId} />
            <CustomInput placeholder="Password" value={password1} setValue={setPassword} secureTextEntry={true} />
            <CustomButton text="Sign Up" onPress={onSignUpPress} type="TERTIARY" />
            <View style = {styles.row}>
                <View style = {styles.userComment}>
                    <Text style = {{fontSize: 15}}>이미 계정이 있으신가요?</Text>
                </View>
                <View style = {styles.login}>
                    <Button onPress = {() => navigation.pop()} title = "로그인" color="#1111ff" />
                </View>
                
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
        marginVertical: 5,
        width: "70%",
        height: 50,
        maxWidth: 500,
        borderRadius: 5,
        //borderWidth: 1,
        //borderColor: 'grey',

        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    },
    userComment: {
        width: '60%',
        height: "90%",
        //padding:8,
        //backgroundColor:'yellow',
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        width: '40%',
        height: '90%',
        backgroundColor: 'ffeeff',
        alignItems: 'center',
        justifyContent: 'center',

    }
})

export default SignUpScreen