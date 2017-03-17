import angular from 'angular';

import MovieListComponent from './movie-list/movie-list.component';
import MovieRatingComponent from './movie-rating/movie-rating.component';

export default angular
  .module('index.app.ps-movies', [])
  // .config(routing)
  .component('movieList', {
    templateUrl: '/ps-movies/movie-list/movie-list.component.html',
    controllerAs: 'vm',
    controller: MovieListComponent,
  })
  .component('movieRating', {
    templateUrl: '/ps-movies/movie-rating/movie-rating.component.html',
    bindings: {
      value: '<',
    },
    transclude: true,
    controllerAs: 'vm',
    controller: MovieRatingComponent,
  })
  .name;
