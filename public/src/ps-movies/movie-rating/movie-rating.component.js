export default class MovieRatingComponent {
  constructor() {
    this.$onInit = () => {
      this.entries = new Array(this.value);
    };
  }

  $onChanges() {
    this.entries = new Array(this.value);
  }
}
MovieRatingComponent.$$ngIsClass = true;
