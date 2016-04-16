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

organizerControllers.controller('WeddingCreation', ['$scope', '$http', function ($scope, $http) {
    $scope.event = {};
    $scope.eventButton = function() {
        console.log($scope.event);
        $scope.createEvent = function () {
            $http({
                method : 'POST',
                url : 'http://83.212.105.54:8080/event', //not working yet
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : $scope.event
            })
        };
    }
}]);


// var invitedControllers = angular.module('invitedControllers');
//
// invitedControllers.controller();