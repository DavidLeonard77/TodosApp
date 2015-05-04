'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:todoSheetsCtrl
 * @description
 * # todoSheetsCtrl
 * Controller of the todosApp
 */
angular.module('todosApp')

  .controller('todoCanvasCtrl', function ($scope, localStorageService) {

      $scope.colorPicker = {

        colors : [
          ['#79B8E1','#55DEEF','#BAFFFF','#9CB356','#648234','#bfa264','#bbab54','#bb9854','#baffc4'],
          ['#3FB8AF','#7FC7AF','#DAD8A7','#FF9E9D','#FF3D7F','#C03D7F','#8C627F','#C19E9D','#b1c19d'],
          ['#AF7575','#EFD8A1','#BCD693','#AFD7DB','#3D9CA8','#749CA8','#AB9CA8','#AB9C86','#9dab9c'],
          ['#FFBC67','#DA727E','#AC6C82','#7694a5','#5f81af','#735C7B','#649da9','#D89667','#d8c467'],
          ['#FFFBDC','#BFBCA5','#7F7D6E','#e4e4e4','#E5E2C6','#BAB8A1','#BAB828','#E8E4C8','#e8ef98']
        ],

        getRandomInt : function (min, max) {
          return Math.floor(Math.random() * (max - min)) + min;
        },
        randomColor : function (c) {
          return c[ this.getRandomInt( 0, c.length ) ];
        },
        getColors : function () {
          return this.colors[ this.getRandomInt( 0, this.colors.length ) ];
        }
      };

      // Sortable Options
      $scope.sortableOptions = {
          disabled : false,
          update : function(event) {
              $scope.todoLists = $scope.getTodos();
              $scope.todoSheets = $scope.getSheets();
              return $scope.sortableUpdated = true;
          }
      };

  });