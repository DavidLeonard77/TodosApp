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

        // Get todos saved in localStorageService or create empty array
        // Bind localStorageService to $scope.todos
        var todoSheetsInStore = localStorageService.get('todoSheets');
        $scope.todoSheets = todoSheetsInStore || [];
        $scope.$watch(function () {

          localStorageService.add('todoSheets', JSON.stringify($scope.todoSheets));
        });

      },
      controllerAs: 'todoSheetsCtrl'
    };
  });