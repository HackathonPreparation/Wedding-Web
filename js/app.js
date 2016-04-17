/**
 * Created by Orestis on 16/4/2016.
 */

var weddingApp = angular.module('weddingApp', [
        'ngRoute',
        'organizerControllers'
    ]);

weddingApp.factory('Core', function(){
    return {
        guestList : {},
        invitation : {}
        }
    }
);

weddingApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/initialPage', {
        templateUrl: 'partials/initialPage.html',
        controller: 'InitialEvent'
    }).
        when('/createWedding', {
        templateUrl: 'partials/createWedding.html',
        controller: 'WeddingCreation'
    }).
        when('/invite', {
        templateUrl: 'partials/invite.html',
        controller: 'InvitationController'
    }).
        otherwise({
        redirectTo: '/initialPage'
    });
}]);