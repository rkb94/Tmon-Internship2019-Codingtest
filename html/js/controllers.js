angular.module('chatApp').controller('Controller',
    function dongController($scope, theService) {
      $scope.friends = window.friends;
      for (var i = 0; i < $scope.friends.length; i++) {
        if (localStorage.getItem($scope.friends[i].name) == null) {
          $scope.friends[i].chat = false;
        } else {
          $scope.friends[i].chat = true;
        }
      }
      console.log($scope.friends);
      $scope.pageLoad = function () {
        // localStorage.setItem("공유",null);
        $scope.chatFriend = localStorage.getItem('chatFriend');
        $scope.chatFriendImg = localStorage.getItem('chatFriendImg');
        $scope.beforeChatList = JSON.parse(
            localStorage.getItem($scope.chatFriend));
        if ($scope.beforeChatList == null) {
          $scope.beforeChatList = [];
        }
        for (var i = 0; i < $scope.beforeChatList.length; i += 2) {
          createSendChatTag($scope.beforeChatList[i]);
          createResponseChatTag($scope.chatFriendImg,
              $scope.beforeChatList[i + 1]);
        }
      }

      if (location.pathname.includes("chatting")) {
        $scope.pageLoad();
      }

      $scope.chat = function (friend) {
        $scope.chatFriend = friend;
        console.log(friend);
        localStorage.setItem('chatFriend', friend.name);
        localStorage.setItem('chatFriendImg', friend.img);
        location.href = "chatting.html";
      };
      $scope.pageLoad = function () {
        alert("ABD");
        $scope.chatFriend = localStorage.getItem('chatFriend');
        $scope.chatFriendImg = localStorage.getItem('chatFriendImg');
        $scope.beforeChatList = JSON.parse(
            localStorage.getItem($scope.chatFriend));
        if ($scope.beforeChatList == null) {
          $scope.beforeChatList = [];
        }
        for (var i = 0; i < $scope.beforeChatList.length; i += 2) {
          createSendChatTag($scope.beforeChatList[i]);
          createResponseChatTag($scope.beforeChatList[i + 1]);
        }
      }

      $scope.sendChat = function (data) {
        $scope.chatFriend = localStorage.getItem('chatFriend');
        $scope.chatFriendImg = localStorage.getItem('chatFriendImg');

        createSendChatTag($scope.chatData);

        $scope.beforeChatList = JSON.parse(
            localStorage.getItem($scope.chatFriend));

        if ($scope.beforeChatList == null) {
          $scope.beforeChatList = [];
        }

        $scope.beforeChatList.push($scope.chatData);

        $scope.chatData = "";

        onChatResponse($scope.chatFriendImg);

      };
      $scope.enter = function(event,data){
        if(event.key == "Enter"){
          $scope.sendChat(data);
        }
      }

      function onChatResponse(friendName) {
        $.ajax({
          url: "http://onlinetest.tmon.co.kr/api/exam/msg.jsonp",
          dataType: 'jsonp',
          jsonpCallback: "chatCallBack",
          success: function (data) {
            createResponseChatTag(friendName, data.message);
            $scope.beforeChatList.push(data.message);
            localStorage.setItem($scope.chatFriend,
                JSON.stringify($scope.beforeChatList));
          },
          error: function (error) {
            console.log('Response Error: ', error);
            return "";
          }
        });
      }

      function createResponseChatTag(friendName, chatText) {
        $('.chatting_wrap').append(`
        <li class="chatting">
            <div class="item_img">
                <img src="../../img/friends/` + friendName + `" alt="프로필 이미지">
            </div>
            <p class="chatting_text">` + chatText + `</p>
        </li>
    `)
      }

      function createSendChatTag(chatText) {
        $('.chatting_wrap').append(`
        <li class="chatting right">
            <div class="item_img">
                <img src="../../img/me.jpg" alt="프로필 이미지">
            </div>
            <p class="chatting_text">` + chatText + `</p>
        </li>
    `)
      }
    });

