// mysql 접속 설정
const mysql = require('mysql');  // mysql 모듈 로드
const conn = {  
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'wlrnrhkgkr2',
    database: 'molcamp'
};

const express = require('express');
const app = express();
const PORT = 443;

const cors = require('cors');
app.use(cors());

const { addUser, removeUser, getEnemyUserId, getUserReady, updateUserState, getUser} = require('./users')

const server = require('http').createServer(app);
const io = require("socket.io")(server);


var connection = mysql.createConnection(conn); // DB 커넥션 생성
connection.connect();   // DB 접속
var doQuery ="";
io.on("connection", (socket) => {

    socket.on('login',(userInfo)=>{
        doQuery = `SELECT * FROM users WHERE id = '${userInfo.userId}' AND password = '${userInfo.userPassword}'`;
        connection.query(doQuery, function (err, results, fields) { 
            if (err) {console.log(err);}
            // Login 정보가 없거나 틀림을 알림
            if(results[0] == undefined){
                socket.emit('loginResult',{id: "",nickname: "", win: "", lose: ""});
            }
            // user 정보를 건내주며 Login 성공을 알림
            else{
                socket.emit('loginResult',{id: userInfo.userId, nickname: results[0].nickname, win: results[0].win, lose: results[0].lose});
            }
        });
    })
    socket.on('signUp',(signUpInfo) => {
        var isNot = "not"
        // 이미 있는 id인지 확인
        doQuery = `SELECT * FROM users WHERE id = '${signUpInfo.userId}';`;
        connection.query(doQuery, function (err, results, fields) { 
            if (err) {console.log(err);}
            // 없는 id면 DB에 추가해줌
            if(results[0] == undefined){ 
                isNot = "";
                var params = [signUpInfo.userId,signUpInfo.userPassword,signUpInfo.userNickname,0,0]
                doQuery = `INSERT INTO users VALUES(?,?,?,?,?);`;
                connection.query(doQuery, params, function (err, results, fields) { 
                    if (err) {console.log(err);}
                });
            }
            // 성공이면 result : 1, 실패면 result : 0
            socket.emit('signUpResult',{result: isNot});
        });
    })
    socket.on('ready',(userInfo) => { //userInfo ={nickname,win,lose}
        // 기다리고 있는 user 하나 얻음
        const readyUser = getUserReady("");
        // 기다리는 user가 있을 경우
        // 자신을 user배열에 추가 ( 이때 state는 run )
        // 기다리던 user의 상태 run으로 변경, enemyId 현재 user id로 변경
        if(readyUser!=undefined){
            const newUser = addUser({
                id: socket.id,
                state: 1,
                enemyId: readyUser.id,
                nickname: userInfo.nickname,
                win: userInfo.win,
                lose: userInfo.lose
            })

            // 기다리던 user update
            updateUserState({
                id: readyUser.id,
                state: 1,
                enemyId: socket.id
            })
            //console.log("newUser:",newUser);
            //console.log("readyUser:",readyUser);
            // 랜덤으로 카드 뭉치를 만들어서 줌.
            var cardset1 = [];
            for(var i=0;i<8;i++){
                cardset1.push(Math.floor(Math.random()*5));
            }
            var cardset2 = [];
            for(var i=0;i<8;i++){
                cardset2.push(Math.floor(Math.random()*5));
            }
            console.log("cardset1",readyUser.id);
            console.log("cardset2",socket.id);
            // 기다리던 user를 p1로 새로 들어온 user를 p2로 각각 io.emit
            io.to(readyUser.id).emit("startGame",{player: "1",cardset: cardset1, enemyNickname: newUser.nickname, enemyWin: newUser.win,enemyLose: newUser.lose});
            io.to(socket.id).emit("startGame",{player: "2",cardset: cardset2,enemyNickname: readyUser.nickname, enemyWin: readyUser.win,enemyLose: readyUser.lose});
        }
        // 만약 ready상태인 user가 없을 경우 
        else{
            const newUser = addUser({
                id: socket.id,
                state: 0,
                enemyId: "",
                nickname: userInfo.nickname,
                win: userInfo.win,
                lose: userInfo.lose
            })
            //console.log(newUser);
        }
    })
    socket.on("cardMoney",(moneyInfo)=>{
        io.to(getEnemyUserId(socket.id)).emit("EnemyCardMoney",{cardMoney: moneyInfo.cardMoney})
    })

    // 한 player가 카드를 놓으면서 턴이 끝남.
    socket.on('pushPlacedCard',(cardInfo) => {
        var newLocation = 3 - cardInfo.cardLocation;//위치 좌우 반전 
        var newcardType = 4 - cardInfo.cardType;    //카드 좌우 반전
        console.log("newLocation:",newLocation);
        console.log("newcardType:",newcardType);
        console.log("nickname",getUser(socket.id).nickname);
        io.to(getEnemyUserId(socket.id)).emit("getPlacedCard",{cardLocation: newLocation, cardType: newcardType})
    })

    socket.on('playerWin',(userId)=>{
        doQuery = `UPDATE users SET win = win + 1 WHERE id = '${userId.userId}' ;`;
        connection.query(doQuery, function (err, results, fields) {     
            if (err) {console.log(err);}
        });
        removeUser(socket.id)
    })
    socket.on('playerLose',(userId)=>{
        doQuery = `UPDATE users SET lose = lose + 1 WHERE id = '${userId.userId}' ;`;
        connection.query(doQuery, function (err, results, fields) {
            if (err) {console.log(err);}
        });
        removeUser(socket.id)
    })
    socket.on("disconnect", () =>{
        console.log("disconnect");
        removeUser(socket.id);
    })
})
// io.to(socket.id).emit()

// var arr= [];
// arr.push(Math.floor(Math.random()*5));
// arr.push(Math.floor(Math.random()*5));
// console.log(arr[1]);
// addUser({
//     id : "AA",
//     state: 0,
//     enemyId: "BB",
//     nickname: "",
//     win: 0,
//     lose: 2
// })
// addUser({
//     id : "BB",
//     state: 0,
//     enemyId: "AA",
//     nickname: "",
//     win: 0,
//     lose: 2
// })
// getEnemyUserId("AA")
// var gridArray = [];
// // 모든 Grid player 없고 card 없는 빈 칸으로 초기화
// for( var i =0;i<=19;i++){
//     var newGrid= {player: "0", card: "" };
//     gridArray.push(newGrid);
// }
// var newGrid = {player: "1", card: "1"}
// gridArray[3]=newGrid;
// gridArray[4].player="3"
// console.log((gridArray[3].player-2));
// if((gridArray[3].player-1)==1){
//     console.log("같다고 쳐 주네");
// }
// else{
//     console.log("안됨");
// }
// console.log(gridArray);

// var testQuery = "INSERT INTO users VALUES (3,'name3','pass3')";
 
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });
// var userId='test',userPassword='test',userNickname='test';
// doQuery = `SELECT * FROM users WHERE id = "${userId}";`;
//         connection.query(doQuery, function (err, results, fields) { // testQuery 실행
//             if (err) {
//                 console.log(err);
//             }
//             // 없는 id면 DB에 추가해줌
//             if(results[0] == undefined){ 
//                 isNot = 1;
//                 var params = [userId,userPassword,userNickname,0,0]
//                 doQuery = `INSERT INTO users VALUES(?,?,?,?,?);`;
//                 connection.query(doQuery, params, function (err, results, fields) { // testQuery 실행
//                     if (err) {console.log(err);}
//                 });
//             }
//         });
// doQuery = `SELECT * FROM users WHERE id = 'test' AND password = 'test'`;
//         connection.query(doQuery, function (err, results, fields) { // testQuery 실행
//             if (err) {
//                 console.log(err);
//             }
            
//             // Login 정보가 없거나 틀림을 알림
//             if(results[0] == undefined){
//                 console.log("undefined result");
//             }
//             // user 정보를 건내주며 Login 성공을 알림
//             else{
//                 console.log("find result");
//             }
//         });
// var userId = 1
//     doQuery = `UPDATE users SET lose = lose + 1 WHERE id = '${userId}' ;`;
//     connection.query(doQuery, function (err, results, fields) { // testQuery 실행
//         if (err) {
//             console.log(err);
//         }
//     });

// testQuery = 'SELECT * FROM users';
// connection.query(testQuery, function (err, results, fields) { // testQuery 실행
//     if (err) {
//         console.log(err);
//     }
//     console.log(results);
// });

server.listen(PORT,function(){
    console.log("Server is ready at"+PORT);
})

//connection.end(); // DB 접속 종료
module.exports = app;