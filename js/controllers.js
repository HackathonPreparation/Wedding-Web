/**
 * Created by Orestis on 16/4/2016.
 */

var organizerControllers = angular.module('organizerControllers', ['ngMaterial']);

organizerControllers.controller('InvitationController', [ '$scope', '$http', 'Core', function ($scope, $http, Core) {
    $scope.invited = {};
    $scope.invitation = Core.invitation;
    $scope.guests = Core.guestList;

    console.log($scope.invitation.data.uuid);

    $scope.createInvites = function (person) {
        //$scope.guests.push(person);
        $http({
            method : 'POST',
            url : 'http://83.212.105.54:8080/visitor/new',
            headers : {
                'Content-Type' : 'application/json'
            },
            data : {
                'name' : $scope.invited.name,
                'eventUUID' : $scope.invitation.data.uuid
            }
        }).then(function (response) {
            //$scope.guests.push(person);
            console.log("hiiii");
            $http({
                method : 'GET',
                url : 'http://83.212.105.54:8080/event/' + $scope.invitation.data.uuid,
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(function (response2) {
                console.log(response2);
                Core.guestList = response2.data;
                console.log(Core.guestList);
            }, function (error) {
                console.log(error);
            });
            console.log(response);
        }, function(error2) {
            //$scope.guests.push(person);
            console.log(error2);
        });
    };
}]);

organizerControllers.controller('WeddingCreation', ['$scope', '$http', '$mdDialog', '$window', 'Core', function ($scope, $http, $mdDialog, $window, Core) {
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
            Core.invitation = response;
            console.log(response);
            $scope.showConfirm();
        }, function (error) {
            console.log(error);
        });
    };
    $scope.showConfirm = function(ev) {
        var confirm = $mdDialog.confirm()
            .title('This is your event\'s ID. You MUST write it down so you can have access to your event!')
            .textContent($scope.invitation.data.uuid)
            .targetEvent(ev)
            .ok('Got it');
        $mdDialog.show(confirm).then(function() {
            $http({
                method : 'GET',
                url : 'http://83.212.105.54:8080/event/' + $scope.invitation.data.uuid,
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(function (response) {
                console.log(response);
                Core.guestList = response.data;
                $window.location = '#/invite';
            }, function (error) {
                console.log(error);
            });
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