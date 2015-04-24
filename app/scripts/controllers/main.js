'use strict';

/**
 * @ngdoc function
 * @name todosApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todosApp
 */
angular.module('todosApp')
  .controller('MainCtrl', function ($scope, localStorageService) {

    function randomColor(format){

      var rint = Math.round(0xffffff * Math.random());
      switch(format) {
        case 'hex':
          return ('#0' + rint.toString(16)).replace(/^#0([0-9a-f]{6})$/i, '#$1');
        break;

        case 'rgb':
          return 'rgb(' + (rint >> 16) + ',' + (rint >> 8 & 255) + ',' + (rint & 255) + ')';
        break;

        default:
          return rint;
        break;
      }
    }

    // Get the sorted list order from the DOM
    function updateTodos(){

      // Rebuild the todos list
      $scope.todos = [];
      $('.todo-value').each(function(){
        $scope.$apply();
        $scope.todos.push({ item: this.value, color: this.style.color });
        $scope.$apply();
      });
    }

    // Get todos saved in localStorageService or create empty array
    var todosInStore = localStorageService.get('todos');
    $scope.todos = todosInStore || [];

    // Bind localStorageService to $scope.todos
    $scope.$watch(function(){

      localStorageService.add('todos', JSON.stringify($scope.todos));
    });

    $scope.addTodo = function(){

      $scope.todos.push({ item: $scope.todo, color: randomColor('rgb') });
      $scope.todo = '';
    };

    $scope.removeTodo = function(i){

    	$scope.todos.splice(i,1);
    };

    // Sortable Options
    $scope.sortableOptions = {
        disabled: false,
        update: function(event) {
            updateTodos();
            return $scope.sortableUpdated = true;
        }
    };

  });
