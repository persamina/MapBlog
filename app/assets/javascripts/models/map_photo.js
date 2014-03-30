MapBlog.Models.MapPhoto = Backbone.Model.extend({
  urlRoot: "/map_photos",

  parse: function(respAttrs, options) {
    respAttrs.comments = new MapBlog.Collections.Comments(respAttrs.comments, { parse: true } );
    return respAttrs;
  }
});
