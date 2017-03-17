window.$ = window.jQuery = require('jquery');
require('bootstrap');
import angular from 'angular';

// Modules
import app from './app/app.module';
// import common from './common/common.module';
import psMovies from './ps-movies/ps-movies.module';


angular.module('index', [
  app,
  psMovies,
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['index']);
});
