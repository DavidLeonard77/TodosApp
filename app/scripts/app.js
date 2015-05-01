'use strict';

/**
 * @ngdoc overview
 * @name todosApp
 * @description
 * # todosApp
 *
 * Main module of the application.
 */
angular
  .module('todosApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui',
    'LocalStorageModule'
  ])

  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/canvas.html',
        controller: 'todoCanvasCtrl'
      });
  });
