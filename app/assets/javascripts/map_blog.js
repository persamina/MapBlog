window.MapBlog = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var mapTripsRaw = $('#map-trips-data').html()
    var currentUserRaw = $('#user-data').html();

    if ( currentUserRaw.length > 0) {
      var currentUserData = JSON.parse(currentUserRaw);
    }

    if ( mapTripsRaw.length > 0) {
      var mapTripsData = JSON.parse(mapTripsRaw);
    }

    MapBlog.currentUser = new MapBlog.Models.User();
    if(currentUserData) {
      MapBlog.currentUser.set(currentUserData.user, {parse: true} );
    }
    MapBlog.mapTrips = new MapBlog.Collections.MapTrips();
    if (mapTripsData) {
      MapBlog.mapTrips.set(mapTripsData, {parse: true} ); 
    }

    new MapBlog.Routers.AppRouter($(".content"));
    Backbone.history.start();

  }
};

$(document).ready(function(){
  MapBlog.initialize();
});
