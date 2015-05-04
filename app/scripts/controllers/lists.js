'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todosApp
 */
angular.module('todosApp')

  .directive('todolists',function(){
    return {
      restrict: 'E',
      templateUrl: '../../applets/lists.html',
      controller: function ($scope, localStorageService) {

        function initList (palette) {

          return {
            'show' : false,
            'colors' : palette || $scope.colorPicker.getColors(),
            'todos' : []
          };
        }

        function initTodo (item, palette) {

          return {
            'item' : item || '',
            'color' : (palette.constructor === Array) ? $scope.colorPicker.randomColor(palette) : palette
          }
        }

        // Get the sorted list order from the DOM
        $scope.getTodos = function () {

          // Check for lists
          var s=0, list=[];
          $('todolists .todo-list-group').each(function(){

              // Init list
              var d = $('#' + this.id).data();
              list.push( initList( d.palette || $scope.colorPicker.getColors() ) );

              // Init notes
              $('#' + this.id + ' .todo-value').each(function(){

                list[s].todos.push( initTodo( this.value, this.style.color ) );

              });
              s++;

          });

          return list;
        };

        $scope.addList = function () {

          // Initialize a new list and new blank note (first list lacks a note)
          // Pass the colors array for random note color from palette
          var l = $scope.todoLists.length;
          $scope.todoLists.push( initList() );
          if (l>0) { $scope.addTodo(l,'a new thing'); }
        };

        $scope.addTodo = function (list,item) {

          if ($scope.todoLists[list].todos === undefined) { $scope.todoLists[list].todos = [] }
          $scope.todoLists[list].todos.push( initTodo( item || 'a new thing', $scope.todoLists[list].colors ) )
        };

        $scope.removeTodo = function (list,item) {

          // Take out note and empty list if empty
          $scope.todoLists[list].todos.splice(item,1);
          if (!$scope.todoLists[list].todos.length) { $scope.todoLists.splice(list,1); }
        };

        // Get todos saved in localStorageService or create empty array
        // Bind localStorageService to $scope.todos
        var todoListsInStore = localStorageService.get('todoLists');
        $scope.todoLists = todoListsInStore || [];
        $scope.$watch(function () {

          localStorageService.add('todoLists', JSON.stringify($scope.todoLists));
        });

        // Draggable Items
        $('#todoLists').draggable({ snap : 'body' });

      },
      controllerAs: 'todoListsCtrl'
    };
  });
