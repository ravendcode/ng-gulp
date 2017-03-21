export function routing($stateProvider) {
  $stateProvider
    .state({
      name: 'movie-list',
      url: '/movie-list',
      template: '<movie-list></movie-list>',
    })
    .state({
      name: 'movie-show',
      url: '/movie-show',
      template: '<movie-show></movie-show>',
      // resolve: {
      //   movie: function ($transition$) {
      //     return $transition$.params().id;
      //   },
      // },
    })
    ;
}
