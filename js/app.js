/**
 * Created by Orestis on 16/4/2016.
 */

var weddingApp = angular.module('weddingApp', [
        'ngRoute',
        'organizerControllers'
    ]);

weddingApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/createWedding', {
        templateUrl: 'partials/createWedding.html',
        controller: 'WeddingCreation'
    }).
        when('/invite', {
        templateUrl: 'partials/invite.html',
        controller: 'InvitationController'
    }).
        otherwise({
        redirectTo: '/createWedding'
    });
}]);