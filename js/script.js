function loadCities() {

}

function displayWeather() {

}




function loadData() {

    /*
    The $ that shows up in variable names, like $body for example, is just a character like any other. In this case, it refers to the fact that the variable referenced by $body is a jQuery collection, not a DOM node.
    */
    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');


    // load streetview
    var weatherRequest = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityStr;
		console.log(weatherRequest);

   $.getJSON(weatherRequest, function(data){

        $nytHeaderElem.text('Weather for ' + cityStr);
				console.log(data);
        articles = data.weather[0].description;
        console.log(articles);
        /*for (var i = 0; i < articles.length; i++) {
            var article = articles[i];
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                '<p>' + article.snippet + '</p>'+
            '</li>');
        };*/
				$nytElem.append(articles);

    }).error(function(e){
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

 /*  $.getJSON('http://sandbox.hoonio.com.s3.amazonaws.com/weatherUK/js/city.list.json', function(data){

				console.log(data);
        for (var i = 0; i < data.length; i++) {
            
            console.log("looping");
            if (data[i].country === "UK")
            {
            	console.log(data[i]);
            }
            // $nytElem.append('<li class="article">'+
            //    '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
            //    '<p>' + article.snippet + '</p>'+
            //'</li>');
        };
				$nytElem.append(articles);

    });*/


    // load wikipedia data
		
		var wikipediaUrl = "http://sandbox.hoonio.com.s3.amazonaws.com/weatherUK/js/city.list.json";

		var wikiRequestTimeout = setTimeout(function(){
				$wikiElem.text("failed to get wikipedia resource");
			}, 8000);


		$.ajax({
			url: wikipediaUrl,
			data: cityStr,
			dataType: 'jsonp',
			// jsonp:'callback',
			headers: { 'Api-User-Agent': 'Example/1.0' },
			success: function(data) {			
				console.log(data);
        for (var i = 0; i < data.length; i++) {
            
            console.log("looping");
            if (data[i].country === "UK")
            {
            	console.log(data[i]);
            }
       	 }
	
				/*
				var pages = data[1];
        for (var i = 0; i < pages.length; i++) {
					var page = pages[i];
					var url = 'http://en.wikipedia.org/wiki/' + page;
					$wikiElem.append('<li class="article">'+
							'<a href="'+ url +'">'+ page + '</a>'+
					'</li>');
        };*/
        
        clearTimeout(wikiRequestTimeout);
      }	
		});

    return false;
};

$('#form-container').submit(loadData);

// loadData();
