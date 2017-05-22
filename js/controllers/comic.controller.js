(function() {
  'use strict';

  angular
    .module('ContactList')
    .controller('ComicController', ComicController);

  ComicController.$inject = ['$scope', 'ComicsFactory', '$routeParams'];

  /* @ngInject */
  function ComicController($scope, ComicsFactory, $routeParams){
    $scope.goBack = goBack;


    activate();

    ////////////////

    function activate() {
      ComicsFactory.get($routeParams.comicId)
        .then(function (result) {
            $scope.selectedComic = ComicsFactory.adapt(result);
          },
          function (error) {
            console.log('Ha habido un error al buscar el Comic');
          });
    }

    function goBack() {
      window.history.back();
    }
  }
})();
