var gridArray = [];
var myRoundCnt = 0;
// var enemyRoundCnt = 0;

const mainGame = ({navigation, route}) => {
    const win = Dimensions.get('window')
    const mycardset = getCardSet();
    //const Enemycardset = getCardSet(); // 상대꺼 어떻게 저장할지 고민 필요(일단 같게)

    var nextCard = "" ;
    var putLocation = -1;
    var enemyPlayer = "1";

    // 모든 Grid player 없고 card 없는 빈 칸으로 초기화
    for( var i =0;i<=19;i++){
        var newGrid= {player: "0", card: -1 };
        gridArray.push(newGrid);
    }
    // 0. 내가 player 1이면 먼저 시작. player 2면 기다림.
    // 1. 사용자가 맵에서 놓을 위치를 정하고, 이 위치를 putLocation에 저장
    // 2. 상대 말들이 자동으로 한 칸씩 움직임. ( 이때 상대 말 중에 내 진영에 들어온게 있으면 짐)
    // 3. server에 putLocation 보냄
    // 4. server에서 상대 cardLocation을 받음.
    // 5. 이 location을 찾아서 상대 말을 넣고. 자신의 말 들을 한 칸씩 움직임.( 이때 자신의 말이 상대 진영에 들어간게 있으면 이김)
    if(getPlayer()=="1"){
        enemyPlayer = "2";
        nextCard= mycardset[myRoundCnt];
        // 사용자가 맵에서 놓을 위치를 정함 putLocation 얻었다 침(구현 필요)
        // 이 위치는 1~3만 가능하게 제한 필요
        var newGrid = {player: getPlayer(), card: nextCard}
        gridArray[putLocation]=newGrid;
        
        socket.emit("pushPlacedCard",{cardLocation:putLocation, cardType:nextCard});
    }
    socket.on("getPlacedCard",info =>{

        // 상대가 말을 놓은 위치를 얻어서 내 Grid에 반영
        var newGrid = {player: enemyPlayer, card: info.cardType};
        gridArray[15 + info.cardLocation]=newGrid;

        // 내 말들을 한 칸씩 모두 움직임
        for(var i=3;i>=0;i--){
            for(var j =1 ; j<=3; j--){
                var curindex = i*5+j;
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
        // Grid 바뀐거 실시간으로 화면에 반영되나? 아니면 다시 화면 출력 해줘야하나

        // 상대 진영에 도착했으면 내가 승리
        if(gridArray[16].player==getPlayer()||gridArray[17].player==getPlayer()||gridArray[18].player==getPlayer()){
            socket.emit("playerWin",{userId: getUserInfo().id});
            // 승리 화면으로 이동 (구현 필요)
        }

        // 사용자가 맵에서 놓을 위치를 정함 putLocation 얻었다 침(구현 필요)
        // 이 위치는 1~3만 가능하게 제한 필요
        myRoundCnt ++;
        nextCard= mycardset[myRoundCnt];
        var newGrid = {player: getPlayer(), card: nextCard}
        gridArray[putLocation]=newGrid;
        
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
                
                // 공격할려는 위치에 있는 카드가 상대 카드면 이동
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
        // 상대가 내 진영에 도착했으면 패배
        if(gridArray[1].player==enemyPlayer||gridArray[2].player==enemyPlayer||gridArray[3].player==enemyPlayer){
            socket.emit("playerLose",{userId: getUserInfo().id});
            // 패배 화면으로 이동 (구현 필요)
        }
        
        // 서버에 자신이 놓은 위치와 카드 종류를 보냄
        socket.emit("pushPlacedCard",{cardLocation:putLocation, cardType:nextCard});
    })
}