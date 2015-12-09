
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

    var usersRef = new Firebase("https://girafoncalendar.firebaseio.com/users");
    var calendarRef = new Firebase("https://girafoncalendar.firebaseio.com/calendar");
    var chatRef = new Firebase("https://girafoncalendar.firebaseio.com/chat");

    $scope.auth = Auth;

    // any time auth status updates, add the user data to scope
    $scope.auth.$onAuth(function(authData) {
        $scope.authData = authData;
        console.log(authData);
    });

    var syncUsers = $firebaseObject(usersRef);
    var syncCalendar = $firebaseObject(calendarRef);
    var syncChat = $firebaseObject(chatRef);

    syncUsers.$bindTo($scope, "users");
    syncCalendar.$bindTo($scope, "calendar");
    syncChat.$bindTo($scope, "chat");

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
        msgRef.push({name: "Fabian", content: msg});
    };
}]);

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

//authData.facebook.displayName