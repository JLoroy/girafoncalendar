
var app = angular.module('girafon',["firebase"]);

app.controller('girafonController', ['$scope', '$filter', '$http','$window','$firebaseObject', function($scope, $filter, $http, $window, $firebaseObject) {
    $scope.test = "it works ! ";
    $scope.currMsg = '';

    var usersRef = new Firebase("https://girafoncalendar.firebaseio.com/users");
    var calendarRef = new Firebase("https://girafoncalendar.firebaseio.com/calendar");
    var chatRef = new Firebase("https://girafoncalendar.firebaseio.com/chat");

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