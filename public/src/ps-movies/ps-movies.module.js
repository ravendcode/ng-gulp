import angular from 'angular';

import { routing } from './ps-movies.config';
import MovieListComponent from './movie-list/movie-list.component';
import MovieRatingComponent from './movie-rating/movie-rating.component';
import MovieShowComponent from './movie-show/movie-show.component';

export default angular
  .module('index.app.ps-movies', [])
  .config(routing)
  .component('movieList', {
    templateUrl: '/views/ps-movies/movie-list/movie-list.component.html',
    controllerAs: 'vm',
    controller: MovieListComponent,
  })
  .component('movieRating', {
    templateUrl: '/views/ps-movies/movie-rating/movie-rating.component.html',
    bindings: {
      value: '<',
    },
    transclude: true,
    controllerAs: 'vm',
    controller: MovieRatingComponent,
  })
  .component('movieShow', {
    templateUrl: '/views/ps-movies/movie-show/movie-show.component.html',
    controllerAs: 'vm',
    controller: MovieShowComponent,
  })
  .name;
