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


    // Get the sorted list order from the DOM
    function getTodos (success) {

      // Check for lists
      var s=0, list=[];
      $('.todo-list-group').each(function(){

          // Init list
          list.push( initList( $scope.todoLists[s].colors || colorPicker.getColors() ) );

          // Init notes
          $('#' + this.id + ' .todo-value').each(function(){

            list[s].todos.push( initTodo( this.value, this.style.color ) );

          });
          s++;

      });

      return list;
    }

    function initList (pallete) {

      return {
        'show' : false,
        'colors' : pallete || colorPicker.getColors(),
        'todos' : []
      };
    };

    function initTodo (item, pallete) {

      return {
        'item' : item || '',
        'color' : (pallete.constructor === Array) ? colorPicker.randomColor(pallete) : pallete
      }
    }

    var colorPicker = {

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

    // Get todos saved in localStorageService or create empty array
    // Bind localStorageService to $scope.todos
    var todoListsInStore = localStorageService.get('todoLists');
    $scope.todoLists = todoListsInStore || [];
    $scope.$watch(function () {

      localStorageService.add('todoLists', JSON.stringify($scope.todoLists));
    });

    $scope.addList = function () {

      // Initialize a new list and new blank note (first list lacks a note)
      // Pass the colors array for random note color from pallete
      var l = $scope.todoLists.length;
      $scope.todoLists.push( initList() );
      if (l>0) { $scope.addTodo(l,'a new thing'); }
    }

    $scope.addTodo = function (list,item) {

      if ($scope.todoLists[list].todos === undefined) { $scope.todoLists[list].todos = [] }
      $scope.todoLists[list].todos.push( initTodo( item || 'a new thing', $scope.todoLists[list].colors ) )

    };

    $scope.removeTodo = function (list,item) {

      // Take out note and empty list if empty
      $scope.todoLists[list].todos.splice(item,1);
      if (!$scope.todoLists[list].todos.length) { $scope.todoLists.splice(list,1); }

    };

    // Draggable Items
    $( "#todoApp" ).draggable();

    // Sortable Options
    $scope.sortableOptions = {
        disabled : false,
        update : function(event) {
            $scope.todoLists = getTodos();
            return $scope.sortableUpdated = true;
        }
    };

  });
