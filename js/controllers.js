/**
 * Created by Orestis on 16/4/2016.
 */

var organizerControllers = angular.module('organizerControllers', ['ngMaterial']);

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

organizerControllers.controller('WeddingCreation', ['$scope', '$http', '$mdDialog', '$window', function ($scope, $http, $mdDialog, $window) {
    $scope.event = {};
    $scope.invitation ={};
    $scope.createEvent = function () {
        console.log($scope.event);
        $http({
            method : 'POST',
            url : 'http://83.212.105.54:8080/event/new',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : $scope.event
        }).then(function (response) {
            $scope.invitation = response;
            console.log(response);
            $scope.showConfirm();
        }, function (error) {
            console.log(error);
            //$scope.showConfirm();
        });
    };
    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('This is your event\'s ID. You MUST write it down so you can have access to your event!')
            .textContent($scope.invitation.data.uuid)
            .targetEvent(ev)
            .ok('Got it');
        $mdDialog.show(confirm).then(function() {
            $window.location = '#/invite';
        });
    };
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