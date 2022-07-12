const users = []
// state - 0: ready, 1: run
const addUser = ({id, state,enemyId,nickname,win, lose}) => {
   const newUser = { id , state, enemyId,nickname,win, lose}
   users.push(newUser)
   return { newUser }
}

const removeUser = id => {
   const removeIndex = users.findIndex(newUser => newUser.id === id)

   if(removeIndex!==-1)
       users.splice(removeIndex, 1)
}

const getEnemyUserId = id => {
   if (users.find(newUser => newUser.id === id) == undefined){
      console.log("undefind enemy  ",id);
      return ""
   }
   return users.find(newUser => newUser.id === id).enemyId
   //return users.find(user => user.id === id).enemyId
}

const getUserReady = room => {
   return users.filter(user => user.state=== 0)[0]
}

const updateUserState = ({id, state, enemyId}) => {
    const findingIndex = users.findIndex(newUser => newUser.id === id)
    users[findingIndex].state= state;
    users[findingIndex].enemyId=enemyId;
}
const getUser = id =>{
   if (users.find(newUser => newUser.id === id) == undefined){
      console.log("undefind User  ",id);
      return ""
   }
   console.log("find User  ",id);
   return users.find(newUser => newUser.id === id);
}

module.exports = { addUser, removeUser, getEnemyUserId, getUserReady, updateUserState,getUser }