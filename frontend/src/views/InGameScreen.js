import { View, Text, Image, StyleSheet, useWindowDimensions, Dimensions, Button, Alert, Touchable, TouchableHighlight } from 'react-native'
import React, { useState, useCallback, useRef, useEffect } from 'react'
import Logo1 from '../../assets/images/a.gif'
import Logo2 from '../../assets/images/c.gif'
import Logo3 from '../../assets/images/b.jpg'
import M0 from '../../assets/images/m0.jpg'
import M1 from '../../assets/images/m1.jpg'
import M2 from '../../assets/images/m2.jpg'
import M3 from '../../assets/images/m3.jpg'
import M4 from '../../assets/images/m4.jpg'
import E0 from '../../assets/images/e0.jpg'
import E1 from '../../assets/images/e1.jpg'
import E2 from '../../assets/images/e2.jpg'
import E3 from '../../assets/images/e3.jpg'
import E4 from '../../assets/images/e4.jpg'
import W from '../../assets/images/W.png'
import CustomInput from '../components/CustomInput'
import CustomButton from '../components/CustomButton'
import io from "socket.io-client";
import { NavigationContainer, createNativeStackNavigator } from '@react-navigation/native';
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { FlatGrid } from 'react-native-super-grid';
import UserInfo, { updateCardSet, getCardSet, updateEnemy, updateUser, deleteInof, getUserInfo, getEnemyInfo , updatePlayer, getPlayer} from './UserInfo'
import Icon from 'react-native-vector-icons/Ionicons'
import {socket} from './SignInScreen'

//const socket = io("http://192.249.18.165:443");

const win = Dimensions.get('window')
const InGameScreen = ({navigation, route}) => {
    // const useCard1 = (initialValue = []) => {
    //     const [card, setCard] = useState(initialValue)
    //     const onChange = useCallback((e) =>
    //         setCard(e.)
    //     )
    // }
    const [card0, setCard0] = useState(-1)
    const [card1, setCard1] = useState(-1)
    const [card2, setCard2] = useState(-1)
    const [card3, setCard3] = useState(-1)
    const [card4, setCard4] = useState(-1)
    const [card5, setCard5] = useState(-1)
    const [card6, setCard6] = useState(-1)
    const [card7, setCard7] = useState(-1)
    const [box1, setBox1] = useState(-1)
    const [box2, setBox2] = useState(-1)
    const [box3, setBox3] = useState(-1)
    const [box4, setBox4] = useState(-1)
    const [box5, setBox5] = useState(-1)
    const [box6, setBox6] = useState(-1)
    const [box7, setBox7] = useState(-1)
    const [box8, setBox8] = useState(-1)
    const [box9, setBox9] = useState(-1)
    const [box10, setBox10] = useState(-1)
    const [box11, setBox11] = useState(-1)
    const [box0, setBox0] = useState(-1)
    var mycardset = getCardSet()
    var nextCard = "" ;
    var putLocation = -1;
    var enemyPlayer = "1";
    var gridArray = [];
    const info2 = getEnemyInfo().nickname
    const win2 = getEnemyInfo().win
    const lose2 = getEnemyInfo().lose
    console.log("afjklsdjfsaoifjasldnclsdcmlaksmflafklewfkle")
    console.log("info2:", info2)
    console.log("afjklsdjfsaoifjasldnclsdcmlaksmflafklewfkle")
    var myRoundCnt = 0;
    console.log("===============")
    console.log(mycardset)
    console.log("=1=1=1=1==1=1=1=1=")
    console.log(myRoundCnt)
    setCard0(card0 % 1 + mycardset[0])
    setCard1(card1 % 1 + mycardset[1])
    setCard2(card2 % 1 + mycardset[2])
    setCard3(card3 % 1 + mycardset[3])
    setCard4(card4 % 1 + mycardset[4])
    setCard5(card5 % 1 + mycardset[5])
    setCard6(card6 % 1 + mycardset[6])
    setCard7(card7 % 1 + mycardset[7])
    // const setCard = () => {
    //     useEffect(() => {
    //         setCard0(mycardset[0])
    //         setCard1(mycardset[1])
    //         setCard2(mycardset[2])
    //         setCard3(mycardset[3])
    //         setCard4(mycardset[4])
    //         setCard5(mycardset[5])
    //         setCard6(mycardset[6])
    //         setCard7(mycardset[7])
    //     }, [mycardset])
        
    // }
    // useEffect(() => {
    //             setCard0(mycardset[0])
    //             setCard1(mycardset[1])
    //             setCard2(mycardset[2])
    //             setCard3(mycardset[3])
    //             setCard4(mycardset[4])
    //             setCard5(mycardset[5])
    //             setCard6(mycardset[6])
    //             setCard7(mycardset[7])
    //         }, [mycardset])

            // useEffect(() => {
            //     setBox0(gridArray[1])
            //     setBox1(gridArray[2])
            //     setBox2(gridArray[3])
            //     setBox3(gridArray[6])
            //     setBox4(gridArray[7])
            //     setBox5(gridArray[8])
            //     setBox6(gridArray[11])
            //     setBox7(gridArray[12])
            //     setBox8(gridArray[13])
            //     setBox9(gridArray[16])
            //     setBox10(gridArray[17])
            //     setBox11(gridArray[18])
            // }, [gridArray])
    // const setBox = () => {
    //     useEffect(() => {
    //         setBox0(gridArray[1])
    //         setBox1(gridArray[2])
    //         setBox2(gridArray[3])
    //         setBox3(gridArray[6])
    //         setBox4(gridArray[7])
    //         setBox5(gridArray[8])
    //         setBox6(gridArray[11])
    //         setBox7(gridArray[12])
    //         setBox8(gridArray[13])
    //         setBox9(gridArray[16])
    //         setBox10(gridArray[17])
    //         setBox11(gridArray[18])
    //     })
    // }
    //setCard()
    //setCard()
        // if (mycardset[myRoundCnt] == -1) {
            
        //}

        
    

    const Info1 = ({info = 0, win = 0, lose = 0}) => {
        return (
            <View style = {styles.header1}>
                <View style = {styles.eheader}>
                    <Text>Enemy Info : {info}</Text>
                
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
    const Entry = ({entry = -1}) => {
        console.log(entry)
        switch(entry) {
            case -1: 
                var image = W
                break
            case 0:
                var image = M0
                break
            case 1: 
                var image = M1
                break
            case 2:
                var image = M2
                break
            case 3: 
                var image = M3
                break
            case 4:
                var image = M4
                break
            case 5: 
                var image = E0
                break
            case 6:
                var image = E1
                break
            case 7: 
                var image = E2
                break
            case 8:
                var image = E3
                break
            case 9: 
                var image = E4
                break
            default:
                var image = W
        }
        return (
            <Image
                    source={image}
                    style={[styles.logo, {
                        // width: win.width * 0.7,
                        // height: win.height * 0.5,
                        maxWidth: 110,
                        maxHeight: 120,
                        // paddingVertical: 20,
                        // marginTop: 100,
                        // marginBottom: 100
                    }]}
                />
        )
    }
    const Entry2 = ({entry = -1}) => {
        console.log(entry)
        switch(entry) {
            case -1: 
                var image = W
                break
            case 0:
                var image = M0
                break
            case 1: 
                var image = M1
                break
            case 2:
                var image = M2
                break
            case 3: 
                var image = M3
                break
            case 4:
                var image = M4
                break
            default:
                var image = W
        }
        return (
            <Image
                    source={image}
                    style={[styles.logo, {
                        // width: win.width * 0.7,
                        // height: win.height * 0.5,
                        maxWidth: 50,
                        maxHeight: 50,
                        // paddingVertical: 20,
                        // marginTop: 100,
                        // marginBottom: 100
                    }]}
                />
        )
    }
    var onchk =0;
    var isPressed = 1;
    const onPressed1 = (entrynum) => {
    
        if (isPressed == 0) {
            if(gridArray[entrynum].player==getPlayer()){
                Alert.alert(null, '놓을 수 없는 위치입니다.', [{text:'ok', onPress: () => console.log('못 놓음')}]);
            }
            else{
                isPressed = 1
                console.log("눌렀음")
                console.log(entrynum)
                putLocation = entrynum
                var newGrid = {player: getPlayer(), card: nextCard}
                gridArray[putLocation] = newGrid;
                // mycardset[myRoundCnt] = -1
                // myRoundCnt ++;
                // nextCard= mycardset[myRoundCnt];
                //setCard()
                mycardset[myRoundCnt] = -1
                myRoundCnt ++;
                nextCard= mycardset[myRoundCnt];

                setCard0(card0 % 1 + mycardset[0])
                setCard1(card1 % 1 + mycardset[1])
                setCard2(card2 % 1 + mycardset[2])
                setCard3(card3 % 1 + mycardset[3])
                setCard4(card4 % 1 + mycardset[4])
                setCard5(card5 % 1 + mycardset[5])
                setCard6(card6 % 1 + mycardset[6])
                setCard7(card7 % 1 + mycardset[7])

        
        
        // 내 턴은 끝났으므로, 상대 말들을 한 칸 씩 움직임
        for(var i = 1; i<4; i++ ){
            for( var j =3 ; j>0; j --){
                var curindex = i*5+j;
                var type= gridArray[curindex].card;
                var targetGrid = 0;
                if(gridArray[curindex].player != enemyPlayer){
                    continue;
                }

                if(type==0) {targetGrid = i*5 + j - 1}
                else if(type==1) {targetGrid = curindex - 5 - 1}
                else if(type==2) {targetGrid = curindex - 5 }
                else if(type==3) {targetGrid = curindex - 5 + 1}
                else if(type==4) {targetGrid = curindex + 1}
                else{console.log("type err")}
                
                // 공격하려는 위치에 있는 카드가 상대 카드면 이동
                if(gridArray[targetGrid].player==enemyPlayer){
                    gridArray[targetGrid].player = getPlayer();
                    gridArray[targetGrid].card = type;
                    gridArray[curindex].player= "0";
                    gridArray[curindex].card = -1;
                }
                // 앞으로 한 칸에 다른 카드가 없다면 이동
                else{
                    if(gridArray[curindex -5 ].player=="0"){
                        gridArray[curindex- 5 ].player=getPlayer();
                        gridArray[curindex- 5 ].card = type;
                        gridArray[curindex].player = "0";
                        gridArray[curindex].card = -1;
                    }
                }
            }
        }
        // // 상대가 내 진영에 도착했으면 패배
        // if(gridArray[1].player==enemyPlayer||gridArray[2].player==enemyPlayer||gridArray[3].player==enemyPlayer){
        //     socket.emit("playerLose",{userId: getUserInfo().id});
        //     // 패배 화면으로 이동 (구현 필요)
        // }
        // // 상대 쪽 3칸 움직였는데도 꽉참. 내가 이김
        // if(gridArray[16].player==enemyPlayer||gridArray[17].player==enemyPlayer||gridArray[18].player==enemyPlayer){
        //     socket.emit("playerWin",{userId: getUserInfo().id});
        //     // 승리 화면으로 이동 (구현 필요)
        // }
        
        // 서버에 자신이 놓은 위치와 카드 종류를 보냄
        //Alert.alert(null, '놓을 위치를 선택해주세요.', [{text: 'ok', onPress: () => console.log('ok')}]);
        
        socket.emit("pushPlacedCard",{cardLocation:putLocation, cardType:nextCard});
                //socket.emit("pushPlacedCard",{cardLocation:putLocation, cardType:nextCard});
                onchk =0;
            }
        }
        
    }
    const onPressed2 = () => {
        Alert.alert(null, '놓을 수 없는 위치입니다.', [{text:'ok', onPress: () => console.log('못 놓음')}]);
    }
    const Boxes = ({a=-1,b=-1,c=-1,d=-1,e=-1,f=-1,g=-1,h=-1,i=-1,j=-1,k=-1,l=-1}) => {
        return (
            <View style = {styles.boxContainer}>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {a} />
                    </View>
                </TouchableHighlight>
                
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {b} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {c} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {d} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {e} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {f} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {g} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {h} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {onPressed2}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {i} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {() => onPressed1(1)}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {j} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {() => onPressed1(2)}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {k} />
                    </View>
                </TouchableHighlight>
                <TouchableHighlight 
                    onPress = {() => onPressed1(3)}
                    style = {styles.box}>
                    <View style = {styles.inner}>
                        <Entry entry = {l} />
                    </View>
                </TouchableHighlight>
            </View>        
        )
    }
    //var card = getCardSet()
    const Info2 = ({a=-1,b=-1,c=-1,d=-1,e=-1,f=-1,g=-1,h=-1}) => {
        return (
            <View style = {styles.header2}>
                <View style = {styles.mheader}>
                    <Entry2 entry = {a}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {b}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {c}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {d}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {e}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {f}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {g}/>
                </View>
                <View style = {styles.mheader}>
                    <Entry2 entry = {h}/>
                </View>
            </View>
        )
    }
    const Skip = () => {
        return (
            <View style = {styles.header3}>
                <Text>Skip</Text>
            </View>
        )
    }
    


//-------------------------------------------------------------------
    
    for( var i = 0; i <= 19; i++){
        var newGrid= {player: "0", card: -1 };
        gridArray.push(newGrid);
    }
    console.log("-----------test")
    //console.log(gridArray)
    


    
   
    if(getPlayer() == '1'){
        isPressed=0;
        console.log("-------선 플레이어")
        enemyPlayer = "2";
        nextCard= mycardset[myRoundCnt];
        Alert.alert(null, '놓을 위치를 정해주세요.', [{text:'ok', onPress: () => console.log('정함')}]);
        // 사용자가 맵에서 놓을 위치를 정함 putLocation 얻었다 침(구현 필요)
        // 이 위치는 1~3만 가능하게 제한 필요
        
    }
    else {
        Alert.alert(null, '당신은 후플레이어입니다.', [{text:'ok', onPress: () => console.log('정함')}]);
        myRoundCnt = -1
    }
    socket.on("getPlacedCard",info =>{
        //setCard()
        if(onchk ==0){
            onchk =1;
            // 상대가 말을 놓은 위치를 얻어서 내 Grid에 반영
        var newGrid = {player: enemyPlayer, card: info.cardType};
        gridArray[15 + info.cardLocation]=newGrid;

        // 내 말들을 한 칸씩 모두 움직임
        for(var i=2;i>=0;i--){
            for(var j =1 ; j<=3; j++){
                var curindex = i*5+j;
                //console.log("111111111111111111111111")
                //console.log("curindex",curindex)
                //console.log("gridArray[]",gridArray[curindex])
                var type= gridArray[curindex].card;
                var targetGrid = 0;
                if(gridArray[curindex].player != getPlayer()){
                    continue;
                }

                if(type==0) {targetGrid = i*5 + j - 1}
                else if(type==1) {targetGrid = curindex + 5 - 1}
                else if(type==2) {targetGrid = curindex + 5 }
                else if(type==3) {targetGrid = curindex + 5 + 1}
                else if(type==4) {targetGrid = curindex + 1}
                else{console.log("type err")}
                
                // 공격할려는 위치에 있는 카드가 상대 카드면 이동
                if(gridArray[targetGrid].player==enemyPlayer){
                    gridArray[targetGrid].player = getPlayer();
                    gridArray[targetGrid].card = type;
                    gridArray[curindex].player= "0";
                    gridArray[curindex].card = -1;
                }
                // 앞으로 한 칸에 다른 카드가 없다면 이동
                else{
                    if(gridArray[curindex + 5 ].player=="0"){
                        gridArray[curindex+ 5 ].player=getPlayer();
                        gridArray[curindex+ 5 ].card = type;
                        gridArray[curindex].player = "0";
                        gridArray[curindex].card = -1;
                    }
                }
            }
        }
        isPressed =0;
        console.log("-----------------------------------")
        Alert.alert(null, '놓을 위치를 정해주세요.', [{text:'ok', onPress: () => console.log('정함')}]);
        }
        
    })
    
    //var myRoundCnt = 0;
    const update = () => {

    }
    //const cards = getCardSet()
    //const entries = ge
    

    var grids = []
    for (var i = 0; i < 19; i++) {
        if (i % 5 == 0 || i % 5 == 4) {
            continue
        }
        else {
            if (gridArray[i].player == getPlayer()) { // 내 거
                grids.push(gridArray[i].card)
            }
            else if(gridArray[i].player == enemyPlayer) { // 상대 거
                grids.push(gridArray[i].card + 5)
            }
            else { // 빈 거
                grids.push(-1)
            }
        }
    }
    return (
        <View style={styles.container}>
            <Info1 info = {info2} win = {win2} lose = {lose2}/>
            <Boxes a={-1} b={8} c={7} d={-1} e={-1} f={5} g={1} h={-1} i={4} j={-1} k={3} l={2}/>
            <Info2 a={card0} b={card1} c={card2} d={card3} e={card4} f={card5} g={card6} h={card7}/>
            <Skip/>
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
    },

    row:{
        padding: 5,
        width: '30%',
    },
    container: {
        flex: 1
    },
    header1: {
        width: "87.5%",
        height: "5%",
        backgroundColor: "#a9e815",
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
    header2: {
        width: "90%",
        height: "10%",
        //backgroundColor: "#a9e815",
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: 18,
        flexDirection: 'row',
        padding: 5,
        
    },
    header3: {
        width: "87.5%",
        height: "7.5%",
        backgroundColor: "#e1e3f1",
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 23,
        flexDirection: 'row',
        padding: 5,
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5
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
    mheader: {
        width: "12%",
        height: "67.5%",
        backgroundColor: "#a1fcee",
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 1

    },

    boxContainer: {
        width: '90%',
        height: '70%',
        //backgroundColor: '#149583',
        //paddingHorizontal: 5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,

    },
    box: {
        width: '33.3%',
        height: '25%',
        padding: 5,
        justifyContent: 'center',
        //alignItems: 'center',
        //backgroundColor: '#dddddd'
    
    },
    inner :{
        flex: 1,
        backgroundColor: '#dddddd',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'grey'
    }
})

export default InGameScreen