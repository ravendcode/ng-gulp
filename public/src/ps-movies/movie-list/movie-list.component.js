function fetchMovies($http) {
  return $http.get('./storage/movies.json')
    .then(res => res.data);
}

export default class MovieListComponent {
  constructor($http) {
    this.movies = [];
    this.message = 'Hello ng!';
    this.$onInit = () => {
      fetchMovies($http).then(movies => {
        this.movies = movies;
      });
    };
  }

  changeMessage() {
    this.message = 'new message';
  }

  upRating(movie) {
    if (movie.rating < 5) {
      movie.rating++;
    }
  }

  downRating(movie) {
    if (movie.rating > 1) {
      movie.rating--;
    }
  }
}
// MovieListComponent.$inject = ['$http', '$window'];
MovieListComponent.$$ngIsClass = true;
