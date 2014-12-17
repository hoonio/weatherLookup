'use strict';

/* jasmine specs for controllers go here */
describe('Weather controllers', function() {

  describe('WeatherUKCtrl', function(){
    var scope, ctrl;

    beforeEach(module('WeatherUKCtrl'));

    beforeEach(inject(function($controller) {
      scope = {};
      ctrl = $controller('WeatherUKCtrl', {$scope:scope});
    }));


    it('should create "cities" model with 4 names', function() {
      expect(scope.cities.length).toBe(4);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('name');
    });
  });
});

describe('sorting the list of cities', function() {
  it('sorts in descending order temperature', function() {
    var cities = ['Birmingham', 'London', 'Luton', 'Manchester'];
    var sorted = sortUsers(users);
    expect(sorted).toEqual(['Luton', 'London', 'Birmingham', 'Manchester']);
  });
});