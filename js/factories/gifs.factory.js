(function () {
    'use strict';
    angular
      .module('ContactList')
      .factory('GifsFactory', GifsFactory);

    GifsFactory.$inject = ['$http'];

    /* @ngInject */
    function GifsFactory($http) {
      return {
        get: get,
        rand: rand
      };

      ////////////////

      function get(search, off, order) {
        var urlAPI = 'http://api.giphy.com/v1/gifs/';
        var endPoint = 'search?';
        var q = 'q=';
        var limit = '&limit=8';
        var offset = '&offset=' + off;
        var sort = '&sort=' + order;
        var APIkey = '&api_key=dc6zaTOxFJmzC';
        search = search.replace(' ', '+');
        var urlSearch = urlAPI + endPoint + q + search + limit + offset + sort + APIkey;
        return $http.get(urlSearch)
          .then(function (response) {
              var result = [];
              response.data.data.forEach(function (item) {
                result.push({
                  gif: item.images.fixed_height.url,
                  id: item.id
                });
              });
              return result;
            },
            function (error) {
              console.log('Ha habido un error al buscar los gif');
            })
      }

      function rand() {
        var urlAPI = 'http://api.giphy.com/v1/gifs/';
        var endPoint = 'random?';
        var APIkey = '&api_key=dc6zaTOxFJmzC';
        var urlSearch = urlAPI + endPoint + APIkey;
        var result = [];
          return $http.get(urlSearch)
            .then(function (response) {
                result.push({
                  gif: response.data.data.fixed_height_small_url,
                  id: response.data.data.id
                });
                return result[0];
              },
              function (error) {
                console.log('Ha habido un error al buscar los gif');
              }
            );
      }
    }
})();
