import angular from 'angular';

import AppComponent from './app/app.component';

export default angular
  .module('index.app', [])
  // .config(routing)
  .component('app', {
    controllerAs: 'vm',
    controller: AppComponent,
    templateUrl: '/app/app/app.component.html',
  })
  .name;
