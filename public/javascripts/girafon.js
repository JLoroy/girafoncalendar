
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