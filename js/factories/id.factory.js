(function () {
  'use strict';
  angular
    .module('ContactList')
    .factory('IdFactory', IdFactory);

  /* @ngInject */
  function IdFactory(){
    return {
      rand: rand
    };


    ////////////////

    function rand() {
      return Math.random().toString(36).substr(2, 10);
    }
  }
})();
