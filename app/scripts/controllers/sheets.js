'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:todoSheetsCtrl
 * @description
 * # todoSheetsCtrl
 * Controller of the todosApp
 */
angular.module('todosApp')

  .directive('todosheets',function(){
    return {
      restrict: 'E',
      templateUrl: '../../applets/sheets.html',
      controller: function ($scope, localStorageService) {

        function initSheet (text, palette, color) {

          var colors = palette || $scope.colorPicker.getColors();
          return {
            'text' : text || '',
            'show' : false,
            'colors' : colors,
            'color' : color || $scope.colorPicker.randomColor(colors)
          };
        }

        // Get the sorted list order from the DOM
        $scope.getSheets = function () {

          // Check for lists
          var list=[];
          $('todosheets .todo-sheet textarea').each(function(){
              var d = $('#' + this.id).data();
              list.push( initSheet( this.value, d.palette, this.style.color ) );
          });

          return list;
        };

        $scope.addSheet = function () {

          // Init a new sheet
          $scope.todoSheets.push( initSheet() );
        };

        $scope.removeSheet = function (item) {

          // Take out note and empty list if empty
          $scope.todoSheets.splice(item,1);
        };

        // Get todos saved in localStorageService or create empty array
        // Bind localStorageService to $scope.todos
        var todoSheetsInStore = localStorageService.get('todoSheets');
        $scope.todoSheets = todoSheetsInStore || [];
        $scope.$watch(function () {

          localStorageService.add('todoSheets', JSON.stringify($scope.todoSheets));
        });

        // Draggable Items
        $('#todoSheets').draggable({ snap : 'body' });

      },
      controllerAs: 'todoSheetsCtrl'
    };
  });