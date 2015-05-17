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

    $.when(
      $.ajax({
        url: 'https://api.instagram.com/v1/locations/search?lat=' + lat +'&lng=' + lon + '&client_id=ce95cb4e56c146c994457b48a839f6a8',
        dataType: 'jsonp',
        success: function(result){
          // for (var i = 0; i < 1; i++){
            link = result.data[2].id;
        }
      })                  
    ).then(function() {
      console.log(link);
      $.ajax({
        url: 'https://api.instagram.com/v1/locations/' +link+ '/media/recent?client_id=ce95cb4e56c146c994457b48a839f6a8',
        dataType: 'jsonp',
        success: function(result){
          console.log(result);
          for (var i = 0; i < result.data.length; i++){

             var url = result.data[i].images.thumbnail.url;
              console.log(url);
              $('body').append('<img src="' + url + '"/>');
          //   console.log(result[i]);
          //   console.log("it worked!");

          //   // console.log(url);
          //   // $('body').append('<img src="' + url + '"/>');
          }
        }
      });    
    }); 

  }, 2000);
}

})();



