(function () {
  'use strict';

  angular
    .module('ContactList', ['ngRoute'])
    .config(config);
  config.$inject = ['$routeProvider', '$locationProvider'];

  function config($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: '/views/home.html'
      })
      .when('/profile/:userId', {
        controller: 'ProfileController',
        templateUrl: '/views/profile.html'
      })
      .when('/comic/:comicId', {
        controller: 'ComicController',
        templateUrl: '/views/comic.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
