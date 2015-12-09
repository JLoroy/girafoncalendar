
var app = angular.module('girafon',["firebase"]);

app.controller('girafonController', ['$scope', '$filter', '$http','$window','$firebaseObject', function($scope, $filter, $http, $window, $firebaseObject) {
    $scope.test = "it works ! ";

    var ref = new Firebase("https://girafoncalendar.firebaseio.com");

    var syncObject = $firebaseObject(ref);

    syncObject.$bindTo($scope, "data");
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