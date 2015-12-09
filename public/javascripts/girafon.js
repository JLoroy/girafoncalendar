
var app = angular.module('girafon',["firebase"]);

app.factory("Auth", ["$firebaseAuth",
    function($firebaseAuth) {
        var ref = new Firebase("https://docs-sandbox.firebaseio.com");
        return $firebaseAuth(ref);
    }
]);

app.controller('girafonController', ['$scope', '$filter', '$http','$window','$firebaseObject', 'Auth', function($scope, $filter, $http, $window, $firebaseObject, Auth) {
    $scope.test = "it works ! ";
    $scope.currMsg = '';
    $scope.click = {};

    var usersRef = new Firebase("https://girafoncalendar.firebaseio.com/users");
    var calendarRef = new Firebase("https://girafoncalendar.firebaseio.com/calendar");
    var chatRef = new Firebase("https://girafoncalendar.firebaseio.com/chat");

    var syncUsers = $firebaseObject(usersRef);
    var syncCalendar = $firebaseObject(calendarRef);
    var syncChat = $firebaseObject(chatRef);

    syncUsers.$bindTo($scope, "users");
    syncCalendar.$bindTo($scope, "calendar");
    syncChat.$bindTo($scope, "chat");

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        usersRef.child(authData.facebook.id).set({name: authData.facebook.displayName, picture: authData.facebook.profileImageURL});
    });

    $scope.dateClass = function(date){
        jour = date.substring(0,3);
        switch(jour){
            case "Lun":
                return "warning";
            default:
                return "";
        }
    };
    $scope.sendMsg = function(msg){
        var msgRef = new Firebase("https://girafoncalendar.firebaseio.com/chat/messages");
        msgRef.push({name: $scope.authData.facebook.displayName, content: msg});
    };
/*
// and use it in our controller
app.controller("SampleCtrl", ["$scope", "Auth",
    function($scope, Auth) {
        $scope.createUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$createUser({
                email: $scope.email,
                password: $scope.password
            }).then(function(userData) {
                $scope.message = "User created with uid: " + userData.uid;
            }).catch(function(error) {
                $scope.error = error;
            });
        };

        $scope.removeUser = function() {
            $scope.message = null;
            $scope.error = null;

            Auth.$removeUser({
                email: $scope.email,
                password: $scope.password
            }).then(function() {
                $scope.message = "User removed";
            }).catch(function(error) {
                $scope.error = error;
            });
        };
    }
]);
*/
//authData.facebook.displayName
    /*$scope.showModal = false;
    $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
    };*/
}]);
/*

app.directive('modal', function () {
    return {
        template: '<div class="modal fade">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header">' +
        '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
        '<h4 class="modal-title">{{ title }}</h4>' +
        '</div>' +
        '<div class="modal-body" ng-transclude></div>' +
        '</div>' +
        '</div>' +
        '</div>',
        restrict: 'E',
        transclude: true,
        replace:true,
        scope:true,
        link: function postLink(scope, element, attrs) {
            scope.title = attrs.title;

            scope.$watch(attrs.visible, function(value){
                if(value == true)
                    $(element).modal('show');
                else
                    $(element).modal('hide');
            });

            $(element).on('shown.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = true;
                });
            });

            $(element).on('hidden.bs.modal', function(){
                scope.$apply(function(){
                    scope.$parent[attrs.visible] = false;
                });
            });
        }
    };
});*/

//var inputDtFormat = "DD-MM-YY";
//var currDt = moment("07-12-15", inputDtFormat);
//var lastDt = moment("31-01-16", inputDtFormat);
//
//while(currDt.format(inputDtFormat) != lastDt.format(inputDtFormat)){
//    currDt = currDt.add(1,"days");
//    calendarRef.push({date: currDt.format("D MMMM")})
//}
