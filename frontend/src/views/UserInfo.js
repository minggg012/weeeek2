const UserInfo = {
    id: "",
    nickname: "",
    win: 0,
    lose: 0
}
const EnemyInfo = {
    nickname: "",
    win: 0,
    lose: 0
}
// player 1인지 player 2인지 저장
var player = "";


var cardset =[];

const updateCardSet = gotCardset => {
    for(var i =0;i<8;i++){
        cardset.push(gotCardset[i]);
    }
}
const getCardSet = nothing => {
    return cardset;
}



const updateEnemy =(nickname,win,lose) => {
    EnemyInfo.nickname = nickname;
    EnemyInfo.win      = win;        
    EnemyInfo.lose     = lose;
}

const updateUser =(id,nickname,win,lose) => {
    UserInfo.id       = id;
    UserInfo.nickname = nickname;
    UserInfo.win      = win;        
    UserInfo.lose     = lose;
}

const updatePlayer = which => {
    player = which;
}
const getPlayer = nothing => {
    return player;
}

const deleteInof = nothing => {
    // UserInfo.nickname  = "";
    // UserInfo.win       = "";        
    // UserInfo.lose      = "";
    // EnemyInfo.nickname = "";
    // EnemyInfo.win      = "";        
    // EnemyInfo.lose     = "";
    cardset.splice(0,8);
}


const getUserInfo = nothing => {
    return UserInfo;
}
const getEnemyInfo = nothing => {
    return EnemyInfo;
}

module.exports = { updateCardSet, getCardSet,updateEnemy, updateUser, deleteInof, getUserInfo, getEnemyInfo , updatePlayer, getPlayer}