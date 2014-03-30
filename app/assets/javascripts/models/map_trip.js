MapBlog.Models.MapTrip = Backbone.Model.extend({
  urlRoot: "/map_trips", 

  parse: function(respAttrs, options) {
    respAttrs.map_photos = new MapBlog.Collections.MapPhotos(respAttrs.map_photos, { parse: true });
    return respAttrs;
  }

});
