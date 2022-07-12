# Weeeek2
> 2022 여름 몰입캠프 2분반 남하욱 김민
- 화살표 말을 이용하여 먼저 상대방에게 도달한 사람이 이기는 1 대 1 게임입니다.


## A. 개발 팀원
- 한양대학교 컴퓨터소프트웨어학부 [남하욱](http://github.com/NAMHAUK)
- KAIST 전산학부 [김민](http://github.com/minggg012)

## B. 개발 환경
- Framework: React Native
- Language: Javascript
- Backend: Node.js + express
- Database: MariaDB(MySQL)

## C. 프로젝트 설명
### 1. Login
<img src = "https://user-images.githubusercontent.com/85171279/178475145-0554df43-d6d0-4f72-8534-f4d3f67c7810.png"
 width ="180" height = "400"/> <img src = "https://user-images.githubusercontent.com/85171279/178475385-e7546d33-526e-41ce-9c36-00f07eb22950.png" width = "180" height = "400"/> <img src = "https://user-images.githubusercontent.com/85171279/178475471-08f96097-fe4a-4446-833b-84eb6547b78b.png" width = "180" height = "400"/> 
 
 #### Login Page
 - 등록된 user 정보를 이용하여 로그인할 수 있습니다.
 - 이때, 정보를 다 채우지 않고 login 버튼을 누르거나 등록되지 않은 id/password라면 main page로 넘어갈 수 없습니다.
 
 #### SignUp Page
 - user 정보를 등록할 수 있습니다. 
 - 이때, 정보를 다 채우지 않고 sign up 버튼을 누르거나 이미 있는 id라면 등록할 수 없습니다.
 - 가입한 적이 있다면 '로그인'을 눌러 login page로 이동할 수 있습니다.

#### Main Page
- page 상단에 user의 nickname, 이긴 횟수, 진 횟수가 뜹니다.
- 시작하기 버튼을 누르면, 상대를 기다리는 동안 화면의 펭수 이미지가 바뀝니다.
- 상대가 매칭되면 ingame page로 넘어갑니다.
- logout 버튼을 눌러 login page로 돌아갈 수 있습니다.
 
 --------------------------------------
### 2. in game
<img src = "https://user-images.githubusercontent.com/85171279/178475809-f72e85e5-43e2-4245-8e1b-f2d5e3516439.png" width = "180" height = "400"/> <img src = "https://user-images.githubusercontent.com/85171279/178475924-a4b07993-5788-4e55-bad7-e929211ef573.png" width = "180" height = "400"/> <img src = "https://user-images.githubusercontent.com/85171279/178475617-d66d344b-7db0-4ccd-8c5d-a0884a0560c0.png" width = "180" height = "400" />

#### Implementation Methods
- socket io를 이용하여 서버와 클라이언트 통신하였습니다.
- io.on("connection", (socket) => {} 안에 socket.on으로 클라이언트 한테 받은 여러 이벤트에 대해 callback함수를 등록하여 각 상황에 대하여 처리하였습니다.

#### Major Features
- 각 player는 game을 시작하면 서버로 부터 랜덤하게 받은 8개의 카드를 가집니다.
- 이 카드는 순서대로 각 round에 자신이 놓을 카드가 됩니다.
- 각 player는 자신의 턴이 시작하면 자신의 말들을 움직입니다. 이 말들은 가장 먼저 공격이 가능한지 확인 후 가능하면 공격을 하며 이동하고, 그게 아니면 한 칸 앞으로 이동합니다. 움직일 수 없으면 가만히 있습니다.
- 그런 다음, 자신 앞의 3칸 중 하나에 자신의 카드를 놓고 턴을 종료합니다.
- player는 자신의 앞 3칸이 다 차서 놓지 못하거나, 상대가 자신의 앞 3칸에 하나라도 들어오면 지게 됩니다.
