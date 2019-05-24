angular.module("chatApp",[]);

angular.module("chatApp").config(['$qProvider', function ($qProvider) {
  $qProvider.errorOnUnhandledRejections(false);
}]);
