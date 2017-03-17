import expect from 'expect';
import MovieListComponent from './movie-list.component.js';

describe('MovieListComponent', () => {
  let movieList;
  beforeEach(() => {
    movieList = new MovieListComponent();
  });

  it('should be created', () => {
    expect(movieList).toExist();
    expect(movieList.$onInit).toExist();
  });
});
