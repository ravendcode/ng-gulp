export function routing($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/movie-list');

  $stateProvider
    .state('app', {
      abstract: true,
      template: '<app></app>',
    });
}
