(function () {
  'use strict';
  angular
    .module('ContactList')
    .factory('ComicsFactory', ComicsFactory);

  ComicsFactory.$inject = ['$http'];

  /* @ngInject */
  function ComicsFactory($http) {
    return {
      get: get,
      getPack: getPack,
      adapt: adapt
    };

    ////////////////

    function get(id) {
      var urlAPI = 'https://gateway.marvel.com:443/v1/public/comics/';
      var APIkey = '?apikey=72ba176a6b9a53528631a49e2f579a90';
      var urlSearch = urlAPI + id + APIkey;
      return $http.get(urlSearch)
        .then(function (response) {
            var result = [];
            var title = response.data.data.results[0].title;
            var description = response.data.data.results[0].description;
            var dates = response.data.data.results[0].dates[0].date;
            var creators = response.data.data.results[0].creators;
            var characters = response.data.data.results[0].characters;
            var path = response.data.data.results[0].images[0].path;
            var extension = response.data.data.results[0].images[0].extension;
            result.push({title: title, description: description, dates: dates, creators: creators, characters: characters, image: path + '.' + extension});
            return result[0];
          },
          function (error) {
            console.log('Ha habido un error al buscar los comics');
          })
    }

    function adapt (result) {
      if (result.description == null) {
        result.description = 'Not available';
      }

      result.dates = result.dates.slice(8,10) + ' / ' + result.dates.slice(5,7) + ' / ' + result.dates.slice(0,4);

      if (result.creators.avilable > 0) {
        var creat = '';
        for (var i = 0; i < result.creators.available; i++) {
          creat = creat + ', ' + result.creators.item[i].name;
        }

      } else {
        creat = 'Not available';
      }
      result.creators = creat;

      if (result.characters.available > 0) {
        var chars = [];
        for (var i = 0; i < result.characters.available; i++) {
          chars.push(result.characters.items[i].name);
        }
        chars = chars.toString();

      } else {
        chars = 'Not available';
      }
      result.characters = chars;

      return result;
    }

    function getPack(search, off) {
      var urlAPI = 'https://gateway.marvel.com:443/v1/public/comics?';
      var limit = '&limit=3';
      var offset = '&offset=' + off;
      var APIkey = '&apikey=72ba176a6b9a53528631a49e2f579a90';
      search = 'titleStartsWith=' + search.replace(' ', '%20');
      var urlSearch = urlAPI + search + limit + offset + APIkey;
      return $http.get(urlSearch)
        .then(function (response) {
            var result = [];
            response.data.data.results.forEach(function (item, index) {
              var cover = '';
              if (!item.images[0]) {
                cover = 'http://placehold.it/140x200';
              } else {
                cover = item.images[0].path + '.' + item.images[0].extension;
              }
              result.push({
                comic: cover,
                id: item.id
              });
            });
            return result;
          },
          function (error) {
            console.log('Ha habido un error al buscar los comics');
            console.log(error);
          })
    }
  }
})();
