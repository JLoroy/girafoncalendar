
var app = angular.module('girafon',["firebase"]);

app.controller('girafonController', ['$scope', '$filter', '$http','$window','$firebaseObject', function($scope, $filter, $http, $window, $firebaseObject) {
    $scope.test = "it works ! ";

    var usersRef = new Firebase("https://girafoncalendar.firebaseio.com/users");
    var calendarRef = new Firebase("https://girafoncalendar.firebaseio.com/calendar");

    var syncUsers = $firebaseObject(usersRef);
    var syncCalendar = $firebaseObject(calendarRef);

    syncUsers.$bindTo($scope, "users");
    syncCalendar.$bindTo($scope, "calendar");

    $scope.dateClass = function(date){
        jour = date.substring(0,3);
        switch(jour){
            case "Lun":
                return "warning";
            default:
                return "";
        }
    };
}]);