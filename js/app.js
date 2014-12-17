var weatherUKApp = angular.module('weatherUKApp', []);

weatherUKApp.controller('WeatherUKCtrl', function ($scope) {

// Taken from http://www.openweathermap.org/current bulk download examples: http://78.46.48.103/sample/city.list.json.gz
// http://api.openweathermap.org/data/2.5/group?id=2643743,2643339,2643123,2655603&units=metric
	$scope.cities = [
{"_id":2643743,"name":"London","country":"GB","coord":{"lon":-0.12574,"lat":51.50853}},
{"_id":2643339,"name":"Luton","country":"GB","coord":{"lon":-0.41748,"lat":51.879669}},
{"_id":2643123,"name":"Manchester","country":"GB","coord":{"lon":-2.23743,"lat":53.480949}},
{"_id":2655603,"name":"Birmingham","country":"GB","coord":{"lon":-1.89983,"lat":52.481419}}
  ];
	// $scope.orderProp = '_id';  
  
	var weatherRequest = 'http://api.openweathermap.org/data/2.5/group?id=2643743,2643339,2643123,2655603&units=metric'
	console.log(weatherRequest);

  $.getJSON(weatherRequest, function(data){
				console.log(data);
        $scope.cities = data.list;
  console.log($scope.cities);

	}).error(function(e){
        console.log('Weather feed not loaded.');
  });
  
  console.log($scope.cities);

		$scope.open = function(city) {
        if ($scope.isOpen(city)) {
            $scope.opened = undefined;
        } else {
            $scope.opened = city;
        }
        LookupWeather(city.name);
    };

    $scope.isOpen = function(city) {
        return $scope.opened === city;
    };

    $scope.anyCityOpen = function() {
        return !($scope.opened === undefined);
    };
});

function LoadCityList($scope){
	var cityListArray;
	var weatherRequest = 'http://api.openweathermap.org/data/2.5/group?id=2643743,2643339,2643123,2655603&units=metric'
	console.log(weatherRequest);

  $.getJSON(weatherRequest, function(data){
				console.log($scope);
        cityListArray = data.list;
        $scope.cities = data.list;
				return cityListArray;
	}).error(function(e){
        console.log('Weather feed not loaded.');
        return false;
  });
}

function LookupWeather(city) {

    var weatherRequest = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
		console.log(weatherRequest);

   $.getJSON(weatherRequest, function(data){

        console.log(data);
        var weatherObj = data.weather[0];
        console.log(weatherObj);
        $('#weather').html('<h1>' + data.name + '</h1> ' +  '<img src="http://openweathermap.org/img/w/' + data.weather[0].icon + '.png"><span style="font-size: 24px"> ' + (data.main.temp-273.15).toFixed(0) + '˚C </span> <br><h2>' + data.weather[0].description + '</h2>' + '<br>Geo Location: ' + data.coord.lat + '˚ lat, ' + data.coord.lon + '˚ lon<br> Temperature: ' + (data.main.temp_min-273.15) + '-' + (data.main.temp_max-273.15) + '˚C <br>Pressure: ' + data.main.pressure + 'hPa <br>Humidity: ' + data.main.humidity + '% <br>');

    }).error(function(e){
        console.log('API returned error');
    });

		loadBackground(city);
		
    return false;
};

function loadBackground(city) {

    // load streetview
    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + city + '';
    $('body').append('<img class="bgimg" src="' + streetviewUrl + '">');

}
