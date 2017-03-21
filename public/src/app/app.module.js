import angular from 'angular';
import uirouter from 'angular-ui-router';


import { routing } from './app.config';
import AppComponent from './app/app.component';
import NavComponent from './nav/nav.component';

export default angular
  .module('index.app', [uirouter])
  .config(routing)
  .component('app', {
    controllerAs: 'vm',
    controller: AppComponent,
    templateUrl: '/views/app/app/app.component.html',
  })
  .component('appNav', {
    controllerAs: 'vm',
    controller: NavComponent,
    templateUrl: '/views/app/nav/nav.component.html',
  })
  .name;
