/**
 * Created by Orestis on 16/4/2016.
 */

var organizerControllers = angular.module('organizerControllers', ['ngMaterial']);

organizerControllers.controller('InvitationController', [ '$scope', '$http', 'Core', '$window', function ($scope, $http, Core, $window) {
    $scope.invited = {};
    $scope.invitation = Core.invitation;
    $scope.guests = Core.guestList;

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
            $scope.guests.push(response.data);
            $http({
                method : 'GET',
                url : 'http://83.212.105.54:8080/event/' + $scope.invitation.data.uuid + '/all',
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(function (response2) {

            }, function (error) {
                console.log(error);
            });
            console.log(response);
        }, function(error2) {
            console.log(error2);
        });
    };
    
    $scope.downloadQR = function () {


        console.log(Core.guestList);
      $http({
          method: 'GET',
          url: 'http://83.212.105.54:8080/image/' + $scope.invitation.data.uuid + '/' + Core.guestList.visitors[Core.guestList.visitors.length-1].uuid
      }).then(function (response3) {
          console.log('downloaded' + response3);
      }, function (error3) {
              console.log("something went wrong" + error3);
      });
    };

    $scope.deleteSomeone = function (personToDelete, index) {
        $http({
            method: 'DELETE',
            url: 'http://83.212.105.54:8080/event/delete',
            data: personToDelete.uuid
        }).then(function (success1) {
            console.log(Core.guestList);
            Core.guestList.splice(index, 1);
            console.log('UUID deleted' + success1);
        }, function (fail) {
            console.log('UUID not deleted' + fail);
        });
    };

    $scope.deleteEvent =function () {
        $http({
            method: 'DELETE',
            url: 'http://83.212.105.54:8080/event/cancelEvent',
            data: $scope.invitation.data.uuid
        }).then(function (success2) {
            console.log('UUID deleted' + success2);
            $window.location = '#/initialPage';
        }, function (fail1) {
            console.log('UUID not deleted' + fail1);
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
            .title('This is your event\'s ID. You MUST write it down so you can have access to your event latter!')
            .textContent($scope.invitation.data.uuid)
            .targetEvent(ev)
            .ok('Got it');
        
        $mdDialog.show(confirm).then(function() {
            $http({
                method : 'GET',
                url : 'http://83.212.105.54:8080/event/' + $scope.invitation.data.uuid + '/all',
                headers : {
                    'Content-Type' : 'application/json'
                }
            }).then(function (response) {
                console.log(response);
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



var invitedControllers = angular.module('invitedControllers', ['ngMaterial']);

invitedControllers.controller('PendingController', ['$scope', '$window', '$mdDialog', '$http', '$routeParams', function ($scope, $window, $mdDialog, $http, $routeParams) {
    console.log("hi");
    $scope.userId = $routeParams.userId;
    $scope.accepted = function () {
        $http({
            method : 'PUT',
            url : 'http://83.212.105.54:8080/visitor/accept', //not working yet
            headers : {
                'Content-Type' : 'application/json'
            }/*,
            data : $scope.event*/
        }).then(function (response) {
            console.log(response);
            $window.location = '#/accepted';
        }, function (error) {
            console.log(error);
        });
    };
    
    $scope.declined = function () {
        $scope.showAlert = function(ev) {
            $mdDialog.show(
                $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(true)
                    .title('DECLINED')
                    .textContent('We will miss you!')
                    .ok('OK')
                    .targetEvent(ev)
            );
        };
    };
}]);

invitedControllers.controller('AcceptedController', ['$scope', function ($scope) {
        
}]);