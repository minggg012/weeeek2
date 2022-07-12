import { View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, Button, Alert } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import Logo from '../../assets/images/a.gif'
import Logo2 from '../../assets/images/c.gif'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import io from "socket.io-client";
import { NavigationContainer, createNativeStackNavigator } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import UserInfo, { updateCardSet, getCardSet, updateEnemy, updateUser, deleteInof, getUserInfo, getEnemyInfo , updatePlayer, getPlayer} from './UserInfo'
import {socket} from './SignInScreen'

const MainScreen = ({navigation, route}) => {
    const win = Dimensions.get('window')
    const [penggg, setPeng] = useState(0)

    
    const onStartPressed = () => {
        setPeng(penggg + 1)
        console.log("---------wait starting");
        // 버튼을 누르면 ready 상태가 됨을 server에게 알림
        const user = getUserInfo();
        socket.emit("ready", {nickname: user.nickname, win: user.win, lose: user.lose});

        // 상대가 매칭이 되었으면 server에게서 game의 정보를 받아서 저장.
        socket.on("startGame", gameInfo => {
            
            deleteInof()
            updatePlayer(gameInfo.player)
            updateEnemy(gameInfo.enemyNickname,gameInfo.enemyWin, gameInfo.enemyLose);
            console.log("enemyinfo: ", gameInfo.enemyNickname)

            updateCardSet(gameInfo.cardset);
            console.log("lsdfjlasfjasdf")
            console.log(getCardSet())
            console.log('----game start')
            //console.log(gameInfo.cardset)
            // 메인 game으로 넘어가는 것 추가적으로 구현
            navigation.navigate('GamePage')
        })

        

    }
    const onLogoutPressed = () => {
        navigation.pop()
    }

    const Info1 = ({info = 0, win = 0, lose = 0}) => {
        return (
            <View style = {styles.header1}>
                <View style = {styles.eheader}>
                    <Text>User Info: {info}</Text>
                </View>
                <View style = {styles.eheader}>
                    <Text>Win : {win}</Text>
                </View>
                <View style = {styles.eheader}>
                    <Text>Lose : {lose}</Text>
                </View>
            </View>
        )
    }
    const info1 = getUserInfo().nickname
    const win1 = getUserInfo().win
    const lose1 = getUserInfo().lose

    const Peng = ({pengsoo = 0}) => {
        if (pengsoo == 0)
            var a = Logo
        else
            var a = Logo2
        return (
            <Image
                    source={a}
                    style={[styles.logo, {
                        // width: win.width * 0.7,
                        // height: win.height * 0.5,
                        maxWidth: 320,
                        maxHeight: 320,
                        paddingVertical: 20,
                        marginTop: 100,
                        marginBottom: 100
                    }]}
                />
        )
    }
    return (
            <View style={styles.container}>
                <Info1 info = {info1} win = {win1} lose = {lose1}/>
                <Peng pengsoo={penggg}/>
                <View style = {styles.root}>
                
                    <CustomButton text="시작하기" onPress={onStartPressed} />
                    <CustomButton text="Logout" onPress={onLogoutPressed} />
                </View>
                
            </View>
    )
}

const styles = StyleSheet.create({
    root: {
        //backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        width: "97%"
    },
    logo: {
        resizeMode: 'contain',
        marginVertical: 10,
    },
    row:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header1: {
        width: "87.5%",
        height: "6%",
        backgroundColor: "#fae191",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 23,
        marginVertical: 12,
        flexDirection: 'row',
        //padding: 5,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1
        
    },
    eheader: {
        width: "30%",
        height: "90%",
        //backgroundColor: "#ffccff",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        

    },

})

export default MainScreen