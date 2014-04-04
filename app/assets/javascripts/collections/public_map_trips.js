MapBlog.Collections.PublicMapTrips = Backbone.Collection.extend({
  model: MapBlog.Models.MapTrip,
  url: "/map_trips/public"
});
