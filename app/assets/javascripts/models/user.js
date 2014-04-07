MapBlog.Models.User = Backbone.Model.extend({
  urlRoot: "/users",

  parse: function(respAttrs, options) {
    respAttrs.map_trips = new MapBlog.Collections.MapTrips(respAttrs.map_trips, { parse: true });
    return respAttrs;
  }
});
