/**
 * Created by Orestis on 16/4/2016.
 */

var organizerControllers = angular.module('organizerControllers', []);

organizerControllers.controller('InvitationController', [ '$scope', '$http', function ($scope, $http) {
    $scope.invited = {};
    $scope.inviteButton = function() {
        console.log($scope.invited);
        $scope.createInvites = function () {
            $http({
                method : 'POST',
                url : '/visitors', //not working yet
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : $scope.invited
            })
        };
    }    
}]);

organizerControllers.controller('WeddingCreation', ['$scope', '$http', '$timeout', function ($scope, $http) {
    $scope.event = {};
    $scope.invitation ={};
    //$scope.eventButton = function() {
        $scope.createEvent = function () {
            $http({
                method : 'POST',
                url : 'http://83.212.105.54:8080/event/new', //not working yet
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : $scope.event
            }).then(function (response) {
                $scope.invitation = response;
                console.log(response);
            }, function (error) {
                console.log(error);
            });
        };
    //};
}]);

organizerControllers.controller('InitialEvent', ['$scope', '$window', function ($scope, $window) {
    $scope.goCreate = function() {
        console.log($scope.event);
        $window.location = '#/createWedding';
    };
    $scope.goEdit = function() {
        console.log($scope.event);
        $window.location = '#/invite';
    };
}]);


// var invitedControllers = angular.module('invitedControllers', []);
//
// invitedControllers.controller('decisionController');