
var app = angular.module('girafon',[]);

app.controller('girafonController', ['$scope', '$filter', '$http','$window', function($scope, $filter, $http, $window) {
$scope.test = "it works ! ";
    $scope.users = {
    1:{name:"justin"},
    2:{name:"fab"},
    3:{name:"girafon"}
    };
}]);