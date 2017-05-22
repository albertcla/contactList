(function() {
  'use strict';

  angular
    .module('ContactList')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$scope', 'UsersFactory', '$routeParams'];

  /* @ngInject */
  function ProfileController($scope, UsersFactory, $routeParams){


    activate();

    ////////////////

    function activate() {
      $scope.selectedUser = UsersFactory.get($routeParams.userId);
      $scope.userid = $routeParams.userId;
    }
  }
})();
