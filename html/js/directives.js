angular.module("chatApp").directive("listData", function() {
  return {
    template: '<li ng-if="friend.chat" class="item new" ><button><div class="item_img"><img src="../../img/friends/{{friend.img}}" alt="프로필 이미지"></div><p class="item_text">{{friend.name}}</p></button></li>'
        + '<li ng-if="!friend.chat" class="item" ><button><div class="item_img"><img src="../../img/friends/{{friend.img}}" alt="프로필 이미지"></div><p class="item_text">{{friend.name}}</p></button></li>'
  }
});
angular.module("chatApp").directive("leftChat", function() {
  return {
    template: '<button><div class="item_img"><img src="../../img/friends/{{friend.img}}" alt="프로필 이미지"></div><p class="item_text">{{friend.name}}</p></button>'
  }
});angular.module("chatApp").directive("rightChat", function() {
  return {
    template: '<button><div class="item_img"><img src="../../img/friends/{{friend.img}}" alt="프로필 이미지"></div><p class="item_text">{{friend.name}}</p></button>'
  }
});
