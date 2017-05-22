(function () {
  'use strict';

  angular
    .module('ContactList')
    .controller('HomeController', HomeController);

  HomeController.$inject = ['$scope', 'UsersFactory', 'IdFactory', 'GifsFactory', 'ComicsFactory'];

  /* @ngInject */
  function HomeController($scope, UsersFactory, IdFactory, GifsFactory, ComicsFactory) {
    $scope.cancelUser = cancelUser;
    $scope.addUser = addUser;
    $scope.editUser = editUser;
    $scope.saveUser = saveUser;
    $scope.deleteUser = deleteUser;
    $scope.datosActive = datosActive;
    $scope.gifsActive = gifsActive;
    $scope.comicsActive = comicsActive;
    $scope.searchGifs = searchGifs;
    $scope.searchRandomGifs = searchRandomGifs;
    $scope.searchComics = searchComics;
    $scope.prevGifs = prevGifs;
    $scope.nextGifs = nextGifs;
    $scope.prevComics = prevComics;
    $scope.nextComics = nextComics;
    $scope.setWish = setWish;
    $scope.removeWish = removeWish;
    $scope.setOrder = setOrder;

    $scope.users = [];
    $scope.newUser = {
      name: '',
      photo: '',
      phone: '',
      email: '',
      gifs: [],
      comics: []
    };
    $scope.actived = 'datos';
    $scope.resultsG = [];
    $scope.resultsC = [];
    $scope.offG = 0;
    $scope.offC = 0;


    activate();

    ////////////////

    function activate() {
      $scope.users = UsersFactory.getAll();
      $scope.editing = false;
      $scope.order = 'recent';
    }

    function cancelUser() {
      $scope.newUser = {};
      $scope.userForm.$setPristine();
      $scope.userForm.$setUntouched();
      $scope.editing = false;
    }

    function addUser(user) {
      user.id = IdFactory.rand();
      $scope.users.push(user);
      cancelUser();
      UsersFactory.save($scope.users);
      $scope.editing = false;
    }

    function editUser(user) {
      $scope.editing = true;
      $scope.newUser = angular.copy(user);
    }

    function saveUser(user) {
      $scope.users.forEach(function (userToEdit, pos) {
        if (userToEdit.id == user.id) {
          $scope.users[pos] = user;
        }
      })
      UsersFactory.save($scope.users);
      cancelUser();
    }

    function deleteUser(user) {
      $scope.users.forEach(function (userToEdit, pos) {
        if (userToEdit.id == user.id) {
          if (prompt('¿Seguro que desea eliminar el usuario? Para confirmar escriba su nombre:') == user.name) {
            $scope.users.splice(pos, 1);
            UsersFactory.save($scope.users);
          }
        }
      })
    }

    function datosActive() {
      $scope.actived = 'datos';
    }

    function gifsActive() {
      $scope.actived = 'gifs';
    }

    function comicsActive() {
      $scope.actived = 'comics';
    }

    function searchGifs(search, off, order) {
      GifsFactory.get(search, off, order)
        .then(function (result) {
            $scope.resultsG = result;
          },
          function (error) {
            console.log('Ha habido un error al buscar el Gif');
          })
    }

    function searchRandomGifs() {
      $scope.resultsG = [];
      for (var i = 0; i <= 7; i++) {
        GifsFactory.rand()
            .then(function (result) {
                $scope.resultsG.push(result);
              },
              function (error) {
                console.log('Ha habido un error al buscar el Gif');
              });
      }
     }

    function searchComics(search, off) {
      ComicsFactory.getPack(search, off)
        .then(function (result) {
            $scope.resultsC = result;
          },
          function (error) {
            console.log('Ha habido un error al buscar el Comic');
          })
    }

    function prevGifs(search, off) {
      off = off - 8;
      $scope.offG = off;
      searchGifs(search, off);
    }

    function nextGifs(search, off) {
      off = off + 8;
      $scope.offG = off;
      searchGifs(search, off);
    }

    function prevComics(search, off) {
      off = off - 3;
      $scope.offC = off;
      searchComics(search, offC);
    }

    function nextComics(search, off) {
      off = off + 3;
      $scope.offC = off;
      searchComics(search, off);
    }

    function setWish(item, list) {
      var flag = false;
      item.check = true;
      list.forEach(function (element) {
        if (element.id == item.id) {
          flag = true;
        };
      });
      if (!flag) {
        list.push(item);
      }
    }

    function removeWish(item, list) {
      list.forEach(function (element, index) {
        if (element.id == item.id) {
          list.splice(index, 1);
        }
      })
      item.check = false;
    }

    function setOrder(order) {
      $scope.order = order;
    }

  }
})();
