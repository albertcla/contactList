(function () {
  'use strict';

  angular
    .module('ContactList')
    .factory('UsersFactory', UsersFactory);

  UsersFactory.$inject = ['IdFactory'];

  /* @ngInject */
  function UsersFactory(IdFactory){
    return {
      get: get,
      getAll: getAll,
      save: save
    };


    ////////////////

    function get(id) {
      var users = getAll();
      var user = {};
      users.forEach(function (item, index) {
        if (item.id == id) {
          user = users[index];
        }
      });
      return user;
    }

    function getAll() {
    if ('users' in localStorage) {
        return JSON.parse(localStorage.getItem('users'));
      } else {
        return [
        {
          name: 'Imanol',
          photo: 'https://randomuser.me/api/portraits/men/1.jpg',
          phone: 601234567,
          email: 'imanol44@ticketea.com',
          gifs: [],
          comics: [],
          id: IdFactory.rand()
        }, {
          name: 'Miguel',
          photo: 'https://randomuser.me/api/portraits/men/11.jpg',
          phone: 612345678,
          email: 'miguel@traken.com',
          gifs: [],
          comics: [],
          id: IdFactory.rand()
        }, {
          name: 'Yunior',
          photo: 'https://randomuser.me/api/portraits/men/3.jpg',
          phone: 623456789,
          email: 'yunior@crack.com',
          gifs: [],
          comics: [],
          id: IdFactory.rand()
        }, {
          name: 'Jairo',
          photo: 'https://randomuser.me/api/portraits/men/4.jpg',
          phone: 653247891,
          email: 'jairo@teleco.com',
          gifs: [],
          comics: [],
          id: IdFactory.rand()
        }];
      }
    }

    function save(users) {
      localStorage.setItem('users', JSON.stringify(users));
    }

  }
})();
