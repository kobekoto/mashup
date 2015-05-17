(function() {

var lat,
lon,
link;

function success(pos) {
  var crd = pos.coords;
  lat = crd.latitude;
  lon = crd.longitude;
}

function error(err) {
  console.log(err.code);
}

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(success, error);

  setTimeout(function() {

      $.ajax({
        url: 'https://api.instagram.com/v1/media/search?lat=' + lat + '&lng=' + lon + '&client_id=ce95cb4e56c146c994457b48a839f6a8',
        dataType: 'jsonp',
        success: function(result){
          console.log(result);
          for (var i = 0; i < result.data.length; i++) {
              var url = result.data[i].images.thumbnail.url;
             $('body').append('<img src="' + url + '"/>');
          }
        }
      });                  
  }, 3000);
}

})();



