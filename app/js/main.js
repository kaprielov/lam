function initMap() {
    var latlng = new google.maps.LatLng();
    var myOptions = {
      zoom: 15,
      center: latlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        myOptions);
	setMarkers(map);
}  
function setMarkers(map) {
	var image = 'img/pin.png';
	var latlngbounds = new google.maps.LatLngBounds();	
	$.ajax({
		url: "../../data.json",
		dataType: "json",
		success: function (data) {
			for(var le = 0; le < data.results.length; le++){
				var locationLat = data.results[le].location[0];
				var locationLong = data.results[le].location[1];
				var myLatLng = new google.maps.LatLng(locationLong, locationLat);
				latlngbounds.extend(myLatLng);
	            var marker = new google.maps.Marker({
	                position: myLatLng,
	                map: map,
	                icon: image,
	            }); 
			};
			map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));	 
		},
 	});
};

$('.slide-1__btn').click(function(){
	$('.slide-1').removeClass('on');
	$('.slide-1').addClass('off');
	$.ajax({
		url: "../../data.json",
		dataType: "json",
		beforeSend: function(){
			$(".preloader").addClass('active');
		}, 
		success: function (data) {
			setTimeout(function() {
				$(".preloader").removeClass('active');
				$(".success").addClass('active');
			}, 1500);
			setTimeout(function() {
				$(".success").removeClass('active');
				$('.slide-2').removeClass('off');
				$('.slide-2').addClass('on');
			}, 3500);
			var x = JSON.stringify( data );
			var data = JSON.parse ( x )
			for(var we = 0; we < data.results.length; we++){
				var identifier = JSON.stringify(data.results[we].id);
				var address = data.results[we].address;
				var distance = data.results[we].distance;
				var regionName = data.results[we].region_name;
				var stationName = data.results[we].station_name;
				// locationLat = data.results[we].location[0];
				// locationLong = data.results[we].location[1];
				// var image = data.results[we].image;
				// var url = data.results[we].url;
				var price = data.results[we].price;
				var roomsId = data.results[we].rooms[0].id
				var roomsSqm = data.results[we].rooms[0].sqm	
			  	$('.card-wr').append("<li class='card card-"+we+"'></li>");
			  	$('.card-'+we).append("<p>Идентификатор:&nbsp"+identifier+"</p>");
			  	$('.card-'+we).append("<img src='img/gag-img.jpg' alt='заглушка'>");
			  	$('.card-'+we).append("<p><a class='card-name' href='#'>Адрес:&nbsp"+address+"</a><p>");
			  	$('.card-'+we).append("<p>Расстояние:&nbsp"+distance+"</p>");
			  	$('.card-'+we).append("<p>Район:&nbsp"+regionName+"</p>");
			  	$('.card-'+we).append("<p>Метро:&nbsp"+stationName+"</p>");
			  	$('.card-'+we).append("<p><a class='card-link' href='https://ya.ru/'>Ссылка</a></p>");
			  	if(price == null){
			  		$('.card-'+we).append("<p>Цена не указанна</p>")
			  	}
			  	else{
			  		$('.card-'+we).append("<p>Цена:&nbsp"+price+"</p>")
			  	};
			  	$('.card-'+we).append("<p>"+roomsSqm+"</p>");

			};
			// Пагинатор
			$('.card-wr').paginate({
				 perPage: 15,
			});
			setTimeout(function() {
				$('.card-wr').addClass('active');
			}, 3500);
			
			
		},
	});
});

$(document).on('click', '.card-name', function(e) {
  	e.preventDefault();
  	$('.slide-2').removeClass('on');
  	$('.slide-2').addClass('off');
  	$('.slide-3').removeClass('off');
  	$('.slide-3').addClass('on');
  	$('.slide-3__list').empty();
  	$($(this).closest('.card')).clone().appendTo('.slide-3__list');
  	setTimeout(function() {
		$('.slide-3__in').addClass('active');
	}, 0);
});
$('.slide-3__btn').click(function(){
	$('.slide-3__in').removeClass('active');
	$('.slide-3').removeClass('on')
	$('.slide-3').addClass('off');
	$('.slide-2').removeClass('off');
	$('.slide-2').addClass('on');
});

$('.local-checkbox').click(function(){

    $(this).toggleClass('active')
    if($(this).hasClass('active')){
        $(this).find('input[type=checkbox] + label').css('left','42px');
        $(this).find('.local-checkbox__off').removeClass('active'); 
        $(this).find('.local-checkbox__on').addClass('active');
        $(this).css('background-position','-133px -443px');
        $('.map-wr').addClass('active');
        $('.card-wr').removeClass('open');
        $('.paginate-pagination').css('display','none');
    } 
    else { 
       $(this).find('input[type=checkbox] + label').css('left','3px');  
       $(this).find('.local-checkbox__on').removeClass('active');
       $(this).find('.local-checkbox__off').addClass('active');
       $(this).css('background-position','-180px -443px');
       $('.map-wr').removeClass('active');
       $('.card-wr').addClass('open');
       $('.paginate-pagination').css('display','block');
    }
});